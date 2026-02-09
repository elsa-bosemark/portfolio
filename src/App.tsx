import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CaseStudySafeBites from "./pages/CaseStudySafeBites";
import CaseStudyFocal from "./pages/CaseStudyFocal";
import CaseStudyCarta from "./pages/CaseStudyCarta";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/case-study/safebites" element={<CaseStudySafeBites />} />
          <Route path="/case-study/focal" element={<CaseStudyFocal />} />
          <Route path="/case-study/carta" element={<CaseStudyCarta />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
