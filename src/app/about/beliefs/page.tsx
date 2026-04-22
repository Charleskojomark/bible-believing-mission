import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FaCheckCircle } from "react-icons/fa";

export default function BeliefsPage() {
    const beliefs = [
        "The Bible is the inspired and infallible Word of God",
        "Jesus Christ is the Son of God, the only way to salvation",
        "The Holy Spirit empowers believers",
        "God still heals, delivers, and transforms lives today"
    ];

    return (
        <main className="pt-24 min-h-screen bg-cream">
            {/* Page Header */}
            <div className="bg-dark text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-0"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">What We Believe</h1>
                    <p className="text-xl text-gray-300 max-w-2xl font-light">
                        The fundamental truths that form the foundation of our faith.
                    </p>
                </div>
            </div>

            <SectionWrapper>
                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
                    <div className="p-12">
                        <h2 className="font-heading text-3xl font-bold text-dark mb-8 text-center border-b pb-6">
                            Our Core Beliefs
                        </h2>
                        <ul className="space-y-6">
                            {beliefs.map((belief, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <div className="text-primary text-2xl mt-1 flex-shrink-0">
                                        <FaCheckCircle />
                                    </div>
                                    <p className="text-xl text-gray-700 leading-relaxed">
                                        {belief}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}
