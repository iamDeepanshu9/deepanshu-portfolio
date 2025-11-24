"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useData, Skill, Project, Blog, Testimonial } from "../context/DataContext";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

export default function AdminPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState<"skills" | "projects" | "blogs" | "testimonials">("skills");

    const {
        skills,
        projects,
        blogs,
        testimonials,
        addSkill,
        updateSkill,
        deleteSkill,
        addProject,
        updateProject,
        deleteProject,
        addBlog,
        updateBlog,
        deleteBlog,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
    } = useData();

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setIsAuthenticated(!!session);
            setIsLoading(false);
        };

        checkSession();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        }
        setIsLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
                    <h2 className="text-2xl font-serif font-bold text-center mb-6 text-black">Admin Login</h2>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-800 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-400 rounded-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                placeholder="Enter email"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-800 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-400 rounded-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                                placeholder="Enter password"
                            />
                        </div>
                        {error && <p className="text-red-600 text-sm text-center font-medium">{error}</p>}
                        <button
                            type="submit"
                            className="w-full py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition-colors"
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-serif font-bold text-black">Admin Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm text-red-700 hover:bg-red-100 rounded-lg transition-colors font-medium"
                    >
                        Logout
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex space-x-4 mb-8 border-b border-gray-300">
                    {(["skills", "projects", "blogs", "testimonials"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`pb-4 px-4 text-sm font-bold capitalize transition-colors relative ${activeTab === tab ? "text-black" : "text-gray-600 hover:text-black"
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
                    {activeTab === "skills" && (
                        <SkillsManager
                            skills={skills}
                            addSkill={addSkill}
                            updateSkill={updateSkill}
                            deleteSkill={deleteSkill}
                        />
                    )}
                    {activeTab === "projects" && (
                        <ProjectsManager
                            projects={projects}
                            addProject={addProject}
                            updateProject={updateProject}
                            deleteProject={deleteProject}
                        />
                    )}
                    {activeTab === "blogs" && (
                        <BlogsManager
                            blogs={blogs}
                            addBlog={addBlog}
                            updateBlog={updateBlog}
                            deleteBlog={deleteBlog}
                        />
                    )}
                    {activeTab === "testimonials" && (
                        <TestimonialsManager
                            testimonials={testimonials}
                            addTestimonial={addTestimonial}
                            updateTestimonial={updateTestimonial}
                            deleteTestimonial={deleteTestimonial}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

// --- Sub-components for Management ---

function SkillsManager({
    skills,
    addSkill,
    updateSkill,
    deleteSkill,
}: {
    skills: Skill[];
    addSkill: (s: any) => void;
    updateSkill: (id: string, s: any) => void;
    deleteSkill: (id: string) => void;
}) {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);

    // Extract unique categories for suggestions
    const existingCategories = Array.from(new Set(skills.map((s) => s.category).filter(Boolean)));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && category) {
            if (editingId) {
                updateSkill(editingId, { name, category });
                setEditingId(null);
            } else {
                addSkill({ name, category });
            }
            setName("");
            setCategory("");
        }
    };

    const handleEdit = (skill: Skill) => {
        setName(skill.name);
        setCategory(skill.category || "");
        setEditingId(skill.id);
    };

    const handleCancel = () => {
        setEditingId(null);
        setName("");
        setCategory("");
    };

    return (
        <div>
            <h3 className="text-xl font-bold mb-6 text-black">
                {editingId ? "Edit Skill" : "Add New Skill"}
            </h3>
            <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Skill Name"
                    className="flex-1 px-4 py-2 border border-gray-400 rounded-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                />
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category (e.g. Frontend)"
                    list="category-suggestions"
                    className="flex-1 px-4 py-2 border border-gray-400 rounded-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                />
                <datalist id="category-suggestions">
                    {existingCategories.map((cat) => (
                        <option key={cat} value={cat} />
                    ))}
                </datalist>
                <button
                    type="submit"
                    className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 font-medium"
                >
                    {editingId ? "Update" : "Add"}
                </button>
                {editingId && (
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-6 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 font-medium"
                    >
                        Cancel
                    </button>
                )}
            </form>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {skills.map((skill) => (
                    <div
                        key={skill.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-white hover:shadow-sm transition-all"
                    >
                        <div>
                            <p className="font-bold text-gray-800">{skill.name}</p>
                            <p className="text-xs text-gray-500">{skill.category}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(skill)}
                                className="text-blue-700 hover:text-blue-900 text-sm font-medium"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteSkill(skill.id)}
                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ProjectsManager({
    projects,
    addProject,
    updateProject,
    deleteProject,
}: {
    projects: Project[];
    addProject: (p: any) => void;
    updateProject: (id: number, p: any) => void;
    deleteProject: (id: number) => void;
}) {
    const [form, setForm] = useState({
        title: "",
        subtitle: "",
        category: "",
        description: "",
    });
    const [editingId, setEditingId] = useState<number | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (form.title) {
            if (editingId) {
                updateProject(editingId, form);
                setEditingId(null);
            } else {
                addProject({ ...form, color: "bg-neutral-900" });
            }
            setForm({ title: "", subtitle: "", category: "", description: "" });
        }
    };

    const handleEdit = (project: Project) => {
        setForm({
            title: project.title,
            subtitle: project.subtitle,
            category: project.category,
            description: project.description,
        });
        setEditingId(project.id);
    };

    const handleCancel = () => {
        setEditingId(null);
        setForm({ title: "", subtitle: "", category: "", description: "" });
    };

    return (
        <div>
            <h3 className="text-xl font-bold mb-6 text-black">
                {editingId ? "Edit Project" : "Add New Project"}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="px-4 py-2 border border-gray-400 rounded-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                />
                <input
                    type="text"
                    placeholder="Subtitle"
                    value={form.subtitle}
                    onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                    className="px-4 py-2 border border-gray-400 rounded-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="px-4 py-2 border border-gray-400 rounded-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                />
                <textarea
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="px-4 py-2 border border-gray-400 rounded-lg md:col-span-2 text-black placeholder-gray-500 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                />
                <div className="md:col-span-2 flex gap-4">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 flex-1 font-medium"
                    >
                        {editingId ? "Update Project" : "Add Project"}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 font-medium"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div className="space-y-4">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-white hover:shadow-sm transition-all"
                    >
                        <div>
                            <h4 className="font-bold text-gray-900">{project.title}</h4>
                            <p className="text-sm text-gray-600">{project.category}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(project)}
                                className="text-blue-700 hover:text-blue-900 text-sm font-medium"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteProject(project.id)}
                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function BlogsManager({
    blogs,
    addBlog,
    updateBlog,
    deleteBlog,
}: {
    blogs: Blog[];
    addBlog: (b: any) => void;
    updateBlog: (id: string, b: any) => void;
    deleteBlog: (id: string) => void;
}) {
    const [form, setForm] = useState({
        title: "",
        excerpt: "",
        content: "",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        readTime: "5 min read",
        slug: "",
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (form.title) {
            if (editingId) {
                updateBlog(editingId, form);
                setEditingId(null);
            } else {
                addBlog({
                    ...form,
                    slug: form.title.toLowerCase().replace(/ /g, "-"),
                });
            }
            setForm({
                title: "",
                excerpt: "",
                content: "",
                date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                readTime: "5 min read",
                slug: "",
            });
        }
    };

    const handleEdit = (blog: Blog) => {
        setForm({
            title: blog.title,
            excerpt: blog.excerpt,
            content: blog.content,
            date: blog.date,
            readTime: blog.readTime,
            slug: blog.slug,
        });
        setEditingId(blog.id);
    };

    const handleCancel = () => {
        setEditingId(null);
        setForm({
            title: "",
            excerpt: "",
            content: "",
            date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            readTime: "5 min read",
            slug: "",
        });
    };

    return (
        <div>
            <h3 className="text-xl font-bold mb-6 text-black">
                {editingId ? "Edit Blog" : "Add New Blog"}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Blog Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="px-4 py-2 border border-gray-400 rounded-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                />
                <textarea
                    placeholder="Excerpt"
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                    className="px-4 py-2 border border-gray-400 rounded-lg h-24 text-black placeholder-gray-500 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                />
                <textarea
                    placeholder="Full Content (HTML supported)"
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="px-4 py-2 border border-gray-400 rounded-lg h-48 font-mono text-sm text-black placeholder-gray-500 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                />
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Read Time (e.g. 5 min read)"
                        value={form.readTime}
                        onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                        className="flex-1 px-4 py-2 border border-gray-400 rounded-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                    />
                    <button
                        type="submit"
                        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 font-medium"
                    >
                        {editingId ? "Update Blog" : "Add Blog"}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 font-medium"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div className="space-y-4">
                {blogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-white hover:shadow-sm transition-all"
                    >
                        <div>
                            <h4 className="font-bold text-gray-900">{blog.title}</h4>
                            <p className="text-sm text-gray-600">{blog.date}</p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(blog)}
                                className="text-blue-700 hover:text-blue-900 text-sm font-medium"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteBlog(blog.id)}
                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function TestimonialsManager({
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
}: {
    testimonials: Testimonial[];
    addTestimonial: (t: any) => void;
    updateTestimonial: (id: string, t: any) => void;
    deleteTestimonial: (id: string) => void;
}) {
    const [form, setForm] = useState({
        text: "",
        author: "",
        role: "",
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (form.text && form.author) {
            if (editingId) {
                updateTestimonial(editingId, form);
                setEditingId(null);
            } else {
                addTestimonial(form);
            }
            setForm({ text: "", author: "", role: "" });
        }
    };

    const handleEdit = (testimonial: Testimonial) => {
        setForm({
            text: testimonial.text,
            author: testimonial.author,
            role: testimonial.role,
        });
        setEditingId(testimonial.id);
    };

    const handleCancel = () => {
        setEditingId(null);
        setForm({ text: "", author: "", role: "" });
    };

    return (
        <div>
            <h3 className="text-xl font-bold mb-6 text-black">
                {editingId ? "Edit Testimonial" : "Add New Testimonial"}
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-8">
                <textarea
                    placeholder="Testimonial Text"
                    value={form.text}
                    onChange={(e) => setForm({ ...form, text: e.target.value })}
                    className="px-4 py-2 border border-gray-400 rounded-lg h-24 text-black placeholder-gray-500 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                />
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Author Name"
                        value={form.author}
                        onChange={(e) => setForm({ ...form, author: e.target.value })}
                        className="flex-1 px-4 py-2 border border-gray-400 rounded-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                    />
                    <input
                        type="text"
                        placeholder="Role / Company"
                        value={form.role}
                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                        className="flex-1 px-4 py-2 border border-gray-400 rounded-lg text-black placeholder-gray-500 focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                    />
                </div>
                <div className="flex gap-4">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 font-medium"
                    >
                        {editingId ? "Update" : "Add"}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 font-medium"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div className="space-y-4">
                {testimonials.map((testimonial) => (
                    <div
                        key={testimonial.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-white hover:shadow-sm transition-all"
                    >
                        <div className="flex-1 mr-4">
                            <p className="text-gray-800 italic mb-1">"{testimonial.text.substring(0, 100)}{testimonial.text.length > 100 ? "..." : ""}"</p>
                            <p className="text-sm font-bold text-gray-900">{testimonial.author} <span className="font-normal text-gray-500">- {testimonial.role}</span></p>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(testimonial)}
                                className="text-blue-700 hover:text-blue-900 text-sm font-medium"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => deleteTestimonial(testimonial.id)}
                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
