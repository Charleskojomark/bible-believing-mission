"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaBook, FaHandsHelping, FaBible, FaPray, FaStar } from "react-icons/fa";

const services = [
    { icon: <FaBible className="text-4xl text-primary" />, name: "Sunday Worship Service", time: "9:00 AM WAT" },
    { icon: <FaHandsHelping className="text-4xl text-primary" />, name: "Healing & Deliverance Service", time: "Fridays" },
    { icon: <FaBook className="text-4xl text-primary" />, name: "Power Bible Study", time: "Wednesdays" },
    { icon: <FaPray className="text-4xl text-primary" />, name: "Midnight Prayer", time: "Last Friday Monthly" },
    { icon: <FaStar className="text-4xl text-primary" />, name: "Worship, Word & Wonders Night", time: "Special Programs" },
];

export const ServiceTimes = () => {
    return (
        <section
            className="py-24 relative"
            style={{
                backgroundImage: "url('https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1920')",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                backgroundPosition: "center",
            }}
        >
            {/* Marble/light overlay */}
            <div className="absolute inset-0 bg-white/90"></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Join Us In Worship</p>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-dark mb-4">Service Times</h2>
                    <div className="w-12 h-1 bg-primary mx-auto"></div>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-0 border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                    {services.map((service, i) => (
                        <motion.div
                            key={service.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex flex-col items-center justify-center gap-4 p-8 bg-white border-r border-gray-200 last:border-r-0 hover:bg-primary/5 transition-colors group cursor-pointer"
                        >
                            <div className="group-hover:scale-110 transition-transform duration-300">
                                {service.icon}
                            </div>
                            <div className="text-center">
                                <p className="font-bold text-dark text-center leading-snug">{service.name}</p>
                                <p className="text-primary text-sm mt-1">{service.time}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
