import React from "react";

interface SectionTitleProps {
    title: string;
    subtitle?: string;
    watermark: string;
    className?: string;
}

export default function SectionTitle({
    title,
    subtitle,
    watermark,
    className = "",
}: SectionTitleProps) {
    return (
        <div
            className={`relative flex flex-col items-center justify-center py-24 overflow-hidden ${className}`}
        >
            {/* Watermark */}
            <span className="absolute text-[10rem] md:text-[15rem] font-serif font-bold text-black/5 select-none pointer-events-none z-0 leading-none tracking-widest uppercase opacity-10 whitespace-nowrap">
                {watermark}
            </span>

            {/* Content */}
            <div className="relative z-10 text-center">
                {subtitle && (
                    <span className="block text-sm font-sans font-medium tracking-[0.3em] text-gray-500 uppercase mb-4">
                        {subtitle}
                    </span>
                )}
                <h2 className="text-5xl md:text-7xl font-serif font-bold text-black">
                    {title}
                </h2>
            </div>
        </div>
    );
}
