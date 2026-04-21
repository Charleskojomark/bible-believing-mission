import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export default function VisionMissionPage() {
    return (
        <main className="pt-24 min-h-screen">
            {/* Page Header */}
            <div className="bg-dark text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-0"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">Vision & Mission</h1>
                    <p className="text-xl text-gray-300 max-w-2xl font-light">
                        Our guiding purpose and the mandate from heaven.
                    </p>
                </div>
            </div>

            <SectionWrapper bgWhite>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Vision Box */}
                    <div className="bg-cream p-12 rounded-3xl border border-gold/20 shadow-lg">
                        <div className="mb-4 inline-flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-primary"></span>
                            <span className="text-primary font-bold tracking-wider uppercase text-sm">
                                Our Vision
                            </span>
                        </div>
                        <h2 className="font-heading text-4xl font-bold text-dark mb-6">
                            The Mandate
                        </h2>
                        <p className="text-2xl text-gray-700 font-light italic leading-relaxed border-l-4 border-gold pl-6">
                            &quot;Preaching the word with one microphone.&quot;
                        </p>
                    </div>

                    {/* Mission Box */}
                    <div className="bg-dark p-12 rounded-3xl text-white shadow-xl">
                        <div className="mb-4 inline-flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-gold"></span>
                            <span className="text-gold font-bold tracking-wider uppercase text-sm">
                                Our Mission
                            </span>
                        </div>
                        <h2 className="font-heading text-4xl font-bold text-white mb-6">
                            The Assignment
                        </h2>
                        <p className="text-2xl text-gray-300 font-light leading-relaxed border-l-4 border-primary pl-6">
                            To see lives transformed, families restored, and nations impacted through the Gospel of Jesus Christ.
                        </p>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}
