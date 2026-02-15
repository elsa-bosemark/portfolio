import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import CaseStudySafeBites from "./pages/CaseStudySafeBites";
import CaseStudyFocal from "./pages/CaseStudyFocal";
import CaseStudyCarta from "./pages/CaseStudyCarta";
import IntuitDeck from "./pages/IntuitDeck";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";

const queryClient = new QueryClient();

const Layout = () => {
  const { pathname } = useLocation();
  const hideNav = pathname === "/intuit";
  return (
    <>
      <ScrollToTop />
      {!hideNav && <Navbar />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/case-study/safebites" element={<CaseStudySafeBites />} />
        <Route path="/case-study/focal" element={<CaseStudyFocal />} />
        <Route path="/case-study/carta" element={<CaseStudyCarta />} />
        <Route path="/intuit" element={<IntuitDeck />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Layout />
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
