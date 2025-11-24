"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { FaReact, FaAngular, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";
import { supabase } from "../lib/supabaseClient";

// --- Types ---

export type Skill = {
    id: string;
    name: string;
    category: string;
};

export type Project = {
    id: number;
    title: string;
    subtitle: string;
    category: string;
    description: string;
    color: string;
};

export type Comment = {
    id: string;
    user: string;
    text: string;
    date: string;
};

export type Blog = {
    id: string;
    title: string;
    excerpt: string;
    content: string; // Full content
    date: string;
    readTime: string;
    slug: string;
    image?: string;
    likes: number;
    comments: Comment[];
};

export type Testimonial = {
    id: string;
    text: string;
    author: string;
    role: string;
};

interface DataContextType {
    skills: Skill[];
    projects: Project[];
    blogs: Blog[];
    addSkill: (skill: Omit<Skill, "id">) => void;
    updateSkill: (id: string, skill: Partial<Skill>) => void;
    deleteSkill: (id: string) => void;
    addProject: (project: Omit<Project, "id">) => void;
    updateProject: (id: number, project: Partial<Project>) => void;
    deleteProject: (id: number) => void;
    addBlog: (blog: Omit<Blog, "id" | "likes" | "comments">) => void;
    updateBlog: (id: string, blog: Partial<Blog>) => void;
    deleteBlog: (id: string) => void;
    likeBlog: (id: string) => void;
    addComment: (blogId: string, comment: Omit<Comment, "id" | "date">) => void;
    testimonials: Testimonial[];
    addTestimonial: (testimonial: Omit<Testimonial, "id">) => void;
    updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
    deleteTestimonial: (id: string) => void;
}

// --- Context ---

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Fetch data from Supabase
    const fetchData = async () => {
        setIsLoaded(false);
        try {
            // Skills
            const { data: skillsData } = await supabase.from("skills").select("*").order("created_at", { ascending: true });
            if (skillsData) {
                setSkills(skillsData);
            }

            // Projects
            const { data: projectsData } = await supabase.from("projects").select("*").order("created_at", { ascending: true });
            if (projectsData) {
                setProjects(projectsData);
            }

            // Blogs
            const { data: blogsData } = await supabase.from("blogs").select("*, comments(*)").order("created_at", { ascending: false });
            if (blogsData) {
                setBlogs(
                    blogsData.map((b: any) => ({
                        ...b,
                        readTime: b.read_time,
                        comments: b.comments ? b.comments.map((c: any) => ({ ...c, blogId: c.blog_id })) : [],
                    }))
                );
            }

            // Testimonials
            const { data: testimonialsData } = await supabase.from("testimonials").select("*").order("created_at", { ascending: true });
            if (testimonialsData) {
                setTestimonials(testimonialsData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoaded(true);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // --- Actions ---

    const addSkill = async (skill: Omit<Skill, "id">) => {
        const { data, error } = await supabase
            .from("skills")
            .insert([{ name: skill.name, category: skill.category }])
            .select()
            .single();

        if (data && !error) {
            setSkills((prev) => [...prev, data]);
        } else {
            console.error("Error adding skill:", error);
        }
    };

    const updateSkill = async (id: string, updatedSkill: Partial<Skill>) => {
        const { error } = await supabase.from("skills").update(updatedSkill).eq("id", id);

        if (!error) {
            setSkills((prev) =>
                prev.map((skill) => (skill.id === id ? { ...skill, ...updatedSkill } : skill))
            );
        } else {
            console.error("Error updating skill:", error);
        }
    };

    const deleteSkill = async (id: string) => {
        const { error } = await supabase.from("skills").delete().eq("id", id);
        if (!error) {
            setSkills((prev) => prev.filter((skill) => skill.id !== id));
        } else {
            console.error("Error deleting skill:", error);
        }
    };

    const addProject = async (project: Omit<Project, "id">) => {
        const { data, error } = await supabase
            .from("projects")
            .insert([project])
            .select()
            .single();

        if (data && !error) {
            setProjects((prev) => [...prev, data]);
        } else {
            console.error("Error adding project:", error);
        }
    };

    const updateProject = async (id: number, updatedProject: Partial<Project>) => {
        const { error } = await supabase.from("projects").update(updatedProject).eq("id", id);
        if (!error) {
            setProjects((prev) =>
                prev.map((proj) => (proj.id === id ? { ...proj, ...updatedProject } : proj))
            );
        } else {
            console.error("Error updating project:", error);
        }
    };

    const deleteProject = async (id: number) => {
        const { error } = await supabase.from("projects").delete().eq("id", id);
        if (!error) {
            setProjects((prev) => prev.filter((proj) => proj.id !== id));
        } else {
            console.error("Error deleting project:", error);
        }
    };

    const addBlog = async (blog: Omit<Blog, "id" | "likes" | "comments">) => {
        const { data, error } = await supabase
            .from("blogs")
            .insert([{ ...blog, read_time: blog.readTime }])
            .select()
            .single();

        if (data && !error) {
            setBlogs((prev) => [
                { ...data, readTime: data.read_time, comments: [], likes: 0 },
                ...prev,
            ]);
        } else {
            console.error("Error adding blog:", error);
        }
    };

    const updateBlog = async (id: string, updatedBlog: Partial<Blog>) => {
        const updatePayload: any = { ...updatedBlog };
        if (updatedBlog.readTime) {
            updatePayload.read_time = updatedBlog.readTime;
            delete updatePayload.readTime;
        }

        const { error } = await supabase.from("blogs").update(updatePayload).eq("id", id);
        if (!error) {
            setBlogs((prev) =>
                prev.map((blog) => (blog.id === id ? { ...blog, ...updatedBlog } : blog))
            );
        } else {
            console.error("Error updating blog:", error);
        }
    };

    const deleteBlog = async (id: string) => {
        const { error } = await supabase.from("blogs").delete().eq("id", id);
        if (!error) {
            setBlogs((prev) => prev.filter((blog) => blog.id !== id));
        } else {
            console.error("Error deleting blog:", error);
        }
    };

    const likeBlog = async (id: string) => {
        // Optimistic update
        setBlogs((prev) =>
            prev.map((blog) => (blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog))
        );

        // We need to fetch the current likes first or use an RPC, but for simplicity:
        const blog = blogs.find((b) => b.id === id);
        if (blog) {
            await supabase
                .from("blogs")
                .update({ likes: blog.likes + 1 })
                .eq("id", id);
        }
    };

    const addComment = async (blogId: string, comment: Omit<Comment, "id" | "date">) => {
        const date = new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });

        const { data, error } = await supabase
            .from("comments")
            .insert([{ ...comment, blog_id: blogId, date }])
            .select()
            .single();

        if (data && !error) {
            setBlogs((prev) =>
                prev.map((blog) =>
                    blog.id === blogId
                        ? { ...blog, comments: [...(blog.comments || []), { ...data, blogId: data.blog_id }] }
                        : blog
                )
            );
        } else {
            console.error("Error adding comment:", error);
        }
    };

    const addTestimonial = async (testimonial: Omit<Testimonial, "id">) => {
        const { data, error } = await supabase
            .from("testimonials")
            .insert([testimonial])
            .select()
            .single();

        if (data && !error) {
            setTestimonials((prev) => [...prev, data]);
        } else {
            console.error("Error adding testimonial:", error);
        }
    };

    const updateTestimonial = async (id: string, updatedTestimonial: Partial<Testimonial>) => {
        const { error } = await supabase.from("testimonials").update(updatedTestimonial).eq("id", id);
        if (!error) {
            setTestimonials((prev) =>
                prev.map((t) => (t.id === id ? { ...t, ...updatedTestimonial } : t))
            );
        } else {
            console.error("Error updating testimonial:", error);
        }
    };

    const deleteTestimonial = async (id: string) => {
        const { error } = await supabase.from("testimonials").delete().eq("id", id);
        if (!error) {
            setTestimonials((prev) => prev.filter((t) => t.id !== id));
        } else {
            console.error("Error deleting testimonial:", error);
        }
    };

    return (
        <DataContext.Provider
            value={{
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
                likeBlog,
                addComment,
                addTestimonial,
                updateTestimonial,
                deleteTestimonial,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};

// Helper to get icon component by name
export const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
        FaAngular,
        FaReact,
        FaNodeJs,
        SiNextdotjs,
        SiTypescript,
        SiTailwindcss,
    };
    return icons[iconName] || FaReact; // Default to React icon if not found
};
