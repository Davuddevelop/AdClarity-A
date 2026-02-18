import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { id } = await params;

        const analysis = await prisma.creativeAnalysis.findUnique({
            where: {
                id,
                userId,
            },
        });

        if (!analysis) {
            return new NextResponse("Not Found", { status: 404 });
        }

        return NextResponse.json(analysis);
    } catch (error) {
        console.error("[ANALYZE_GET_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
