"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { format } from "date-fns";
import { motion } from "framer-motion";
import {
    History,
    ChevronRight,
    PlusCircle,
    Search,
    Filter,
    TrendingUp,
    Target,
    Zap
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Analysis {
    id: string;
    platform: string;
    headline: string | null;
    primaryText: string | null;
    hookScore: number;
    conversionProbability: number;
    createdAt: string;
}

function getScoreColor(score: number): string {
    if (score >= 80) return "text-emerald-400";
    if (score >= 60) return "text-amber-400";
    return "text-rose-400";
}

function getScoreLabel(score: number): string {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Average";
    return "Needs Work";
}

export default function HistoryPage() {
    const { data: analyses, isLoading } = useQuery<Analysis[]>({
        queryKey: ["analyses"],
        queryFn: async () => {
            const response = await axios.get("/api/analyze");
            return response.data;
        },
    });

    return (
        <div className="min-h-screen p-8 lg:p-12 xl:p-16">
            <div className="max-w-[1600px] mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div>
                        <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary gap-1.5 mb-4">
                            <History className="w-3 h-3" />
                            History
                        </Badge>
                        <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight mb-2">
                            Analysis History<span className="text-primary">.</span>
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Review your past ad creatives and performance scores.
                        </p>
                    </div>
                    <Link href="/analyze">
                        <Button size="lg" className="h-14 px-8 font-bold gap-2 glow-primary">
                            <PlusCircle className="w-5 h-5" />
                            Analyze New Ad
                        </Button>
                    </Link>
                </div>

                {/* Search & Filter */}
                <div className="flex items-center gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by headline or platform..."
                            className="pl-11 h-12 bg-card/50 border-white/10 focus-visible:ring-primary/50"
                        />
                    </div>
                    <Button variant="outline" className="h-12 border-white/10 text-muted-foreground gap-2">
                        <Filter className="w-4 h-4" />
                        Filter
                    </Button>
                </div>

                {/* Content */}
                {isLoading ? (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-48 rounded-2xl bg-card/50 border border-white/5 animate-pulse" />
                        ))}
                    </div>
                ) : !analyses || analyses.length === 0 ? (
                    <Card className="bg-card/50 border-white/5 backdrop-blur-sm">
                        <CardContent className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <History className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-display font-bold mb-3">No analyses yet</h3>
                            <p className="text-muted-foreground max-w-md mb-8">
                                Start your first ad analysis to see your history and track improvement over time.
                            </p>
                            <Link href="/analyze">
                                <Button size="lg" className="h-12 px-8 font-bold gap-2">
                                    <Zap className="w-5 h-5" />
                                    Analyze First Ad
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {analyses.map((analysis, i) => (
                            <motion.div
                                key={analysis.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Link href={`/results/${analysis.id}`}>
                                    <Card className="bg-card/50 border-white/5 backdrop-blur-sm hover:border-primary/20 transition-all group cursor-pointer h-full">
                                        <CardHeader className="pb-4">
                                            <div className="flex items-start justify-between">
                                                <Badge variant="secondary" className="bg-white/10 text-muted-foreground border-0">
                                                    {analysis.platform}
                                                </Badge>
                                                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                            </div>
                                            <CardTitle className="text-lg font-semibold mt-3 line-clamp-2 group-hover:text-primary transition-colors">
                                                {analysis.headline || analysis.primaryText?.slice(0, 60) || "Untitled Analysis"}
                                            </CardTitle>
                                            <CardDescription className="text-muted-foreground">
                                                {format(new Date(analysis.createdAt), "MMM d, yyyy 'at' h:mm a")}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-2">
                                                        <Target className="w-4 h-4 text-muted-foreground" />
                                                        <span className="text-sm text-muted-foreground">Hook</span>
                                                        <span className={`text-sm font-bold ${getScoreColor(analysis.hookScore)}`}>
                                                            {analysis.hookScore}%
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className={`text-2xl font-display font-bold ${getScoreColor(analysis.conversionProbability)}`}>
                                                        {analysis.conversionProbability}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {getScoreLabel(analysis.conversionProbability)}
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
