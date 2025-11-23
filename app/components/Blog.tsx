"use client";

import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";
import { useData } from "../context/DataContext";

export default function Blog() {
    const { blogs } = useData();

    return (
        <section className="py-24 bg-neutral-50" id="blog">
            <SectionTitle title="Latest Insights" subtitle="My Blog" watermark="Thoughts" />

            <div className="container mx-auto px-4 mt-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {blogs.slice(0, 3).map((blog, index) => (
                        <motion.article
                            key={blog.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-neutral-100 flex flex-col h-full"
                        >
                            <div className="mb-6">
                                <span className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
                                    {blog.date} • {blog.readTime}
                                </span>
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-neutral-800 mb-4 leading-tight">
                                {blog.title}
                            </h3>
                            <p className="text-neutral-500 mb-8 flex-grow leading-relaxed">
                                {blog.excerpt}
                            </p>
                            <div className="mt-auto">
                                <a
                                    href={`/blog/${blog.slug}`}
                                    className="inline-flex items-center text-sm font-medium text-black hover:text-neutral-600 transition-colors group"
                                >
                                    Read Article
                                    <svg
                                        className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <a
                        href="/blogs"
                        className="inline-block px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-neutral-800 transition-colors"
                    >
                        View All Blogs
                    </a>
                </div>
            </div>
        </section>
    );
}
