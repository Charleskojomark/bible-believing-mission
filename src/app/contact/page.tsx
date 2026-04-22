import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";

export default function ContactPage() {
    return (
        <main className="pt-24 min-h-screen">
            <SectionWrapper bgWhite>
                <div className="text-center mb-16">
                    <h1 className="font-heading text-5xl md:text-6xl font-bold text-dark mb-4">Contact Us</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        We’d love to hear from you. Reach out with questions, inquiries, or testimonies.
                    </p>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Info Panel */}
                    <div className="lg:col-span-5 bg-dark text-white rounded-3xl p-10 shadow-2xl relative overflow-hidden">
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>

                        <h2 className="font-heading text-3xl font-bold mb-8">Contact Information</h2>

                        <div className="space-y-8 relative z-10">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-gold text-xl flex-shrink-0">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Our Location</h4>
                                    <p className="text-gray-300">No 72 Aba/Port Express Way<br />Osisioma, Aba Nigeria.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-gold text-xl flex-shrink-0">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Email Us</h4>
                                    <p className="text-gray-300">talknadoofficial@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-gold text-xl flex-shrink-0">
                                    <FaPhoneAlt />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Call Us</h4>
                                    <p className="text-gray-300">09153117991</p>
                                    <p className="text-gray-300">09069885520</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form Panel */}
                    <div className="lg:col-span-7 bg-white rounded-3xl p-1 md:p-8">
                        <h2 className="font-heading text-3xl font-bold text-dark mb-6">Send a Message</h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-dark">Your Name</label>
                                    <input type="text" id="name" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-dark">Email Address</label>
                                    <input type="email" id="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium text-dark">Subject</label>
                                <input type="text" id="subject" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all" />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-dark">Message</label>
                                <textarea id="message" rows={5} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none"></textarea>
                            </div>

                            <Button type="submit" variant="primary" size="lg">
                                Send Message
                            </Button>
                        </form>
                    </div>

                </div>
            </SectionWrapper>
        </main>
    );
}
