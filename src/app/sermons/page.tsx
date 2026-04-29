import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { SermonCard } from "@/components/shared/SermonCard";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

interface SermonRow {
    id: number;
    title: string;
    preacher: string;
    date: string;
    audio_url: string | null;
    thumbnail_url: string | null;
}

export default async function SermonsPage() {
    let sermons: SermonRow[] = [];

    try {
        const db = await getDb();
        const { rows } = await db.execute(`SELECT * FROM sermons ORDER BY created_at DESC`);
        sermons = rows as unknown as SermonRow[];
    } catch (e) {
        console.error("Error fetching sermons:", e);
    }

    return (
        <main className="pt-24 min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="bg-dark text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-0"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">Latest Sermons</h1>
                    <p className="text-xl text-gray-300 max-w-2xl font-light">
                        Feed your spirit with the unadulterated word of God.
                    </p>
                </div>
            </div>

            <SectionWrapper>
                <div className="mb-12 flex justify-between items-end border-b pb-6">
                    <h2 className="font-heading text-3xl font-bold text-dark">All Messages</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sermons.map((sermon, index) => (
                        <SermonCard
                            key={index}
                            title={sermon.title}
                            speaker={sermon.preacher}
                            date={sermon.date}
                            imageUrl={sermon.thumbnail_url || "/placeholder.png"}
                            href={sermon.audio_url || "#"}
                            type="audio"
                        />
                    ))}
                    {sermons.length === 0 && (
                        <p className="text-gray-500 py-10 col-span-3">No sermons have been uploaded yet. Please check back later.</p>
                    )}
                </div>
            </SectionWrapper>
        </main>
    );
}
