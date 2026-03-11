'use client';

import React from 'react';

export default function BackgroundWeb() {
    return (
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
            {/* Left Geometric Web */}
            <svg
                className="absolute top-1/4 -left-32 w-[600px] h-[600px] text-neonBlue/10 transform -rotate-12"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M 0 50 L 100 50 M 50 0 L 50 100 M 15 15 L 85 85 M 15 85 L 85 15" stroke="currentColor" strokeWidth="0.2" />
                <path d="M 50 20 L 80 50 L 50 80 L 20 50 Z" stroke="currentColor" strokeWidth="0.1" />
                <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.1" />
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.05" />

                {/* Specific intersecting sharp triangles mimicking the image */}
                <path d="M 10 50 L 50 10 L 90 90 Z" stroke="currentColor" strokeWidth="0.1" />
            </svg>

            {/* Right Geometric Web */}
            <svg
                className="absolute top-1/2 -right-32 w-[800px] h-[800px] text-neonPurple/10 transform rotate-12"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Abstract sharp polygons */}
                <path d="M 100 0 L 50 50 L 100 100 Z" stroke="currentColor" strokeWidth="0.15" />
                <path d="M 80 20 L 20 80 M 80 80 L 20 20" stroke="currentColor" strokeWidth="0.1" />
                <path d="M 50 10 L 90 50 L 50 90 L 10 50 Z" stroke="currentColor" strokeWidth="0.05" />
                <path d="M 25 100 L 75 0" stroke="currentColor" strokeWidth="0.2" />
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.05" />
            </svg>

            {/* Subtle floating dots/stars */}
            <div className="absolute top-[30%] left-[20%] w-1.5 h-1.5 rounded-full bg-neonBlue/40 animate-pulse"></div>
            <div className="absolute top-[60%] right-[30%] w-2 h-2 rounded-full bg-neonPurple/40 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-[80%] left-[10%] w-1 h-1 rounded-full bg-cyan-400/40 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
    );
}
