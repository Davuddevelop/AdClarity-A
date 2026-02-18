import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { prisma } from "@/lib/prisma";
import { ANALYSIS_PROMPT } from "@/lib/prompts";

const FREE_TIER_LIMIT = 3;
const PRO_TIER_LIMIT = Infinity;
const AGENCY_TIER_LIMIT = Infinity;

function getMonthlyLimit(tier: string): number {
    switch (tier) {
        case "PRO": return PRO_TIER_LIMIT;
        case "AGENCY": return AGENCY_TIER_LIMIT;
        default: return FREE_TIER_LIMIT;
    }
}

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const user = await currentUser();

        if (!userId || !user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Ensure user exists in database (simple sync)
        const dbUser = await prisma.user.upsert({
            where: { id: userId },
            update: {
                email: user.emailAddresses[0]?.emailAddress,
            },
            create: {
                id: userId,
                email: user.emailAddresses[0]?.emailAddress || "unknown@clerk.com",
                subscriptionTier: "FREE",
            }
        });

        // Check rate limit for free tier
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const analysisCount = await prisma.creativeAnalysis.count({
            where: {
                userId,
                createdAt: {
                    gte: startOfMonth,
                },
            },
        });

        const monthlyLimit = getMonthlyLimit(dbUser.subscriptionTier);
        if (analysisCount >= monthlyLimit) {
            return NextResponse.json(
                {
                    error: "Monthly limit reached",
                    message: `You've used all ${monthlyLimit} analyses for this month. Upgrade to Pro for unlimited analyses.`,
                    limit: monthlyLimit,
                    used: analysisCount,
                },
                { status: 429 }
            );
        }

        const {
            platform,
            headline,
            primaryText,
            cta,
            creativeContent,
            demographics,
            audienceInterests,
            painPoints,
            campaignGoal
        } = await req.json();

        const prompt = ANALYSIS_PROMPT
            .replace("{{platform}}", platform || "Unknown")
            .replace("{{headline}}", headline || "N/A")
            .replace("{{primaryText}}", primaryText || "N/A")
            .replace("{{cta}}", cta || "N/A")
            .replace("{{creativeContent}}", creativeContent || "N/A")
            .replace("{{demographics}}", demographics || "N/A")
            .replace("{{audienceInterests}}", audienceInterests || "N/A")
            .replace("{{painPoints}}", painPoints || "N/A")
            .replace("{{campaignGoal}}", campaignGoal || "N/A");

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a conversion optimization expert. Output strictly JSON." },
                { role: "user", content: prompt },
            ],
            response_format: { type: "json_object" },
        });

        // Parse with error handling
        let analysis;
        try {
            const content = response.choices[0].message.content;
            if (!content) {
                throw new Error("Empty response from AI");
            }
            analysis = JSON.parse(content);
        } catch (parseError) {
            console.error("[ANALYZE_PARSE_ERROR]", parseError);
            return NextResponse.json(
                { error: "Failed to parse AI response. Please try again." },
                { status: 500 }
            );
        }

        // Validate required fields with defaults
        const validatedAnalysis = {
            hookScore: analysis.hookScore ?? 50,
            offerScore: analysis.offerScore ?? 50,
            ctaScore: analysis.ctaScore ?? 50,
            scrollStopScore: analysis.scrollStopScore ?? 50,
            conversionProbability: analysis.conversionProbability ?? 50,
            emotionalTriggers: analysis.emotionalTriggers ?? {
                fear: 0, greed: 0, status: 0, belonging: 0,
                security: 0, urgency: 0, fomo: 0
            },
            summary: analysis.summary ?? "Analysis completed.",
            strengths: analysis.strengths ?? [],
            weaknesses: analysis.weaknesses ?? [],
            rewriteSuggestions: analysis.rewriteSuggestions ?? { hooks: [], ctas: [], variations: [] },
            fullyOptimizedCopy: analysis.fullyOptimizedCopy ?? primaryText ?? "",
        };

        // Save to database
        const savedAnalysis = await prisma.creativeAnalysis.create({
            data: {
                userId,
                platform: platform || "Unknown",
                headline,
                primaryText,
                copy: primaryText,
                cta,
                videoScript: creativeContent,
                demographics,
                audienceInterests,
                painPoints,
                campaignGoal,
                hookScore: validatedAnalysis.hookScore,
                offerScore: validatedAnalysis.offerScore,
                ctaScore: validatedAnalysis.ctaScore,
                scrollStopScore: validatedAnalysis.scrollStopScore,
                conversionProbability: validatedAnalysis.conversionProbability,
                emotionalTriggers: validatedAnalysis.emotionalTriggers,
                summary: validatedAnalysis.summary,
                strengths: validatedAnalysis.strengths,
                weaknesses: validatedAnalysis.weaknesses,
                rewriteSuggestions: validatedAnalysis.rewriteSuggestions,
                fullyOptimizedCopy: validatedAnalysis.fullyOptimizedCopy,
            },
        });

        return NextResponse.json(savedAnalysis);
    } catch (error) {
        console.error("[ANALYZE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const analyses = await prisma.creativeAnalysis.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(analyses);
    } catch (error) {
        console.error("[ANALYZE_GET_ALL_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
