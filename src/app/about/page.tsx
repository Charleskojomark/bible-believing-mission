import React from "react";
import Image from "next/image";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            {/* Page Header */}
            <div className="bg-dark text-white py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 mix-blend-multiply z-0"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">About The Ministry</h1>
                    <p className="text-xl text-gray-300 max-w-2xl font-light">
                        Discover who we are and the calling God has placed upon this commission.
                    </p>
                </div>
            </div>

            <SectionWrapper bgWhite>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="mb-4 inline-flex items-center gap-2">
                            <span className="w-8 h-[2px] bg-primary"></span>
                            <span className="text-primary font-bold tracking-wider uppercase text-sm">
                                Who We Are
                            </span>
                        </div>
                        <h2 className="font-heading text-4xl md:text-5xl font-bold text-dark mb-6 leading-tight">
                            A Christ-centered <br /> Church
                        </h2>
                        <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                            <p>
                                Bible Believing Mission is a Christ-centered Church committed to proclaiming the Gospel of Jesus Christ with power, clarity, and practical impact.
                            </p>
                            <p>
                                We exist to raise people who believe God’s Word, live by faith, and walk in the reality of God’s promises. Through sound teaching, passionate worship, prayer, and prophetic ministry, we equip believers to grow spiritually, discover their purpose, and influence their world for Christ.
                            </p>
                        </div>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                        <Image
                            src="/random2.jpeg"
                            alt="Church Congregation"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>

                <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="bg-gray-50 p-10 rounded-2xl border-t-4 border-primary shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-heading text-3xl font-bold text-dark mb-4">Our Vision</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Preaching the word with one microphone.
                        </p>
                    </div>
                    <div className="bg-gray-50 p-10 rounded-2xl border-t-4 border-gold shadow-sm hover:shadow-md transition-shadow">
                        <h3 className="font-heading text-3xl font-bold text-dark mb-4">Our Mission</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            To see lives transformed, families restored, and nations impacted through the Gospel of Jesus Christ.
                        </p>
                    </div>
                </div>

                <div className="mt-20">
                    <div className="mb-8 text-center">
                        <h2 className="font-heading text-4xl font-bold text-dark mb-4">What We Believe</h2>
                        <div className="w-24 h-1 bg-gold mx-auto"></div>
                    </div>
                    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-xl overflow-hidden">
                        <p className="text-lg text-gray-600 mb-6 font-medium text-center">In Bible Believing Mission, we believe:</p>
                        <div className="space-y-4">
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-700 font-medium">
                                <li className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">1</span>
                                    <span>The Bible is the inspired and infallible Word of God</span>
                                </li>
                                <li className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">2</span>
                                    <span>Jesus Christ is the Son of God, the only way to salvation</span>
                                </li>
                                <li className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">3</span>
                                    <span>The Holy Spirit empowers believers to live victorious Christian lives</span>
                                </li>
                                <li className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">4</span>
                                    <span>God still heals, delivers, and transforms lives today</span>
                                </li>
                            </ul>
                        </div>
                        <div className="mt-10 p-6 bg-dark rounded-xl text-white">
                            <p className="text-lg text-gray-300 leading-relaxed font-light">
                                Our services and programs are designed to create an atmosphere where lives are changed, faith is stirred, and destinies are aligned with God&apos;s will. We welcome people from all walks of life and are passionate about building a loving, faith-driven community rooted in truth and compassion.
                            </p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}
