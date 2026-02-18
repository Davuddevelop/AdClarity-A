import { SignUp } from "@clerk/nextjs";
import { Zap } from "lucide-react";

export default function SignUpPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background bg-grid relative overflow-hidden p-6">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] -z-10" />

            <div className="mb-8 flex items-center gap-3 animate-fade-in">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/50 blur-lg rounded-full scale-150" />
                    <Zap className="relative w-10 h-10 text-primary fill-primary/20" />
                </div>
                <h1 className="text-3xl font-display font-black tracking-tight text-white">
                    AdClarity<span className="text-primary text-4xl">.</span>
                </h1>
            </div>

            <div className="relative z-10 glass p-1 rounded-2xl shadow-2xl">
                <SignUp
                    appearance={{
                        elements: {
                            formButtonPrimary: "bg-primary hover:bg-primary/90 text-sm normal-case",
                            card: "bg-card border-white/5",
                            headerTitle: "text-white",
                            headerSubtitle: "text-muted-foreground",
                            socialButtonsBlockButton: "bg-white/5 border-white/10 text-white hover:bg-white/10",
                            socialButtonsBlockButtonText: "text-white font-medium",
                            dividerLine: "bg-white/10",
                            dividerText: "text-muted-foreground",
                            formFieldLabel: "text-zinc-400",
                            formFieldInput: "bg-white/5 border-white/10 text-white focus:ring-primary",
                            footerActionText: "text-muted-foreground",
                            footerActionLink: "text-primary hover:text-primary/80",
                            identityPreviewText: "text-white",
                            identityPreviewEditButtonIcon: "text-primary"
                        }
                    }}
                />
            </div>

            <p className="mt-8 text-zinc-500 text-xs tracking-widest uppercase font-medium">
                Elevate Your Ad Performance
            </p>
        </div>
    );
}
