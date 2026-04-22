"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaYoutube } from "react-icons/fa";
import { Button } from "../ui/Button";

export const LiveServiceBanner = () => {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-fixed bg-center"
                style={{
                    backgroundImage: "url('https://images.pexels.com/photos/2351719/pexels-photo-2351719.jpeg?auto=compress&cs=tinysrgb&w=1920')",
                }}
            >
                <div className="absolute inset-0 bg-primary/90 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center"
                >
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-primary text-3xl mb-8 animate-pulse shadow-[0_0_40px_rgba(255,255,255,0.4)]">
                        <FaYoutube className="ml-1" />
                    </div>

                    <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Join Our Live Service
                    </h2>

                    <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-10 font-light">
                        Distance is not a barrier to the move of the Spirit. Connect with us from anywhere in the world.
                    </p>

                    <Button
                        href="https://www.youtube.com/@talknadoministries"
                        variant="secondary"
                        size="lg"
                        className="font-bold tracking-wide"
                    >
                        Watch Online Now
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};
