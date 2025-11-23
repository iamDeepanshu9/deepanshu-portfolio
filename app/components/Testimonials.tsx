"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import { useData } from "../context/DataContext";

export default function Testimonials() {
    const { testimonials } = useData();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (testimonials.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    if (testimonials.length === 0) return null;

    return (
        <section className="py-32 bg-neutral-50 flex items-center justify-center relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
                <span className="absolute -top-20 -left-20 text-[20rem] font-serif text-black">“</span>
            </div>

            <div className="container mx-auto px-4 text-center relative z-10">
                <div className="max-w-4xl mx-auto h-[400px] flex flex-col justify-center">
                    <FaQuoteLeft className="text-4xl md:text-5xl text-neutral-300 mx-auto mb-8" />

                    <div className="relative h-[250px] flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="absolute w-full"
                            >
                                <h2 className="text-xl md:text-3xl font-serif font-medium leading-relaxed text-neutral-900 mb-8 px-4">
                                    &quot;{testimonials[currentIndex].text}&quot;
                                </h2>
                                <div className="flex flex-col items-center">
                                    <div className="w-12 h-1 bg-black mb-4"></div>
                                    <span className="text-base font-sans font-bold uppercase tracking-widest text-black mb-1">
                                        {testimonials[currentIndex].author}
                                    </span>
                                    <span className="text-xs font-sans text-neutral-500 uppercase tracking-widest">
                                        {testimonials[currentIndex].role}
                                    </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Dots Navigation */}
                    {testimonials.length > 1 && (
                        <div className="flex justify-center space-x-2 mt-8">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-black w-6" : "bg-neutral-300"
                                        }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
