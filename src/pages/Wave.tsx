import WaveHero from "@/components/WaveHero";
import CaseStudies from "@/components/CaseStudies";
import Footer from "@/components/Footer";

const WavePage = () => {
  return (
    <main className="min-h-screen bg-background">
      <WaveHero />
      <CaseStudies />
      <Footer />
    </main>
  );
};

export default WavePage;
