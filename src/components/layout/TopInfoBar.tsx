import React from "react";
import Link from "next/link";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

export const TopInfoBar = () => {
    return (
        <div className="bg-primary text-white py-2 px-4 hidden md:block w-full">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-sm">
                <div className="flex items-center gap-6">
                    <a href="mailto:talknadoofficial@gmail.com" className="flex items-center gap-2 hover:text-gold transition-colors">
                        <FaEnvelope className="text-gold" />
                        talknadoofficial@gmail.com
                    </a>
                    <span className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-gold" />
                        No 72 Aba/Port Express Way Osisioma, Aba Nigeria
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    <a href="tel:09153117991" className="flex items-center gap-2 hover:text-gold transition-colors">
                        <FaPhoneAlt className="text-gold" />
                        09153117991
                    </a>
                    <span className="text-white/40">|</span>
                    <a href="tel:09069885520" className="hover:text-gold transition-colors">09069885520</a>
                </div>
            </div>
        </div>
    );
};
