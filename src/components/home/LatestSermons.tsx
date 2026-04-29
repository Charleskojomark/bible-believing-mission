import React from "react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { SermonCard } from "../shared/SermonCard";
import { Button } from "../ui/Button";
import { getDb } from "@/lib/db";

interface SermonRow {
    id: number;
    title: string;
    preacher: string;
    date: string;
    audio_url: string | null;
    thumbnail_url: string | null;
}

export const LatestSermons = async () => {
    let latestSermons: SermonRow[] = [];

    try {
        const db = await getDb();
        const { rows } = await db.execute(`SELECT * FROM sermons ORDER BY created_at DESC LIMIT 3`);
        latestSermons = rows as unknown as SermonRow[];
    } catch (e) {
        console.error("Error fetching sermons:", e);
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
                {latestSermons.map((sermon, index) => (
                    <SermonCard
                        key={index}
                        title={sermon.title}
                        speaker={sermon.preacher}
                        date={sermon.date}
                        imageUrl={sermon.thumbnail_url || "/placeholder.png"}
                        href={sermon.audio_url || "/sermons"}
                        type="audio"
                    />
                ))}
            </div>
            {latestSermons.length === 0 && (
                <p className="text-gray-500 text-center py-10">No recent sermons found. Check back later!</p>
            )}
        </SectionWrapper>
    );
};
