import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { EventCard } from "@/components/shared/EventCard";

export default function EventsPage() {
    const events = [
        {
            title: "Anointing Service",
            date: "OCT 22",
            time: "9:00 AM - 12:00 PM",
            location: "Main Auditorium, Bible Believing Mission",
            imageUrl: "https://images.pexels.com/photos/2351719/pexels-photo-2351719.jpeg?auto=compress&cs=tinysrgb&w=800",
            href: "/events/anointing-service",
        },
        {
            title: "Word & Prayer Conference",
            date: "NOV 05",
            time: "5:00 PM Daily",
            location: "Main Auditorium, Bible Believing Mission",
            imageUrl: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800",
            href: "/events/word-prayer-conference",
        },
        {
            title: "Youth Encounter Night",
            date: "NOV 18",
            time: "6:00 PM - 9:00 PM",
            location: "Youth Hall, Bible Believing Mission",
            imageUrl: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800",
            href: "/events/youth-encounter",
        },
    ];

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
                        <EventCard key={index} {...event} />
                    ))}
                </div>
            </SectionWrapper>
        </main>
    );
}
