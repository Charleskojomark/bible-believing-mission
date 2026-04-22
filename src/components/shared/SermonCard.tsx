"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaPlay, FaCalendarAlt, FaUser } from "react-icons/fa";

interface SermonCardProps {
    title: string;
    speaker?: string;
    date?: string;
    imageUrl?: string;
    href: string;
    type?: "video" | "audio";
}

export const SermonCard = ({
    title,
    speaker,
    date,
    imageUrl,
    href,
    type = "video",
}: SermonCardProps) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
        >
            <Link href={href} className="block relative h-64 overflow-hidden">
                <Image
                    src={imageUrl || '/placeholder.png'}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center transform scale-90 group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                        <FaPlay className="text-xl ml-1" />
                    </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {type}
                </div>
            </Link>

            <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 font-medium">
                    <div className="flex items-center gap-1.5">
                        <FaCalendarAlt className="text-primary" />
                        <span>{date ?? 'No date'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <FaUser className="text-primary" />
                        <span>{speaker ?? 'Bible Believing Mission'}</span>
                    </div>
                </div>

                <Link href={href}>
                    <h3 className="font-heading text-2xl font-bold text-dark group-hover:text-primary transition-colors line-clamp-2">
                        {title}
                    </h3>
                </Link>
            </div>
        </motion.div>
    );
};
