'use client';

import React from 'react';

const skillsData = [
    {
        name: 'Angular',
        icon: 'fa-angular',
        color: 'blue',
        hex: '#3b82f6',
        iconColor: 'text-blue-500 group-hover:text-blue-400',
        bgIcon: 'bg-blue-500/10',
        hoverBorder: 'hover:border-blue-500',
        hoverShadow: 'hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]',
        boxShadow: '0 0 15px #3b82f6, inset 0 0 10px rgba(59, 130, 246, 0.5)',
        border: '1px solid #3b82f6',
        iconShadow: 'shadow-[0_0_15px_rgba(59,130,246,0.2)]',
    },
    {
        name: 'React',
        icon: 'fa-react',
        color: 'cyan',
        hex: '#00d8ff',
        iconColor: 'text-cyan-400 group-hover:text-cyan-300',
        bgIcon: 'bg-cyan-500/10',
        hoverBorder: 'hover:border-cyan-400',
        hoverShadow: 'hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]',
        boxShadow: '0 0 15px #00d8ff, inset 0 0 10px rgba(0, 216, 255, 0.5)',
        border: '1px solid #00d8ff',
        iconShadow: 'shadow-[0_0_15px_rgba(34,211,238,0.2)]',
    },
    {
        name: 'Next.js',
        icon: 'fa-bolt',
        color: 'purple',
        hex: '#a855f7',
        iconColor: 'text-purple-400 group-hover:text-white',
        bgIcon: 'bg-purple-500/10',
        hoverBorder: 'hover:border-purple-400',
        hoverShadow: 'hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]',
        boxShadow: '0 0 15px #a855f7, inset 0 0 10px rgba(168, 85, 247, 0.5)',
        border: '1px solid #a855f7',
        iconShadow: 'shadow-[0_0_15px_rgba(168,85,247,0.2)]',
        solid: true,
    },
    {
        name: 'TypeScript',
        icon: 'fa-code',
        color: 'blue',
        hex: '#3178c6',
        iconColor: 'text-blue-500 group-hover:text-blue-400',
        bgIcon: 'bg-blue-500/10',
        hoverBorder: 'hover:border-blue-500',
        hoverShadow: 'hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]',
        boxShadow: '0 0 15px #3178c6, inset 0 0 10px rgba(49, 120, 198, 0.5)',
        border: '1px solid #3178c6',
        iconShadow: 'shadow-[0_0_15px_rgba(59,130,246,0.2)]',
        solid: true,
    },
    {
        name: 'Node.js',
        icon: 'fa-node-js',
        color: 'green',
        hex: '#8cc84b',
        iconColor: 'text-green-500 group-hover:text-green-400',
        bgIcon: 'bg-green-500/10',
        hoverBorder: 'hover:border-green-500',
        hoverShadow: 'hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]',
        boxShadow: '0 0 15px #8cc84b, inset 0 0 10px rgba(140, 200, 75, 0.5)',
        border: '1px solid #8cc84b',
        iconShadow: 'shadow-[0_0_15px_rgba(34,197,94,0.2)]',
    },
    {
        name: 'Tailwind CSS',
        icon: 'fa-wind',
        color: 'teal',
        hex: '#38bdf8',
        iconColor: 'text-teal-400 group-hover:text-teal-300',
        bgIcon: 'bg-teal-500/10',
        hoverBorder: 'hover:border-teal-400',
        hoverShadow: 'hover:shadow-[0_0_15px_rgba(45,212,191,0.4)]',
        boxShadow: '0 0 15px #38bdf8, inset 0 0 10px rgba(56, 189, 248, 0.5)',
        border: '1px solid #38bdf8',
        iconShadow: 'shadow-[0_0_15px_rgba(45,212,191,0.2)]',
        solid: true,
    },
];

export default function Skills() {
    return (
        <section className="py-24 bg-bgDark relative" id="skills" style={{ padding: '100px 0' }}>
            {/* Load FontAwesome for icons */}
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <div className="mb-16 text-center">
                    <p className="text-gray-400 text-sm tracking-widest uppercase mb-2">Expertise Areas:</p>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
                        My Skills
                    </h2>
                </div>

                {/* 3-3 Staggered Grid Configuration */}
                <div className="relative flex flex-col gap-6 items-center w-full mt-10">

                    {/* Decorative Background Floating Tiles */}
                    <div className="absolute top-[-40px] left-[10%] w-32 h-32 md:w-40 md:h-40 glass rounded-2xl border border-white/5 opacity-40 blur-[2px] -z-10 -rotate-6"></div>
                    <div className="absolute bottom-[-20px] right-[10%] w-32 h-32 md:w-40 md:h-40 glass rounded-2xl border border-white/5 opacity-30 blur-[4px] -z-10 rotate-12"></div>
                    <div className="absolute top-[40%] left-[50%] w-32 h-32 md:w-40 md:h-40 glass rounded-2xl border border-white/5 opacity-20 blur-[6px] -z-10 -rotate-12 -translate-x-1/2 -translate-y-1/2 scale-150"></div>
                    <div className="absolute bottom-[20%] left-[20%] w-24 h-24 glass rounded-2xl border border-white/5 opacity-40 blur-[3px] -z-10 rotate-45"></div>
                    <div className="absolute top-[20%] right-[20%] w-20 h-20 glass rounded-2xl border border-white/5 opacity-50 blur-[2px] -z-10 -rotate-12"></div>

                    {/* Top Row: 3 items */}
                    <div className="flex flex-wrap justify-center gap-6 md:gap-8 w-full z-10">
                        {skillsData.slice(0, 3).map((skill, index) => (
                            <div
                                key={index}
                                className={`glass p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-4 glow-card group transition-all duration-300 ${skill.hoverBorder} ${skill.hoverShadow} w-32 h-32 md:w-44 md:h-44 shadow-[0_15px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl`}
                                style={{
                                    boxShadow: skill.boxShadow + ', 0 15px 35px rgba(0,0,0,0.5)',
                                    border: skill.border,
                                    transformStyle: 'preserve-3d',
                                    transform: 'translateZ(20px)'
                                }}
                            >
                                <div
                                    className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-colors ${skill.bgIcon} ${skill.iconColor} p-2 shadow-inner`}
                                >
                                    <i className={`${skill.solid ? 'fa-solid' : 'fa-brands'} ${skill.icon} text-3xl md:text-5xl drop-shadow-[0_0_10px_currentColor]`}></i>
                                </div>
                                <span className="font-bold text-gray-200 group-hover:text-white text-sm md:text-lg tracking-wide drop-shadow-md">
                                    {skill.name}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Row: 3 items */}
                    <div className="flex flex-wrap justify-center gap-6 md:gap-8 w-full z-10">
                        {skillsData.slice(3, 6).map((skill, index) => (
                            <div
                                key={index + 3}
                                className={`glass p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center gap-4 glow-card group transition-all duration-300 ${skill.hoverBorder} ${skill.hoverShadow} w-32 h-32 md:w-44 md:h-44 shadow-[0_15px_35px_rgba(0,0,0,0.5)] backdrop-blur-xl`}
                                style={{
                                    boxShadow: skill.boxShadow + ', 0 15px 35px rgba(0,0,0,0.5)',
                                    border: skill.border,
                                    transformStyle: 'preserve-3d',
                                    transform: 'translateZ(20px)'
                                }}
                            >
                                <div
                                    className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-colors ${skill.bgIcon} ${skill.iconColor} p-2 shadow-inner`}
                                >
                                    <i className={`${skill.solid ? 'fa-solid' : 'fa-brands'} ${skill.icon} text-3xl md:text-5xl drop-shadow-[0_0_10px_currentColor]`}></i>
                                </div>
                                <span className="font-bold text-gray-200 group-hover:text-white text-sm md:text-lg tracking-wide drop-shadow-md">
                                    {skill.name}
                                </span>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Pagination Dots beneath */}
                <div className="flex gap-2 mt-12">
                    <div className="w-6 h-1 rounded-full bg-teal-400"></div>
                    <div className="w-6 h-1 rounded-full bg-white/20 hover:bg-white/40 cursor-pointer transition-colors"></div>
                    <div className="w-6 h-1 rounded-full bg-white/20 hover:bg-white/40 cursor-pointer transition-colors"></div>
                </div>
            </div>
        </section>
    );
}
