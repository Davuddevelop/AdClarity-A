"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Flame,
  Target,
  Brain,
  Sparkles,
  Play,
  ChevronRight,
  Zap,
  BarChart3,
  Users,
  TrendingUp
} from "lucide-react";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const features = [
  {
    icon: Target,
    title: "Hook Analysis",
    description: "AI breaks down your opening line with precision scoring. Know instantly if your hook will stop the scroll.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Brain,
    title: "Psychology Engine",
    description: "Detect fear, greed, status, and urgency triggers in real-time. Understand what makes your audience act.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Sparkles,
    title: "Auto-Rewrite",
    description: "One click generates fully optimized copy. Ready to deploy with proven conversion patterns built in.",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    icon: BarChart3,
    title: "Performance Prediction",
    description: "AI-powered scoring predicts conversion potential before you spend a single dollar on ads.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
  },
];

const stats = [
  { value: "10x", label: "Faster Analysis", icon: Zap },
  { value: "847", label: "Agencies Trust Us", icon: Users },
  { value: "2.4M", label: "Ads Optimized", icon: TrendingUp },
];

const testimonials = [
  {
    quote: "Replaced my entire creative review process. The psychology breakdown alone is worth 10x the price.",
    author: "Sarah Chen",
    role: "Growth Lead, ScaleX",
    avatar: "SC"
  },
  {
    quote: "We went from 3 winning ads per month to 12. The AI actually understands what converts.",
    author: "Marcus Webb",
    role: "Founder, AdFlow Agency",
    avatar: "MW"
  },
  {
    quote: "Finally, a tool that thinks like a senior media buyer. Our ROAS improved 40% in the first month.",
    author: "Elena Rodriguez",
    role: "Performance Director, GrowthLab",
    avatar: "ER"
  },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 mesh-gradient-hero opacity-60" />
      <div className="fixed inset-0 bg-grid opacity-30" />
      <div className="fixed inset-0 noise" />

      {/* Floating Orbs */}
      <motion.div
        className="fixed top-20 left-[10%] w-[500px] h-[500px] rounded-full bg-primary/15 blur-[150px]"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed bottom-20 right-[10%] w-[600px] h-[600px] rounded-full bg-accent/10 blur-[180px]"
        animate={{ y: [0, -40, 0], x: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-primary/5 blur-[200px]"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Header */}
      <header className="relative z-50 px-8 lg:px-16 xl:px-24 h-24 flex items-center justify-between border-b border-white/5 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/50 blur-xl rounded-full group-hover:bg-primary/70 transition-all" />
            <Flame className="relative w-9 h-9 text-primary" />
          </div>
          <span className="text-2xl lg:text-3xl font-display font-bold tracking-tight">
            AdClarity<span className="text-primary">.</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-2">
          <Link href="/pricing" className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link href="/dashboard" className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <div className="w-px h-8 bg-border mx-3" />
          <Link href="/sign-in" className="px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Sign In
          </Link>
          <Link href="/dashboard">
            <Button size="lg" className="h-12 px-6 gap-2 font-bold">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </nav>
      </header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-32 lg:py-40 xl:py-48 px-8 lg:px-16 xl:px-24">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-[1800px] mx-auto"
          >
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 xl:gap-24 items-center">
              {/* Left Content */}
              <div className="space-y-10">
                <motion.div variants={item}>
                  <Badge
                    variant="outline"
                    className="px-5 py-2 border-primary/30 bg-primary/5 text-primary font-medium gap-2 text-sm"
                  >
                    <Zap className="w-4 h-4" />
                    AI-Powered Creative Intelligence
                  </Badge>
                </motion.div>

                <motion.h1
                  variants={item}
                  className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold tracking-tight leading-[1.05]"
                >
                  Stop Guessing.
                  <br />
                  <span className="text-gradient-primary">Start Converting.</span>
                </motion.h1>

                <motion.p
                  variants={item}
                  className="text-xl lg:text-2xl text-muted-foreground max-w-xl leading-relaxed"
                >
                  AdClarity AI analyzes your creatives with the precision of a senior media buyer.
                  Score hooks, decode psychology, and optimize in seconds.
                </motion.p>

                <motion.div
                  variants={item}
                  className="flex flex-col sm:flex-row items-start gap-4"
                >
                  <Link href="/analyze">
                    <Button size="lg" className="h-16 px-10 text-lg font-bold gap-3 glow-primary">
                      Analyze Your First Ad
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-16 px-10 text-lg font-medium gap-3 border-white/10 hover:bg-white/5"
                  >
                    <Play className="w-5 h-5" />
                    Watch Demo
                  </Button>
                </motion.div>

                {/* Stats Row */}
                <motion.div
                  variants={item}
                  className="flex items-center gap-12 pt-8 flex-wrap"
                >
                  {stats.map((stat) => (
                    <div key={stat.label} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-3xl font-display font-bold text-gradient-primary">
                          {stat.value}
                        </div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right - Hero Visual */}
              <motion.div
                variants={item}
                className="relative hidden xl:block"
              >
                <div className="relative aspect-square max-w-[580px] mx-auto">
                  {/* Decorative rings */}
                  <div className="absolute inset-0 rounded-full border border-white/5 animate-pulse" />
                  <div className="absolute inset-6 rounded-full border border-white/5" />
                  <div className="absolute inset-12 rounded-full border border-primary/20" />
                  <div className="absolute inset-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 backdrop-blur-sm" />

                  {/* Center content */}
                  <div className="absolute inset-28 rounded-full bg-card/80 border border-white/10 flex items-center justify-center backdrop-blur-xl">
                    <div className="text-center">
                      <div className="text-8xl lg:text-9xl font-display font-extrabold text-gradient-primary mb-1">92</div>
                      <div className="text-base text-muted-foreground font-medium">Hook Score</div>
                    </div>
                  </div>

                  {/* Floating badges */}
                  <motion.div
                    className="absolute top-16 right-8 px-3 py-1.5 rounded-lg bg-card/80 border border-white/10 backdrop-blur-sm"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="text-xs font-medium">Strong Hook</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute bottom-20 left-6 px-3 py-1.5 rounded-lg bg-card/80 border border-white/10 backdrop-blur-sm"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <div className="flex items-center gap-1.5">
                      <Brain className="w-3 h-3 text-accent" />
                      <span className="text-xs font-medium">Fear + Urgency</span>
                    </div>
                  </motion.div>

                  <motion.div
                    className="absolute top-1/2 -right-2 px-3 py-1.5 rounded-lg bg-primary/20 border border-primary/30 backdrop-blur-sm"
                    animate={{ x: [0, 8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                  >
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-3 h-3 text-primary" />
                      <span className="text-xs font-medium text-primary">+34% Lift</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="relative py-32 lg:py-40 px-8 lg:px-16 xl:px-24">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/30 to-transparent" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative max-w-[1800px] mx-auto"
          >
            <div className="text-center mb-20">
              <Badge variant="outline" className="border-accent/30 bg-accent/5 text-accent gap-1.5 mb-6">
                <Sparkles className="w-3 h-3" />
                Features
              </Badge>
              <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6">
                The Full Creative <span className="text-gradient-accent">Arsenal</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to transform underperforming ads into conversion machines.
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative p-10 rounded-3xl border border-white/5 bg-card/50 backdrop-blur-sm hover:border-primary/20 transition-all h-full">
                    <div className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-8`}>
                      <feature.icon className={`w-8 h-8 ${feature.color}`} />
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* How It Works */}
        <section className="relative py-32 lg:py-40 px-8 lg:px-16 xl:px-24 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-[1800px] mx-auto"
          >
            <div className="text-center mb-20">
              <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary gap-1.5 mb-6">
                <Zap className="w-3 h-3" />
                How It Works
              </Badge>
              <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6">
                Three Steps to <span className="text-gradient-primary">10x Performance</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-12 relative">
              {/* Connection Line */}
              <div className="hidden md:block absolute top-20 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

              {[
                { step: "01", title: "Paste Your Copy", desc: "Drop in your headline, body text, or full ad script. Works with any platform or format." },
                { step: "02", title: "AI Deep Analysis", desc: "Our engine scores hooks, decodes psychology, and identifies conversion potential in seconds." },
                { step: "03", title: "Deploy & Scale", desc: "Use the optimized version directly or A/B test variations. Watch your metrics improve." },
              ].map((item, i) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="text-center relative"
                >
                  <div className="w-20 h-20 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center mx-auto mb-8 relative z-10">
                    <span className="text-3xl font-display font-bold text-primary">{item.step}</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-4">{item.title}</h3>
                  <p className="text-lg text-muted-foreground max-w-sm mx-auto">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Testimonials */}
        <section className="relative py-32 lg:py-40 px-8 lg:px-16 xl:px-24">
          <div className="absolute inset-0 mesh-gradient-2 opacity-40" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative max-w-[1800px] mx-auto"
          >
            <div className="text-center mb-20">
              <Badge variant="outline" className="border-accent/30 bg-accent/5 text-accent gap-1.5 mb-6">
                <Users className="w-3 h-3" />
                Testimonials
              </Badge>
              <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6">
                Trusted by <span className="text-gradient-accent">Growth Teams</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.author}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="p-10 rounded-3xl border border-white/5 bg-card/30 backdrop-blur-sm relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary to-accent" />
                  <p className="text-lg text-foreground/90 leading-relaxed mb-8 italic">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary text-lg">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-lg">{t.author}</div>
                      <div className="text-sm text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="relative py-32 lg:py-40 px-8 lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-[1200px] mx-auto text-center relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 blur-3xl opacity-30 rounded-full" />
            <div className="relative p-16 lg:p-24 rounded-[2rem] border border-white/10 bg-card/50 backdrop-blur-xl">
              <h2 className="text-4xl lg:text-6xl font-display font-bold mb-8">
                Ready to 10x Your <span className="text-gradient-primary">Ad Performance</span>?
              </h2>
              <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                Join 800+ agencies and growth teams already scaling with AdClarity AI. Start your free analysis today.
              </p>
              <Link href="/analyze">
                <Button size="lg" className="h-16 px-12 text-lg font-bold gap-3 glow-primary">
                  Start Free Analysis
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground mt-6">No credit card required • 3 free analyses included</p>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-16 px-8 lg:px-16 xl:px-24">
        <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <Flame className="w-7 h-7 text-primary" />
            <span className="text-xl font-display font-bold">AdClarity AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 AdClarity AI. Built for performance marketers.
          </p>
          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Security</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
