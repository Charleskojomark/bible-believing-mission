import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SermonCard } from "@/components/shared/SermonCard";

export default function VideoSermonsPage() {
    const sermons = [
        {
            title: "The Power of Faith in Troubled Times",
            speaker: "Apostle Kingsley Innocent",
            date: "Oct 15, 2023",
            imageUrl: "https://images.pexels.com/photos/2351719/pexels-photo-2351719.jpeg?auto=compress&cs=tinysrgb&w=800",
            href: "/sermons/power-of-faith",
            type: "video" as const,
        },
        {
            title: "Walking in Divine Promises",
            speaker: "Apostle Kingsley Innocent",
            date: "Oct 8, 2023",
            imageUrl: "https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800",
            href: "/sermons/divine-promises",
            type: "video" as const,
        },
        {
            title: "The Holy Spirit Our Helper",
            speaker: "Apostle Kingsley Innocent",
            date: "Sep 24, 2023",
            imageUrl: "https://images.pexels.com/photos/4427821/pexels-photo-4427821.jpeg?auto=compress&cs=tinysrgb&w=800",
            href: "/sermons/holy-spirit-helper",
            type: "video" as const,
        },
        {
            title: "Breaking Generational Curses",
            speaker: "Apostle Kingsley Innocent",
            date: "Sep 17, 2023",
            imageUrl: "https://images.pexels.com/photos/1309240/pexels-photo-1309240.jpeg?auto=compress&cs=tinysrgb&w=800",
            href: "/sermons/breaking-curses",
            type: "video" as const,
        }
    ];

    return (
        <main className="pt-24 min-h-screen bg-gray-50">
            <div className="bg-dark text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-0"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">Video Messages</h1>
                    <p className="text-xl text-gray-300 max-w-2xl font-light">
                        Watch recent teachings and services.
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
