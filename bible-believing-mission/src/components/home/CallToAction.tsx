"use client";

import React from "react";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Button } from "../ui/Button";
import { FaHeart, FaUserPlus } from "react-icons/fa";

export const CallToAction = () => {
    return (
        <SectionWrapper bgWhite>
            <div className="bg-dark rounded-3xl overflow-hidden shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {/* Join Us Block */}
                    <div className="p-12 md:p-16 flex flex-col justify-center items-start border-b md:border-b-0 md:border-r border-white/10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl transition-transform group-hover:scale-150 duration-700"></div>

                        <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center text-primary text-2xl mb-8 backdrop-blur">
                            <FaUserPlus />
                        </div>

                        <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                            Become a Member
                        </h3>
                        <p className="text-gray-400 mb-8 text-lg font-light">
                            Find your place in our growing family. Join us and discover your God-given purpose.
                        </p>

                        <Button href="/join" variant="primary" className="mt-auto relative z-10 w-full sm:w-auto">
                            Join The Church
                        </Button>
                    </div>

                    {/* Give Block */}
                    <div className="p-12 md:p-16 flex flex-col justify-center items-start relative overflow-hidden group">
                        <div className="absolute bottom-0 right-0 -mr-16 -mb-16 w-64 h-64 bg-gold/10 rounded-full blur-3xl transition-transform group-hover:scale-150 duration-700"></div>

                        <div className="w-14 h-14 bg-white/10 rounded-xl flex items-center justify-center text-gold text-2xl mb-8 backdrop-blur">
                            <FaHeart />
                        </div>

                        <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                            Partner With Us
                        </h3>
                        <p className="text-gray-400 mb-8 text-lg font-light">
                            Your giving helps us advance the Kingdom of God and reach more souls around the globe.
                        </p>

                        <Button href="/give" variant="secondary" className="mt-auto relative z-10 w-full sm:w-auto">
                            Give Online
                        </Button>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
