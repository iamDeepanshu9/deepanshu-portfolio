'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
    {
        label: 'Blog post',
        title: 'Hello World!!!',
        author: 'Ashra Newtown',
        date: 'Jan 5, 2024',
        authorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4fcrkG5aqjhnf7PJ8NO9AdtFhCra9N0vCijSM2vA0HpBFMTwKBCTxDJ91ezc3_fX3Sfon4JRK6Y1Q3dj_AUugZ8wWQlD5XfeHaGniubg9nFSqIx3A5UHGSRwBMqcTf4DDlJJM4GMuvvcAEmMUo76jz2mkIABEbzEC7uxl_nL1vdljBMU8RyP5gKsOd6Ya8Jnh8_rOF2bzOgWHakPNdMwqI5y2ngsILxvj4aBNT3MwV8k3MyQJYPpKNiH3UoVezWPsVWr-9Mo3yOY',
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnqWB6a757cAS9kKB9bAy3zg4XgHh3gVcxMeVXqY3KxZDzss_TVqsfMq1WSZQD8wuf_QcaPjzu-hGFX3IzVongH9asTQY31VR7o-chi-oEggxq0tegW4-j1JtIkZlXyx4ZiRoGGl93AbahTimn6_et-4JJBgveoAlyIqYZaslDdA6OiCmzEKqptdiS3_TFJEkzkLScoh0p_QlwwAIujE_-bjI3IHF_aJkYgZFzmGvpLadPmFWuvyvCsXS0PDc9c8hVqssrE8FsnNU',
        link: '#',
    },
    {
        label: 'Blog post',
        title: 'Why react.js is important?',
        author: 'Button Newton',
        date: 'Jun 5, 2024',
        authorImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4fcrkG5aqjhnf7PJ8NO9AdtFhCra9N0vCijSM2vA0HpBFMTwKBCTxDJ91ezc3_fX3Sfon4JRK6Y1Q3dj_AUugZ8wWQlD5XfeHaGniubg9nFSqIx3A5UHGSRwBMqcTf4DDlJJM4GMuvvcAEmMUo76jz2mkIABEbzEC7uxl_nL1vdljBMU8RyP5gKsOd6Ya8Jnh8_rOF2bzOgWHakPNdMwqI5y2ngsILxvj4aBNT3MwV8k3MyQJYPpKNiH3UoVezWPsVWr-9Mo3yOY',
        thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUYOq2tjEvKCXiclSDSrBQGcqYqzexYdkyxmRYxc5TzceS1yJhDI7JHj3JJz_mWE5leTLw-wc2-_sFXgoZcM5r6BOm3qKPO9Wz_7Gg6XQN1JdDv3lvYrdtxuKrQqg6ZVUs3XLMIksiAfapW3sJHurI9XGY7-2r_oInE5SHEovWAatrXitnfAFChB4k8fDsV0YtyOUV4CB01TnjwAVdMnH1bA77i53BOs_rTXAWblmaWQXNJ65FYc_m_YOaoPh5D6PErSI1jLHf6k4',
        link: '#',
    },
];

export default function Blog() {
    return (
        <div className="py-24 bg-bgDark" id="insights" style={{ padding: '100px 0' }}>
            <h2 className="text-3xl font-bold mb-8 text-white">
                Latest Insights
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
                {blogPosts.map((post, index) => (
                    <div key={index} className="group flex-1 glass rounded-xl border border-white/5 overflow-hidden hover:bg-white/5 transition-all">
                        {/* Thumbnail Image */}
                        <div className="relative h-28 overflow-hidden">
                            <Image
                                src={post.thumbnail}
                                alt={post.title}
                                width={300}
                                height={150}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-2 left-2">
                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-sm">
                                    {post.label}
                                </span>
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-3">
                            <h3 className="text-sm font-bold text-white mb-2 line-clamp-2 group-hover:text-neonCyan transition-colors">
                                {post.title}
                            </h3>

                            {/* Author Info */}
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-5 h-5 rounded-full overflow-hidden bg-gray-700">
                                    <Image
                                        src={post.authorImage}
                                        alt={post.author}
                                        width={20}
                                        height={20}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] text-gray-400 font-medium">{post.author}</span>
                                    <span className="text-[10px] text-gray-500">{post.date}</span>
                                </div>
                            </div>

                            <Link
                                href={post.link}
                                className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors"
                            >
                                Read Article
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
