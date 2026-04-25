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
        /* Full viewport height — navbar is fixed so it floats above this */
        <section className="relative w-full overflow-hidden" style={{ height: "100vh" }}>
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
                            {/* Vivid electric purple overlay — matches Dunamis exactly */}
                            <div
                                className="absolute inset-0"
                                style={{ background: "rgba(110, 0, 200, 0.80)" }}
                            />
                            {/* Welcome Home text — centered in full viewport */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                                <div
                                    className="text-white drop-shadow-2xl leading-none select-none"
                                    style={{
                                        fontFamily: "'Dancing Script', cursive",
                                        fontWeight: 700,
                                        fontSize: "clamp(4rem, 12vw, 9rem)",
                                        lineHeight: 1.1,
                                    }}
                                >
                                    Welcome
                                </div>
                                <div
                                    className="font-heading text-white tracking-[0.15em] uppercase drop-shadow-xl select-none"
                                    style={{
                                        fontWeight: 900,
                                        fontSize: "clamp(2rem, 6vw, 5rem)",
                                        lineHeight: 1,
                                        marginTop: "0.25rem",
                                    }}
                                >
                                    HOME
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* ── Flyer Image Slide ── */
                        <div className="relative w-full h-full bg-black">
                            <Image
                                src={slides[current].src}
                                alt={slides[current].thumbLabel || "Event flyer"}
                                fill
                                className="object-contain sm:object-cover sm:object-top"
                                priority={current === 0}
                            />
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Left Arrow */}
            <button
                onClick={prev}
                className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/30 hover:bg-primary text-white flex items-center justify-center transition-all"
                aria-label="Previous slide"
            >
                <FaChevronLeft size={15} />
            </button>

            {/* Right Arrow — leave space for thumbnails */}
            <button
                onClick={next}
                className="absolute top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/30 hover:bg-primary text-white flex items-center justify-center transition-all"
                style={{ right: "50px" }}
                aria-label="Next slide"
            >
                <FaChevronRight size={12} />
            </button>

            {/* Right-side Circular Thumbnails */}
            <div className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 md:gap-3">
                {slides.map((slide, i) => (
                    <button
                        key={slide.label}
                        onClick={() => goTo(i)}
                        aria-label={slide.thumbLabel}
                        className={`relative rounded-full overflow-hidden flex-shrink-0 transition-all duration-300 w-9 h-9 md:w-14 md:h-14 ${i === current
                                ? "ring-[3px] md:ring-4 ring-white scale-110"
                                : "ring-2 ring-white/60 opacity-70 hover:opacity-100 hover:scale-105"
                            }`}
                    >
                        {slide.type === "welcome" ? (
                            <div className="w-full h-full relative">
                                <Image src="/worship1.jpg" alt="Welcome" fill className="object-cover" />
                                <div className="absolute inset-0" style={{ background: "rgba(110,0,200,0.75)" }} />
                                <span
                                    className="absolute inset-0 flex items-center justify-center text-[9px] text-white font-bold text-center leading-tight px-1"
                                    style={{ fontFamily: "'Dancing Script', cursive" }}
                                >
                                    Welcome Home
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

            {/* Mobile dot indicators */}
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
