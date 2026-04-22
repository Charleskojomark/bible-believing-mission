"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";

export const AboutPreview = () => {
    return (
        <SectionWrapper bgWhite id="about-preview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Text */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Who We Are</p>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-dark mb-4 leading-tight">About Us</h2>
                    <div className="w-12 h-1 bg-primary mb-8"></div>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                        Bible Believing Mission is a Christ-centered Church committed to proclaiming the Gospel of Jesus Christ with power, clarity, and practical impact.
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed mb-8">
                        We exist to raise people who believe God's Word, live by faith, and walk in the reality of God's promises. Through sound teaching, passionate worship, prayer, and prophetic ministry, we equip believers to grow spiritually, discover their purpose, and influence their world for Christ.
                    </p>
                    <Button href="/about" variant="primary" size="md">Read More</Button>
                </motion.div>

                {/* Dunamis-style circular image composition */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.15 }}
                    className="relative flex items-center justify-center"
                >
                    {/* Large circle image */}
                    <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden shadow-2xl border-4 border-white">
                        <Image
                            src="/aboutus.jpeg"
                            alt="Bible Believing Mission Church"
                            fill
                            className="object-cover"
                        />
                    </div>
                    {/* Small overlapping circle */}
                    <div className="absolute bottom-4 left-4 md:left-0 w-[140px] h-[140px] md:w-[170px] md:h-[170px] rounded-full overflow-hidden shadow-xl border-4 border-white z-10">
                        <Image
                            src="/talknado1.jpeg"
                            alt="Apostle Kingsley — Talknado"
                            fill
                            className="object-cover"
                        />
                    </div>
                </motion.div>
            </div>
        </SectionWrapper>
    );
};
