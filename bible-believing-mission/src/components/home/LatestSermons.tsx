import React from "react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { SermonCard } from "../shared/SermonCard";
import { Button } from "../ui/Button";
import { client } from "@/sanity/lib/client";
import { getLatestSermonsQuery } from "@/sanity/lib/queries";

interface SermonItem {
    title: string;
    speaker?: string;
    date?: string;
    type?: 'video' | 'audio';
    videoUrl?: string;
    imageUrl?: string;
    href?: string;
}

const FALLBACK_SERMONS: SermonItem[] = [
    {
        title: "The Power of Faith in Troubled Times",
        speaker: "Apostle Kingsley Innocent",
        date: "Oct 15, 2023",
        imageUrl: "/placeholder.png",
        href: "/sermons",
        type: "video" as const,
    },
    {
        title: "Walking in Divine Promises",
        speaker: "Apostle Kingsley Innocent",
        date: "Oct 8, 2023",
        imageUrl: "/placeholder.png",
        href: "/sermons",
        type: "video" as const,
    },
    {
        title: "Discovering Your Purpose",
        speaker: "Apostle Kingsley Innocent",
        date: "Oct 1, 2023",
        imageUrl: "/placeholder.png",
        href: "/sermons",
        type: "audio" as const,
    },
];

export const LatestSermons = async () => {
    let latestSermons: SermonItem[] = [];

    try {
        if (client) {
            const data = await client.fetch(getLatestSermonsQuery);
            if (data && data.length > 0) latestSermons = data;
            else latestSermons = FALLBACK_SERMONS;
        } else {
            latestSermons = FALLBACK_SERMONS;
        }
    } catch {
        latestSermons = FALLBACK_SERMONS;
    }

    return (
        <SectionWrapper className="bg-gray-50">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="max-w-2xl">
                    <div className="mb-4 inline-flex items-center gap-2">
                        <span className="w-8 h-[2px] bg-primary"></span>
                        <span className="text-primary font-bold tracking-wider uppercase text-sm">
                            Latest Messages
                        </span>
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-dark">
                        Faith Comes By Hearing
                    </h2>
                </div>
                <Button href="/sermons" variant="primary">
                    View All Messages
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {latestSermons.map((sermon: SermonItem, index: number) => (
                    <SermonCard
                        key={index}
                        title={sermon.title}
                        speaker={sermon.speaker}
                        date={sermon.date}
                        imageUrl={sermon.imageUrl}
                        href={sermon.videoUrl || sermon.href || "/sermons"}
                        type={sermon.type}
                    />
                ))}
            </div>
        </SectionWrapper>
    );
};
