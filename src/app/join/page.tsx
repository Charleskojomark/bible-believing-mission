import React from "react";
import Image from "next/image";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";

export default function JoinPage() {
    return (
        <main className="pt-24 min-h-screen">
            <SectionWrapper bgWhite className="pt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="mb-4 inline-flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-primary"></span>
                            <span className="text-primary font-bold tracking-wider uppercase text-sm">
                                Get Involved
                            </span>
                        </div>
                        <h1 className="font-heading text-5xl md:text-6xl font-bold text-dark mb-6 leading-tight">
                            Join Our <br />
                            <span className="text-primary">Family</span>
                        </h1>
                        <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                            We are excited to welcome you into our family! Find your place, join a department, connect with other believers, and start fulfilling your God-given assignment.
                        </p>

                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="text-sm font-medium text-dark">First Name</label>
                                    <input type="text" id="firstName" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="text-sm font-medium text-dark">Last Name</label>
                                    <input type="text" id="lastName" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="Doe" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-dark">Email Address</label>
                                <input type="email" id="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="john@example.com" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-medium text-dark">Phone Number</label>
                                <input type="tel" id="phone" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" placeholder="+1 (555) 000-0000" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="interest" className="text-sm font-medium text-dark">Area of Interest</label>
                                <select id="interest" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                                    <option>New Member Confirmation</option>
                                    <option>Join the Choir</option>
                                    <option>Join Ushers/Greeters</option>
                                    <option>Media & Tech Team</option>
                                    <option>Evangelism Ministry</option>
                                </select>
                            </div>

                            <Button type="submit" className="w-full" size="lg">Submit Application</Button>
                        </form>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] hidden md:block">
                        <Image
                            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260"
                            alt="Community Life"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent"></div>
                        <div className="absolute bottom-10 left-10 right-10">
                            <h3 className="font-heading text-3xl font-bold text-white mb-2">We are better together.</h3>
                            <p className="text-white/80">Experience authentic fellowship.</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}
