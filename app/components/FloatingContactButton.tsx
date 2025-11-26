"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";

export default function FloatingContactButton() {
    const [isVisible, setIsVisible] = useState(false);
    const [isContactVisible, setIsContactVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling 300px
            const scrolled = window.scrollY > 300;
            setIsVisible(scrolled);

            // Check if contact section is visible
            const contactSection = document.getElementById("contact");
            if (contactSection) {
                const rect = contactSection.getBoundingClientRect();
                const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
                setIsContactVisible(isInView);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Check initial state

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToContact = () => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    // Don't show button if contact section is visible
    const shouldShow = isVisible && !isContactVisible;

    return (
        <AnimatePresence>
            {shouldShow && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    onClick={scrollToContact}
                    className="fixed bottom-8 right-8 z-50 group cursor-pointer"
                    aria-label="Contact Me"
                >
                    {/* Pulsing background effect */}
                    <div className="absolute inset-0 rounded-full bg-black animate-ping opacity-20"></div>

                    {/* Main button */}
                    <div className="relative flex items-center justify-center w-16 h-16 bg-black text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110">
                        {/* Icon with animation */}
                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 10, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 3,
                            }}
                            className="flex items-center justify-center"
                        >
                            <FaEnvelope className="text-2xl" />
                        </motion.div>
                    </div>

                    {/* Decorative ring */}
                    <motion.div
                        className="absolute inset-0 rounded-full border-2 border-black"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
