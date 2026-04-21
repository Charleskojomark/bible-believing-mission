"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconType } from "react-icons";

interface ButtonProps {
    children: React.ReactNode;
    href?: string;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    className?: string;
    onClick?: () => void;
    icon?: IconType;
    iconPosition?: "left" | "right";
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export const Button = ({
    children,
    href,
    variant = "primary",
    size = "md",
    className = "",
    onClick,
    icon: Icon,
    iconPosition = "left",
    type = "button",
    disabled = false,
}: ButtonProps) => {
    const baseClasses =
        "inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 gap-2";

    const variants = {
        primary:
            "bg-primary hover:bg-primary-dark text-white shadow-[0_4px_14px_0_rgba(196,30,58,0.39)] hover:shadow-[0_6px_20px_rgba(196,30,58,0.23)] hover:-translate-y-1",
        secondary:
            "bg-gold hover:bg-gold-dark text-white shadow-[0_4px_14px_0_rgba(201,168,76,0.39)] hover:shadow-[0_6px_20px_rgba(201,168,76,0.23)] hover:-translate-y-1",
        outline:
            "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white",
        ghost: "bg-transparent text-foreground hover:bg-gray-100 dark:hover:bg-gray-800",
    };

    const sizes = {
        sm: "text-sm px-4 py-2",
        md: "text-base px-6 py-3",
        lg: "text-lg px-8 py-4",
    };

    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? "opacity-50 cursor-not-allowed transform-none shadow-none" : ""
        } ${className}`;

    const content = (
        <>
            {Icon && iconPosition === "left" && <Icon className="text-xl" />}
            {children}
            {Icon && iconPosition === "right" && <Icon className="text-xl" />}
        </>
    );

    if (href) {
        return (
            <Link href={href} className={classes} onClick={onClick}>
                {content}
            </Link>
        );
    }

    return (
        <motion.button
            whileTap={!disabled ? { scale: 0.95 } : {}}
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled}
        >
            {content}
        </motion.button>
    );
};
