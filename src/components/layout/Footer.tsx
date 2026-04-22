import React from "react";
import Link from "next/link";
import { FaFacebookF, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa";

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-dark text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Column 1: Brand & About */}
                    <div className="flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="font-heading font-bold text-2xl tracking-tight flex flex-col leading-none">
                                <span className="text-white">Bible Believing</span>
                                <span className="text-gold">Mission</span>
                            </div>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            A Christ-centered Church committed to proclaiming the Gospel of Jesus
                            Christ with power, clarity, and practical impact. Preaching the word
                            with one microphone.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                                <FaYoutube />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                                <FaInstagram />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                                <FaTwitter />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="font-heading font-bold text-xl mb-6 text-white border-b border-white/20 pb-2 inline-block">
                            Quick Links
                        </h3>
                        <ul className="flex flex-col gap-3">
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-gold transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/sermons" className="text-gray-400 hover:text-gold transition-colors">
                                    Latest Sermons
                                </Link>
                            </li>
                            <li>
                                <Link href="/events" className="text-gray-400 hover:text-gold transition-colors">
                                    Upcoming Events
                                </Link>
                            </li>
                            <li>
                                <Link href="/give" className="text-gray-400 hover:text-gold transition-colors">
                                    Give Online
                                </Link>
                            </li>
                            <li>
                                <Link href="/join" className="text-gray-400 hover:text-gold transition-colors">
                                    Join The Church
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                        <h3 className="font-heading font-bold text-xl mb-6 text-white border-b border-white/20 pb-2 inline-block">
                            Contact Us
                        </h3>
                        <ul className="flex flex-col gap-4 text-gray-400 text-sm">
                            <li>
                                <strong className="text-white block mb-1">Address:</strong>
                                No 72 Aba/Port Express Way Osisioma, Aba Nigeria.
                            </li>
                            <li>
                                <strong className="text-white block mb-1">Email:</strong>
                                talknadoofficial@gmail.com
                            </li>
                            <li>
                                <strong className="text-white block mb-1">Phone:</strong>
                                09153117991, 09069885520
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Service Times */}
                    <div>
                        <h3 className="font-heading font-bold text-xl mb-6 text-white border-b border-white/20 pb-2 inline-block">
                            Service Times
                        </h3>
                        <ul className="flex flex-col gap-4 text-gray-400 text-sm">
                            <li className="flex justify-between items-center border-b border-white/10 pb-2">
                                <span>Sunday Service</span>
                                <span className="text-gold font-medium">9:00 AM</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-white/10 pb-2">
                                <span>Wednesday Bible Study</span>
                                <span className="text-gold font-medium">6:00 PM</span>
                            </li>
                            <li className="flex justify-between items-center border-b border-white/10 pb-2">
                                <span>Friday Prayer</span>
                                <span className="text-gold font-medium">5:00 PM</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>&copy; {currentYear} Bible Believing Mission. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
