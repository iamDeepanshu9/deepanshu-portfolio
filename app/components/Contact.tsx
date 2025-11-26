"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaCheck } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        project: "",
        email: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
    const containerRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.project || !form.email) return;

        setStatus("sending");

        try {
            const { error } = await supabase
                .from("contacts")
                .insert([
                    {
                        name: form.name,
                        email: form.email,
                        project: form.project,
                    },
                ]);

            if (error) throw error;

            setStatus("success");

            // Reset after delay
            setTimeout(() => {
                setStatus("idle");
                setForm({ name: "", project: "", email: "" });
            }, 5000);
        } catch (error) {
            console.error("Error submitting contact form:", error);
            setStatus("idle");
            // You might want to add an error state/message here
            alert("Failed to send message. Please try again.");
        }
    };

    const handleInputResize = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        target.style.width = `${Math.max(target.value.length, 10)}ch`;
    };

    return (
        <section className="py-32 bg-black text-white relative overflow-hidden" id="contact">
            {/* Background Noise/Gradient */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800 via-black to-black animate-spin-slow"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                            Let's create something <span className="text-neutral-500">extraordinary.</span>
                        </h2>
                        <p className="text-xl text-neutral-400 max-w-2xl">
                            Have an idea? Let's discuss how we can bring it to life.
                        </p>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {status === "success" ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                                className="flex flex-col items-center justify-center py-20 text-center"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                                    className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-8"
                                >
                                    <FaCheck className="text-white text-4xl" />
                                </motion.div>
                                <h3 className="text-4xl md:text-5xl font-serif font-bold mb-4">Thank You!</h3>
                                <p className="text-xl text-neutral-400 max-w-lg">
                                    I've received your message and will get back to you as soon as possible.
                                </p>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                viewport={{ once: true }}
                                onSubmit={handleSubmit}
                                className="text-2xl md:text-4xl font-serif leading-relaxed"
                            >
                                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-4">
                                    <span>Hi Deepanshu, my name is</span>
                                    <div className="relative inline-block">
                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={(e) => {
                                                setForm({ ...form, name: e.target.value });
                                                handleInputResize(e);
                                            }}
                                            placeholder="your name"
                                            className="bg-transparent border-b-2 border-neutral-700 focus:border-white outline-none text-white placeholder-neutral-600 min-w-[150px] transition-colors text-center"
                                            style={{ width: "200px" }}
                                        />
                                    </div>
                                    <span>and I'd like to discuss</span>
                                    <div className="relative inline-block">
                                        <input
                                            type="text"
                                            value={form.project}
                                            onChange={(e) => {
                                                setForm({ ...form, project: e.target.value });
                                                handleInputResize(e);
                                            }}
                                            placeholder="your idea"
                                            className="bg-transparent border-b-2 border-neutral-700 focus:border-white outline-none text-white placeholder-neutral-600 min-w-[200px] transition-colors text-center"
                                            style={{ width: "200px" }}
                                        />
                                        <span>.</span>
                                    </div>
                                    <span>You can email me at</span>
                                    <div className="relative inline-block">
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => {
                                                setForm({ ...form, email: e.target.value });
                                                handleInputResize(e);
                                            }}
                                            placeholder="your email"
                                            className="bg-transparent border-b-2 border-neutral-700 focus:border-white outline-none text-white placeholder-neutral-600 min-w-[250px] transition-colors text-center"
                                            style={{ width: "350px" }}
                                        />
                                    </div>
                                    <span>.</span>
                                </div>

                                <div className="mt-16">
                                    <button
                                        type="submit"
                                        disabled={status !== "idle"}
                                        className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black rounded-full font-sans font-bold text-lg overflow-hidden transition-all hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
                                    >
                                        <span className={`flex items-center transition-transform duration-500 ${status === "sending" ? "-translate-y-[150%]" : "translate-y-0"}`}>
                                            Send Message
                                            <FaPaperPlane className="ml-3 text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </span>

                                        <span className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${status === "sending" ? "translate-y-0" : "translate-y-[150%]"}`}>
                                            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                        </span>
                                    </button>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
