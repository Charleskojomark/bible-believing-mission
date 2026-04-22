import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export default function LivePage() {
    return (
        <main className="pt-24 min-h-screen bg-dark text-white">
            {/* Page Header */}
            <div className="py-12 border-b border-white/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply z-0"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                            <span className="text-red-500 font-bold uppercase tracking-widest text-sm">Live Now</span>
                        </div>
                        <h1 className="font-heading text-4xl md:text-5xl font-bold">Sunday Worship Service</h1>
                    </div>
                    <div className="bg-white/10 px-6 py-3 rounded-xl backdrop-blur-sm border border-white/10">
                        <p className="text-gray-300 font-medium">
                            Service Time: <span className="text-white font-bold">9:00 AM WAT</span>
                        </p>
                    </div>
                </div>
            </div>

            <SectionWrapper className="bg-transparent pb-24">
                {/* Video Embed */}
                <div className="max-w-5xl mx-auto">
                    <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 bg-black flex items-center justify-center relative">
                        {/* Note: This is an embedded dummy youtube video. Standard Next.js/React iframe implementation. */}
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=0"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                        ></iframe>
                    </div>

                    <div className="mt-8 flex flex-col md:flex-row justify-between gap-6">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-2">Welcome to Bible Believing Mission Live</h2>
                            <p className="text-gray-400">
                                Are you joining us for the first time? We would love to connect with you. Please fill out our digital connect card.
                            </p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}
