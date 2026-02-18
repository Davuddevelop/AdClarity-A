"use client";

import { ArrowRight, ArrowUpRight, Plus, Sparkles, TrendingUp, Zap, BarChart3, Target, Brain } from "lucide-react";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
};

const item: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const stats = [
    {
        label: "Total Analyses",
        value: "12",
        change: "+2 this week",
        trend: "up",
        icon: BarChart3,
        color: "text-primary",
        bg: "bg-primary/10",
        glow: "shadow-[0_0_40px_rgba(var(--primary-rgb),0.15)]"
    },
    {
        label: "Avg. Hook Score",
        value: "74%",
        change: "Above average",
        trend: "up",
        icon: Target,
        color: "text-accent",
        bg: "bg-accent/10",
        glow: "shadow-[0_0_40px_rgba(var(--accent-rgb),0.12)]"
    },
    {
        label: "Optimization Lift",
        value: "+32%",
        change: "Predicted gain",
        trend: "up",
        icon: TrendingUp,
        color: "text-amber-400",
        bg: "bg-amber-400/10",
        glow: "shadow-[0_0_40px_rgba(251,191,36,0.12)]"
    },
    {
        label: "Psychology Score",
        value: "8.4",
        change: "Strong triggers",
        trend: "up",
        icon: Brain,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10",
        glow: "shadow-[0_0_40px_rgba(52,211,153,0.12)]"
    },
];

const recentAnalyses = [
    { name: "Summer Sale Campaign", platform: "Meta Ads", time: "2 hours ago", score: 82, rating: "Excellent" },
    { name: "Product Launch Video", platform: "TikTok", time: "5 hours ago", score: 71, rating: "Good" },
    { name: "Black Friday Teaser", platform: "Google", time: "1 day ago", score: 89, rating: "Excellent" },
    { name: "Retargeting Carousel", platform: "Meta Ads", time: "2 days ago", score: 65, rating: "Average" },
];

export default function DashboardPage() {
    return (
        <div className="min-h-screen p-8 lg:p-12 xl:p-16">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="max-w-[1800px] mx-auto space-y-10"
            >
                {/* Header */}
                <motion.div variants={item} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary gap-1.5 mb-3">
                            <Zap className="w-3 h-3" />
                            Dashboard
                        </Badge>
                        <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight">
                            Welcome back<span className="text-primary">.</span>
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-xl">
                            Here's an overview of your creative performance and recent analyses.
                        </p>
                    </div>
                    <Link href="/analyze">
                        <Button size="lg" className="h-14 px-8 text-base font-bold gap-3 glow-primary">
                            <Plus className="w-5 h-5" />
                            Analyze Creative
                        </Button>
                    </Link>
                </motion.div>

                {/* Stats Grid */}
                <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className="group"
                        >
                            <Card className={`bg-card/50 border-white/5 backdrop-blur-sm hover:border-white/10 transition-all ${stat.glow}`}>
                                <CardContent className="p-8">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center`}>
                                            <stat.icon className={`w-7 h-7 ${stat.color}`} />
                                        </div>
                                        <ArrowUpRight className="w-5 h-5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                        <p className="text-4xl font-display font-bold tracking-tight">{stat.value}</p>
                                        <p className="text-sm text-emerald-400">{stat.change}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    {/* Recent Analyses - Takes 2 columns */}
                    <motion.div variants={item} className="xl:col-span-2">
                        <Card className="bg-card/50 border-white/5 backdrop-blur-sm h-full">
                            <CardHeader className="p-8 pb-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle className="text-2xl font-display font-bold">Recent Analyses</CardTitle>
                                        <CardDescription className="text-muted-foreground mt-1">Your latest creative breakdowns and scores.</CardDescription>
                                    </div>
                                    <Link href="/history">
                                        <Button variant="ghost" className="text-muted-foreground hover:text-foreground gap-2">
                                            View All
                                            <ArrowRight className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardContent className="px-8 pb-8">
                                <div className="space-y-4">
                                    {recentAnalyses.map((analysis, i) => (
                                        <motion.div
                                            key={i}
                                            whileHover={{ x: 4 }}
                                            className="flex items-center justify-between p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-primary/20 transition-all cursor-pointer group"
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                                                    <TrendingUp className="w-6 h-6 text-primary" />
                                                </div>
                                                <div>
                                                    <h4 className="text-lg font-semibold group-hover:text-primary transition-colors">{analysis.name}</h4>
                                                    <p className="text-sm text-muted-foreground">{analysis.platform} • {analysis.time}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-6">
                                                <div className="text-right">
                                                    <p className="text-2xl font-display font-bold">{analysis.score}<span className="text-base text-muted-foreground">/100</span></p>
                                                    <p className={`text-sm font-medium ${analysis.score >= 80 ? 'text-emerald-400' : analysis.score >= 70 ? 'text-amber-400' : 'text-muted-foreground'}`}>
                                                        {analysis.rating}
                                                    </p>
                                                </div>
                                                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Quick Actions & Tips - Takes 1 column */}
                    <motion.div variants={item} className="space-y-8">
                        {/* Quick Actions */}
                        <Card className="bg-card/50 border-white/5 backdrop-blur-sm">
                            <CardHeader className="p-8 pb-4">
                                <CardTitle className="text-xl font-display font-bold">Quick Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="px-8 pb-8 space-y-3">
                                <Link href="/analyze" className="block">
                                    <motion.div
                                        whileHover={{ x: 4 }}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/15 transition-all cursor-pointer group"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                                            <Sparkles className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-primary">New Analysis</p>
                                            <p className="text-xs text-primary/70">Score a new creative</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                                    </motion.div>
                                </Link>
                                <Link href="/pro" className="block">
                                    <motion.div
                                        whileHover={{ x: 4 }}
                                        className="flex items-center gap-4 p-4 rounded-xl border border-white/5 hover:bg-white/[0.03] transition-all cursor-pointer group"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                            <Zap className="w-5 h-5 text-accent" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold">Unlock Pro</p>
                                            <p className="text-xs text-muted-foreground">Unlimited analyses</p>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                    </motion.div>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* AI Tip */}
                        <Card className="bg-gradient-to-br from-accent/10 via-card/50 to-card/50 border-accent/20 backdrop-blur-sm overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl" />
                            <CardHeader className="p-8 pb-4 relative">
                                <div className="flex items-center gap-2 mb-2">
                                    <Brain className="w-5 h-5 text-accent" />
                                    <Badge variant="secondary" className="bg-accent/20 text-accent border-0 text-xs">AI Insight</Badge>
                                </div>
                                <CardTitle className="text-xl font-display font-bold">Pro Tip</CardTitle>
                            </CardHeader>
                            <CardContent className="px-8 pb-8 relative">
                                <p className="text-muted-foreground leading-relaxed mb-6">
                                    Based on your recent analyses, your hooks perform <span className="text-foreground font-medium">23% better</span> when they lead with a <span className="text-accent font-medium">curiosity gap</span> rather than a direct offer.
                                </p>
                                <Button variant="outline" className="w-full border-accent/30 text-accent hover:bg-accent/10 hover:text-accent">
                                    View Strategy Guide
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
