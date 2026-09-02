import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import HeroSection from "@/components/sections/HeroSection";
import ExplodedLayersSection from "@/components/sections/ExplodedLayersSection";
import EnergyPulseSection from "@/components/sections/EnergyPulseSection";
import SpecsShowcaseSection from "@/components/sections/SpecsShowcaseSection";
import BrandHomepage from "@/components/sections/BrandHomepage";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#050507] text-white selection:bg-lime-400 selection:text-neutral-950 font-sans">
        {/* Subtle noise and scanline overlays */}
        <div className="noise-overlay" />
        
        {/* Top telemetry navigation */}
        <Navbar />

        {/* Main Pinned Film & Story Sections */}
        <main className="relative z-10 w-full">
          {/* Act 1: Hero Entry & 360 Turntable Frame-Scrubbing */}
          <HeroSection />

          {/* Act 2: Pinned GSAP Exploded Layers & Assembly */}
          <ExplodedLayersSection />

          {/* Act 3: Pinned GSAP Energy Pulse Laser Flow Through Sole */}
          <EnergyPulseSection />

          {/* Act 4: Laboratory Benchmark Specifications Matrix */}
          <SpecsShowcaseSection />

          {/* Act 5: The Full Brand Narrative (Manifesto, Wind Tunnel, Athlete Reviews, CTA) */}
          <BrandHomepage />
        </main>
      </div>
    </SmoothScroll>
  );
}
