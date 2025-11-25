"use client";

import { useParams } from "next/navigation";
import { useData } from "../../context/DataContext";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function BlogDetail() {
    const { slug } = useParams();
    const { blogs, likeBlog, addComment, isLoading } = useData();
    const blog = blogs.find((b) => b.slug === slug);

    const [commentText, setCommentText] = useState("");
    const [userName, setUserName] = useState("");

    // Show loading state while data is being fetched
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black mx-auto mb-4"></div>
                    <p className="text-neutral-600 font-medium">Loading article...</p>
                </div>
            </div>
        );
    }

    // Show not found state if blog doesn't exist
    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center max-w-md px-4">
                    <h1 className="text-6xl font-serif font-bold text-neutral-900 mb-4">404</h1>
                    <p className="text-xl text-neutral-600 mb-8">Article not found</p>
                    <p className="text-neutral-500 mb-8">The article you're looking for doesn't exist or has been removed.</p>
                    <Link
                        href="/blogs"
                        className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors font-medium"
                    >
                        ← Back to All Articles
                    </Link>
                </div>
            </div>
        );
    }

    const handleLike = () => {
        likeBlog(blog.id);
    };

    const handleShare = () => {
        const url = window.location.href;
        if (navigator.share) {
            navigator.share({
                title: blog.title,
                text: blog.excerpt,
                url: url,
            });
        } else {
            navigator.clipboard.writeText(url);
            alert("Link copied to clipboard!");
        }
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (commentText && userName) {
            addComment(blog.id, { user: userName, text: commentText });
            setCommentText("");
            setUserName("");
        }
    };

    return (
        <article className="min-h-screen bg-white pt-20 pb-20">
            <div className="container mx-auto px-4 max-w-3xl">
                <Link
                    href="/#blog"
                    className="inline-flex items-center text-sm text-neutral-500 hover:text-black mb-8 transition-colors"
                >
                    ← Back to Blogs
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <header className="mb-10">
                        <div className="flex items-center gap-4 text-sm text-neutral-500 mb-4">
                            <span>{blog.date}</span>
                            <span>•</span>
                            <span>{blog.readTime}</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-black mb-6 leading-tight">
                            {blog.title}
                        </h1>
                    </header>

                    {/* Blog Content */}
                    <div
                        className="prose prose-lg max-w-none prose-neutral font-serif"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    {/* Interactions */}
                    <div className="border-t border-b border-neutral-100 py-6 my-12 flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <button
                                onClick={handleLike}
                                className="flex items-center gap-2 text-neutral-600 hover:text-red-500 transition-colors group"
                            >
                                <svg
                                    className="w-6 h-6 group-hover:fill-current"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                                <span>{blog.likes} Likes</span>
                            </button>
                            <button
                                onClick={handleShare}
                                className="flex items-center gap-2 text-neutral-600 hover:text-black transition-colors"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                    />
                                </svg>
                                <span>Share</span>
                            </button>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <section>
                        <h3 className="text-2xl font-bold mb-8">Comments ({blog.comments?.filter(c => !c.hidden).length || 0})</h3>

                        {/* Comment Form */}
                        <form onSubmit={handleCommentSubmit} className="mb-12 bg-neutral-50 p-6 rounded-xl">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
                                <input
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-neutral-700 mb-1">Comment</label>
                                <textarea
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black h-24"
                                    placeholder="Share your thoughts..."
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors"
                            >
                                Post Comment
                            </button>
                        </form>

                        {/* Comments List */}
                        <div className="space-y-6">
                            {blog.comments?.filter(c => !c.hidden).map((comment) => (
                                <div key={comment.id} className="border-b border-neutral-100 pb-6 last:border-0">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-bold text-neutral-900">{comment.user}</h4>
                                        <span className="text-xs text-neutral-500">{comment.date}</span>
                                    </div>
                                    <p className="text-neutral-600">{comment.text}</p>
                                </div>
                            ))}
                            {(!blog.comments || blog.comments.filter(c => !c.hidden).length === 0) && (
                                <p className="text-neutral-400 italic">No comments yet. Be the first to share!</p>
                            )}
                        </div>
                    </section>
                </motion.div>
            </div>
        </article>
    );
}
