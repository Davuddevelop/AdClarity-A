import { Sidebar } from "@/components/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen relative bg-background">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-grid opacity-20 pointer-events-none" />
            <div className="fixed top-0 right-0 w-[800px] h-[600px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 left-1/3 w-[600px] h-[400px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Sidebar */}
            <aside className="hidden lg:flex lg:w-80 lg:flex-col fixed inset-y-0 left-0 z-50 border-r border-white/5">
                <Sidebar />
            </aside>

            {/* Main Content */}
            <main className="lg:pl-80 min-h-screen relative z-10">
                <div className="h-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
