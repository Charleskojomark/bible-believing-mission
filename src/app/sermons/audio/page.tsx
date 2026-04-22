import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SermonCard } from "@/components/shared/SermonCard";

export default function AudioSermonsPage() {
    const sermons = [
        {
            title: "Discovering Your Purpose",
            speaker: "Apostle Kingsley Innocent",
            date: "Oct 1, 2023",
            imageUrl: "https://images.pexels.com/photos/3675522/pexels-photo-3675522.jpeg?auto=compress&cs=tinysrgb&w=800",
            href: "/sermons/discovering-purpose",
            type: "audio" as const,
        },
        {
            title: "Financial Dominion",
            speaker: "Apostle Kingsley Innocent",
            date: "Sep 10, 2023",
            imageUrl: "https://images.pexels.com/photos/1309240/pexels-photo-1309240.jpeg?auto=compress&cs=tinysrgb&w=800",
            href: "/sermons/financial-dominion",
            type: "audio" as const,
        }
    ];

    return (
        <main className="pt-24 min-h-screen bg-gray-50">
            <div className="bg-dark text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-0"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">Audio Messages</h1>
                    <p className="text-xl text-gray-300 max-w-2xl font-light">
                        Listen on the go to podcasts and audio teachings.
                    </p>
                </div>
            </div>

            <SectionWrapper>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sermons.map((sermon, index) => (
                        <SermonCard key={index} {...sermon} />
                    ))}
                </div>
            </SectionWrapper>
        </main>
    );
}
