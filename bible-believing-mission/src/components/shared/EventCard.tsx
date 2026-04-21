"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";

interface EventCardProps {
    title: string;
    date?: string;
    time?: string;
    location?: string;
    imageUrl?: string;
    href: string;
}

export const EventCard = ({
    title,
    date,
    time,
    location,
    imageUrl,
    href,
}: EventCardProps) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="flex flex-col md:flex-row bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden group"
        >
            <div className="relative w-full md:w-48 h-48 md:h-auto overflow-hidden shrink-0">
                <Image
                    src={imageUrl || '/placeholder.png'}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-center rounded-lg px-3 py-2 shadow-lg">
                    <div className="text-xs font-bold uppercase tracking-wider">
                        {(date ?? 'TBD').split(" ")[0]}
                    </div>
                    <div className="text-xl font-heading font-bold leading-none mt-1">
                        {(date ?? 'TBD').split(" ")[1]}
                    </div>
                </div>
            </div>

            <div className="p-6 flex flex-col justify-center flex-grow">
                <Link href={href}>
                    <h3 className="font-heading text-2xl font-bold text-dark group-hover:text-primary transition-colors mb-4 line-clamp-2">
                        {title}
                    </h3>
                </Link>

                <div className="space-y-2 text-sm text-gray-500 font-medium">
                    <div className="flex items-center gap-2">
                        <FaClock className="text-gold" />
                        <span>{time ?? 'TBA'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-gold" />
                        <span className="line-clamp-1">{location ?? 'Bible Believing Mission'}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
