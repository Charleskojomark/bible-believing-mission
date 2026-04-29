import { HeroSection } from "@/components/home/HeroSection";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ServiceTimes } from "@/components/home/ServiceTimes";
import { QuickLinks } from "@/components/home/QuickLinks";
import { LatestSermons } from "@/components/home/LatestSermons";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { LiveServiceBanner } from "@/components/home/LiveServiceBanner";
import { CallToAction } from "@/components/home/CallToAction";
import { getDb } from "@/lib/db";

export default async function Home() {
  let topEvents: { flyer_url: string; title: string }[] = [];

  try {
    const db = await getDb();
    const { rows } = await db.execute(`
          SELECT title, flyer_url 
          FROM events 
          WHERE flyer_url != '' AND flyer_url IS NOT NULL 
          ORDER BY created_at DESC 
          LIMIT 3
      `);
    topEvents = rows as any;
  } catch (e) {
    console.error("Error fetching hero flyers:", e);
  }

  return (
    <div className="min-h-screen">
      <HeroSection dynamicEvents={topEvents} />
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
