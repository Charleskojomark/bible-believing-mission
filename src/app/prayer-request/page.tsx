import React from "react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { Button } from "@/components/ui/Button";

export default function PrayerRequestPage() {
    return (
        <main className="pt-24 min-h-screen bg-cream">
            <SectionWrapper>
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="font-heading text-4xl md:text-5xl font-bold text-dark mb-4">Prayer Requests</h1>
                        <p className="text-lg text-gray-600">
                            &quot;Is anyone among you suffering? Let him pray.&quot; — James 5:13.<br />
                            Our intercessory team is standing by to pray with you concerning your needs.
                        </p>
                    </div>

                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-8 md:p-12">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-dark">Full Name</label>
                                    <input type="text" id="name" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-dark">Email (Optional)</label>
                                    <input type="email" id="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="type" className="text-sm font-medium text-dark">Request Type</label>
                                <select id="type" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all">
                                    <option>Healing & Deliverance</option>
                                    <option>Financial Breakthrough</option>
                                    <option>Family & Relationships</option>
                                    <option>Spiritual Growth</option>
                                    <option>Other Needs</option>
                                    <option>Praise Report (Testimony)</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="request" className="text-sm font-medium text-dark">Your Prayer Request</label>
                                <textarea id="request" rows={5} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none" placeholder="Share your request here..."></textarea>
                            </div>

                            <div className="flex items-center gap-3">
                                <input type="checkbox" id="anonymous" className="w-4 h-4 text-primary focus:ring-primary border-gray-300 rounded" />
                                <label htmlFor="anonymous" className="text-sm text-gray-600">Keep this request anonymous</label>
                            </div>

                            <Button type="submit" variant="primary" size="lg" className="w-full">
                                Submit Prayer Request
                            </Button>
                        </form>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}
