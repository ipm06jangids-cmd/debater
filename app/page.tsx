import { GlassNav } from "@/components/landing/GlassNav";
import { Hero } from "@/components/landing/Hero";
import { StatsRibbon } from "@/components/landing/StatsRibbon";
import { Manifesto } from "@/components/landing/Manifesto";
import { ScrollStory } from "@/components/landing/ScrollStory";
import { FightersGrid } from "@/components/landing/FightersGrid";
import { DemoStrip } from "@/components/landing/DemoStrip";
import { BentoUseCases } from "@/components/landing/BentoUseCases";
import { FAQ } from "@/components/landing/FAQ";
import { DailyPromptTeaser } from "@/components/landing/DailyPromptTeaser";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="relative">
      <GlassNav />
      <Hero />
      <StatsRibbon />
      <Manifesto />
      <ScrollStory />
      <FightersGrid />
      <DemoStrip />
      <BentoUseCases />
      <FAQ />
      <DailyPromptTeaser />
      <Footer />
    </main>
  );
}
