"use client";

export const dynamic = "force-dynamic";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
    CheckCircle2,
    ChevronLeft,
    Download,
    MessageSquare,
    Share2,
    Trophy,
    Zap,
    Target,
    AlertCircle,
    Copy,
    Sparkles
} from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

interface Analysis {
    id: string;
    platform: string;
    headline: string | null;
    primaryText: string | null;
    hookScore: number;
    offerScore: number;
    ctaScore: number;
    scrollStopScore: number;
    conversionProbability: number;
    emotionalTriggers: {
        fear?: number;
        greed?: number;
        status?: number;
        belonging?: number;
        security?: number;
        urgency?: number;
        fomo?: number;
    };
    summary: string;
    strengths: string[];
    weaknesses: string[];
    fullyOptimizedCopy: string;
}

export default function ResultsPage() {
    const { id } = useParams() as { id: string };

    const { data: analysis, isLoading, error } = useQuery<Analysis>({
        queryKey: ["analysis", id],
        queryFn: async () => {
            const response = await axios.get(`/api/analyze/${id}`);
            return response.data;
        },
        enabled: !!id,
    });

    const copyToClipboard = () => {
        if (analysis?.fullyOptimizedCopy) {
            navigator.clipboard.writeText(analysis.fullyOptimizedCopy);
            toast.success("Copied to clipboard!");
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8">
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    <Zap className="w-16 h-16 text-primary mb-6" />
                </motion.div>
                <h2 className="text-2xl font-display font-bold mb-2">Synthesizing Results...</h2>
                <p className="text-muted-foreground">Our AI is crunching the emotional data points.</p>
            </div>
        );
    }

    if (error || !analysis) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
                <AlertCircle className="w-16 h-16 text-destructive mb-6" />
                <h2 className="text-2xl font-display font-bold mb-2">Analysis Not Found</h2>
                <p className="text-muted-foreground max-w-md mb-8">
                    We couldn't retrieve this analysis. It might have been deleted or the link is invalid.
                </p>
                <Link href="/dashboard">
                    <Button size="lg">Return to Dashboard</Button>
                </Link>
            </div>
        );
    }

    // All 7 emotional triggers
    const emotionalTriggersData = [
        { trigger: "Fear", value: analysis.emotionalTriggers?.fear ?? 0 },
        { trigger: "Greed", value: analysis.emotionalTriggers?.greed ?? 0 },
        { trigger: "Status", value: analysis.emotionalTriggers?.status ?? 0 },
        { trigger: "Belonging", value: analysis.emotionalTriggers?.belonging ?? 0 },
        { trigger: "Security", value: analysis.emotionalTriggers?.security ?? 0 },
        { trigger: "Urgency", value: analysis.emotionalTriggers?.urgency ?? 0 },
        { trigger: "FOMO", value: analysis.emotionalTriggers?.fomo ?? 0 },
    ];

    const chartConfig = {
        value: {
            label: "Intensity",
            color: "hsl(var(--primary))",
        },
    } satisfies ChartConfig;

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-emerald-400";
        if (score >= 60) return "text-amber-400";
        return "text-rose-400";
    };

    return (
        <div className="min-h-screen p-8 lg:p-12">
            <div className="max-w-[1400px] mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" className="text-muted-foreground hover:text-foreground gap-2">
                            <ChevronLeft className="w-4 h-4" />
                            Back to Dashboard
                        </Button>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="border-white/10 hover:bg-white/5 gap-2">
                            <Share2 className="w-4 h-4" />
                            Share Report
                        </Button>
                        <Button className="gap-2">
                            <Download className="w-4 h-4" />
                            Download PDF
                        </Button>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-12">
                    {/* Left Column: Scores & Triggers */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* Performance Score */}
                        <Card className="bg-card/50 border-white/5 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="font-display">Performance Score</CardTitle>
                                <CardDescription>Overall creative effectiveness.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center justify-center pb-8">
                                <div className="relative w-44 h-44 flex items-center justify-center">
                                    <svg className="w-full h-full -rotate-90">
                                        <circle
                                            cx="88"
                                            cy="88"
                                            r="78"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="10"
                                            className="text-muted/20"
                                        />
                                        <circle
                                            cx="88"
                                            cy="88"
                                            r="78"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="10"
                                            strokeDasharray={490}
                                            strokeDashoffset={490 - (490 * (analysis.conversionProbability ?? 0)) / 100}
                                            strokeLinecap="round"
                                            className="text-primary transition-all duration-1000 ease-out"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className={`text-5xl font-display font-bold ${getScoreColor(analysis.conversionProbability)}`}>
                                            {analysis.conversionProbability}
                                        </span>
                                        <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Probability</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Psychological Triggers */}
                        <Card className="bg-card/50 border-white/5 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="font-display">Psychological Triggers</CardTitle>
                                <CardDescription>Emotional intensity breakdown.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[280px]">
                                    <RadarChart data={emotionalTriggersData}>
                                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                                        <PolarAngleAxis dataKey="trigger" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                                        <PolarGrid stroke="hsl(var(--border))" />
                                        <Radar
                                            dataKey="value"
                                            fill="var(--color-value)"
                                            fillOpacity={0.5}
                                            stroke="var(--color-value)"
                                            strokeWidth={2}
                                        />
                                    </RadarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        {/* Score Breakdown */}
                        <Card className="bg-card/50 border-white/5 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="font-display">Score Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                {[
                                    { label: "Hook Strength", value: analysis.hookScore },
                                    { label: "Offer Clarity", value: analysis.offerScore },
                                    { label: "CTA Directness", value: analysis.ctaScore },
                                    { label: "Scroll Stop Power", value: analysis.scrollStopScore },
                                ].map((item) => (
                                    <div key={item.label} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">{item.label}</span>
                                            <span className={`font-semibold ${getScoreColor(item.value)}`}>{item.value}%</span>
                                        </div>
                                        <Progress value={item.value} className="h-2" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Breakdown & Suggestions */}
                    <div className="lg:col-span-8 space-y-6">
                        {/* Executive Summary */}
                        <Card className="bg-card/50 border-white/5 backdrop-blur-sm">
                            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                    <MessageSquare className="w-6 h-6" />
                                </div>
                                <div>
                                    <CardTitle className="font-display">Executive Summary</CardTitle>
                                    <CardDescription>The "Why" behind the score.</CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground/80 leading-relaxed italic border-l-2 border-primary/30 pl-6 py-2">
                                    "{analysis.summary}"
                                </p>
                            </CardContent>
                        </Card>

                        {/* Strengths & Weaknesses */}
                        <div className="grid gap-6 md:grid-cols-2">
                            <Card className="bg-card/50 border-white/5 backdrop-blur-sm border-l-2 border-l-emerald-500/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-base font-display">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                        Strengths
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {(analysis.strengths || []).map((s: string, i: number) => (
                                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                                                {s}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                            <Card className="bg-card/50 border-white/5 backdrop-blur-sm border-l-2 border-l-rose-500/50">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-base font-display">
                                        <AlertCircle className="w-5 h-5 text-rose-500" />
                                        Weaknesses
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {(analysis.weaknesses || []).map((w: string, i: number) => (
                                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                                                {w}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Optimized Copy */}
                        <Card className="bg-gradient-to-br from-primary/10 via-card/50 to-card/50 border-primary/20 backdrop-blur-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10">
                                <Sparkles className="w-32 h-32 text-primary" />
                            </div>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                                            <Trophy className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle className="font-display">Optimized Master Version</CardTitle>
                                            <CardDescription>The 100/100 version for immediate testing.</CardDescription>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={copyToClipboard}
                                        className="text-primary hover:text-primary hover:bg-primary/10 gap-2"
                                    >
                                        <Copy className="w-4 h-4" />
                                        Copy
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="p-6 rounded-xl bg-background/50 border border-white/5 text-foreground/90 whitespace-pre-wrap font-medium leading-relaxed">
                                    {analysis.fullyOptimizedCopy}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
