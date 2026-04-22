import { HeroSection } from "@/components/home/HeroSection";
import { WelcomeSection } from "@/components/home/WelcomeSection";
import { LatestSermons } from "@/components/home/LatestSermons";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { LiveServiceBanner } from "@/components/home/LiveServiceBanner";
import { CallToAction } from "@/components/home/CallToAction";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <WelcomeSection />
      <LatestSermons />
      <UpcomingEvents />
      <LiveServiceBanner />
      <CallToAction />
    </div>
  );
}
