import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { FaBuilding, FaGlobe } from "react-icons/fa";

export default function BankDetailsPage() {
    return (
        <main className="pt-24 min-h-screen">
            <div className="bg-dark text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-0"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="font-heading text-5xl font-bold mb-4">Bank Transfer Details</h1>
                    <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto">
                        Direct deposit information for tithes, offerings, and partnership.
                    </p>
                </div>
            </div>

            <SectionWrapper bgWhite>
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Local Account */}
                    <div className="bg-cream p-10 rounded-3xl border border-gold/20 shadow-md relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 text-gold/30 text-8xl">
                            <FaBuilding />
                        </div>
                        <div className="relative z-10">
                            <h3 className="font-heading text-2xl font-bold text-dark mb-6 border-b border-gray-300 pb-3">Local Transfers (NGN)</h3>
                            <div className="space-y-4 text-lg">
                                <div>
                                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Bank Name</p>
                                    <p className="font-medium text-dark">Zenith Bank</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Account Name</p>
                                    <p className="font-medium text-dark">Bible Believing Mission</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Account Number</p>
                                    <p className="font-heading text-2xl font-bold text-primary">1012345678</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* International Account */}
                    <div className="bg-dark p-10 rounded-3xl border border-white/10 shadow-xl text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-6 text-white/5 text-8xl">
                            <FaGlobe />
                        </div>
                        <div className="relative z-10">
                            <h3 className="font-heading text-2xl font-bold text-white mb-6 border-b border-white/20 pb-3">International (USD)</h3>
                            <div className="space-y-4 text-lg">
                                <div>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Bank Name</p>
                                    <p className="font-medium text-white">Guaranty Trust Bank</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Account Name</p>
                                    <p className="font-medium text-white">Bible Believing Mission Intl</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Account Number</p>
                                    <p className="font-heading text-2xl font-bold text-gold">0123456789</p>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Swift Code / Sort Code</p>
                                    <p className="font-medium text-white">GTBBXXXX</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </SectionWrapper>
        </main>
    );
}
