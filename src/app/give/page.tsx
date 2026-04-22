import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";
import { FaPaypal, FaCreditCard, FaUniversity } from "react-icons/fa";

export default function GivePage() {
    return (
        <main className="pt-24 min-h-screen">
            {/* Page Header */}
            <div className="bg-dark text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-0"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">Partner With Us</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
                        &quot;Give, and it will be given to you. A good measure, pressed down, shaken together and running over...&quot; — Luke 6:38
                    </p>
                </div>
            </div>

            <SectionWrapper bgWhite>
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        {/* Giving Methods */}
                        <div className="bg-cream rounded-2xl p-8 text-center border border-gold/20 hover:shadow-lg transition-all flex flex-col items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-primary text-2xl mb-4 shadow-sm">
                                <FaCreditCard />
                            </div>
                            <h3 className="font-heading text-xl font-bold text-dark mb-2">Card Payment</h3>
                            <p className="text-sm text-gray-500 mb-6">Give securely via Stripe or local payment gateway.</p>
                            <Button className="w-full mt-auto">Give Now</Button>
                        </div>

                        <div className="bg-cream rounded-2xl p-8 text-center border border-gold/20 hover:shadow-lg transition-all flex flex-col items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-primary text-2xl mb-4 shadow-sm">
                                <FaPaypal />
                            </div>
                            <h3 className="font-heading text-xl font-bold text-dark mb-2">PayPal</h3>
                            <p className="text-sm text-gray-500 mb-6">For our international partners and members.</p>
                            <Button variant="outline" className="w-full mt-auto">Use PayPal</Button>
                        </div>

                        <div className="bg-cream rounded-2xl p-8 text-center border border-gold/20 hover:shadow-lg transition-all flex flex-col items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-primary text-2xl mb-4 shadow-sm">
                                <FaUniversity />
                            </div>
                            <h3 className="font-heading text-xl font-bold text-dark mb-2">Bank Transfer</h3>
                            <p className="text-sm text-gray-500 mb-6">Direct deposit to our ministry accounts.</p>
                            <Button href="/give/bank" variant="secondary" className="w-full mt-auto">View Details</Button>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-10 text-center border border-gray-200">
                        <h3 className="font-heading text-2xl font-bold text-dark mb-4">Why We Give</h3>
                        <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                            Your financial partnership enables us to preach the Gospel across the nations, maintain our church facilities, support community outreaches, and organize powerful revivals that change lives. We pray that God will multiply the seed you sow.
                        </p>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}
