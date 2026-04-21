import React from "react";
import Image from "next/image";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export default function FounderPage() {
    return (
        <main className="pt-24 min-h-screen">
            {/* Page Header */}
            <div className="bg-dark text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-0"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">Our Founder</h1>
                    <p className="text-xl text-gray-300 max-w-2xl font-light">
                        Meet the visionary behind Bible Believing Mission.
                    </p>
                </div>
            </div>

            <SectionWrapper bgWhite>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-5 relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4]">
                        {/* Using a placeholder portrait image as we don't have the real one */}
                        <Image
                            src="https://images.pexels.com/photos/4427821/pexels-photo-4427821.jpeg?auto=compress&cs=tinysrgb&w=800"
                            alt="Apostle Kingsley Innocent Aguleke"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="md:col-span-7">
                        <div className="mb-4 inline-flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-primary"></span>
                            <span className="text-primary font-bold tracking-wider uppercase text-sm">
                                The Visionary
                            </span>
                        </div>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-dark mb-2">
                            Apostle Kingsley Innocent Aguleke
                        </h2>
                        <h3 className="text-xl text-gold font-medium mb-8">
                            (Talknado)
                        </h3>

                        <div className="prose prose-lg text-gray-600 max-w-none">
                            <p>
                                Bible Believing Mission was founded by Apostle Kingsley Innocent Aguleke (Talknado), a passionate preacher of the Gospel with a strong mandate to declare God’s Word with boldness and simplicity. He is widely known for his uncompromising faith in the power of God’s spoken Word and his belief that when God speaks, situations must align. Talknado reflects our conviction that when God speaks, His word is established — He talks, and it is done.
                            </p>
                            <p className="mt-4">
                                Apostle Kingsley Innocent carries a deep burden for soul-winning, spiritual growth, and the practical demonstration of God’s power in the lives of people. His ministry is marked by sound biblical teaching, prayer, prophetic insight, and a strong emphasis on faith, holiness, and obedience to God.
                            </p>
                            <p className="mt-4">
                                Through his leadership, Bible Believing Mission has become a place where lives are transformed, hope is restored, and believers are empowered to live out their God-given purpose. His heart is to see men and women raised who know God personally, walk in truth, and impact their generation for Christ.
                            </p>
                            <div className="border-l-4 border-primary pl-6 py-2 my-6 bg-gray-50 rounded-r-lg">
                                <p className="italic text-dark font-medium">
                                    &quot;Preaching the word with one microphone.&quot;
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}
