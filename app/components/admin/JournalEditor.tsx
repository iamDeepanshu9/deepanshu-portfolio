"use client";

import { useState, useEffect } from "react";
import {
    Bold, Italic, Underline, List, Quote, Image as ImageIcon, Link,
    Smile, Frown, Meh, Zap, Cloud, Maximize2, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/app/lib/supabaseClient";

interface JournalEntry {
    id: string;
    title: string;
    content: string;
    mood: string;
    tags: string[]; // Ensure this is string[]
    created_at: string;
    user_id: string;
}

export default function JournalEditor() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    // Search and Filter States
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);

    const [autoSaved, setAutoSaved] = useState(true);
    const [selectedMood, setSelectedMood] = useState("happy");

    const [entries, setEntries] = useState<JournalEntry[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentEntryId, setCurrentEntryId] = useState<string | null>(null);

    // Fetch entries on load
    useEffect(() => {
        fetchEntries();
    }, []);

    // Filtered entries calculation
    const filteredEntries = entries.filter(entry => {
        const matchesSearch = (entry.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (entry.content?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
            (entry.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

        const entryDate = new Date(entry.created_at);
        const matchesDate = selectedDate
            ? entryDate.getDate() === selectedDate.getDate() &&
            entryDate.getMonth() === selectedDate.getMonth() &&
            entryDate.getFullYear() === selectedDate.getFullYear()
            : true;

        return matchesSearch && matchesDate;
    });

    // Derived state for calendar counts
    const entryCounts = entries.reduce((acc, entry) => {
        const date = new Date(entry.created_at).toDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const fetchEntries = async () => {
        const { data, error } = await supabase
            .from('journal_entries')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setEntries(data);
        if (error) console.error('Error fetching journal:', error);
    };

    const handleSave = async () => {
        if (!title.trim() || !content.trim()) {
            alert("Please fill in both title and content");
            return;
        }

        setIsLoading(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            alert("You must be logged in locally to save (mock mode won't work for RLS).");
            setIsLoading(false);
            return;
        }

        const entryData = {
            title,
            content,
            mood: selectedMood,
            tags: tags,
            user_id: user.id,
            // updated_at: new Date().toISOString(), // Removed to fix schema mismatch
        };

        let result;
        if (currentEntryId) {
            result = await supabase
                .from('journal_entries')
                .update(entryData)
                .eq('id', currentEntryId);
        } else {
            result = await supabase
                .from('journal_entries')
                .insert([entryData]);
        }

        if (result.error) {
            console.error(result.error);
            alert("Error saving entry");
        } else {
            fetchEntries();
            setAutoSaved(true);
            // If insert, we might want to get the new ID to set currentEntryId, 
            // but for simplicity we'll just re-fetch and clear/keep state as desired.
            // For now, let's just show saved.
        }
        setIsLoading(false);
    };

    const loadEntry = (entry: JournalEntry) => {
        setTitle(entry.title);
        setContent(entry.content);
        setSelectedMood(entry.mood || "neutral");
        setTags(entry.tags || []);
        setCurrentEntryId(entry.id);
    };

    const startNew = () => {
        setTitle("");
        setContent("");
        setTags([]);
        setSelectedMood("neutral");
        setCurrentEntryId(null);
    };

    const moods = [
        { id: "neutral", icon: <Meh className="w-5 h-5" /> },
        { id: "happy", icon: <Smile className="w-5 h-5" /> },
        { id: "sad", icon: <Frown className="w-5 h-5" /> },
        { id: "energetic", icon: <Zap className="w-5 h-5" /> },
        { id: "calm", icon: <Cloud className="w-5 h-5" /> },
    ];

    const insertMarkdown = (prefix: string, suffix: string = "") => {
        const textarea = document.getElementById('journal-content') as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const before = text.substring(0, start);
        const selection = text.substring(start, end);
        const after = text.substring(end);

        const newText = `${before}${prefix}${selection}${suffix}${after} `;
        setContent(newText);

        // Restore focus and cursor
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + prefix.length, end + prefix.length);
        }, 0);
    };

    return (
        <>
            <div className="flex bg-[#0A1A12] min-h-[calc(100vh-100px)] rounded-3xl overflow-hidden text-white font-sans">
                {/* Main Editor Area - Conditionally Rendered */}
                {!isCalendarExpanded && (
                    <>
                        <div className="flex-1 p-4 md:p-12 flex flex-col">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h4 className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-2">
                                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                    </h4>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="bg-transparent text-3xl md:text-5xl font-bold text-white placeholder-gray-600 outline-none w-full"
                                        placeholder="Journal Title..."
                                    />
                                </div>
                                <div className="flex items-center gap-2 text-xs text-green-400 font-medium">
                                    Auto-saved 2m ago
                                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 mb-12">
                                <span className="text-gray-400 text-sm">How are you feeling?</span>
                                <div className="flex gap-2">
                                    {moods.map((mood) => (
                                        <div key={mood.id} className="relative group">
                                            <button
                                                onClick={() => setSelectedMood(mood.id)}
                                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${selectedMood === mood.id
                                                    ? "bg-green-500 text-black scale-110"
                                                    : "bg-white/10 text-gray-400 hover:bg-white/20"
                                                    }`}
                                            >
                                                {mood.icon}
                                            </button>
                                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/20">
                                                {mood.id.charAt(0).toUpperCase() + mood.id.slice(1)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10 w-fit mb-8">
                                <ToolbarBtn icon={<Bold className="w-4 h-4" />} onClick={() => insertMarkdown("**", "**")} />
                                <ToolbarBtn icon={<Italic className="w-4 h-4" />} onClick={() => insertMarkdown("*", "*")} />
                                <ToolbarBtn icon={<Underline className="w-4 h-4" />} onClick={() => insertMarkdown("__", "__")} />
                                <div className="w-px h-4 bg-white/20 mx-1"></div>
                                <ToolbarBtn icon={<List className="w-4 h-4" />} onClick={() => insertMarkdown("\n- ")} />
                                <ToolbarBtn icon={<Quote className="w-4 h-4" />} onClick={() => insertMarkdown("\n> ")} />
                                <div className="w-px h-4 bg-white/20 mx-1"></div>
                                <ToolbarBtn icon={<ImageIcon className="w-4 h-4" />} onClick={() => insertMarkdown("![Image](", ")")} />
                                <ToolbarBtn icon={<Link className="w-4 h-4" />} onClick={() => insertMarkdown("[Link](", ")")} />
                            </div>

                            <textarea
                                id="journal-content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="flex-1 bg-transparent resize-none outline-none text-lg text-gray-200 leading-relaxed placeholder-gray-600 font-serif"
                                placeholder="Start writing..."
                            />

                            <div className="flex justify-between items-center mt-8 border-t border-white/10 pt-8">
                                <div className="flex gap-2 flex-wrap max-w-[60%]">
                                    {tags.map((tag, index) => (
                                        <span key={index} className="px-3 py-1 bg-green-900/40 text-green-400 text-xs font-bold rounded-full flex items-center gap-1 border border-green-500/20">
                                            #{tag}
                                            <button
                                                onClick={() => setTags(tags.filter((_, i) => i !== index))}
                                                className="text-green-400/50 hover:text-green-400 cursor-pointer ml-1"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                    <button
                                        onClick={() => {
                                            const newTag = prompt("Enter tag name:");
                                            if (newTag && newTag.trim()) {
                                                setTags([...tags, newTag.trim()]);
                                            }
                                        }}
                                        className="px-3 py-1 text-gray-500 text-xs font-medium cursor-pointer hover:text-white transition-colors"
                                    >
                                        + Add tag
                                    </button>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <button
                                        onClick={startNew}
                                        className="text-gray-400 hover:text-white text-sm font-medium transition-colors"
                                    >
                                        Discard
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={isLoading || !title.trim() || !content.trim()}
                                        className="px-6 py-2.5 bg-green-500 hover:bg-green-400 text-black font-bold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <SaveIcon className="w-4 h-4" />
                                        {isLoading ? "Saving..." : "Save Entry"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Expanded Calendar Inline View */}
                {isCalendarExpanded && (
                    <div className="flex-1 p-4 md:p-8 flex flex-col bg-[#0A1A12] overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6 pb-6 border-b border-white/10">
                            <div className="flex items-center gap-6">
                                <h2 className="text-3xl font-bold text-white tracking-tight">
                                    {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                                </h2>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                                        className="p-2 hover:bg-white/5 rounded-full transition-colors text-white"
                                    >
                                        &lt;
                                    </button>
                                    <button
                                        onClick={() => setCurrentMonth(new Date())}
                                        className="px-4 py-1.5 bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-black text-sm font-bold rounded-lg transition-all border border-green-500/20"
                                    >
                                        Today
                                    </button>
                                    <button
                                        onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                                        className={`p-2 rounded-full transition-colors text-white ${currentMonth.getMonth() === new Date().getMonth() &&
                                            currentMonth.getFullYear() === new Date().getFullYear()
                                            ? "opacity-30 cursor-not-allowed"
                                            : "hover:bg-white/5"
                                            }`}
                                        disabled={
                                            currentMonth.getMonth() === new Date().getMonth() &&
                                            currentMonth.getFullYear() === new Date().getFullYear()
                                        }
                                    >
                                        &gt;
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsCalendarExpanded(false)}
                                className="p-2 px-4 hover:bg-white/10 rounded-lg transition-colors text-sm font-medium text-gray-400 hover:text-white flex items-center gap-2"
                            >
                                <X className="w-4 h-4" /> Close View
                            </button>
                        </div>

                        {/* Large Grid */}
                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            <div className="grid grid-cols-7 h-full gap-4">
                                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                    <div key={day} className="text-center pb-4 text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-white/5">
                                        {day}
                                    </div>
                                ))}

                                {(() => {
                                    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
                                    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
                                    const days = [];
                                    const totalSlots = 42;

                                    // Empty slots
                                    for (let i = 0; i < firstDay; i++) {
                                        days.push(<div key={`empty-lg-start-${i}`} className="bg-white/[0.02] rounded-xl border border-white/5"></div>);
                                    }

                                    // Days
                                    for (let i = 1; i <= daysInMonth; i++) {
                                        const dateObj = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
                                        const dateString = dateObj.toDateString();
                                        const count = entryCounts[dateString] || 0;

                                        const today = new Date();
                                        const isToday = i === today.getDate() &&
                                            currentMonth.getMonth() === today.getMonth() &&
                                            currentMonth.getFullYear() === today.getFullYear();

                                        const isSelected = selectedDate &&
                                            selectedDate.getDate() === i &&
                                            selectedDate.getMonth() === currentMonth.getMonth() &&
                                            selectedDate.getFullYear() === currentMonth.getFullYear();

                                        const isFuture = (currentMonth.getFullYear() > today.getFullYear()) ||
                                            (currentMonth.getFullYear() === today.getFullYear() && currentMonth.getMonth() > today.getMonth()) ||
                                            (currentMonth.getFullYear() === today.getFullYear() && currentMonth.getMonth() === today.getMonth() && i > today.getDate());

                                        days.push(
                                            <div
                                                key={i}
                                                onClick={() => {
                                                    if (!isFuture) {
                                                        setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));
                                                        setIsCalendarExpanded(false); // Close and go to editor
                                                    }
                                                }}
                                                className={`relative p-4 rounded-xl border transition-all group flex flex-col justify-between min-h-[100px]
                                                ${isFuture ? "bg-black/20 border-white/5 cursor-not-allowed opacity-50" :
                                                        isSelected ? "bg-green-500/10 border-green-500 ring-2 ring-green-500/20 cursor-pointer" :
                                                            isToday ? "bg-green-900/10 border-green-500/50 cursor-pointer hover:bg-green-900/20" :
                                                                "bg-white/[0.02] border-white/5 cursor-pointer hover:bg-white/[0.05] hover:border-white/10"}
                                            `}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <span className={`text-lg font-bold ${isSelected ? "text-green-400" :
                                                        isToday ? "text-green-500" :
                                                            "text-gray-400 group-hover:text-white"
                                                        }`}>
                                                        {i}
                                                    </span>
                                                    {isToday && <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">Today</span>}
                                                </div>

                                                {count > 0 && (
                                                    <div className="flex gap-1 flex-wrap mt-2">
                                                        {/* Show little dots for entries */}
                                                        {[...Array(Math.min(count, 5))].map((_, idx) => (
                                                            <div key={idx} className="w-1.5 h-1.5 rounded-full bg-green-400 shadow-[0_0_5px_rgba(74,222,128,0.5)]"></div>
                                                        ))}
                                                        {count > 5 && <span className="text-[10px] text-green-500/80 font-bold">+</span>}
                                                        <div className="w-full text-[10px] text-gray-500 font-medium mt-1">
                                                            {count} {count === 1 ? 'entry' : 'entries'}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    }

                                    // Fill remaining
                                    const remainingSlots = totalSlots - (firstDay + daysInMonth);
                                    for (let i = 0; i < remainingSlots; i++) {
                                        days.push(<div key={`empty-lg-end-${i}`} className="bg-white/[0.02] rounded-xl border border-white/5"></div>);
                                    }

                                    return days;
                                })()}
                            </div>
                        </div>
                    </div>
                )}

                {/* Sidebar / Calendar */}
                <div className="w-80 border-l border-white/10 bg-[#0D2117] p-6 hidden lg:flex flex-col">
                    <button
                        onClick={startNew}
                        className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-xl mb-8 flex items-center justify-center gap-2 transition-colors"
                    >
                        <span className="text-xl">+</span> New Entry
                    </button>

                    <div className="relative mb-6">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search entries..."
                            className="w-full bg-[#1A2E24] border border-transparent focus:border-green-500/50 rounded-lg py-2.5 px-4 text-sm text-gray-300 placeholder-gray-500 outline-none transition-all"
                        />
                    </div>

                    <h5 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4">Recent History</h5>

                    <div className="relative flex-1 custom-scrollbar overflow-y-auto pr-2 space-y-6">
                        {/* Timeline Line */}
                        <div className="absolute left-1.5 top-2 bottom-0 w-px bg-white/10"></div>


                        {filteredEntries.length === 0 && (
                            <div className="pl-6 text-gray-500 text-xs italic">No entries found.</div>
                        )}

                        {filteredEntries.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => loadEntry(item)}
                                className="relative pl-6 group cursor-pointer"
                            >
                                <div className={`absolute left - 0 top - 1.5 w - 3 h - 3 rounded - full border - 2 ${currentEntryId === item.id ? "bg-green-500 border-green-500" : "bg-[#0D2117] border-gray-600 group-hover:border-green-400"} transition - colors`}></div>
                                <div className="flex justify-between items-start mb-1">
                                    <span className={`text - sm font - bold ${currentEntryId === item.id ? "text-white" : "text-gray-400 group-hover:text-gray-200"} `}>
                                        {new Date(item.created_at).toLocaleDateString()}
                                    </span>
                                    <span className="text-[10px] text-gray-600">
                                        {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 line-clamp-2 mb-2 group-hover:text-gray-400 transition-colors">{item.title}</p>
                                {item.tags && item.tags[0] && (
                                    <span className="inline-block px-2 py-0.5 bg-white/5 rounded text-[10px] text-gray-400 border border-white/5">#{item.tags[0]}</span>
                                )}
                            </div>
                        ))}

                        <div className="relative pl-6 opacity-50">
                            <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-[#0D2117] border-2 border-gray-700"></div>
                            <span className="text-xs text-gray-600 italic">End of recent history</span>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10">
                        <div className="bg-[#1A2E24] rounded-xl p-4">
                            <div className="flex justify-between items-center mb-4 text-xs font-bold text-gray-400 tracking-wider">
                                <button
                                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                                    className="hover:text-white transition-colors"
                                >
                                    &lt;
                                </button>
                                <span>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                                <button
                                    onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                                    className={`transition-colors ${currentMonth.getMonth() === new Date().getMonth() &&
                                        currentMonth.getFullYear() === new Date().getFullYear()
                                        ? "text-gray-600 cursor-not-allowed"
                                        : "hover:text-white"
                                        }`}
                                    disabled={
                                        currentMonth.getMonth() === new Date().getMonth() &&
                                        currentMonth.getFullYear() === new Date().getFullYear()
                                    }
                                >
                                    &gt;
                                </button>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-gray-500">
                                <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                                {/* Dynamic Calendar */}
                                {(() => {
                                    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
                                    const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
                                    const days = [];
                                    const totalSlots = 42; // Fixed 6 weeks x 7 days

                                    // Empty slots start
                                    for (let i = 0; i < firstDay; i++) {
                                        days.push(<span key={`empty-start-${i}`} className="w-6 h-6"></span>);
                                    }

                                    // Days
                                    for (let i = 1; i <= daysInMonth; i++) {
                                        const today = new Date();
                                        const isToday = i === today.getDate() &&
                                            currentMonth.getMonth() === today.getMonth() &&
                                            currentMonth.getFullYear() === today.getFullYear();

                                        const isSelected = selectedDate &&
                                            selectedDate.getDate() === i &&
                                            selectedDate.getMonth() === currentMonth.getMonth() &&
                                            selectedDate.getFullYear() === currentMonth.getFullYear();

                                        const isFuture = (currentMonth.getFullYear() > today.getFullYear()) ||
                                            (currentMonth.getFullYear() === today.getFullYear() && currentMonth.getMonth() > today.getMonth()) ||
                                            (currentMonth.getFullYear() === today.getFullYear() && currentMonth.getMonth() === today.getMonth() && i > today.getDate());

                                        days.push(
                                            <button
                                                key={i}
                                                disabled={isFuture}
                                                onClick={() => {
                                                    if (isSelected) setSelectedDate(null); // Toggle off
                                                    else {
                                                        const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
                                                        setSelectedDate(newDate);
                                                    }
                                                }}
                                                className={`p-1 rounded-full w-6 h-6 flex items-center justify-center transition-colors text-[10px]
                                                ${isSelected ? "bg-green-500 text-black font-bold" :
                                                        isToday ? "border border-green-500 text-green-400" :
                                                            isFuture ? "text-gray-700 cursor-not-allowed" :
                                                                "hover:bg-white/10 hover:text-white"}`}
                                            >
                                                {i}
                                            </button>
                                        );
                                    }

                                    // Fill remaining slots to maintain height
                                    const remainingSlots = totalSlots - (firstDay + daysInMonth);
                                    for (let i = 0; i < remainingSlots; i++) {
                                        days.push(<span key={`empty-end-${i}`} className="w-6 h-6"></span>);
                                    }

                                    return days;
                                })()}
                            </div>
                            <button
                                onClick={() => setIsCalendarExpanded(true)}
                                className="absolute bottom-4 right-4 p-2 text-gray-600 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                                title="Expand Calendar"
                            >
                                <Maximize2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}

function ToolbarBtn({ icon, onClick }: { icon: React.ReactNode, onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className="text-gray-400 hover:text-white transition-colors"
        >
            {icon}
        </button>
    );
}

function SaveIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>
    )
}
