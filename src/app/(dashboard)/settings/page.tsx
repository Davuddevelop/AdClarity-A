"use client";

import { UserProfile } from "@clerk/nextjs";
import { Bell, CreditCard, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function SettingsPage() {
    return (
        <div className="min-h-screen p-8 lg:p-12 xl:p-16">
            <div className="max-w-[1000px] mx-auto space-y-8">
                {/* Header */}
                <div>
                    <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary gap-1.5 mb-4">
                        <Zap className="w-3 h-3" />
                        Settings
                    </Badge>
                    <h1 className="text-4xl font-display font-bold mb-2">
                        Account Settings<span className="text-primary">.</span>
                    </h1>
                    <p className="text-muted-foreground">Manage your account, billing, and preferences.</p>
                </div>

                <Tabs defaultValue="profile" className="space-y-6">
                    <TabsList className="bg-card/50 border border-white/10 p-1.5 rounded-xl">
                        <TabsTrigger
                            value="profile"
                            className="rounded-lg px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                            Profile
                        </TabsTrigger>
                        <TabsTrigger
                            value="billing"
                            className="rounded-lg px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                            Billing
                        </TabsTrigger>
                        <TabsTrigger
                            value="notifications"
                            className="rounded-lg px-6 py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                        >
                            Notifications
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" className="space-y-6 outline-none">
                        <Card className="bg-card/50 border-white/5 backdrop-blur-sm overflow-hidden">
                            <CardHeader>
                                <CardTitle className="font-display">Public Profile</CardTitle>
                                <CardDescription>How others see you on the platform.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <UserProfile
                                    appearance={{
                                        elements: {
                                            rootBox: "w-full",
                                            card: "bg-transparent border-0 shadow-none w-full",
                                            navbar: "hidden",
                                            pageScrollBox: "p-0",
                                            headerTitle: "hidden",
                                            headerSubtitle: "hidden",
                                            profileSectionTitleText: "text-foreground font-bold",
                                            userPreviewMainIdentifier: "text-foreground",
                                            userPreviewSecondaryIdentifier: "text-muted-foreground",
                                            formButtonPrimary: "bg-primary hover:bg-primary/90",
                                            formFieldInput: "bg-white/5 border-white/10 text-foreground",
                                            formFieldLabel: "text-muted-foreground"
                                        }
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="billing" className="space-y-6 outline-none">
                        <Card className="bg-card/50 border-white/5 backdrop-blur-sm">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <CreditCard className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="font-display">Subscription Plan</CardTitle>
                                        <CardDescription>Manage your current plan and payment methods.</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/5 border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-xl font-display font-bold">Free Tier</h3>
                                            <Badge variant="secondary" className="bg-white/10 border-0">Current</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">Basic analysis and 3 monthly credits.</p>
                                    </div>
                                    <Link href="/pricing">
                                        <Button className="font-bold">
                                            Upgrade to Pro
                                        </Button>
                                    </Link>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="font-semibold">Usage This Month</h4>
                                    <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                                        <span className="text-muted-foreground">Analyses Used</span>
                                        <span className="font-bold">0 / 3</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="notifications" className="space-y-6 outline-none">
                        <Card className="bg-card/50 border-white/5 backdrop-blur-sm">
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Bell className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="font-display">Notification Preferences</CardTitle>
                                        <CardDescription>Control how you receive updates and alerts.</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="py-16 text-center">
                                <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                                    <Bell className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <p className="text-muted-foreground mb-4">Notification settings are available on Pro plans.</p>
                                <Link href="/pricing">
                                    <Button variant="outline" className="border-white/10">
                                        View Pro Features
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
