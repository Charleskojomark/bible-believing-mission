import React from "react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { EventCard } from "../shared/EventCard";
import { Button } from "../ui/Button";
import { client } from "@/sanity/lib/client";
import { getUpcomingEventsQuery } from "@/sanity/lib/queries";

interface EventItem {
    title: string;
    date?: string;
    time?: string;
    location?: string;
    imageUrl?: string;
    href?: string;
}

const FALLBACK_EVENTS: EventItem[] = [
    {
        title: "Anointing Service",
        date: "OCT 22",
        time: "9:00 AM - 12:00 PM",
        location: "Main Auditorium, Bible Believing Mission",
        imageUrl: "/placeholder.png",
        href: "/events",
    },
    {
        title: "Word & Prayer Conference",
        date: "NOV 05",
        time: "5:00 PM Daily",
        location: "Main Auditorium, Bible Believing Mission",
        imageUrl: "/placeholder.png",
        href: "/events",
    },
    {
        title: "Youth Encounter Night",
        date: "NOV 18",
        time: "6:00 PM - 9:00 PM",
        location: "Youth Hall, Bible Believing Mission",
        imageUrl: "/placeholder.png",
        href: "/events",
    },
];

export const UpcomingEvents = async () => {
    let upcomingEvents: EventItem[] = [];

    try {
        if (client) {
            const data = await client.fetch(getUpcomingEventsQuery);
            if (data && data.length > 0) upcomingEvents = data;
            else upcomingEvents = FALLBACK_EVENTS;
        } else {
            upcomingEvents = FALLBACK_EVENTS;
        }
    } catch {
        upcomingEvents = FALLBACK_EVENTS;
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
                    {upcomingEvents.map((event: EventItem, index: number) => (
                        <EventCard
                            key={index}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            location={event.location}
                            imageUrl={event.imageUrl || "/placeholder.png"}
                            href={event.href || "/events"}
                        />
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};
