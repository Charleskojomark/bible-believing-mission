"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";

export const AboutPreview = () => {
    return (
        <SectionWrapper bgWhite id="about-preview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="order-1 lg:order-1"
                >
                    <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Who We Are</p>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-dark mb-4 leading-tight">About Us</h2>
                    <div className="flex gap-2 mb-8">
                        <span className="w-10 h-1 bg-primary rounded-full"></span>
                        <span className="w-4 h-1 bg-gold rounded-full"></span>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed mb-5">
                        Bible Believing Mission is a Christ-centered Church committed to proclaiming the Gospel of Jesus Christ with power, clarity, and practical impact.
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        We exist to raise people who believe God&apos;s Word, live by faith, and walk in the reality of God&apos;s promises. Through sound teaching, passionate worship, prayer, and prophetic ministry, we equip believers to grow spiritually, discover their purpose, and influence their world for Christ.
                    </p>
                    <Button href="/about" variant="primary" size="md">Read More</Button>
                </motion.div>

                {/* Unique staggered image trio composition */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="relative order-2 lg:order-2 flex justify-center"
                    style={{ height: "480px" }}
                >
                    {/* Main large image — top-right, slight tilt */}
                    <div
                        className="absolute top-0 right-0 w-[280px] h-[350px] md:w-[320px] md:h-[390px] overflow-hidden shadow-2xl"
                        style={{ borderRadius: "80px 16px 80px 16px", transform: "rotate(2deg)" }}
                    >
                        <Image
                            src="/aboutus.jpeg"
                            alt="Bible Believing Mission Church"
                            fill
                            className="object-cover"
                        />
                        {/* Gold accent bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gold"></div>
                    </div>

                    {/* Second image — bottom-left, slight counter-tilt */}
                    <div
                        className="absolute bottom-0 left-0 w-[220px] h-[270px] md:w-[260px] md:h-[300px] overflow-hidden shadow-xl border-4 border-white"
                        style={{ borderRadius: "16px 80px 16px 80px", transform: "rotate(-2deg)" }}
                    >
                        <Image
                            src="/talknado1.jpeg"
                            alt="Apostle Kingsley Preaching"
                            fill
                            className="object-cover"
                        />
                        {/* Primary accent bar */}
                        <div className="absolute top-0 left-0 right-0 h-2 bg-primary"></div>
                    </div>

                    {/* Decorative stat badge */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-xl z-20 border-4 border-white">
                        <span className="font-heading text-2xl font-bold leading-none">10+</span>
                        <span className="text-[10px] font-medium text-center leading-tight mt-1">Years of<br />Ministry</span>
                    </div>
                </motion.div>

            </div>
        </SectionWrapper>
    );
};
