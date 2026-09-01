import AboutSection from "@/components/modules/aboutpage/AboutPage";
import HeroSection from "@/components/modules/homepage/HeroSection";import HowItWorksSection from "@/components/modules/homepage/HowItWorksSection";
import ServicesPage from "@/components/modules/homepage/ServicePage";
import TeamSection from "@/components/modules/homepage/TeamSection";
import TestimonialsSection from "@/components/modules/homepage/TestimonialsSection";

export default function Homepage() {
  return (
    <div>
      <HeroSection />
      <ServicesPage />
      <HowItWorksSection />
      <TestimonialsSection />
      <TeamSection  />
      <AboutSection />
    </div> 
  );
}
