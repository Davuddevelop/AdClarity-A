"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap, Shield, Rocket, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const features = [
    {
        title: "Unlimited Analyses",
        description: "No more monthly caps. Analyze hundreds of ads per day without interruption.",
        icon: Zap,
        color: "text-amber-400",
        bg: "bg-amber-400/10"
    },
    {
        title: "Competitor Tracking",
        description: "Monitor your competitors' best performing ads and see their exact scores.",
        icon: Globe,
        color: "text-accent",
        bg: "bg-accent/10"
    },
    {
        title: "Advanced AI Suggestions",
        description: "Deep dive into psychological triggers with the GPT-4o 'Super-Prompt'.",
        icon: Sparkles,
        color: "text-primary",
        bg: "bg-primary/10"
    },
    {
        title: "Historical Benchmarking",
        description: "Compare your new ads against your best-performing creatives of all time.",
        icon: Rocket,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10"
    }
];

export default function ProPage() {
    return (
        <div className="min-h-screen p-8 lg:p-12 xl:p-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-[1200px] mx-auto space-y-12"
            >
                {/* Header */}
                <div className="text-center space-y-6">
                    <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        Premium Experience
                    </Badge>
                    <h1 className="text-4xl lg:text-6xl font-display font-bold">
                        Unlock Your Full <span className="text-gradient-primary">Potential</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Get the unfair advantage in ad performance with our professional tools and unlimited AI analysis.
                    </p>
                    <div className="flex items-center justify-center gap-4 pt-4">
                        <Link href="/pricing">
                            <Button size="lg" className="h-14 px-10 text-lg font-bold glow-primary">
                                View Pricing
                            </Button>
                        </Link>
                        <Button variant="outline" size="lg" className="h-14 px-10 text-lg border-white/10">
                            Schedule a Demo
                        </Button>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid gap-6 md:grid-cols-2">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -4 }}
                        >
                            <Card className="bg-card/50 border-white/5 backdrop-blur-sm hover:border-white/10 transition-all group overflow-hidden h-full">
                                <CardHeader className="flex flex-row items-start gap-5 p-8">
                                    <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center ${feature.color} group-hover:scale-110 transition-transform shrink-0`}>
                                        <feature.icon className="w-7 h-7" />
                                    </div>
                                    <div className="space-y-2">
                                        <CardTitle className="text-xl font-display">{feature.title}</CardTitle>
                                        <CardDescription className="text-base">{feature.description}</CardDescription>
                                    </div>
                                </CardHeader>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Testimonial */}
                <Card className="bg-gradient-to-br from-primary/15 via-card/50 to-card/50 border-primary/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Shield className="w-64 h-64 text-primary" />
                    </div>
                    <CardContent className="p-12 lg:p-16 text-center space-y-8 relative z-10">
                        <h2 className="text-3xl lg:text-4xl font-display font-bold">
                            Trusted by 2,000+ Media Buyers
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto italic leading-relaxed">
                            "AdClarity reduced our CPA by 42% in just two weeks by helping us identify local maxima in our creative rotations."
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center font-bold text-primary">
                                SJ
                            </div>
                            <div className="text-left">
                                <p className="font-semibold">Sarah Jenkins</p>
                                <p className="text-sm text-muted-foreground">Growth Lead @ MetaAgencies</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
