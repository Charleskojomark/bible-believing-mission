"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { Button } from "../ui/Button";

const navLinks = [
    { name: "Home", href: "/", hasPlus: true, subLinks: [{ name: "Homepage", href: "/" }] },
    {
        name: "About",
        href: "/about",
        hasPlus: true,
        subLinks: [
            { name: "The Church", href: "/about" },
            { name: "The Mission", href: "/about/vision-mission" },
            { name: "The Vision", href: "/about/vision-mission" },
            { name: "The Goal", href: "/about/vision-mission" },
            { name: "The Founder", href: "/about/founder" },
        ],
    },
    {
        name: "Events",
        href: "/events",
        hasPlus: true,
        subLinks: [
            { name: "Upcoming Programs", href: "/events" },
            { name: "Calendar", href: "/events" },
        ],
    },
    {
        name: "Visit",
        href: "/visit",
        hasPlus: true,
        subLinks: [
            { name: "International", href: "/visit" },
            { name: "Nigeria", href: "/visit" },
        ],
    },
    {
        name: "Media",
        href: "/media",
        hasPlus: true,
        subLinks: [{ name: "Gallery", href: "/media" }],
    },
    { name: "Sermons", href: "/sermons" },
    {
        name: "Resources",
        href: "/resources",
        hasPlus: true,
        subLinks: [
            { name: "Buy Books", href: "/books" },
            { name: "Downloads", href: "/resources" },
            { name: "Our Branches", href: "/branches" },
            { name: "Testimonies", href: "/testimonies" },
        ],
    },
    { name: "Give", href: "/give" },
    { name: "Contacts", href: "/contact" },
    {
        name: "Social Media",
        href: "#",
        hasPlus: true,
        subLinks: [
            { name: "Facebook", href: "#" },
            { name: "YouTube", href: "https://www.youtube.com/@talknadoministries" },
            { name: "Instagram", href: "#" },
            { name: "X", href: "#" },
            { name: "Tiktok", href: "#" },
        ],
    },
];

export const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const pathname = usePathname();

    const toggleDropdown = (name: string) => {
        if (activeDropdown === name) setActiveDropdown(null);
        else setActiveDropdown(name);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 shadow-lg">
            {/* ── Row 1: Top Info Bar ── */}
            <div className="bg-primary text-white py-2 px-4 hidden lg:block">
                <div className="max-w-screen-xl mx-auto flex justify-between items-center text-xs gap-4">
                    <div className="flex items-center gap-6">
                        <a href="mailto:talknadoofficial@gmail.com" className="flex items-center gap-2 hover:text-gold transition-colors">
                            <FaEnvelope className="text-gold flex-shrink-0" />
                            talknadoofficial@gmail.com
                        </a>
                        <span className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-gold flex-shrink-0" />
                            No 72 Aba/Port Express Way Osisioma, Aba Nigeria
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <a href="tel:09153117991" className="flex items-center gap-2 hover:text-gold transition-colors">
                            <FaPhoneAlt className="text-gold flex-shrink-0" />
                            09153117991
                        </a>
                        <span className="text-white/40">|</span>
                        <a href="tel:09069885520" className="hover:text-gold transition-colors">09069885520</a>
                    </div>
                </div>
            </div>

            {/* ── Row 2: Main Nav Bar ── */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 flex-shrink-0 py-1">
                        <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-gold shadow-md flex-shrink-0">
                            <Image
                                src="/talknado_logo.jpeg"
                                alt="Talknado Logo"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div className="font-heading font-bold leading-tight">
                            <span className="block text-primary text-sm">Bible Believing</span>
                            <span className="block text-gold text-sm">Mission</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1 xl:gap-2 flex-1 justify-center">
                        {navLinks.map((link) => (
                            <div
                                key={link.name}
                                className="relative"
                                onMouseEnter={() => link.subLinks && setActiveDropdown(link.name)}
                                onMouseLeave={() => link.subLinks && setActiveDropdown(null)}
                            >
                                <Link
                                    href={link.href || "#"}
                                    className={`flex items-center gap-[2px] px-2 xl:px-3 py-2 text-[12px] xl:text-[13px] font-semibold transition-colors whitespace-nowrap ${pathname === link.href ? "text-primary" : "text-dark hover:text-primary"
                                        }`}
                                    onClick={(e: React.MouseEvent) => { if (!link.href) e.preventDefault(); }}
                                >
                                    {link.name}
                                    {link.hasPlus && <span className="text-primary font-bold text-sm ml-[1px]">+</span>}
                                </Link>

                                {/* Dropdown */}
                                {link.subLinks && (
                                    <AnimatePresence>
                                        {activeDropdown === link.name && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 8 }}
                                                transition={{ duration: 0.15 }}
                                                className="absolute left-0 top-full pt-1 w-52 z-50"
                                            >
                                                <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col py-2 border border-gray-100">
                                                    {link.subLinks.map((sub) => (
                                                        <Link
                                                            key={sub.name}
                                                            href={sub.href}
                                                            className="px-4 py-2.5 text-sm text-gray-700 font-medium hover:text-primary hover:bg-red-50 transition-colors"
                                                            onClick={() => setActiveDropdown(null)}
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* TV LIVE Button + mobile toggle */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                        <Link
                            href="/live"
                            className="hidden lg:flex items-center gap-2 bg-primary text-white text-xs font-bold px-4 py-2.5 rounded-md hover:bg-primary/90 transition-colors uppercase tracking-wide whitespace-nowrap"
                        >
                            TALKNADO TV LIVE
                        </Link>
                        <button
                            className="lg:hidden text-2xl p-2 text-dark"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            {mobileMenuOpen ? <HiX /> : <HiMenu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Backdrop */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMobileMenuOpen(false)}
                        className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Mobile Drawer — slides in from right, below the fixed header */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.28 }}
                        className="fixed right-0 top-0 h-full w-[82vw] max-w-sm bg-white z-40 lg:hidden flex flex-col shadow-2xl overflow-y-auto"
                    >
                        {/* Drawer header with logo */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-white sticky top-0 z-10">
                            <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gold flex-shrink-0">
                                    <Image src="/talknado_logo.jpeg" alt="Logo" fill className="object-cover" />
                                </div>
                                <div className="font-heading font-bold leading-tight">
                                    <span className="block text-primary text-sm">Bible Believing</span>
                                    <span className="block text-gold text-sm">Mission</span>
                                </div>
                            </Link>
                            <button onClick={() => setMobileMenuOpen(false)} className="text-2xl text-gray-500 p-1">
                                <HiX />
                            </button>
                        </div>

                        {/* Contact strip */}
                        <div className="bg-primary text-white text-xs px-5 py-2.5 flex flex-col gap-1">
                            <a href="mailto:talknadoofficial@gmail.com" className="flex items-center gap-2">
                                <FaEnvelope className="text-gold" /> talknadoofficial@gmail.com
                            </a>
                            <a href="tel:09153117991" className="flex items-center gap-2">
                                <FaPhoneAlt className="text-gold" /> 09153117991 / 09069885520
                            </a>
                        </div>

                        {/* Nav links */}
                        <div className="flex-1 px-5 py-4 flex flex-col gap-0">
                            {navLinks.map((link) => (
                                <div key={link.name} className="flex flex-col border-b border-gray-100">
                                    {link.subLinks ? (
                                        <>
                                            <button
                                                onClick={() => toggleDropdown(link.name)}
                                                className="flex justify-between items-center text-sm font-semibold text-dark py-3"
                                            >
                                                {link.name}
                                                <motion.span
                                                    animate={{ rotate: activeDropdown === link.name ? 135 : 0 }}
                                                    className="font-bold text-xl text-primary leading-none"
                                                >
                                                    +
                                                </motion.span>
                                            </button>
                                            <AnimatePresence>
                                                {activeDropdown === link.name && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="flex flex-col gap-0.5 pb-3 pl-3 overflow-hidden"
                                                    >
                                                        {link.subLinks.map((sub) => (
                                                            <Link
                                                                key={sub.name}
                                                                href={sub.href}
                                                                className="text-gray-500 text-sm py-1.5 hover:text-primary transition-colors"
                                                                onClick={() => setMobileMenuOpen(false)}
                                                            >
                                                                — {sub.name}
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className="text-sm font-semibold text-dark py-3 hover:text-primary transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="px-5 pb-6">
                            <Link
                                href="/live"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block bg-primary text-white text-center font-bold py-3 px-6 rounded-md uppercase tracking-wide text-sm"
                            >
                                TALKNADO TV LIVE
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
