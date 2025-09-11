import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import CtaSection from "@/components/sections/CtaSection";
import FaqSection from "@/components/sections/FaqSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HeroSection from "@/components/sections/HeroSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import LiveTradingSection from "@/components/sections/LiveTradingSection";
import PartnersSection from "@/components/sections/PartnersSection";
import StatsSection from "@/components/sections/StatsSection";
import StockTicker from "@/components/sections/StockTicker";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <StockTicker />
      <main>
        <HeroSection />
        <PartnersSection />
        <FeaturesSection />
        <HowItWorksSection />
        <LiveTradingSection />
        <StatsSection />
        <TestimonialsSection />
        {/* <FaqSection /> */}
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
