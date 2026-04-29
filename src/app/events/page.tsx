import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { EventCard } from "@/components/shared/EventCard";
import { getDb } from "@/lib/db";

interface EventRow {
    id: number;
    title: string;
    date: string;
    location: string | null;
    flyer_url: string | null;
}

export default async function EventsPage() {
    let events: EventRow[] = [];

    try {
        const db = await getDb();
        const { rows } = await db.execute(`SELECT * FROM events ORDER BY created_at DESC`);
        events = rows as unknown as EventRow[];
    } catch (e) {
        console.error("Error fetching events:", e);
    }

    return (
        <main className="pt-24 min-h-screen bg-gray-50">
            <div className="bg-dark text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-0"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">Upcoming Events</h1>
                    <p className="text-xl text-gray-300 max-w-2xl font-light">
                        Stay plugged into our community by joining us at our next events.
                    </p>
                </div>
            </div>

            <SectionWrapper>
                <div className="max-w-4xl mx-auto flex flex-col gap-6">
                    {events.map((event, index) => (
                        <EventCard
                            key={index}
                            title={event.title}
                            date={event.date}
                            time=""
                            location={event.location || ""}
                            imageUrl={event.flyer_url || "/placeholder.png"}
                            href="#"
                        />
                    ))}
                    {events.length === 0 && (
                        <p className="text-gray-500 py-10">No upcoming events are scheduled at the moment.</p>
                    )}
                </div>
            </SectionWrapper>
        </main>
    );
}
