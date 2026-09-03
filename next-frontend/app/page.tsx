import { AboutSection } from "@/components/marketing/AboutSection";
import { HeroSection } from "@/components/marketing/HeroSection";
import { HowItWorksSection } from "@/components/marketing/HowItWorksSection";
import { ServicesSection } from "@/components/marketing/ServicesSection";
import { TeamSection } from "@/components/marketing/TeamSection";
import { TestimonialsSection } from "@/components/marketing/TestimonialsSection";
export default function HomePage() {
  return <><HeroSection /><ServicesSection limit={8} /><HowItWorksSection /><TestimonialsSection /><TeamSection /><AboutSection /></>;
}
