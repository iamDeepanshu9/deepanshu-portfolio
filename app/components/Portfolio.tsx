'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
    {
        title: 'Chartis Review',
        category: 'Healthcare',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnqWB6a757cAS9kKB9bAy3zg4XgHh3gVcxMeVXqY3KxZDzss_TVqsfMq1WSZQD8wuf_QcaPjzu-hGFX3IzVongH9asTQY31VR7o-chi-oEggxq0tegW4-j1JtIkZlXyx4ZiRoGGl93AbahTimn6_et-4JJBgveoAlyIqYZaslDdA6OiCmzEKqptdiS3_TFJEkzkLScoh0p_QlwwAIujE_-bjI3IHF_aJkYgZFzmGvpLadPmFWuvyvCsXS0PDc9c8hVqssrE8FsnNU',
        link: '#',
        cardBg: 'bg-gradient-to-br from-slate-700/40 to-slate-800/60',
    },
    {
        title: 'Zinc Synapse',
        category: 'Enterprise',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUYOq2tjEvKCXiclSDSrBQGcqYqzexYdkyxmRYxc5TzceS1yJhDI7JHj3JJz_mWE5leTLw-wc2-_sFXgoZcM5r6BOm3qKPO9Wz_7Gg6XQN1JdDv3lvYrdtxuKrQqg6ZVUs3XLMIksiAfapW3sJHurI9XGY7-2r_oInE5SHEovWAatrXitnfAFChB4k8fDsV0YtyOUV4CB01TnjwAVdMnH1bA77i53BOs_rTXAWblmaWQXNJ65FYc_m_YOaoPh5D6PErSI1jLHf6k4',
        link: '#',
        cardBg: 'bg-gradient-to-br from-indigo-900/60 to-slate-900/80',
    },
    {
        title: 'Anderson Tax',
        category: 'Finance',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMVdC1wS3bc6Y_ZI5HW5QgCv7_qxaL1vlOha183XMzkRTCPP2lH87NgQZcjJCJaLYM-ep9H5EsR9cJ0SarY3QTW_mv7llZ5gs0B9RZO4XyfB_Xg8NoKwX5sHdgVVxU1Tpc1-pb1kZ1n3O4oIHQiD-sRT0TzFoAmpisqYXjVlr5BJ-A5xn-Tk28XQABGDxIzaWO8pcDeX37HoEI_LpbY3ojJypz04BVNb_DRXVvdgJMKYoblrG9T3c5zdYr8AvZV18x5XDtBPUpSpA',
        link: '#',
        cardBg: 'bg-gradient-to-br from-teal-800/50 to-cyan-900/60',
    },
    {
        title: 'YourDaily',
        category: 'E-commerce',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAnqWB6a757cAS9kKB9bAy3zg4XgHh3gVcxMeVXqY3KxZDzss_TVqsfMq1WSZQD8wuf_QcaPjzu-hGFX3IzVongH9asTQY31VR7o-chi-oEggxq0tegW4-j1JtIkZlXyx4ZiRoGGl93AbahTimn6_et-4JJBgveoAlyIqYZaslDdA6OiCmzEKqptdiS3_TFJEkzkLScoh0p_QlwwAIujE_-bjI3IHF_aJkYgZFzmGvpLadPmFWuvyvCsXS0PDc9c8hVqssrE8FsnNU',
        link: '#',
        cardBg: 'bg-gradient-to-br from-amber-800/40 to-orange-900/50',
    },
    {
        title: 'Transchain',
        category: 'Logistics',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUYOq2tjEvKCXiclSDSrBQGcqYqzexYdkyxmRYxc5TzceS1yJhDI7JHj3JJz_mWE5leTLw-wc2-_sFXgoZcM5r6BOm3qKPO9Wz_7Gg6XQN1JdDv3lvYrdtxuKrQqg6ZVUs3XLMIksiAfapW3sJHurI9XGY7-2r_oInE5SHEovWAatrXitnfAFChB4k8fDsV0YtyOUV4CB01TnjwAVdMnH1bA77i53BOs_rTXAWblmaWQXNJ65FYc_m_YOaoPh5D6PErSI1jLHf6k4',
        link: '#',
        cardBg: 'bg-gradient-to-br from-green-900/50 to-emerald-900/60',
    },
    {
        title: 'Prudential Philippines',
        category: 'Insurance',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMVdC1wS3bc6Y_ZI5HW5QgCv7_qxaL1vlOha183XMzkRTCPP2lH87NgQZcjJCJaLYM-ep9H5EsR9cJ0SarY3QTW_mv7llZ5gs0B9RZO4XyfB_Xg8NoKwX5sHdgVVxU1Tpc1-pb1kZ1n3O4oIHQiD-sRT0TzFoAmpisqYXjVlr5BJ-A5xn-Tk28XQABGDxIzaWO8pcDeX37HoEI_LpbY3ojJypz04BVNb_DRXVvdgJMKYoblrG9T3c5zdYr8AvZV18x5XDtBPUpSpA',
        link: '#',
        cardBg: 'bg-gradient-to-br from-red-900/50 to-rose-900/60',
    },
];

export default function Portfolio() {
    return (
        <section className="py-24 bg-bgDark relative" id="works" style={{ padding: '80px 0', backgroundColor: '#020617' }}>
            {/* Background subtle gradient */}
            <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-neonPurple/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
                            Selected Works
                        </h2>
                    </div>

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <article
                            key={index}
                            className={`group rounded-2xl overflow-hidden ${project.cardBg} border border-white/5 transition-all duration-300 hover:shadow-2xl hover:border-white/15 hover:-translate-y-1`}
                        >
                            <div className="relative h-40 overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={400}
                                    height={300}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors"></div>
                            </div>

                            <div className="p-4 relative flex flex-col justify-between" style={{ minHeight: '100px' }}>
                                <div>
                                    <h3 className="text-sm font-bold text-white mb-0.5">
                                        {project.title} - {project.category}
                                    </h3>
                                </div>
                                <div className="mt-3">
                                    <Link
                                        href={project.link}
                                        className="inline-flex items-center text-xs font-semibold text-gray-300 transition-colors px-4 py-1.5 rounded-full border border-white/10 hover:bg-white/5"
                                    >
                                        View Project
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
