import { GlassNav } from "@/components/landing/GlassNav";
import { Hero } from "@/components/landing/Hero";
import { StatsRibbon } from "@/components/landing/StatsRibbon";
import { ScrollStory } from "@/components/landing/ScrollStory";
import { DemoStrip } from "@/components/landing/DemoStrip";
import { BentoUseCases } from "@/components/landing/BentoUseCases";
import { DailyPromptTeaser } from "@/components/landing/DailyPromptTeaser";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="relative">
      <GlassNav />
      <Hero />
      <StatsRibbon />
      <ScrollStory />
      <DemoStrip />
      <BentoUseCases />
      <DailyPromptTeaser />
      <Footer />
    </main>
  );
}
