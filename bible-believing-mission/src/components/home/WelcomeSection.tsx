import React from "react";
import Image from "next/image";
import { SectionWrapper } from "../ui/SectionWrapper";
import { Button } from "../ui/Button";

export const WelcomeSection = () => {
    return (
        <SectionWrapper bgWhite id="welcome">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Text Content */}
                <div>
                    <div className="mb-4 inline-flex items-center gap-2">
                        <span className="w-8 h-[2px] bg-primary"></span>
                        <span className="text-primary font-bold tracking-wider uppercase text-sm">
                            Welcome
                        </span>
                    </div>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-dark mb-6 leading-tight">
                        Welcome to <br />
                        <span className="text-primary">Bible Believing Mission</span>
                    </h2>
                    <p className="text-primary/80 font-medium italic mb-6 text-lg">
                        — where God’s Word is spoken, believed, and manifested.
                    </p>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                        Bible Believing Mission is a Christ-centered Church committed to proclaiming the Gospel of Jesus Christ with power, clarity, and practical impact.
                    </p>
                    <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                        We exist to raise people who believe God&apos;s Word, live by faith,
                        and walk in the reality of God&apos;s promises. Through sound teaching,
                        passionate worship, prayer, and prophetic ministry, we equip believers
                        to grow spiritually, discover their purpose, and influence their world
                        for Christ.
                    </p>

                    <Button href="/about" variant="secondary" size="md">
                        More About Us
                    </Button>
                </div>

                {/* Image Collage */}
                <div className="relative min-h-[500px]">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[500px] w-[85%] ml-auto z-10">
                        <Image
                            src="/worship2.jpg"
                            alt="Church Worship Service"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute bottom-10 left-0 w-3/5 rounded-2xl overflow-hidden shadow-xl aspect-square z-20 border-8 border-white">
                        <Image
                            src="https://images.pexels.com/photos/2351719/pexels-photo-2351719.jpeg?auto=compress&cs=tinysrgb&w=800"
                            alt="Worshippers with Hands Raised"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Decorative element */}
                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl z-0"></div>
                    <div className="absolute -bottom-10 left-10 w-40 h-40 bg-gold/20 rounded-full blur-2xl z-0"></div>
                </div>
            </div>
        </SectionWrapper>
    );
};
