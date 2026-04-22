"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";

export const HeroSection = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Force play on mount — required on some mobile browsers
        if (videoRef.current) {
            videoRef.current.play().catch(() => {
                // Autoplay blocked — fallback to poster image (handled by CSS)
            });
        }
    }, []);

    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
            {/* ── HTML5 Video Background ── */}
            <div className="absolute inset-0 z-0 bg-black">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster="/worship1.jpg"
                    className="absolute inset-0 w-full h-full object-cover"
                >
                    {/*
                     * TO USE YOUR OWN CLIP:
                     * 1. Download your 1-minute worship clip as MP4
                     * 2. Save it to /public/hero-video.mp4
                     * 3. Replace the src below with /hero-video.mp4
                     *
                     * Stock fallback — royalty-free Pexels worship video
                     */}
                    <source
                        src="https://res.cloudinary.com/dtopla0ls/video/upload/v1776870945/Screencast_from_2026-04-22_15-52-27_online-video-cutter.com_qc9qo7.mp4"
                        type="video/mp4"
                    />
                    {/* Static image used if video doesn't load at all */}
                    Your browser does not support the video tag.
                </video>

                {/* Dark overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/65 to-dark" />
            </div>

            {/* ── Hero Content ── */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
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
                    A Christ-centered Church committed to proclaiming the Gospel with power,
                    clarity, and practical impact. Preaching the word with one microphone.
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
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-10"
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
