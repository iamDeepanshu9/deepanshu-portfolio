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
    hidden?: boolean;
    blogId?: string;
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
    // New fields
    category?: string;
    tags?: string[];
    featuredImage?: string;
    isPublished?: boolean;
    scheduledDate?: string;
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
    testimonials: Testimonial[];
    isLoading: boolean;
    addSkill: (skill: Omit<Skill, "id">) => void;
    updateSkill: (id: string, skill: Partial<Skill>) => void;
    deleteSkill: (id: string) => void;
    addProject: (project: Omit<Project, "id">) => void;
    updateProject: (id: number, project: Partial<Project>) => void;
    deleteProject: (id: number) => void;
    addBlog: (blog: Omit<Blog, "id" | "likes" | "comments">) => Promise<void>;
    updateBlog: (id: string, blog: Partial<Blog>) => Promise<void>;
    deleteBlog: (id: string) => Promise<void>;
    toggleBlogLike: (id: string, action: 'like' | 'unlike') => Promise<void>;
    addComment: (blogId: string, comment: Omit<Comment, "id" | "date">) => void;
    toggleCommentVisibility: (commentId: string, blogId: string) => void;
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
    const [isLoading, setIsLoading] = useState(true);

    // Fetch data from Supabase
    const fetchData = async () => {
        setIsLoading(true);
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
                        // Map new fields
                        category: b.category,
                        tags: b.tags,
                        featuredImage: b.featured_image,
                        isPublished: b.is_published,
                        scheduledDate: b.scheduled_date,
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
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();

        // Real-time subscription for comments
        const channel = supabase
            .channel('realtime-comments')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'comments' },
                (payload) => {
                    console.log('Real-time comment change:', payload);
                    const { eventType, new: newRecord, old: oldRecord } = payload;

                    setBlogs((prevBlogs) => {
                        return prevBlogs.map((blog) => {
                            // Handle INSERT
                            if (eventType === 'INSERT' && newRecord.blog_id === blog.id) {
                                // Check if comment already exists to prevent duplicates
                                if (blog.comments.some(c => c.id === newRecord.id)) {
                                    return blog;
                                }
                                const newComment: Comment = {
                                    id: newRecord.id,
                                    user: newRecord.user,
                                    text: newRecord.text,
                                    date: newRecord.date,
                                    hidden: newRecord.hidden,
                                    blogId: newRecord.blog_id
                                };
                                return {
                                    ...blog,
                                    comments: [...blog.comments, newComment]
                                };
                            }

                            // Handle UPDATE
                            if (eventType === 'UPDATE') {
                                // Check if this blog contains the comment being updated
                                const commentIndex = blog.comments.findIndex(c => c.id === newRecord.id);
                                if (commentIndex !== -1) {
                                    const updatedComments = [...blog.comments];
                                    updatedComments[commentIndex] = {
                                        ...updatedComments[commentIndex],
                                        user: newRecord.user,
                                        text: newRecord.text,
                                        date: newRecord.date,
                                        hidden: newRecord.hidden,
                                        blogId: newRecord.blog_id
                                    };
                                    return { ...blog, comments: updatedComments };
                                }
                            }

                            // Handle DELETE
                            if (eventType === 'DELETE') {
                                // Check if this blog contains the comment being deleted
                                const commentIndex = blog.comments.findIndex(c => c.id === oldRecord.id);
                                if (commentIndex !== -1) {
                                    return {
                                        ...blog,
                                        comments: blog.comments.filter(c => c.id !== oldRecord.id)
                                    };
                                }
                            }

                            return blog;
                        });
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
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
        console.log("Adding blog with data:", blog);

        // Transform readTime to read_time for database
        const { readTime, featuredImage, isPublished, scheduledDate, ...blogData } = blog;
        const insertData = {
            ...blogData,
            read_time: readTime,
            featured_image: featuredImage,
            is_published: isPublished,
            scheduled_date: scheduledDate,
        };

        console.log("Inserting to database:", insertData);

        const { data, error } = await supabase
            .from("blogs")
            .insert([insertData])
            .select()
            .single();

        if (data && !error) {
            console.log("Blog added successfully:", data);
            setBlogs((prev) => [
                { ...data, readTime: data.read_time, comments: [], likes: 0 },
                ...prev,
            ]);
        } else {
            console.error("Error adding blog:", error);
            console.error("Error details:", {
                message: error?.message,
                details: error?.details,
                hint: error?.hint,
                code: error?.code
            });
            throw error; // Re-throw so the UI can catch it
        }
    };

    const updateBlog = async (id: string, updatedBlog: Partial<Blog>) => {
        console.log("Updating blog:", id, updatedBlog);

        const updatePayload: any = { ...updatedBlog };
        if (updatedBlog.readTime) {
            updatePayload.read_time = updatedBlog.readTime;
            delete updatePayload.readTime;
        }
        if (updatedBlog.featuredImage) {
            updatePayload.featured_image = updatedBlog.featuredImage;
            delete updatePayload.featuredImage;
        }
        if (updatedBlog.isPublished !== undefined) {
            updatePayload.is_published = updatedBlog.isPublished;
            delete updatePayload.isPublished;
        }
        if (updatedBlog.scheduledDate) {
            updatePayload.scheduled_date = updatedBlog.scheduledDate;
            delete updatePayload.scheduledDate;
        }

        const { error } = await supabase.from("blogs").update(updatePayload).eq("id", id);
        if (!error) {
            console.log("Blog updated successfully");
            setBlogs((prev) =>
                prev.map((blog) => (blog.id === id ? { ...blog, ...updatedBlog } : blog))
            );
        } else {
            console.error("Error updating blog:", error);
            console.error("Error details:", {
                message: error?.message,
                details: error?.details,
                hint: error?.hint,
                code: error?.code
            });
            throw error; // Re-throw so the UI can catch it
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

    const toggleBlogLike = async (id: string, action: 'like' | 'unlike') => {
        // Optimistic update
        setBlogs((prev) =>
            prev.map((blog) => {
                if (blog.id === id) {
                    return {
                        ...blog,
                        likes: action === 'like' ? blog.likes + 1 : Math.max(0, blog.likes - 1)
                    };
                }
                return blog;
            })
        );

        const rpcName = action === 'like' ? 'increment_blog_likes' : 'decrement_blog_likes';

        const { error } = await supabase.rpc(rpcName, { blog_id: id });

        if (error) {
            console.error(`Error ${action}ing blog:`, error);
            // Revert optimistic update on error if needed
            // For now, we'll just log the error
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

    const toggleCommentVisibility = async (commentId: string, blogId: string) => {
        // Find the comment to get its current hidden status
        const blog = blogs.find((b) => b.id === blogId);
        const comment = blog?.comments.find((c) => c.id === commentId);

        if (!comment) return;

        const newHiddenStatus = !comment.hidden;

        const { error } = await supabase
            .from("comments")
            .update({ hidden: newHiddenStatus })
            .eq("id", commentId);

        if (!error) {
            setBlogs((prev) =>
                prev.map((blog) =>
                    blog.id === blogId
                        ? {
                            ...blog,
                            comments: blog.comments.map((c) =>
                                c.id === commentId ? { ...c, hidden: newHiddenStatus } : c
                            )
                        }
                        : blog
                )
            );
        } else {
            console.error("Error toggling comment visibility:", error);
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
                isLoading,
                addSkill,
                updateSkill,
                deleteSkill,
                addProject,
                updateProject,
                deleteProject,
                addBlog,
                updateBlog,
                deleteBlog,
                toggleBlogLike,
                addComment,
                toggleCommentVisibility,
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
