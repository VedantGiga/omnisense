import Hero from "@/components/Hero";
import AssemblyHero from "@/components/AssemblyHero";
import MetricsSection from "@/components/MetricsSection";
import ModelShowcase from "@/components/ModelShowcase";
import Specifications from "@/components/Specifications";
import ImageShowcase from "@/components/ImageShowcase";
import IntelligenceSection from "@/components/IntelligenceSection";
import SiteFooter from "@/components/SiteFooter";

export default function Home() {
  return (
    <main>
      <Hero />
      <AssemblyHero />
      <MetricsSection />
      <ModelShowcase />
      <ImageShowcase />
      <IntelligenceSection />
      <Specifications />
      <SiteFooter />
    </main>
  );
}
