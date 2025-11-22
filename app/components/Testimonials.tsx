"use client";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

export default function Testimonials() {
    return (
        <section className="py-32 bg-neutral-50 flex items-center justify-center relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
                <span className="absolute -top-20 -left-20 text-[20rem] font-serif text-black">“</span>
            </div>

            <div className="container mx-auto px-4 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto"
                >
                    <FaQuoteLeft className="text-4xl md:text-6xl text-neutral-300 mx-auto mb-10" />
                    <h2 className="text-3xl md:text-5xl font-serif font-medium leading-relaxed text-neutral-900 mb-12">
                        &quot;Deepanshu was an excellent and valued member of my team... His knowledge particularly with respect to Angular was vast.&quot;
                    </h2>
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-1 bg-black mb-6"></div>
                        <span className="text-lg font-sans font-bold uppercase tracking-widest text-black mb-2">John Newton</span>
                        <span className="text-sm font-sans text-neutral-500 uppercase tracking-widest">Zinc Systems</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
