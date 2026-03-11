'use client';

import React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';

export default function Navbar() {
    return (
        <header className="fixed w-full top-0 z-50 pt-6 px-4 sm:px-6 lg:px-8 pointer-events-none">
            <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
                {/* Logo */}
                <div className="flex-shrink-0">
                    <Link href="/" className="text-3xl font-extrabold tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                        DK<span className="text-neonCyan">.</span>
                    </Link>
                </div>

                {/* Center Pill Menu */}
                <nav className="hidden md:flex items-center glass rounded-full px-2 py-1.5 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-white/10">
                    <Link href="/" className="text-white bg-teal-500/20 text-teal-300 px-5 py-2 rounded-full text-sm font-medium transition-colors border border-teal-500/30">
                        Home
                    </Link>
                    <Link href="#about" className="text-gray-300 hover:text-white px-5 py-2 rounded-full text-sm font-medium transition-colors">
                        About
                    </Link>
                    <Link href="#skills" className="text-gray-300 hover:text-white px-5 py-2 rounded-full text-sm font-medium transition-colors">
                        Skills
                    </Link>
                    <Link href="#works" className="text-gray-300 hover:text-white px-5 py-2 rounded-full text-sm font-medium transition-colors">
                        Works
                    </Link>
                    <Link href="#insights" className="text-gray-300 hover:text-white px-5 py-2 rounded-full text-sm font-medium transition-colors">
                        Insights
                    </Link>
                    <Link href="#contact" className="text-gray-300 hover:text-white px-5 py-2 rounded-full text-sm font-medium transition-colors">
                        Contact
                    </Link>
                </nav>

                {/* Resume Button */}
                <div className="hidden md:block">
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass border-teal-500/50 text-teal-300 hover:bg-teal-500/20 hover:text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
                    >
                        Resume
                    </a>
                </div>

                {/* Mobile menu button */}
                <div className="flex md:hidden glass rounded-full p-2 border-white/10">
                    <button
                        className="inline-flex items-center justify-center p-2 rounded-full text-gray-300 hover:text-white focus:outline-none"
                        type="button"
                        aria-label="Open menu"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>
        </header>
    );
}
