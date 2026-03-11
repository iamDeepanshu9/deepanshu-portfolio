'use client';

import React from 'react';
import Link from 'next/link';
import { FaTwitter, FaGithub, FaLinkedinIn } from 'react-icons/fa';

export default function Contact() {
    return (
        <footer className="py-24" id="contact">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="glass rounded-[2.5rem] p-12 lg:p-16 border border-white/5 shadow-2xl relative overflow-hidden">

                    {/* Subtle aesthetic glow behind the form */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neonCyan/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Contact Left */}
                        <div className="z-10">
                            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-[1.1]">
                                Let's create <br />
                                something <br />
                                extraordinary.
                            </h2>
                            {/* Removed redundant paragraph describing the project as it's not in the mockup */}
                        </div>

                        {/* Contact Right (Form) */}
                        <div className="z-10 mt-8 lg:mt-0">
                            <form action="#" method="POST" className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="space-y-8">
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full bg-transparent border-0 border-b border-gray-600 focus:border-neonCyan focus:ring-0 text-white placeholder-gray-500 pb-3 transition-colors focus:outline-none text-sm md:text-base font-medium"
                                        placeholder="your name"
                                    />
                                    <input
                                        type="text"
                                        id="project"
                                        name="project"
                                        className="w-full bg-transparent border-0 border-b border-gray-600 focus:border-neonCyan focus:ring-0 text-white placeholder-gray-500 pb-3 transition-colors focus:outline-none text-sm md:text-base font-medium"
                                        placeholder="your project/idea"
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 pt-8">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full flex-1 bg-transparent border-0 border-b border-gray-600 focus:border-neonCyan focus:ring-0 text-white placeholder-gray-500 pb-3 transition-colors focus:outline-none text-sm md:text-base font-medium"
                                        placeholder="your email"
                                    />
                                    <button
                                        type="submit"
                                        className="whitespace-nowrap bg-teal-500/10 border border-teal-500/50 text-teal-300 font-semibold px-8 py-3 rounded-full hover:bg-teal-500/20 hover:text-white transition-colors duration-300 text-sm"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex justify-center text-xs text-teal-500/70 font-medium font-sans uppercase tracking-widest text-center">
                    <p>© {new Date().getFullYear()} <span className="text-teal-400">DEEPANSHU KUMAR.</span> ALL RIGHTS RESERVED.</p>
                </div>
            </div>
        </footer>
    );
}
