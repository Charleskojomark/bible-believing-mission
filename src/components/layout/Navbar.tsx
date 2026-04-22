"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";
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
        name: "Buy Books",
        href: "/books",
        hasPlus: true,
        subLinks: [{ name: "Latest", href: "/books" }],
    },
    {
        name: "Resources",
        href: "/resources",
        hasPlus: true,
        subLinks: [{ name: "Downloads", href: "/resources" }],
    },
    { name: "Our Branches", href: "/branches" },
    { name: "Testimonies", href: "/testimonies" },
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
    { name: "TALKNADO TV LIVE", href: "https://www.youtube.com/@talknadoministries" },
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isLightMode = isScrolled || pathname !== "/";

    const toggleDropdown = (name: string) => {
        if (activeDropdown === name) setActiveDropdown(null);
        else setActiveDropdown(name);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isLightMode
                ? "bg-white text-dark shadow-lg py-3"
                : "bg-transparent text-white py-5"
                }`}
        >
            <div className="w-full px-4 sm:px-6 2xl:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 z-50 flex-shrink-0">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-gold shadow-md flex-shrink-0">
                            <Image
                                src="/talknado_logo.jpeg"
                                alt="Talknado Logo"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div className="font-heading font-bold text-[15px] tracking-tight flex flex-col leading-tight">
                            <span className={isLightMode ? "text-primary" : "text-white"}>
                                Bible Believing
                            </span>
                            <span className="text-gold">Mission</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden xl:flex items-center gap-2 xl:gap-3 flex-wrap justify-center flex-1 mx-3">
                        {navLinks.map((link) => (
                            <div
                                key={link.name}
                                className="relative group"
                                onMouseEnter={() => link.subLinks && setActiveDropdown(link.name)}
                                onMouseLeave={() => link.subLinks && setActiveDropdown(null)}
                            >
                                <Link
                                    href={link.href || "#"}
                                    className={`nav-link font-medium flex items-center gap-[2px] py-2 text-[13px] xl:text-sm ${pathname === link.href ? "text-gold" : ""
                                        }`}
                                    onClick={(e) => {
                                        if (!link.href) e.preventDefault();
                                    }}
                                >
                                    {link.name}
                                    {link.hasPlus && <span className="font-bold text-base leading-none pt-[2px]">+</span>}
                                </Link>

                                {/* Dropdown Menu */}
                                {link.subLinks && (
                                    <AnimatePresence>
                                        {activeDropdown === link.name && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute left-0 top-full pt-2 w-48"
                                            >
                                                <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col py-2 border border-gray-100">
                                                    {link.subLinks.map((subLink) => (
                                                        <Link
                                                            key={subLink.name}
                                                            href={subLink.href}
                                                            className="px-4 py-2 text-sm text-dark-600 hover:text-primary hover:bg-gray-50 transition-colors"
                                                            onClick={() => setActiveDropdown(null)}
                                                        >
                                                            {subLink.name}
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

                    {/* CTA & Mobile Toggle */}
                    <div className="flex items-center gap-4 z-50 flex-shrink-0">
                        <div className="hidden 2xl:block">
                            <Button href="https://www.youtube.com/@talknadoministries" variant="primary" size="sm">
                                TV LIVE
                            </Button>
                        </div>

                        <button
                            className="lg:hidden text-2xl p-2"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            {mobileMenuOpen ? (
                                <HiX className={isLightMode || mobileMenuOpen ? "text-dark" : "text-white"} />
                            ) : (
                                <HiMenu className={isLightMode ? "text-dark" : "text-white"} />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="fixed inset-0 bg-white z-40 lg:hidden overflow-y-auto"
                    >
                        <div className="pt-24 pb-10 px-6 flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <div key={link.name} className="flex flex-col border-b border-gray-100 pb-4">
                                    {link.subLinks ? (
                                        <>
                                            <button
                                                onClick={() => toggleDropdown(link.name)}
                                                className="flex justify-between items-center text-xl font-medium text-dark"
                                            >
                                                {link.name}
                                                <motion.div
                                                    animate={{ rotate: activeDropdown === link.name ? 135 : 0 }}
                                                    className="font-bold text-3xl leading-none"
                                                >
                                                    +
                                                </motion.div>
                                            </button>
                                            <AnimatePresence>
                                                {activeDropdown === link.name && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="flex flex-col gap-3 pt-4 pl-4 overflow-hidden"
                                                    >
                                                        {link.subLinks.map((subLink) => (
                                                            <Link
                                                                key={subLink.name}
                                                                href={subLink.href}
                                                                className="text-gray-600 text-lg"
                                                                onClick={() => setMobileMenuOpen(false)}
                                                            >
                                                                {subLink.name}
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className="text-xl font-medium text-dark"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                            <div className="mt-4">
                                <Button href="/give" size="lg" className="w-full mt-4" onClick={() => setMobileMenuOpen(false)}>
                                    Give Online
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
