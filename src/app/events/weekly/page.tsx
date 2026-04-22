import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";

export default function WeeklyServicesPage() {
    const services = [
        {
            name: "Sunday Celebration Service",
            time: "Sundays at 9:00 AM",
            description: "Join us for a time of passionate worship, the undiluted Word, and prophetic ministration.",
            type: "In-Person & Online"
        },
        {
            name: "Midweek Word Encounter",
            time: "Wednesdays at 6:00 PM",
            description: "Dive deep into the scriptures and renew your mind with profound doctrinal teachings.",
            type: "In-Person & Online"
        },
        {
            name: "Prophetic Prayer Meeting",
            time: "Fridays at 5:00 PM",
            description: "A time dedicated to seeking God's face, intercession, and experiencing His power.",
            type: "In-Person Only"
        }
    ];

    return (
        <main className="pt-24 min-h-screen">
            {/* Page Header */}
            <div className="bg-dark text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-0"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">Weekly Services</h1>
                    <p className="text-xl text-gray-300 max-w-2xl font-light">
                        Our schedule for corporate worship and gatherings.
                    </p>
                </div>
            </div>

            <SectionWrapper bgWhite>
                <div className="max-w-4xl mx-auto space-y-8">
                    {services.map((service, i) => (
                        <div key={i} className="bg-cream rounded-2xl p-8 border border-gold/20 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start flex-col md:flex-row gap-4 mb-4">
                                <h3 className="font-heading text-3xl font-bold text-dark">{service.name}</h3>
                                <span className="bg-white px-4 py-1 text-sm font-bold text-primary rounded-full uppercase tracking-wide border border-primary/20">
                                    {service.type}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-gold font-medium text-lg mb-4">
                                <FaClock />
                                <span>{service.time}</span>
                            </div>

                            <p className="text-gray-600 text-lg leading-relaxed">
                                {service.description}
                            </p>

                            <div className="mt-6 pt-6 border-t border-gray-200 flex items-center gap-2 text-gray-500">
                                <FaMapMarkerAlt />
                                <span>Main Auditorium, Bible Believing Mission</span>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionWrapper>
        </main>
    );
}
