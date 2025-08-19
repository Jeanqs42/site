import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import PricingSection from "@/components/PricingSection";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <BenefitsSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;