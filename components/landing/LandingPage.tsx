import { LandingNavbar } from "./LandingNavbar";
import { Hero } from "./Hero";
import { HowItWorks } from "./HowItWorks";
import { Features } from "./Features";
import { RecipeIntelligence } from "./RecipeIntelligence";
import { FinalCta } from "./FinalCta";
import { LandingFooter } from "./LandingFooter";

export function LandingPage() {
  return (
    <div className="landing-shell page-atmosphere relative min-h-screen">
      <div className="relative z-10">
        <LandingNavbar />
        <main>
          <Hero />
          <HowItWorks />
          <Features />
          <RecipeIntelligence />
          <FinalCta />
        </main>
        <LandingFooter />
      </div>
    </div>
  );
}
