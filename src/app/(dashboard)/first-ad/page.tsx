"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Zap, TrendingUp, BarChart3, Rocket } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function FirstAdPage() {
    return (
        <div className="min-h-[calc(100-5rem)] flex items-center justify-center p-6 bg-grid-dense relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl w-full space-y-12 relative z-10"
            >
                <div className="text-center space-y-4">
                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 12 }}
                        className="w-20 h-20 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-primary/20 shadow-[0_0_30px_rgba(255,103,43,0.2)]"
                    >
                        <Rocket className="w-10 h-10 text-primary animate-bounce" />
                    </motion.div>
                    <h1 className="text-4xl lg:text-6xl font-display font-black tracking-tight text-white">
                        Unleash Your First <br />
                        <span className="text-gradient-primary">Winning Creative</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                        Welcome to AdClarity AI. You're one step away from transforming your ad performance with data-backed psychological analysis.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        {
                            icon: <Zap className="w-6 h-6 text-primary" />,
                            title: "Score Your Hook",
                            desc: "Know exactly if your first 3 seconds will stop the scroll."
                        },
                        {
                            icon: <TrendingUp className="w-6 h-6 text-emerald-400" />,
                            title: "Predict ROAS",
                            desc: "Get an estimated conversion probability before spending a dollar."
                        },
                        {
                            icon: <BarChart3 className="w-6 h-6 text-accent" />,
                            title: "Trigger Map",
                            desc: "Visualize the psychological emotional nodes in your copy."
                        }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * (i + 1) }}
                        >
                            <Card className="glass p-6 text-center space-y-4 hover:border-primary/30 transition-all group">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                                    {feature.icon}
                                </div>
                                <h3 className="font-bold text-white tracking-wide">{feature.title}</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed">{feature.desc}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="flex flex-col items-center gap-6 pt-8">
                    <Link href="/analyze">
                        <Button size="lg" className="h-16 px-12 text-xl font-black bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 group uppercase tracking-widest">
                            Launch First Analysis
                            <Sparkles className="ml-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
                        </Button>
                    </Link>
                    <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        AI Media Buyer is Ready
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
