"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Slide = {
    type: "image" | "welcome";
    src: string;
    label: string;
    thumbLabel?: string;
};

const slides: Slide[] = [
    { type: "image", src: "/flyers/flyer1.jpg", label: "flyer1", thumbLabel: "Program 1" },
    { type: "image", src: "/flyers/flyer2.jpg", label: "flyer2", thumbLabel: "Program 2" },
    { type: "image", src: "/flyers/flyer3.jpg", label: "flyer3", thumbLabel: "Program 3" },
    { type: "welcome", src: "/worship1.jpg", label: "welcome", thumbLabel: "Welcome Home" },
];

export const HeroSection = () => {
    const [current, setCurrent] = useState(3); // Start on Welcome Home
    const [direction, setDirection] = useState(1);

    const goTo = useCallback((index: number) => {
        setDirection(index > current ? 1 : -1);
        setCurrent(index);
    }, [current]);

    const next = useCallback(() => {
        setDirection(1);
        setCurrent((c) => (c + 1) % slides.length);
    }, []);

    const prev = useCallback(() => {
        setDirection(-1);
        setCurrent((c) => (c - 1 + slides.length) % slides.length);
    }, []);

    // Auto-advance every 6 seconds
    useEffect(() => {
        const id = setInterval(next, 6000);
        return () => clearInterval(id);
    }, [next]);

    const variants = {
        enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
    };

    return (
        <section className="relative w-full overflow-hidden" style={{ height: "70vh", minHeight: "460px", maxHeight: "700px" }}>
            {/* ── Slides ── */}
            <AnimatePresence initial={false} custom={direction} mode="sync">
                <motion.div
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.55, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    {slides[current].type === "welcome" ? (
                        /* ── Welcome Home Slide ── */
                        <div className="relative w-full h-full">
                            <Image
                                src="/worship1.jpg"
                                alt="Welcome Home"
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* Purple overlay */}
                            <div className="absolute inset-0 bg-purple-900/70" />
                            {/* Welcome Home text */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                                <span
                                    className="font-cursive text-7xl md:text-9xl text-white drop-shadow-2xl leading-tight"
                                    style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}
                                >
                                    Welcome
                                </span>
                                <span className="font-heading text-4xl md:text-6xl font-extrabold text-white tracking-widest uppercase mt-1 drop-shadow-xl">
                                    HOME
                                </span>
                            </div>
                        </div>
                    ) : (
                        /* ── Flyer Image Slide ── */
                        <div className="relative w-full h-full">
                            <Image
                                src={slides[current].src}
                                alt={slides[current].thumbLabel || "Event flyer"}
                                fill
                                className="object-cover object-top"
                                priority={current === 0}
                            />
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* ── Left Arrow ── */}
            <button
                onClick={prev}
                className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-primary/80 text-white flex items-center justify-center transition-all"
                aria-label="Previous slide"
            >
                <FaChevronLeft size={14} />
            </button>

            {/* ── Right Arrow ── */}
            <button
                onClick={next}
                className="absolute right-20 md:right-24 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-primary/80 text-white flex items-center justify-center transition-all"
                aria-label="Next slide"
            >
                <FaChevronRight size={14} />
            </button>

            {/* ── Right-side Circular Thumbnails ── */}
            <div className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
                {slides.map((slide, i) => (
                    <button
                        key={slide.label}
                        onClick={() => goTo(i)}
                        aria-label={slide.thumbLabel}
                        className={`relative rounded-full overflow-hidden transition-all duration-300 flex-shrink-0 ${i === current
                                ? "ring-4 ring-white ring-offset-1 ring-offset-primary scale-110"
                                : "ring-2 ring-white/50 opacity-75 hover:opacity-100 hover:scale-105"
                            }`}
                        style={{ width: "52px", height: "52px" }}
                    >
                        {slide.type === "welcome" ? (
                            <div className="w-full h-full bg-purple-700 flex items-center justify-center relative">
                                <Image src="/worship1.jpg" alt="Welcome" fill className="object-cover opacity-60" />
                                <span className="relative z-10 text-[8px] text-white font-bold text-center leading-tight px-0.5">
                                    Welcome
                                </span>
                            </div>
                        ) : (
                            <Image
                                src={slide.src}
                                alt={slide.thumbLabel || ""}
                                fill
                                className="object-cover object-top"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* ── Bottom dot indicators (mobile friendly) ── */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 lg:hidden">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`rounded-full transition-all ${i === current ? "bg-white w-6 h-2" : "bg-white/50 w-2 h-2"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};
