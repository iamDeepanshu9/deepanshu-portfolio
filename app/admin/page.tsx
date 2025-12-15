"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useData, Skill, Project, Blog, Testimonial } from "../context/DataContext";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabaseClient";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import {
    LayoutDashboard,
    PenTool,
    FileText,
    Book,
    Settings,
    Bell,
    ChevronLeft,
    LogOut,
    Users,
    ArrowRight,
    ArrowLeft,
    Save,
    Eye,
    Send,
    Calendar,
    Image,
    Tag,
    Globe,
    Search,
    MoreHorizontal,
    Bold,
    Italic,
    Underline,
    List,
    Link,
    AlignLeft,
    Type,
    X,
    Trash2
} from "lucide-react";

// --- Types ---
type ViewState = 'dashboard' | 'editor' | 'blogs' | 'contacts';

export default function AdminPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [view, setView] = useState<ViewState>('dashboard');

    // Data from context
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
        toggleCommentVisibility,
    } = useData();

    // Stats calculation
    const stats = {
        drafts: 0, // Placeholder
        published: blogs.length,
        views: "1.2k" // Placeholder
    };

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
        // Login logic handled in Login component to keep this clean, 
        // but for now I'll inline the login form if not authenticated
    }; // Moved logic inside render for cleaner separate component if needed, but keeping inline for now.

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <LoginPage />;
    }

    return (
        <div className="min-h-screen bg-[#F9FAFB] font-sans text-gray-900">
            {/* Top Navigation */}
            <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 px-6 py-4 z-50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#FFF500] rounded-full flex items-center justify-center">
                        <PenTool className="w-5 h-5 text-black" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">Deepanshu Portfolio ADMIN</span>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
                        <Bell className="w-5 h-5 text-gray-600" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <Settings className="w-5 h-5 text-gray-600" />
                    </button>
                    <button
                        onClick={handleLogout}
                        className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden hover:ring-2 hover:ring-offset-2 hover:ring-black transition-all"
                    >
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                            alt="Admin"
                            className="w-full h-full object-cover"
                        />
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
                <AnimatePresence mode="wait">
                    {view === 'dashboard' ? (
                        <DashboardView
                            key="dashboard"
                            stats={stats}
                            onNavigate={setView}
                        />
                    ) : (
                        <motion.div
                            key="editor"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <button
                                onClick={() => setView('dashboard')}
                                className="mb-6 flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-medium group"
                            >
                                <div className="p-1 rounded-full group-hover:bg-gray-200 transition-colors">
                                    <ChevronLeft className="w-5 h-5" />
                                </div>
                                Back to Dashboard
                            </button>

                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden min-h-[600px]">
                                {view === 'editor' && (
                                    <PortfolioEditor
                                        skills={skills}
                                        projects={projects}
                                        testimonials={testimonials}
                                        addSkill={addSkill}
                                        updateSkill={updateSkill}
                                        deleteSkill={deleteSkill}
                                        addProject={addProject}
                                        updateProject={updateProject}
                                        deleteProject={deleteProject}
                                        addTestimonial={addTestimonial}
                                        updateTestimonial={updateTestimonial}
                                        deleteTestimonial={deleteTestimonial}
                                    />
                                )}
                                {view === 'blogs' && (
                                    <div className="p-8">
                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="p-3 bg-yellow-100 rounded-xl text-yellow-700">
                                                <PenTool className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold">Blog Writer</h2>
                                                <p className="text-gray-500">Create and manage your content</p>
                                            </div>
                                        </div>
                                        <BlogsManager
                                            blogs={blogs}
                                            addBlog={addBlog}
                                            updateBlog={updateBlog}
                                            deleteBlog={deleteBlog}
                                            toggleCommentVisibility={toggleCommentVisibility}
                                        />
                                    </div>
                                )}
                                {view === 'contacts' && (
                                    <div className="p-8">
                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="p-3 bg-blue-100 rounded-xl text-blue-700">
                                                <Users className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h2 className="text-2xl font-bold">Inbox & Contacts</h2>
                                                <p className="text-gray-500">Manage inquiries and messages</p>
                                            </div>
                                        </div>
                                        <ContactsManager />
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Footer */}
            <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-500">
                <div className="flex justify-between max-w-7xl mx-auto px-6">
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-black">Support</a>
                        <a href="#" className="hover:text-black">Privacy Policy</a>
                        <a href="#" className="hover:text-black">Terms of Service</a>
                    </div>
                    <p>© 2025 Deepanshu Kumar</p>
                </div>
            </footer>
        </div>
    );
}

// --- Dashboard View Component ---
function DashboardView({ stats, onNavigate }: { stats: any, onNavigate: (view: ViewState) => void }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-12"
        >
            {/* Header Section */}
            <div>
                <h1 className="text-5xl font-extrabold text-black mb-4 tracking-tight">Good morning, Deepanshu</h1>
                <p className="text-xl text-gray-500 font-medium">Everything is ready for your next masterpiece. What are we creating today?</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    label="Drafts Pending"
                    value={stats.drafts}
                    icon={<FileText className="w-5 h-5 text-gray-700" />}
                />
                <StatsCard
                    label="Published Posts"
                    value={stats.published}
                    icon={<div className="w-5 h-5 bg-black rounded-full flex items-center justify-center"><span className="text-white text-xs">✓</span></div>}
                />
                <StatsCard
                    label="Total Views"
                    value={stats.views}
                    icon={<div className="w-5 h-5 flex items-end justify-center gap-[2px]"><div className="w-1 h-2 bg-black"></div><div className="w-1 h-3 bg-black"></div><div className="w-1 h-4 bg-black"></div></div>}
                />
            </div>

            {/* Action Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <ActionCard
                    title="Dashboard"
                    subtitle="View Analytics & Reports"
                    color="bg-teal-700"
                    icon={<LayoutDashboard className="w-6 h-6" />}
                    onClick={() => onNavigate('contacts')} // Mapping to Contacts for now as per plan
                    image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400"
                />
                <ActionCard
                    title="Portfolio Editor"
                    subtitle="Manage Your Showcase"
                    color="bg-neutral-800"
                    icon={<PenTool className="w-6 h-6" />}
                    onClick={() => onNavigate('editor')}
                    image="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=400"
                />
                <ActionCard
                    title="Blog Writer"
                    subtitle="Write a New Post"
                    color="bg-stone-800"
                    icon={<FileText className="w-6 h-6" />}
                    onClick={() => onNavigate('blogs')}
                    image="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=400"
                />
                <ActionCard
                    title="Daily Journal"
                    subtitle="Log Your Thoughts"
                    color="bg-amber-700"
                    icon={<Book className="w-6 h-6" />}
                    onClick={() => { }} // Placeholder
                    image="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=400"
                />
            </div>

            {/* Bottom Banner */}
            <div className="bg-[#FAF9E8] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between border border-yellow-100">
                <div className="flex items-center gap-6 mb-6 md:mb-0">
                    <div className="w-16 h-16 bg-[#FFF500] rounded-full flex items-center justify-center transform rotate-12 shadow-sm">
                        <span className="text-2xl">🚀</span>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-black mb-1">Ready to publish?</h3>
                        <p className="text-gray-600">You have {stats.drafts} drafts that are almost ready to go live.</p>
                    </div>
                </div>
                <button
                    onClick={() => onNavigate('blogs')}
                    className="px-8 py-3 bg-[#FFF500] hover:bg-yellow-300 text-black font-bold rounded-full transition-colors flex items-center gap-2 group"
                >
                    Review Drafts
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </motion.div>
    );
}

// --- Component Helpers ---

function StatsCard({ label, value, icon }: { label: string, value: string | number, icon: React.ReactNode }) {
    return (
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                    {icon}
                </div>
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">{label}</span>
            </div>
            <p className="text-5xl font-extrabold text-black">{value}</p>
        </div>
    );
}

function ActionCard({ title, subtitle, color, icon, onClick, image }: any) {
    return (
        <button
            onClick={onClick}
            className="group relative h-80 w-full rounded-[2rem] overflow-hidden text-left bg-gray-100 hover:shadow-xl transition-all duration-300"
        >
            <div className="absolute inset-0 bg-gray-200">
                <img src={image} alt={title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
            </div>

            <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className={`w-12 h-12 ${color} rounded-full flex items-center justify-center mb-4 text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    {icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:translate-x-1 transition-transform">{title}</h3>
                <p className="text-gray-300 font-medium">{subtitle}</p>
            </div>
        </button>
    );
}

// --- Portfolio Editor (Tabs Wrapper) ---
function PortfolioEditor({
    skills, projects, testimonials,
    addSkill, updateSkill, deleteSkill,
    addProject, updateProject, deleteProject,
    addTestimonial, updateTestimonial, deleteTestimonial
}: any) {
    const [activeTab, setActiveTab] = useState<'skills' | 'projects' | 'testimonials'>('skills');

    return (
        <div className="flex flex-col h-full">
            <div className="border-b border-gray-100 px-8 pt-8 flex items-center gap-8 bg-gray-50/50">
                {(['skills', 'projects', 'testimonials'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-6 text-sm font-bold capitalize transition-colors relative ${activeTab === tab ? "text-black" : "text-gray-400 hover:text-gray-600"
                            }`}
                    >
                        {tab}
                        {activeTab === tab && (
                            <motion.div
                                layoutId="editorTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                            />
                        )}
                    </button>
                ))}
            </div>

            <div className="p-8 bg-white flex-1">
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
    );
}

// --- Login Page Component ---
function LoginPage() {
    // ... Copy of the login logic from the original file ...
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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
    )
}


// --- Sub-components for Management ---

function ContactsManager() {
    const [contacts, setContacts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string; name: string }>({
        isOpen: false,
        id: "",
        name: "",
    });

    const fetchContacts = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from("contacts")
            .select("*")
            .order("created_at", { ascending: false });

        if (data) {
            setContacts(data);
        } else {
            console.error("Error fetching contacts:", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const deleteContact = async (id: string) => {
        const { error } = await supabase.from("contacts").delete().eq("id", id);
        if (!error) {
            setContacts((prev) => prev.filter((c) => c.id !== id));
        } else {
            console.error("Error deleting contact:", error);
        }
    };

    if (isLoading) {
        return <div className="text-center py-8">Loading contacts...</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-black">Contact Submissions</h3>
                <button
                    onClick={fetchContacts}
                    className="text-sm text-gray-600 hover:text-black underline"
                >
                    Refresh
                </button>
            </div>

            {contacts.length === 0 ? (
                <p className="text-gray-500 italic text-center py-8">No contact submissions yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="py-3 px-4 font-bold text-gray-700">Date</th>
                                <th className="py-3 px-4 font-bold text-gray-700">Name</th>
                                <th className="py-3 px-4 font-bold text-gray-700">Email</th>
                                <th className="py-3 px-4 font-bold text-gray-700">Project/Idea</th>
                                <th className="py-3 px-4 font-bold text-gray-700 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((contact) => (
                                <tr key={contact.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="py-3 px-4 text-gray-600 text-sm">
                                        {new Date(contact.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="py-3 px-4 text-gray-900 font-medium">{contact.name}</td>
                                    <td className="py-3 px-4 text-gray-600">
                                        <a href={`mailto:${contact.email}`} className="hover:underline hover:text-blue-600">
                                            {contact.email}
                                        </a>
                                    </td>
                                    <td className="py-3 px-4 text-gray-800">{contact.project}</td>
                                    <td className="py-3 px-4 text-right">
                                        <button
                                            onClick={() => setDeleteConfirm({ isOpen: true, id: contact.id, name: `Message from ${contact.name}` })}
                                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <ConfirmDeleteModal
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ isOpen: false, id: "", name: "" })}
                onConfirm={() => deleteContact(deleteConfirm.id)}
                itemName={deleteConfirm.name}
            />
        </div>
    );
}

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
    const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string; name: string }>({
        isOpen: false,
        id: "",
        name: "",
    });

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
                                onClick={() => setDeleteConfirm({ isOpen: true, id: skill.id, name: skill.name })}
                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <ConfirmDeleteModal
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ isOpen: false, id: "", name: "" })}
                onConfirm={() => deleteSkill(deleteConfirm.id)}
                itemName={deleteConfirm.name}
            />
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
    const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: number; name: string }>({
        isOpen: false,
        id: 0,
        name: "",
    });

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
                                onClick={() => setDeleteConfirm({ isOpen: true, id: project.id, name: project.title })}
                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <ConfirmDeleteModal
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ isOpen: false, id: 0, name: "" })}
                onConfirm={() => deleteProject(deleteConfirm.id)}
                itemName={deleteConfirm.name}
            />
        </div>
    );
}

// --- Blog Editor Components ---

function BlogEditor({
    blog,
    onSave,
    onCancel,
}: {
    blog: Partial<Blog> | null;
    onSave: (blog: any) => Promise<void>;
    onCancel: () => void;
}) {
    const [form, setForm] = useState({
        title: blog?.title || "",
        excerpt: blog?.excerpt || "",
        content: blog?.content || "",
        readTime: blog?.readTime || "",
        slug: blog?.slug || "",
        visibility: blog?.isPublished !== undefined ? blog.isPublished : true,
        schedule: blog?.scheduledDate ? "Scheduled" : "Immediately",
        category: blog?.category || "Design",
        tags: blog?.tags || ["minimalism", "ui/ux"],
        featuredImage: blog?.featuredImage || null as string | null,
    });

    // Auto-generate slug from title if empty
    useEffect(() => {
        if (!blog && form.title && !form.slug) {
            setForm(prev => ({
                ...prev,
                slug: prev.title
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-')
            }));
        }
    }, [form.title, blog]);

    const handleSave = async (status: 'draft' | 'published') => {
        const payload = {
            ...form,
            date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            isPublished: status === 'published',
            // convert schedule string to date if needed, for now keeping logic simple
        };
        await onSave(payload);
    };

    return (
        <div className="bg-white min-h-screen flex flex-col">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white z-10">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onCancel}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </button>
                    <div>
                        <h2 className="text-sm font-bold text-gray-900">
                            {blog ? "Edit Post" : "New Blog Post"}
                        </h2>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                            Draft - Unsaved changes
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button className="text-sm font-bold text-gray-500 hover:text-black transition-colors px-3 py-2">
                        Save Draft
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-bold text-sm transition-colors">
                        <Eye className="w-4 h-4" />
                        Preview
                    </button>
                    <button
                        onClick={() => handleSave('published')}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm transition-colors"
                    >
                        Publish
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Main Content Area */}
                <div className="flex-1 overflow-y-auto p-8 md:p-12">
                    <div className="max-w-3xl mx-auto">
                        {/* Floating Toolbar (Visual Only) */}
                        <div className="flex items-center gap-1 mb-8 p-2 bg-white border border-gray-200 shadow-sm rounded-lg w-fit mx-auto sticky top-4 z-10">
                            <ToolbarButton icon={<Bold className="w-4 h-4" />} />
                            <ToolbarButton icon={<Italic className="w-4 h-4" />} />
                            <ToolbarButton icon={<Underline className="w-4 h-4" />} />
                            <div className="w-px h-4 bg-gray-200 mx-1"></div>
                            <ToolbarButton icon={<Type className="w-4 h-4" />} label="H1" />
                            <ToolbarButton icon={<Type className="w-3 h-3" />} label="H2" />
                            <div className="w-px h-4 bg-gray-200 mx-1"></div>
                            <ToolbarButton icon={<List className="w-4 h-4" />} />
                            <ToolbarButton icon={<Link className="w-4 h-4" />} />
                            <ToolbarButton icon={<Image className="w-4 h-4" />} />
                        </div>

                        <input
                            type="text"
                            placeholder="Post Title"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full text-4xl md:text-5xl font-bold text-gray-900 placeholder-gray-300 border-none outline-none bg-transparent mb-8"
                        />

                        <textarea
                            placeholder="Tell your story..."
                            value={form.content}
                            onChange={(e) => setForm({ ...form, content: e.target.value })}
                            className="w-full h-[calc(100vh-300px)] resize-none text-lg text-gray-700 leading-relaxed placeholder-gray-300 border-none outline-none bg-transparent"
                        />
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="w-80 border-l border-gray-200 bg-gray-50 h-full overflow-y-auto p-6 hidden lg:block">
                    <h3 className="font-bold text-sm text-gray-900 mb-6 uppercase tracking-wider">Post Settings</h3>

                    {/* Publishing */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Globe className="w-4 h-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">Visibility</span>
                            </div>
                            <div className={`w-10 h-6 rounded-full p-1 cursor-pointer transition-colors ${form.visibility ? 'bg-blue-600' : 'bg-gray-300'}`} onClick={() => setForm({ ...form, visibility: !form.visibility })}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${form.visibility ? 'translate-x-4' : ''}`}></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-700">Schedule</span>
                            </div>
                            <span className="text-sm text-blue-600 font-medium cursor-pointer hover:underline">Immediately</span>
                        </div>
                    </div>

                    {/* Featured Image */}
                    <div className="mb-6">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Featured Image</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer bg-white group">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-3 group-hover:bg-white transition-colors">
                                <Image className="w-5 h-5 text-gray-500 group-hover:text-blue-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-600 group-hover:text-blue-600">Drop image or click</span>
                        </div>
                    </div>

                    {/* Category */}
                    <div className="mb-6">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Category</label>
                        <select
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none"
                        >
                            <option>Design</option>
                            <option>Development</option>
                            <option>Tutorial</option>
                            <option>Lifestyle</option>
                        </select>
                    </div>

                    {/* Tags */}
                    <div className="mb-6">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Tags</label>
                        <div className="bg-white border border-gray-200 rounded-lg p-2 flex flex-wrap gap-2 min-h-[42px]">
                            {form.tags.map(tag => (
                                <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded flex items-center gap-1">
                                    {tag}
                                    <button onClick={() => setForm({ ...form, tags: form.tags.filter(t => t !== tag) })}>
                                        <X className="w-3 h-3 hover:text-blue-900" />
                                    </button>
                                </span>
                            ))}
                            <input
                                type="text"
                                placeholder="Add..."
                                className="flex-1 min-w-[60px] text-sm outline-none bg-transparent"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        const val = e.currentTarget.value.trim();
                                        if (val && !form.tags.includes(val)) {
                                            setForm({ ...form, tags: [...form.tags, val] });
                                            e.currentTarget.value = "";
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* Slug */}
                    <div className="mb-6">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">URL Slug</label>
                        <input
                            type="text"
                            value={form.slug}
                            onChange={(e) => setForm({ ...form, slug: e.target.value })}
                            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                        <p className="text-[10px] text-gray-400 mt-1 truncate">domain.com/blog/{form.slug}</p>
                    </div>

                    {/* Excerpt */}
                    <div className="mb-6">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Excerpt</label>
                        <textarea
                            value={form.excerpt}
                            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg h-24 text-sm text-gray-700 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            placeholder="Brief summary..."
                        />
                    </div>

                    {/* Read Time */}
                    <div className="mb-6">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Read Time</label>
                        <input
                            type="text"
                            value={form.readTime}
                            onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                            className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                            placeholder="e.g 5 min read"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ToolbarButton({ icon, label }: { icon: React.ReactNode, label?: string }) {
    return (
        <button className="p-1.5 text-gray-500 hover:text-black hover:bg-gray-100 rounded transition-colors flex items-center gap-1">
            {icon}
            {label && <span className="text-xs font-bold">{label}</span>}
        </button>
    );
}

function BlogsManager({
    blogs,
    addBlog,
    updateBlog,
    deleteBlog,
    toggleCommentVisibility,
}: {
    blogs: Blog[];
    addBlog: (b: any) => Promise<void>;
    updateBlog: (id: string, b: any) => Promise<void>;
    deleteBlog: (id: string) => Promise<void>;
    toggleCommentVisibility: (commentId: string, blogId: string) => void;
}) {
    const [view, setView] = useState<'list' | 'editor'>('list');
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
    const [showCommentsModal, setShowCommentsModal] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string; name: string }>({
        isOpen: false,
        id: "",
        name: "",
    });

    const handleCreateNew = () => {
        setEditingBlog(null);
        setView('editor');
    };

    const handleEdit = (blog: Blog) => {
        setEditingBlog(blog);
        setView('editor');
    };

    const handleSave = async (blogData: any) => {
        try {
            if (editingBlog) {
                await updateBlog(editingBlog.id, blogData);
            } else {
                await addBlog(blogData);
            }
            setView('list');
            setEditingBlog(null);
        } catch (error) {
            console.error("Failed to save blog", error);
            alert("Failed to save blog. See console.");
        }
    };

    if (view === 'editor') {
        return (
            <BlogEditor
                blog={editingBlog}
                onSave={handleSave}
                onCancel={() => {
                    setView('list');
                    setEditingBlog(null);
                }}
            />
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-black">All Posts</h3>
                    <p className="text-gray-500">{blogs.length} published posts</p>
                </div>
                <button
                    onClick={handleCreateNew}
                    className="px-6 py-3 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl flex items-center gap-2"
                >
                    <PenTool className="w-4 h-4" />
                    Write New Post
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="group relative bg-white border border-gray-200 hover:border-gray-300 rounded-2xl p-6 transition-all hover:shadow-lg flex flex-col h-[300px]"
                    >
                        <div className="flex-1 overflow-hidden">
                            <div className="flex justify-between items-start mb-3">
                                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase tracking-wider">
                                    {blog.readTime || 'Article'}
                                </span>
                                <span className="text-gray-400 text-xs font-medium">
                                    {blog.date}
                                </span>
                            </div>

                            <h4 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                                {blog.title}
                            </h4>

                            <p className="text-gray-500 text-sm line-clamp-3 mb-4">
                                {blog.excerpt}
                            </p>
                        </div>

                        <div className="pt-4 border-t border-gray-100 mt-auto flex items-center justify-between">
                            <button
                                onClick={() => {
                                    setSelectedBlog(blog);
                                    setShowCommentsModal(true);
                                }}
                                className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-black transition-colors"
                            >
                                <Users className="w-3.5 h-3.5" />
                                {blog.comments?.length || 0} Comments
                            </button>

                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleEdit(blog)}
                                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Edit"
                                >
                                    <PenTool className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setDeleteConfirm({ isOpen: true, id: blog.id, name: blog.title })}
                                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Comments Management Modal */}
            {showCommentsModal && selectedBlog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                            <div>
                                <h3 className="text-xl font-bold text-black">Manage Comments</h3>
                                <p className="text-sm text-gray-600 mt-1 max-w-md truncate">{selectedBlog.title}</p>
                            </div>
                            <button
                                onClick={() => {
                                    setShowCommentsModal(false);
                                    setSelectedBlog(null);
                                }}
                                className="p-2 bg-white rounded-full hover:bg-gray-200 transition-colors border border-gray-200"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1">
                            {selectedBlog.comments && selectedBlog.comments.length > 0 ? (
                                <div className="space-y-4">
                                    {selectedBlog.comments.map((comment) => (
                                        <div
                                            key={comment.id}
                                            className={`p-4 border rounded-xl transition-colors ${comment.hidden
                                                ? 'border-gray-200 bg-gray-50 opacity-60'
                                                : 'border-gray-200 bg-white shadow-sm'
                                                }`}
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                                                            {comment.user.charAt(0).toUpperCase()}
                                                        </div>
                                                        <p className="font-bold text-gray-900 text-sm">{comment.user}</p>
                                                        {comment.hidden && (
                                                            <span className="text-[10px] px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full font-bold uppercase tracking-wider">
                                                                Hidden
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-gray-400 mt-0.5">{comment.date}</p>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        toggleCommentVisibility(comment.id, selectedBlog.id);
                                                    }}
                                                    className={`p-2 rounded-lg transition-colors ${comment.hidden
                                                        ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-200'
                                                        : 'text-blue-600 hover:bg-blue-50'
                                                        }`}
                                                    title={comment.hidden ? 'Show comment' : 'Hide comment'}
                                                >
                                                    {comment.hidden ? <Eye className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                            <p className="text-gray-700 text-sm leading-relaxed">{comment.text}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 flex flex-col items-center gap-4">
                                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                                        <Users className="w-8 h-8 text-gray-300" />
                                    </div>
                                    <p className="text-gray-500 font-medium">No comments yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <ConfirmDeleteModal
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ isOpen: false, id: "", name: "" })}
                onConfirm={() => deleteBlog(deleteConfirm.id)}
                itemName={deleteConfirm.name}
            />
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
    const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string; name: string }>({
        isOpen: false,
        id: "",
        name: "",
    });

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
                                onClick={() => setDeleteConfirm({ isOpen: true, id: testimonial.id, name: testimonial.author })}
                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <ConfirmDeleteModal
                isOpen={deleteConfirm.isOpen}
                onClose={() => setDeleteConfirm({ isOpen: false, id: "", name: "" })}
                onConfirm={() => deleteTestimonial(deleteConfirm.id)}
                itemName={deleteConfirm.name}
            />
        </div>
    );
}
