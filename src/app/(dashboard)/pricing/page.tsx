"use client";

import { motion, type Variants } from "framer-motion";
import { Check, Sparkles, Crown, Building2, ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.15 }
    }
};

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const tiers = [
    {
        name: "Free",
        icon: Zap,
        price: "$0",
        period: "forever",
        description: "Perfect for testing the waters and seeing what AdClarity can do.",
        features: [
            "3 analyses per month",
            "Standard AI engine",
            "Basic hook scoring",
            "Email support"
        ],
        buttonText: "Current Plan",
        buttonVariant: "outline" as const,
        active: false,
        highlight: false,
    },
    {
        name: "Pro",
        icon: Sparkles,
        price: "$49",
        period: "per month",
        description: "The media buyer's secret weapon. Unlimited power for serious marketers.",
        features: [
            "Unlimited analyses",
            "Advanced AI engine",
            "A/B copy generator",
            "Psychology breakdown",
            "Creative history & trends",
            "Priority support",
            "Export reports"
        ],
        buttonText: "Upgrade to Pro",
        buttonVariant: "default" as const,
        active: true,
        highlight: true,
    },
    {
        name: "Agency",
        icon: Building2,
        price: "$149",
        period: "per month",
        description: "Scale your agency performance with white-label tools and team features.",
        features: [
            "Everything in Pro",
            "White-label reports",
            "Client dashboard",
            "Up to 10 team members",
            "API access",
            "Custom branding",
            "Dedicated account manager"
        ],
        buttonText: "Contact Sales",
        buttonVariant: "outline" as const,
        active: false,
        highlight: false,
    },
];

export default function PricingPage() {
    return (
        <div className="min-h-screen p-8 lg:p-12 xl:p-16 flex flex-col">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="max-w-[1600px] mx-auto w-full flex-1 flex flex-col"
            >
                {/* Header */}
                <motion.div variants={item} className="text-center mb-16">
                    <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary gap-1.5 mb-6">
                        <Crown className="w-3 h-3" />
                        Pricing
                    </Badge>
                    <h1 className="text-4xl lg:text-6xl font-display font-bold tracking-tight mb-4">
                        Simple, Transparent <span className="text-gradient-primary">Pricing</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Choose the plan that fits your growth stage. No hidden fees, cancel anytime.
                    </p>
                </motion.div>

                {/* Pricing Cards */}
                <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={tier.name}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            className="flex"
                        >
                            <Card className={`
                                flex flex-col w-full bg-card/50 backdrop-blur-sm relative overflow-hidden
                                ${tier.highlight
                                    ? 'border-primary/50 shadow-[0_0_60px_rgba(var(--primary-rgb),0.15)]'
                                    : 'border-white/5 hover:border-white/10'
                                }
                            `}>
                                {/* Highlight gradient */}
                                {tier.highlight && (
                                    <>
                                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] -z-10" />
                                    </>
                                )}

                                {/* Popular badge */}
                                {tier.highlight && (
                                    <div className="absolute top-6 right-6">
                                        <Badge className="bg-primary text-primary-foreground font-bold px-3 py-1">
                                            Most Popular
                                        </Badge>
                                    </div>
                                )}

                                <CardHeader className="p-8 pb-6">
                                    <div className={`w-14 h-14 rounded-2xl ${tier.highlight ? 'bg-primary/20' : 'bg-white/5'} flex items-center justify-center mb-4`}>
                                        <tier.icon className={`w-7 h-7 ${tier.highlight ? 'text-primary' : 'text-muted-foreground'}`} />
                                    </div>
                                    <CardTitle className="text-2xl font-display font-bold">{tier.name}</CardTitle>
                                    <div className="flex items-baseline gap-2 mt-4">
                                        <span className="text-5xl font-display font-bold tracking-tight">{tier.price}</span>
                                        <span className="text-muted-foreground">/{tier.period}</span>
                                    </div>
                                    <CardDescription className="text-muted-foreground mt-4 text-base leading-relaxed">
                                        {tier.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="px-8 flex-1">
                                    <ul className="space-y-4">
                                        {tier.features.map((feature) => (
                                            <li key={feature} className="flex items-start gap-3">
                                                <div className={`w-5 h-5 rounded-full ${tier.highlight ? 'bg-primary/20' : 'bg-white/10'} flex items-center justify-center shrink-0 mt-0.5`}>
                                                    <Check className={`w-3 h-3 ${tier.highlight ? 'text-primary' : 'text-muted-foreground'}`} />
                                                </div>
                                                <span className="text-sm text-foreground/80">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>

                                <CardFooter className="p-8 pt-6">
                                    <Button
                                        variant={tier.buttonVariant}
                                        size="lg"
                                        className={`
                                            w-full h-14 text-base font-bold gap-2
                                            ${tier.highlight
                                                ? 'glow-primary'
                                                : 'border-white/10 hover:bg-white/5'
                                            }
                                        `}
                                    >
                                        {tier.buttonText}
                                        {tier.highlight && <ArrowRight className="w-5 h-5" />}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom note */}
                <motion.div variants={item} className="text-center mt-16">
                    <p className="text-muted-foreground">
                        All plans include a <span className="text-foreground font-medium">14-day money-back guarantee</span>.
                        Questions? <a href="#" className="text-primary hover:underline">Contact our team</a>.
                    </p>
                </motion.div>
            </motion.div>
        </div>
    );
}
