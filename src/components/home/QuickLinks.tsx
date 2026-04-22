"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const quickLinks = [
    { label: "I'm New Here", href: "/join", image: "/talknado1.jpeg" },
    { label: "Our Branches", href: "/branches", image: "/aboutus.jpeg" },
    { label: "International", href: "/visit", image: "/talknado2.jpeg" },
    { label: "Talknado TV", href: "/live", image: "/random.jpeg" },
    { label: "Upcoming Programs", href: "/events", image: "/random1.jpeg" },
    { label: "Testimonies", href: "/testimonies", image: "/random2.jpeg" },
    { label: "Give Online", href: "/give", image: "/random3.jpeg" },
    { label: "Resources", href: "/resources", image: "/worship1.jpg" },
];

export const QuickLinks = () => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {quickLinks.map((link, i) => (
                        <motion.div
                            key={link.label}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.07 }}
                        >
                            <Link
                                href={link.href}
                                className="relative block aspect-square rounded-2xl overflow-hidden group shadow-md"
                            >
                                <Image
                                    src={link.image}
                                    alt={link.label}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                {/* Dark purple overlay like Dunamis */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-dark/60 to-transparent group-hover:from-primary/80 transition-all duration-300"></div>
                                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                                    <p className="font-bold text-lg leading-tight">{link.label}</p>
                                    <div className="w-6 h-[2px] bg-gold mt-2 group-hover:w-12 transition-all duration-300"></div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
