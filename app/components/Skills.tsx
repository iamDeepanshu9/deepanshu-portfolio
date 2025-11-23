"use client";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { useData, getIconComponent } from "../context/DataContext";

export default function Skills() {
    const { skills } = useData();

    return (
        <section className="py-20 bg-white overflow-hidden">
            <SectionTitle title="My Skills" subtitle="Expertise Areas" watermark="Skills" />

            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between mt-10">
                {/* Left Side - Skills List */}
                <div className="w-full md:w-1/2 md:pl-20 mb-16 md:mb-0">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
                        {skills.map((skill, index) => {
                            const Icon = getIconComponent(skill.iconName);
                            return (
                                <motion.div
                                    key={skill.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-center space-x-6 group cursor-default"
                                >
                                    <div className="p-4 bg-neutral-50 rounded-full group-hover:bg-black group-hover:text-white transition-colors duration-500 shadow-sm">
                                        <Icon className="text-3xl" />
                                    </div>
                                    <span className="text-2xl font-serif font-medium text-neutral-800 group-hover:translate-x-2 transition-transform duration-500">
                                        {skill.name}
                                    </span>
                                </motion.div>
                            );
                        })}
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
                            <div className="flex-1 p-4 bg-neutral-50 overflow-y-auto no-scrollbar">
                                <div className="space-y-3">
                                    {skills.slice(0, 5).map((skill) => {
                                        const Icon = getIconComponent(skill.iconName);
                                        return (
                                            <div key={skill.id} className="flex items-center p-2 bg-white rounded-lg shadow-sm border border-neutral-100">
                                                <div className="p-1.5 bg-neutral-100 rounded-md mr-3">
                                                    <Icon className="text-xs text-neutral-600" />
                                                </div>
                                                <span className="text-xs font-medium text-neutral-800">{skill.name}</span>
                                            </div>
                                        );
                                    })}
                                    {skills.length > 5 && (
                                        <div className="text-center pt-2">
                                            <span className="text-[10px] text-neutral-400">and more...</span>
                                        </div>
                                    )}
                                </div>
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
