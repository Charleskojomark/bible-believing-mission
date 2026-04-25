"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const navLinks = [
    {
        name: "Home",
        href: "/",
        subLinks: [{ name: "Homepage", href: "/" }],
    },
    {
        name: "About",
        href: "/about",
        subLinks: [
            { name: "The Church", href: "/about" },
            { name: "The Mission", href: "/about/vision-mission" },
            { name: "The Vision", href: "/about/vision-mission" },
            { name: "The Founder", href: "/about/founder" },
        ],
    },
    {
        name: "Events",
        href: "/events",
        subLinks: [
            { name: "Upcoming Programs", href: "/events" },
            { name: "Calendar", href: "/events" },
        ],
    },
    {
        name: "Visit Us",
        href: "/visit",
        subLinks: [
            { name: "International", href: "/visit" },
            { name: "Nigeria Branches", href: "/branches" },
            { name: "Get Directions", href: "/contact" },
        ],
    },
    {
        name: "Media",
        href: "/media",
        subLinks: [
            { name: "Gallery", href: "/media" },
            { name: "Videos", href: "/media" },
            { name: "Talknado TV", href: "/live" },
        ],
    },
    {
        name: "Resources",
        href: "/resources",
        subLinks: [
            { name: "Sermons", href: "/sermons" },
            { name: "Downloads", href: "/resources" },
            { name: "Testimonies", href: "/testimonies" },
            { name: "Our Branches", href: "/branches" },
        ],
    },
    { name: "Give", href: "/give" },
    { name: "Contact", href: "/contact" },
    { name: "Books", href: "/books" },
];

export const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const pathname = usePathname();

    const toggleDropdown = (name: string) =>
        setActiveDropdown(activeDropdown === name ? null : name);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 shadow-md">

            {/* ═══════════════════════════════════════════
                DESKTOP / TABLET LAYOUT (lg and above)
                Row 1 — Purple bar: Logo left, contact right
                Row 2 — White bar: Nav links + CTA button
            ═══════════════════════════════════════════ */}
            <div className="hidden lg:block">

                {/* ── Row 1: Purple — Logo + Contact Info ── */}
                <div className="bg-primary text-white">
                    <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between h-16">

                        {/* Logo block */}
                        <Link href="/" className="flex items-center gap-3 flex-shrink-0">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/40 shadow-md flex-shrink-0">
                                <Image src="/talknado_logo.jpeg" alt="Talknado Logo" fill className="object-cover" priority />
                            </div>
                            <div className="font-heading font-extrabold leading-tight">
                                <span className="block text-white text-base uppercase tracking-wide">Bible Believing</span>
                                <span className="block text-white/80 text-xs font-semibold tracking-wider">MISSION · HEADQUARTERS</span>
                            </div>
                        </Link>

                        {/* Contact info */}
                        <div className="flex items-center gap-8 text-sm">
                            <a href="mailto:talknadoofficial@gmail.com" className="flex items-center gap-2 hover:text-white/80 transition-colors">
                                <FaEnvelope className="text-white/70 flex-shrink-0" />
                                talknadoofficial@gmail.com
                            </a>
                            <span className="flex items-center gap-2 text-white/90">
                                <FaMapMarkerAlt className="text-white/70 flex-shrink-0" />
                                No 72 Aba/Port Express Way, Osisioma, Aba Nigeria
                            </span>
                            <a href="tel:09153117991" className="flex items-center gap-2 hover:text-white/80 transition-colors">
                                <FaPhoneAlt className="text-white/70 flex-shrink-0" />
                                09153117991
                            </a>
                        </div>
                    </div>
                </div>

                {/* ── Row 2: White — Nav Links + CTA ── */}
                <div className="bg-white border-b border-gray-100">
                    <div className="max-w-screen-xl mx-auto px-6 flex items-center justify-between h-14">

                        {/* Nav Links */}
                        <nav className="flex items-center gap-0">
                            {navLinks.map((link) => (
                                <div
                                    key={link.name}
                                    className="relative"
                                    onMouseEnter={() => link.subLinks && setActiveDropdown(link.name)}
                                    onMouseLeave={() => link.subLinks && setActiveDropdown(null)}
                                >
                                    <Link
                                        href={link.href}
                                        className={`flex items-center gap-[2px] px-3 xl:px-4 py-2 text-[14px] xl:text-[15px] font-bold transition-colors whitespace-nowrap ${pathname === link.href
                                                ? "text-primary"
                                                : "text-gray-900 hover:text-primary"
                                            }`}
                                    >
                                        {link.name}
                                        {link.subLinks && (
                                            <span className="text-primary font-extrabold text-base ml-[1px]">+</span>
                                        )}
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
                                                                className="px-4 py-2.5 text-sm text-gray-700 font-semibold hover:text-primary hover:bg-purple-50 transition-colors"
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

                        {/* TV LIVE Button */}
                        <Link
                            href="/live"
                            className="flex items-center bg-primary text-white text-[13px] font-extrabold px-5 py-2.5 rounded-md hover:bg-primary-dark transition-colors uppercase tracking-wide whitespace-nowrap"
                        >
                            TALKNADO TV LIVE
                        </Link>
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════
                MOBILE LAYOUT (below lg)
                Single compact row: Logo + hamburger
            ═══════════════════════════════════════════ */}
            <div className="lg:hidden bg-white border-b border-gray-100 shadow-sm">
                <div className="flex items-center justify-between px-4 h-16">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary shadow-md flex-shrink-0">
                            <Image src="/talknado_logo.jpeg" alt="Talknado Logo" fill className="object-cover" priority />
                        </div>
                        <div className="font-heading font-bold leading-tight">
                            <span className="block text-primary text-[11px]">Bible Believing</span>
                            <span className="block text-primary text-[11px]">Mission</span>
                        </div>
                    </Link>

                    {/* Hamburger */}
                    <button
                        className="text-2xl p-2 text-gray-700"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle Menu"
                    >
                        {mobileOpen ? <HiX /> : <HiMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Backdrop */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMobileOpen(false)}
                        className="fixed inset-0 bg-black/40 z-30 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.28 }}
                        className="fixed right-0 top-0 h-full w-[82vw] max-w-sm bg-white z-40 lg:hidden flex flex-col shadow-2xl overflow-y-auto"
                    >
                        {/* Drawer header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
                            <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
                                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary flex-shrink-0">
                                    <Image src="/talknado_logo.jpeg" alt="Logo" fill className="object-cover" />
                                </div>
                                <div className="font-heading font-bold leading-tight">
                                    <span className="block text-primary text-sm">Bible Believing</span>
                                    <span className="block text-primary text-sm">Mission</span>
                                </div>
                            </Link>
                            <button onClick={() => setMobileOpen(false)} className="text-2xl text-gray-500 p-1">
                                <HiX />
                            </button>
                        </div>

                        {/* Contact strip */}
                        <div className="bg-primary text-white text-xs px-5 py-2.5 flex flex-col gap-1">
                            <a href="mailto:talknadoofficial@gmail.com" className="flex items-center gap-2">
                                <FaEnvelope className="opacity-70" /> talknadoofficial@gmail.com
                            </a>
                            <a href="tel:09153117991" className="flex items-center gap-2">
                                <FaPhoneAlt className="opacity-70" /> 09153117991 / 09069885520
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
                                                className="flex justify-between items-center text-sm font-bold text-gray-800 py-3"
                                            >
                                                {link.name}
                                                <motion.span
                                                    animate={{ rotate: activeDropdown === link.name ? 135 : 0 }}
                                                    className="font-extrabold text-xl text-primary leading-none"
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
                                                                onClick={() => setMobileOpen(false)}
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
                                            className="text-sm font-bold text-gray-800 py-3 hover:text-primary transition-colors"
                                            onClick={() => setMobileOpen(false)}
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
                                onClick={() => setMobileOpen(false)}
                                className="block bg-primary text-white text-center font-extrabold py-3 px-6 rounded-md uppercase tracking-wide text-sm"
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
