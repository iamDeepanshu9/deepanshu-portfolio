"use client";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { useData } from "../context/DataContext";

export default function Portfolio() {
    const { projects } = useData();

    return (
        <section id="portfolio" className="py-24 bg-white">
            <SectionTitle title="Selected Works" subtitle="Portfolio" watermark="Works" />

            <div className="container mx-auto px-4 mt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative w-full aspect-[4/3] overflow-hidden cursor-pointer"
                        >
                            {/* Base Layer (Image Placeholder) */}
                            <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                                <div className="text-center">
                                    <h3 className="text-3xl font-serif font-bold text-neutral-300">
                                        {project.title}
                                    </h3>
                                    <p className="text-neutral-300 uppercase tracking-widest text-sm mt-2">
                                        {project.category}
                                    </p>
                                </div>
                            </div>

                            {/* Hover Overlay (The "Black Card") */}
                            <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-10 text-center translate-y-4 group-hover:translate-y-0">
                                <span className="text-white/60 text-xs md:text-sm tracking-[0.3em] uppercase mb-6">
                                    {project.category}
                                </span>
                                <h3 className="text-3xl md:text-5xl font-serif text-white mb-2">
                                    {project.title}
                                </h3>
                                {project.subtitle && (
                                    <span className="text-white/60 font-serif italic mb-6">
                                        {project.subtitle}
                                    </span>
                                )}
                                <p className="text-white/80 font-sans text-sm md:text-base max-w-md leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                                    <span className="inline-block border-b border-white/30 text-white text-sm pb-1 hover:border-white transition-colors">
                                        View Project
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
