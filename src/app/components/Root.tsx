import { Outlet } from "react-router";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { ScrollProgress } from "./ScrollProgress";
import { SocialSidebar } from "./SocialSidebar";
import { Toaster } from "./ui/sonner";

export function Root() {
  return (
    <div className="min-h-screen bg-background text-foreground dark">
      <ScrollProgress />
      <Navigation />
      <SocialSidebar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}