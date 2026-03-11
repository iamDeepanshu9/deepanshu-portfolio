'use client';

import React from 'react';
import Image from 'next/image';

export default function Testimonials() {
    return (
        <div className="py-24 bg-bgDark relative" style={{ padding: '100px 0' }}>
            <div className="flex justify-between items-center mb-8">
                <div></div>
                {/* Navigation Arrows */}
                <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                        <span className="sr-only">Previous</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                    </button>
                    <button className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                        <span className="sr-only">Next</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                    </button>
                </div>
            </div>

            <div className="relative glass p-8 md:p-10 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent">
                {/* Large Opening Quote Mark */}
                <div className="text-6xl md:text-8xl font-bold text-teal-400/80 leading-none mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                    &ldquo;&ldquo;
                </div>

                <blockquote className="relative z-10">
                    <p className="text-lg md:text-xl text-gray-200 font-light italic leading-relaxed mb-6">
                        &ldquo;Deepanshu was an excellent and valued member of my team…
                        always exceeded expectations.&rdquo;
                    </p>
                    <footer className="flex items-center gap-4">
                        <div>
                            <cite className="not-italic font-bold text-white block">~ John Newton</cite>
                        </div>
                    </footer>
                </blockquote>

                {/* Signature Placeholder */}
                <div className="absolute bottom-8 right-8 w-24 opacity-50 hidden md:block">
                    <Image
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGLJc7UZ_WX607n4ijX0OPT7C9J-bX9LfaiIcGs-D-VgbJIsz5RA5n6oVkGwvVUOpSnswO3nBCEQ5ioRgOY7FaIgsA7uOB-IiD8WakdyGJLe9iaADewEA5yqzhGIlMOqtdKh3AVrw4eFgUy5MQcsPUzTyaUhZOMGL0-_sryGcTUIu7nlUd4-TBwdyfOdMjQOW_X3_OIiHqtcbZxgzm-ZVSzQSgg4ajrZPzl_bScsu3Z-VZ2cr4WHqhYa_yDlFeRmoyrWMDgMyMnDk"
                        alt="Signature"
                        width={96}
                        height={48}
                    />
                </div>

                {/* Large Closing Quote Mark */}
                <div className="absolute bottom-6 right-24 md:right-32 text-6xl md:text-8xl font-bold text-teal-400/80 leading-none" style={{ fontFamily: 'Georgia, serif' }}>
                    &rdquo;&rdquo;
                </div>
            </div>
        </div>
    );
}
