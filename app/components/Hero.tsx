"use client";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-white overflow-hidden">
            {/* Left Side - Image Placeholder */}
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full md:w-1/2 h-[50vh] md:h-screen bg-neutral-100 flex items-center justify-center relative"
            >
                {/* Placeholder for user image - In a real scenario, use <Image /> */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200" />
                <span className="relative text-gray-400 font-sans uppercase tracking-widest z-10">
                    [Your Image Here]
                </span>
            </motion.div>

            {/* Right Side - Text */}
            <div className="w-full md:w-1/2 p-8 md:p-24 flex flex-col justify-center items-start">
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
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-6xl md:text-8xl font-serif font-bold text-black mb-6 leading-[1.1]"
                >
                    I&apos;m <br /> Deepanshu <br /> Kumar
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-gray-600 font-sans text-lg md:text-xl leading-relaxed max-w-lg mb-10"
                >
                    I&apos;m a software developer with over 4 years of experience in front-end, full-stack, and backend development... specializing in Angular, React, Next.js.
                </motion.p>
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-4 bg-black text-white font-sans font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors"
                >
                    Contact Me!
                </motion.button>
            </div>
        </section>
    );
}
