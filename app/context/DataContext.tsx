"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { FaReact, FaAngular, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTailwindcss, SiTypescript } from "react-icons/si";

// --- Types ---

export type Skill = {
    id: string;
    name: string;
    iconName: string;
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
}

// --- Default Data ---

const defaultSkills: Skill[] = [
    { id: "1", name: "Angular", iconName: "FaAngular" },
    { id: "2", name: "React", iconName: "FaReact" },
    { id: "3", name: "Next.js", iconName: "SiNextdotjs" },
    { id: "4", name: "TypeScript", iconName: "SiTypescript" },
    { id: "5", name: "Node.js", iconName: "FaNodeJs" },
    { id: "6", name: "Tailwind CSS", iconName: "SiTailwindcss" },
];

const defaultProjects: Project[] = [
    {
        id: 1,
        title: "Exverge",
        subtitle: "formerly Logiwise",
        category: "E-commerce",
        description: "Seamlessly connecting Indian e-commerce to global markets.",
        color: "bg-neutral-900",
    },
    {
        id: 2,
        title: "Portfolio V1",
        subtitle: "Personal",
        category: "Web Design",
        description: "Previous iteration of my personal portfolio showcasing early work.",
        color: "bg-stone-800",
    },
    {
        id: 3,
        title: "Task Master",
        subtitle: "Productivity",
        category: "Application",
        description: "A smart task management application for remote teams.",
        color: "bg-zinc-800",
    },
    {
        id: 4,
        title: "Finance Flow",
        subtitle: "Fintech",
        category: "Dashboard",
        description: "Real-time financial analytics dashboard for small businesses.",
        color: "bg-slate-800",
    },
];

const defaultBlogs: Blog[] = [
    {
        id: "1",
        title: "The Future of Web Development: What to Expect in 2025",
        excerpt:
            "Exploring the rise of AI-driven coding, server components, and the next generation of frontend frameworks.",
        content: `
      <p>The landscape of web development is shifting rapidly. As we approach 2025, several key trends are emerging that will define how we build for the web.</p>
      <h3>1. AI-Driven Development</h3>
      <p>Artificial Intelligence is no longer just a buzzword; it's an integral part of the developer workflow. Tools like GitHub Copilot and Gemini are becoming standard, helping developers write code faster and with fewer errors.</p>
      <h3>2. Server Components Everywhere</h3>
      <p>React Server Components (RSC) have changed the game by allowing developers to render components on the server, reducing the amount of JavaScript sent to the client. This leads to faster load times and better SEO.</p>
      <h3>3. The Rise of Meta-Frameworks</h3>
      <p>Next.js, Remix, and Nuxt are becoming the default way to build web applications. They offer built-in routing, server-side rendering, and optimization features that used to require manual configuration.</p>
      <p>In conclusion, the future looks bright for web developers who are willing to adapt and learn these new technologies.</p>
    `,
        date: "Nov 15, 2024",
        readTime: "5 min read",
        slug: "future-web-dev-2025",
        likes: 124,
        comments: [
            {
                id: "c1",
                user: "Alex Dev",
                text: "Great insights! I'm really excited about Server Components.",
                date: "Nov 16, 2024",
            },
        ],
    },
    {
        id: "2",
        title: "Mastering Framer Motion for React",
        excerpt:
            "A deep dive into creating complex animations with simple declarative code in your React applications.",
        content: `
      <p>Animation is key to creating a modern, polished user experience. Framer Motion makes it incredibly easy to add complex animations to your React apps.</p>
      <h3>Getting Started</h3>
      <p>First, install the library: <code>npm install framer-motion</code>. Then, you can start using the <code>motion</code> component to animate any HTML element.</p>
      <h3>Key Concepts</h3>
      <ul>
        <li><strong>Initial:</strong> The starting state of the animation.</li>
        <li><strong>Animate:</strong> The target state.</li>
        <li><strong>Exit:</strong> The state when the component is removed from the DOM.</li>
      </ul>
      <p>With just a few lines of code, you can create smooth transitions, gesture-based animations, and complex layout changes.</p>
    `,
        date: "Oct 28, 2024",
        readTime: "8 min read",
        slug: "mastering-framer-motion",
        likes: 89,
        comments: [],
    },
    {
        id: "3",
        title: "Why I Switched from Redux to Zustand",
        excerpt:
            "My journey simplifying state management and why less boilerplate means more productivity.",
        content: `
      <p>Redux has long been the king of state management in React, but it comes with a lot of boilerplate. Enter Zustand: a small, fast, and scalable state-management solution.</p>
      <h3>Simplicity First</h3>
      <p>Zustand uses hooks to access state, which feels much more natural in modern React applications. There's no need for providers, reducers, or complex dispatch actions.</p>
      <h3>Performance</h3>
      <p>Zustand is highly optimized and only re-renders components when the specific state they select changes. This makes it incredibly performant even for large applications.</p>
      <p>If you're tired of the complexity of Redux, I highly recommend giving Zustand a try.</p>
    `,
        date: "Sep 10, 2024",
        readTime: "4 min read",
        slug: "redux-to-zustand",
        likes: 215,
        comments: [
            {
                id: "c1",
                user: "Sarah J.",
                text: "Zustand is a game changer! Never going back.",
                date: "Sep 12, 2024",
            },
        ],
    },
];

// --- Context ---

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from LocalStorage on mount
    useEffect(() => {
        const loadData = () => {
            const storedSkills = localStorage.getItem("portfolio_skills");
            const storedProjects = localStorage.getItem("portfolio_projects");
            const storedBlogs = localStorage.getItem("portfolio_blogs");

            if (storedSkills) {
                setSkills(JSON.parse(storedSkills));
            } else {
                setSkills(defaultSkills);
                localStorage.setItem("portfolio_skills", JSON.stringify(defaultSkills));
            }

            if (storedProjects) {
                setProjects(JSON.parse(storedProjects));
            } else {
                setProjects(defaultProjects);
                localStorage.setItem("portfolio_projects", JSON.stringify(defaultProjects));
            }

            if (storedBlogs) {
                setBlogs(JSON.parse(storedBlogs));
            } else {
                setBlogs(defaultBlogs);
                localStorage.setItem("portfolio_blogs", JSON.stringify(defaultBlogs));
            }
            setIsLoaded(true);
        };

        loadData();
    }, []);

    // Save to LocalStorage whenever data changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("portfolio_skills", JSON.stringify(skills));
        }
    }, [skills, isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("portfolio_projects", JSON.stringify(projects));
        }
    }, [projects, isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("portfolio_blogs", JSON.stringify(blogs));
        }
    }, [blogs, isLoaded]);

    // --- Actions ---

    const addSkill = (skill: Omit<Skill, "id">) => {
        const newSkill = { ...skill, id: Date.now().toString() };
        setSkills((prev) => [...prev, newSkill]);
    };

    const updateSkill = (id: string, updatedSkill: Partial<Skill>) => {
        setSkills((prev) =>
            prev.map((skill) => (skill.id === id ? { ...skill, ...updatedSkill } : skill))
        );
    };

    const deleteSkill = (id: string) => {
        setSkills((prev) => prev.filter((skill) => skill.id !== id));
    };

    const addProject = (project: Omit<Project, "id">) => {
        const newProject = { ...project, id: Date.now() };
        setProjects((prev) => [...prev, newProject]);
    };

    const updateProject = (id: number, updatedProject: Partial<Project>) => {
        setProjects((prev) =>
            prev.map((proj) => (proj.id === id ? { ...proj, ...updatedProject } : proj))
        );
    };

    const deleteProject = (id: number) => {
        setProjects((prev) => prev.filter((proj) => proj.id !== id));
    };

    const addBlog = (blog: Omit<Blog, "id" | "likes" | "comments">) => {
        const newBlog = {
            ...blog,
            id: Date.now().toString(),
            likes: 0,
            comments: [],
        };
        setBlogs((prev) => [newBlog, ...prev]);
    };

    const updateBlog = (id: string, updatedBlog: Partial<Blog>) => {
        setBlogs((prev) =>
            prev.map((blog) => (blog.id === id ? { ...blog, ...updatedBlog } : blog))
        );
    };

    const deleteBlog = (id: string) => {
        setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    };

    const likeBlog = (id: string) => {
        setBlogs((prev) =>
            prev.map((blog) => (blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog))
        );
    };

    const addComment = (blogId: string, comment: Omit<Comment, "id" | "date">) => {
        const newComment = {
            ...comment,
            id: Date.now().toString(),
            date: new Date().toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }),
        };
        setBlogs((prev) =>
            prev.map((blog) =>
                blog.id === blogId ? { ...blog, comments: [...(blog.comments || []), newComment] } : blog
            )
        );
    };

    return (
        <DataContext.Provider
            value={{
                skills,
                projects,
                blogs,
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
