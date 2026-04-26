import Hero from "@/components/Hero";
import AssemblyHero from "@/components/AssemblyHero";
import ModelShowcase from "@/components/ModelShowcase";
import Capabilities from "@/components/Capabilities";
import Specifications from "@/components/Specifications";
import ImageShowcase from "@/components/ImageShowcase";
import IntelligenceSection from "@/components/IntelligenceSection";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <main>
      <Hero />
      <AssemblyHero />
      <ModelShowcase />
      <Capabilities />
      <ImageShowcase />
      <IntelligenceSection />
      <Specifications />
      <SiteFooter />
    </main>
  );
}
