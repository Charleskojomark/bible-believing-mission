import React from "react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { EventCard } from "../shared/EventCard";
import { Button } from "../ui/Button";
import { getDb } from "@/lib/db";

interface EventRow {
    id: number;
    title: string;
    date: string;
    time: string | null;
    location: string | null;
    flyer_url: string | null;
}

export const UpcomingEvents = async () => {
    let upcomingEvents: EventRow[] = [];

    try {
        const db = await getDb();
        const { rows } = await db.execute(`SELECT * FROM events ORDER BY created_at DESC LIMIT 3`);
        upcomingEvents = rows as unknown as EventRow[];
    } catch (e) {
        console.error("Error fetching events:", e);
    }

    return (
        <SectionWrapper bgWhite>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-4 lg:sticky lg:top-24">
                    <div className="mb-4 inline-flex items-center gap-2">
                        <span className="w-8 h-[2px] bg-primary"></span>
                        <span className="text-primary font-bold tracking-wider uppercase text-sm">
                            Our Schedule
                        </span>
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-dark mb-6">
                        Upcoming <br /> Events
                    </h2>
                    <p className="text-gray-600 mb-8 text-lg">
                        Join us for power-packed services, conferences, and community gatherings designed to strengthen your faith and fellowship.
                    </p>
                    <Button href="/events" variant="outline" className="w-full sm:w-auto">
                        See All Events
                    </Button>
                </div>

                <div className="lg:col-span-8 flex flex-col gap-6">
                    {upcomingEvents.map((event, index) => (
                        <EventCard
                            key={index}
                            title={event.title}
                            date={event.date}
                            time={event.time || ""}
                            location={event.location || ""}
                            imageUrl={event.flyer_url || "/placeholder.png"}
                            href={`/events`}
                        />
                    ))}
                    {upcomingEvents.length === 0 && (
                        <p className="text-gray-500 py-10">No upcoming events are scheduled at the moment.</p>
                    )}
                </div>
            </div>
        </SectionWrapper>
    );
};
