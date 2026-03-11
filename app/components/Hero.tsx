'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20" id="home">
      {/* Background Gradient Blob */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-neonBlue/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="z-10 relative mt-10 md:mt-20">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-[1.1] tracking-tight">
              Deepanshu <br />
              Kumar
            </h1>
            <p className="text-gray-400 font-medium tracking-widest text-sm mb-6 mt-6 uppercase">
              SDE2 — REMOTESTATE
            </p>

            {/* Background Outline Text Effect - Brought to foreground and restyled as per mockup */}
            <div
              className="mt-6 mb-10 w-fit"
            >
              <span className="text-4xl md:text-[2.5rem] font-black tracking-widest text-transparent bg-clip-text" style={{
                WebkitTextStroke: '1px #a855f7',
                backgroundImage: 'linear-gradient(90deg, #a855f7, #3b82f6, #06b6d4)',
              }}>
                BUILDING FUTURE TECH
              </span>
            </div>

            <div className="flex flex-wrap gap-4 mt-8 relative z-20">
              <Link
                href="#works"
                className="px-6 py-3 bg-neonBlue/10 hover:bg-neonBlue/20 border border-neonBlue border-opacity-50 rounded-full text-white font-medium transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]"
              >
                View Projects
              </Link>
              <Link
                href="#contact"
                className="px-6 py-3 text-teal-300 hover:text-white font-medium border-b border-teal-500/50 hover:border-teal-400 transition-all flex items-center gap-2"
              >
                Let's Connect
              </Link>
            </div>
          </div>

          {/* Right Content (Image) */}
          <div className="relative flex justify-center lg:justify-end z-10">
            {/* Decorative circle behind image */}
            <div className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-neonBlue/20 to-neonPurple/20 rounded-full blur-2xl animate-pulse"></div>

            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8QsAJdHMFOBCPwvp1hgdvJs2Ek_41F0-zelI23nsm0qE-lKy2pq_Qlvwg0JUi8g2x9f_2DOQDiByod7fzCVH4TzoUvv6m4TparfN87_R3tJIawRh1aKgdN18YDbbFGUBE6_jk5THOepeNuHZPIm5RSnTeztWxjLZpICh5qQwL6sxfFFA7EVYAmwERaDCLOWazQGmY7CEbowgInAfyjNEnDD5B3z8ir8SG8ZLmRf7VUFJpjGXPUNCKcmy-xHb7XuGzHyM_iVuiENg"
              alt="3D Developer Illustration"
              width={500}
              height={500}
              className="relative w-full max-w-md drop-shadow-2xl transform hover:scale-105 transition-transform duration-500 h-auto"
              priority
            />
          </div>

        </div>
      </div>
    </section>
  );
}
