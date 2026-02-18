"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    PlusCircle,
    History,
    Settings,
    Flame,
    Sparkles,
    CreditCard,
    HelpCircle,
    ChevronRight,
    Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";

const mainRoutes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
    },
    {
        label: "Analyze New",
        icon: PlusCircle,
        href: "/analyze",
        accent: true,
    },
    {
        label: "History",
        icon: History,
        href: "/history",
    },
];

const secondaryRoutes = [
    {
        label: "Pro Features",
        icon: Sparkles,
        href: "/pro",
        badge: "PRO",
    },
    {
        label: "Billing",
        icon: CreditCard,
        href: "/pricing",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
    },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col h-full bg-sidebar relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-dense opacity-20" />
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary/10 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-accent/5 to-transparent" />

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full">
                {/* Logo */}
                <Link href="/dashboard" className="flex items-center gap-3 px-6 py-6 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/50 blur-lg rounded-full group-hover:bg-primary/70 transition-all scale-150" />
                        <Flame className="relative w-8 h-8 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-xl font-display font-bold tracking-tight text-foreground">
                            AdClarity<span className="text-primary">.</span>
                        </h1>
                        <p className="text-[10px] text-muted-foreground tracking-widest uppercase">Creative AI</p>
                    </div>
                </Link>

                {/* Main Navigation */}
                <div className="flex-1 px-3 py-4 space-y-6">
                    <nav className="space-y-1">
                        {mainRoutes.map((route) => {
                            const isActive = pathname === route.href;
                            return (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    className="block"
                                >
                                    <motion.div
                                        whileHover={{ x: 4 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={cn(
                                            "relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group",
                                            isActive
                                                ? "bg-primary/10 text-foreground"
                                                : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                                            route.accent && !isActive && "text-primary hover:text-primary"
                                        )}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="sidebar-active"
                                                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-full"
                                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                            />
                                        )}
                                        <route.icon className={cn(
                                            "w-5 h-5 transition-colors",
                                            isActive ? "text-primary" : route.accent ? "text-primary" : ""
                                        )} />
                                        <span className="flex-1">{route.label}</span>
                                        {route.accent && (
                                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        )}
                                        {isActive && (
                                            <ChevronRight className="w-4 h-4 text-primary" />
                                        )}
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Divider */}
                    <div className="px-4">
                        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                    </div>

                    {/* Secondary Navigation */}
                    <nav className="space-y-1">
                        <p className="px-4 mb-2 text-[10px] font-semibold text-muted-foreground tracking-widest uppercase">
                            Account
                        </p>
                        {secondaryRoutes.map((route) => {
                            const isActive = pathname === route.href;
                            return (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    className="block"
                                >
                                    <motion.div
                                        whileHover={{ x: 4 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={cn(
                                            "relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                                            isActive
                                                ? "bg-white/5 text-foreground"
                                                : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                        )}
                                    >
                                        <route.icon className="w-4 h-4" />
                                        <span className="flex-1">{route.label}</span>
                                        {route.badge && (
                                            <Badge
                                                variant="secondary"
                                                className="bg-primary/20 text-primary border-0 text-[9px] px-1.5 py-0 font-bold"
                                            >
                                                {route.badge}
                                            </Badge>
                                        )}
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Usage Card */}
                <div className="px-3 pb-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/10">
                        <div className="flex items-center gap-2 mb-3">
                            <Zap className="w-4 h-4 text-primary" />
                            <span className="text-xs font-semibold text-foreground">Free Plan</span>
                        </div>
                        <div className="mb-2">
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-muted-foreground">Analyses Used</span>
                                <span className="font-medium">2/3</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                                <div className="h-full w-2/3 bg-gradient-to-r from-primary to-accent rounded-full" />
                            </div>
                        </div>
                        <Link href="/pricing">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full mt-2 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary text-xs font-bold transition-colors"
                            >
                                Upgrade to Pro
                            </motion.button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
