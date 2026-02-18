"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import {
    Zap,
    ChevronRight,
    Loader2,
    Sparkles,
    Type,
    Target,
    Brain,
    BarChart3,
    Wand2
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";

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

const analysisFeatures = [
    { icon: Type, label: "Copy Analysis", desc: "Hook & headline scoring" },
    { icon: Brain, label: "Psychology Engine", desc: "Trigger detection" },
    { icon: Target, label: "CTA Evaluation", desc: "Conversion potential" },
    { icon: BarChart3, label: "Performance Prediction", desc: "AI-powered scoring" },
];

export default function AnalyzePage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, setValue, watch, control } = useForm({
        defaultValues: {
            platform: "meta",
            headline: "",
            primaryText: "",
            cta: "",
            creativeContent: "",
            demographics: "",
            audienceInterests: "",
            painPoints: "",
            campaignGoal: "",
        }
    });

    const onSubmit = async (data: any) => {
        try {
            setIsLoading(true);
            const response = await axios.post("/api/analyze", data);
            toast.success("Analysis Complete", {
                description: "Your creative has been scored and optimized.",
            });
            router.push(`/results/${response.data.id}`);
        } catch (error) {
            console.error(error);
            toast.error("Analysis Failed", {
                description: "Something went wrong. Please check your API keys and try again.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const charCount = watch("primaryText")?.length || 0;

    return (
        <div className="min-h-screen p-8 lg:p-12 xl:p-16">
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="max-w-[1600px] mx-auto"
            >
                {/* Header */}
                <motion.div variants={item} className="mb-10">
                    <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary gap-1.5 mb-4">
                        <Sparkles className="w-3 h-3" />
                        Creative Analysis
                    </Badge>
                    <h1 className="text-4xl lg:text-5xl font-display font-bold tracking-tight mb-3">
                        Analyze New Creative<span className="text-primary">.</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl">
                        Provide your ad details for a comprehensive AI-powered analysis with hook scoring, psychology breakdown, and optimization suggestions.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                    {/* Main Form - Takes 3 columns */}
                    <motion.div variants={item} className="xl:col-span-3">
                        <Card className="bg-card/50 border-white/5 backdrop-blur-sm overflow-hidden">
                            <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />
                            <CardHeader className="p-8 pb-6">
                                <CardTitle className="text-2xl font-display font-bold">Creative Details</CardTitle>
                                <CardDescription className="text-muted-foreground">
                                    Fill in the fields below to generate a comprehensive conversion analysis.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="px-8 pb-10">
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                                    {/* Row 1 */}
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                        <div className="space-y-3">
                                            <Label className="text-sm font-medium">Target Platform</Label>
                                            <Controller
                                                name="platform"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <SelectTrigger className="h-12 bg-white/5 border-white/10 focus:ring-primary/50">
                                                            <SelectValue placeholder="Social platform" />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-card border-white/10">
                                                            <SelectItem value="meta">Meta (Facebook/Instagram)</SelectItem>
                                                            <SelectItem value="tiktok">TikTok</SelectItem>
                                                            <SelectItem value="google">Google Search/Display</SelectItem>
                                                            <SelectItem value="youtube">YouTube</SelectItem>
                                                            <SelectItem value="linkedin">LinkedIn</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-sm font-medium">Campaign Goal</Label>
                                            <Controller
                                                name="campaignGoal"
                                                control={control}
                                                render={({ field }) => (
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <SelectTrigger className="h-12 bg-white/5 border-white/10 focus:ring-primary/50">
                                                            <SelectValue placeholder="Select goal" />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-card border-white/10">
                                                            <SelectItem value="conversions">Conversions / Sales</SelectItem>
                                                            <SelectItem value="traffic">Traffic / Clicks</SelectItem>
                                                            <SelectItem value="awareness">Awareness / Reach</SelectItem>
                                                            <SelectItem value="leads">Lead Generation</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-sm font-medium">Target Demographics</Label>
                                            <Input
                                                {...register("demographics")}
                                                className="h-12 bg-white/5 border-white/10 focus-visible:ring-primary/50"
                                                placeholder="e.g. 25-45, US, Female"
                                            />
                                        </div>
                                    </div>

                                    {/* Row 2 */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label className="text-sm font-medium">Headline</Label>
                                            <Input
                                                {...register("headline")}
                                                className="h-12 bg-white/5 border-white/10 focus-visible:ring-primary/50"
                                                placeholder="e.g. Stop wasting money on bad ads"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-sm font-medium">CTA (Call to Action)</Label>
                                            <Input
                                                {...register("cta")}
                                                className="h-12 bg-white/5 border-white/10 focus-visible:ring-primary/50"
                                                placeholder="e.g. Shop Now, Learn More, Get Started"
                                            />
                                        </div>
                                    </div>

                                    {/* Primary Text */}
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <Label className="text-sm font-medium">Primary Text / Ad Copy</Label>
                                            <span className="text-xs text-muted-foreground">{charCount} / 2000</span>
                                        </div>
                                        <Textarea
                                            {...register("primaryText")}
                                            className="min-h-[180px] bg-white/5 border-white/10 focus-visible:ring-primary/50 resize-none text-base leading-relaxed"
                                            placeholder="Paste your full ad caption or copy here. Include the hook, body text, and any other messaging..."
                                        />
                                    </div>

                                    {/* Row 3 */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label className="text-sm font-medium">Audience Interests</Label>
                                            <Input
                                                {...register("audienceInterests")}
                                                className="h-12 bg-white/5 border-white/10 focus-visible:ring-primary/50"
                                                placeholder="e.g. Yoga, SaaS owners, BBQ Enthusiasts"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-sm font-medium">Pain Points / Desires</Label>
                                            <Input
                                                {...register("painPoints")}
                                                className="h-12 bg-white/5 border-white/10 focus-visible:ring-primary/50"
                                                placeholder="e.g. Low ROAS, Lack of time, Want more leads"
                                            />
                                        </div>
                                    </div>

                                    {/* Creative Content */}
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <Label className="text-sm font-medium">Video Script or Image Details</Label>
                                            <Badge variant="secondary" className="bg-white/10 text-muted-foreground border-0 text-[10px] uppercase">Optional</Badge>
                                        </div>
                                        <Textarea
                                            {...register("creativeContent")}
                                            className="min-h-[120px] bg-white/5 border-white/10 focus-visible:ring-primary/50 resize-none"
                                            placeholder="Describe the visual elements, video script, or image details that accompany this ad..."
                                        />
                                    </div>

                                    {/* Submit */}
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        size="lg"
                                        className="w-full h-16 text-lg font-bold gap-3 glow-primary"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-6 h-6 animate-spin" />
                                                Analyzing Your Creative...
                                            </>
                                        ) : (
                                            <>
                                                <Wand2 className="w-6 h-6" />
                                                Generate Full Analysis
                                                <ChevronRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Sidebar - Takes 1 column */}
                    <motion.div variants={item} className="space-y-6">
                        {/* What You'll Get */}
                        <Card className="bg-card/50 border-white/5 backdrop-blur-sm">
                            <CardHeader className="p-6 pb-4">
                                <CardTitle className="text-lg font-display font-bold flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-primary" />
                                    What You'll Get
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="px-6 pb-6">
                                <div className="space-y-4">
                                    {analysisFeatures.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                                                <feature.icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{feature.label}</p>
                                                <p className="text-xs text-muted-foreground">{feature.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tips */}
                        <Card className="bg-gradient-to-br from-primary/10 via-card/50 to-card/50 border-primary/20">
                            <CardContent className="p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Sparkles className="w-5 h-5 text-primary" />
                                    <span className="font-semibold text-sm">Pro Tips</span>
                                </div>
                                <ul className="space-y-3 text-sm text-muted-foreground">
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        Include your full ad copy for the most accurate analysis
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        Specify pain points to get tailored optimization suggestions
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-primary mt-1">•</span>
                                        Add video scripts for complete hook analysis
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Usage */}
                        <Card className="bg-card/50 border-white/5">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm text-muted-foreground">Free analyses remaining</span>
                                    <Badge variant="secondary" className="bg-primary/20 text-primary border-0">1/3</Badge>
                                </div>
                                <div className="h-2 rounded-full bg-muted overflow-hidden">
                                    <div className="h-full w-1/3 bg-gradient-to-r from-primary to-accent rounded-full" />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
