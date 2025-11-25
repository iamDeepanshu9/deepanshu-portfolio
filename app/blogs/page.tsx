"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useData } from "../context/DataContext";
import SectionTitle from "../components/SectionTitle";

export default function AllBlogsPage() {
    const { blogs, isLoading } = useData();
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"newest" | "oldest" | "likes">("newest");

    const filteredAndSortedBlogs = useMemo(() => {
        let result = [...blogs];

        // Filter by search query
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter((blog) =>
                blog.title.toLowerCase().includes(query)
            );
        }

        // Sort
        result.sort((a, b) => {
            if (sortBy === "newest") {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            } else if (sortBy === "oldest") {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
            } else if (sortBy === "likes") {
                return b.likes - a.likes;
            }
            return 0;
        });

        return result;
    }, [blogs, searchQuery, sortBy]);

    return (
        <div className="min-h-screen bg-neutral-50 pt-32 pb-20">
            <SectionTitle title="All Articles" subtitle="My Blog" watermark="Insights" />

            <div className="container mx-auto px-4 mt-12">
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black mx-auto mb-4"></div>
                            <p className="text-neutral-600 font-medium">Loading articles...</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Controls */}
                        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4 max-w-4xl mx-auto">
                            <div className="relative w-full md:w-96">
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-6 py-3 rounded-full border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent shadow-sm"
                                />
                                <svg
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>

                            <div className="flex items-center space-x-4">
                                <span className="text-sm font-medium text-neutral-500">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as any)}
                                    className="px-4 py-2 rounded-lg border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-black text-sm font-medium"
                                >
                                    <option value="newest">Newest</option>
                                    <option value="oldest">Oldest</option>
                                    <option value="likes">Most Liked</option>
                                </select>
                            </div>
                        </div>

                        {/* Blog Grid */}
                        {filteredAndSortedBlogs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredAndSortedBlogs.map((blog, index) => (
                                    <motion.article
                                        key={blog.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.05 }}
                                        className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-neutral-100 flex flex-col h-full"
                                    >
                                        <div className="mb-6 flex justify-between items-center">
                                            <span className="text-xs font-bold tracking-widest text-neutral-400 uppercase">
                                                {blog.date} • {blog.readTime}
                                            </span>
                                            <span className="text-xs font-medium text-neutral-400 flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                                                </svg>
                                                {blog.likes}
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
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-xl text-neutral-500 font-serif">No articles found matching your search.</p>
                                <button
                                    onClick={() => { setSearchQuery(""); setSortBy("newest"); }}
                                    className="mt-4 text-black underline hover:text-neutral-600"
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
