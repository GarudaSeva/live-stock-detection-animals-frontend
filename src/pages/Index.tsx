import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Advantages from "@/components/Advantages";
import SupportedAnimals from "@/components/SupportedAnimals";
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <main>
      <HeroSection />
      <HowItWorks />
      <Advantages />
      <SupportedAnimals />
    </main>
    <Footer />
  </div>
);

export default Index;
