"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useData } from "../context/DataContext";

export default function Hero() {
    const { blogs } = useData();
    const latestBlog = blogs[0];

    return (
        <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white overflow-hidden">
            {/* Left Side - Image Placeholder */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full md:w-1/2 h-[50vh] md:h-screen bg-neutral-100 flex items-center justify-center relative"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
                <div className="relative w-full h-full">
                    <Image
                        src="/images/dipu2.png"
                        alt="Deepanshu Kumar"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                </div>
            </motion.div>

            {/* Right Side - Text */}
            <div className="w-full md:w-1/2 p-8 md:p-24 flex flex-col justify-center items-start relative">
                {/* Latest Blog Banner */}
                {latestBlog && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mb-8 inline-block"
                    >
                        <a
                            href={`/blog/${latestBlog.slug}`}
                            className="inline-flex items-center px-4 py-2 rounded-full bg-neutral-50 border border-neutral-200 text-sm text-neutral-600 hover:bg-neutral-100 transition-colors"
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                            <span className="font-medium mr-2">New:</span>
                            <span className="truncate max-w-[200px] sm:max-w-xs">
                                {latestBlog.title}
                            </span>
                            <svg
                                className="w-4 h-4 ml-2 text-neutral-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </a>
                    </motion.div>
                )}

                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-sm md:text-base font-sans font-medium tracking-[0.3em] text-gray-500 uppercase mb-4"
                >
                    Software Developer
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-black mb-6 tracking-tight leading-tight"
                >
                    Deepanshu <br /> Kumar
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-xl md:text-2xl text-neutral-600 font-sans font-light mb-10 tracking-wide max-w-lg"
                >
                    Software Developer & UI/UX Enthusiast specializing in Angular, React, and Next.js.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row items-center gap-4"
                >
                    <a
                        href="#portfolio"
                        className="px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-neutral-800 transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto text-center"
                    >
                        View Projects
                    </a>
                    <a
                        href="#contact"
                        className="px-8 py-4 bg-white text-black border border-neutral-200 rounded-full font-medium hover:bg-neutral-50 transition-all duration-300 w-full sm:w-auto text-center"
                    >
                        Contact Me
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
