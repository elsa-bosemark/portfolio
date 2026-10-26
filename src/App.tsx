import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CaseStudySafeBites from "./pages/CaseStudySafeBites";
import CaseStudyFocal from "./pages/CaseStudyFocal";
import CaseStudyCarta from "./pages/CaseStudyCarta";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import SiteFooter from "./components/SiteFooter";
import { DisplayPreferences } from "./components/DisplayPreferences";
import "./styles/Typography.css";
import "./styles/PaperFoundation.css";


const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/case-study/safebites" element={<CaseStudySafeBites />} />
        <Route path="/case-study/focal" element={<CaseStudyFocal />} />
        <Route path="/case-study/carta" element={<CaseStudyCarta />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <SiteFooter />
    </>
  );
};

const App = () => (
  <DisplayPreferences>
      <HashRouter>
        <Layout />
      </HashRouter>
  </DisplayPreferences>
);

export default App;
