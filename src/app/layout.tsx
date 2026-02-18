import { ClerkProvider } from "@clerk/nextjs";
import { Providers } from "@/components/providers";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Syne, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "AdClarity AI | Creative Analysis & Optimization",
  description: "AI-powered ad creative scoring and optimization for performance marketers.",
  keywords: ["AI", "advertising", "creative analysis", "ad optimization", "marketing"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark" style={{ colorScheme: "dark" }} suppressHydrationWarning>
        <body
          className={`${syne.variable} ${outfit.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
        >
          <Providers>
            <TooltipProvider delayDuration={0}>
              {children}
            </TooltipProvider>
            <Toaster richColors position="top-right" />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
