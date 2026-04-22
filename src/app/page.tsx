import { HeroSection } from "@/components/home/HeroSection";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ServiceTimes } from "@/components/home/ServiceTimes";
import { QuickLinks } from "@/components/home/QuickLinks";
import { LatestSermons } from "@/components/home/LatestSermons";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { LiveServiceBanner } from "@/components/home/LiveServiceBanner";
import { CallToAction } from "@/components/home/CallToAction";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <AboutPreview />
      <ServiceTimes />
      <QuickLinks />
      <LatestSermons />
      <UpcomingEvents />
      <LiveServiceBanner />
      <CallToAction />
    </div>
  );
}
