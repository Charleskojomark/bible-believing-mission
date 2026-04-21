"use client";

import React from "react";
import { motion } from "framer-motion";

interface SectionWrapperProps {
    children: React.ReactNode;
    id?: string;
    className?: string;
    bgWhite?: boolean;
}

export const SectionWrapper = ({
    children,
    id,
    className = "",
    bgWhite = false,
}: SectionWrapperProps) => {
    return (
        <section
            id={id}
            className={`relative w-full section-padding ${bgWhite ? "bg-white" : "bg-cream"
                } ${className}`}
        >
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 },
                }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
                {children}
            </motion.div>
        </section>
    );
};
