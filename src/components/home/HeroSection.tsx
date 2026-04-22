"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";

// YouTube Video ID from the user's link
const YT_VIDEO_ID = "0R0uChHI-1s";
// Start time in seconds (t=2258 from the link)
const YT_START = 2258;
// Loop: replay the same video — YouTube needs playlist=VIDEO_ID for loop to work
const YT_END = YT_START + 60; // 1 minute

export const HeroSection = () => {
    const [videoReady, setVideoReady] = useState(false);

    const ytSrc = `https://www.youtube.com/embed/${YT_VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${YT_VIDEO_ID}&controls=0&disablekb=1&fs=0&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1&start=${YT_START}&end=${YT_END}&playsinline=1&enablejsapi=0`;

    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* ── YouTube background iframe ── */}
            <div className="absolute inset-0 z-0 bg-black">
                {/* Static image shown instantly while video loads */}
                <div
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${videoReady ? "opacity-0" : "opacity-100"}`}
                    style={{ backgroundImage: "url('/worship1.jpg')" }}
                />
                {/* YouTube iframe — scaled up to hide UI chrome */}
                <iframe
                    src={ytSrc}
                    title="Background worship video"
                    allow="autoplay; encrypted-media"
                    className="absolute pointer-events-none"
                    onLoad={() => setVideoReady(true)}
                    style={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "calc(100% + 400px)",
                        height: "calc(100% + 200px)",
                        minWidth: "177.78vh",
                        minHeight: "56.25vw",
                        border: "none",
                    }}
                />
                {/* Dark gradient overlay on top of video */}
                <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/65 to-dark z-10" />
            </div>

            {/* ── Hero Content ── */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                        Encounter <span className="gold-gradient">God.</span> <br />
                        Experience <span className="gold-gradient">Power.</span>
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto font-light"
                >
                    A Christ-centered Church committed to proclaiming the Gospel with power, clarity, and practical impact. Preaching the word with one microphone.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
                >
                    <Button href="/live" variant="primary" size="lg" className="w-full sm:w-auto">
                        Watch Live
                    </Button>
                    <Button href="/join" variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-dark">
                        Join Us
                    </Button>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20"
            >
                <span className="text-white/60 text-sm tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent"
                />
            </motion.div>
        </section>
    );
};
