"use client";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { FaReact, FaAngular, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";

const skills = [
    { name: "Angular", icon: FaAngular },
    { name: "React", icon: FaReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "TypeScript", icon: SiTypescript },
    { name: "Node.js", icon: FaNodeJs },
    { name: "Tailwind CSS", icon: SiTailwindcss },
];

export default function Skills() {
    return (
        <section className="py-20 bg-white overflow-hidden">
            <SectionTitle title="My Skills" subtitle="Expertise Areas" watermark="Skills" />

            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between mt-10">
                {/* Left Side - Skills List */}
                <div className="w-full md:w-1/2 md:pl-20 mb-16 md:mb-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-center space-x-6 group cursor-default"
                            >
                                <div className="p-4 bg-neutral-50 rounded-full group-hover:bg-black group-hover:text-white transition-colors duration-500 shadow-sm">
                                    <skill.icon className="text-3xl" />
                                </div>
                                <span className="text-2xl font-serif font-medium text-neutral-800 group-hover:translate-x-2 transition-transform duration-500">{skill.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Side - Mobile Mockup */}
                <div className="w-full md:w-1/2 flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: 50, rotate: 5 }}
                        whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="relative w-[280px] h-[580px] bg-black rounded-[3rem] border-[8px] border-gray-900 shadow-2xl overflow-hidden"
                    >
                        {/* Screen Content */}
                        <div className="absolute inset-0 bg-white overflow-hidden flex flex-col">
                            {/* Mock Header */}
                            <div className="h-16 bg-neutral-100 border-b border-neutral-200 flex items-end pb-2 justify-center">
                                <span className="text-xs font-bold text-neutral-400">DEEPANSHU</span>
                            </div>
                            {/* Mock Body */}
                            <div className="flex-1 p-4 space-y-4 bg-neutral-50">
                                <div className="h-32 bg-neutral-200 rounded-2xl animate-pulse"></div>
                                <div className="h-20 bg-neutral-200 rounded-xl animate-pulse delay-75"></div>
                                <div className="h-20 bg-neutral-200 rounded-xl animate-pulse delay-150"></div>
                                <div className="h-20 bg-neutral-200 rounded-xl animate-pulse delay-200"></div>
                            </div>
                        </div>
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-2xl z-20"></div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
