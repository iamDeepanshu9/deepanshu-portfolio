"use client";

import {
    LayoutDashboard,
    PenTool,
    Book,
    BarChart2,
    Users,
    MessageSquare,
    LogOut,
    Settings,
    ChevronLeft
} from "lucide-react";

type ViewState = 'dashboard' | 'editor' | 'blogs' | 'contacts' | 'journal' | 'analytics';

interface AdminSidebarProps {
    currentView: ViewState;
    onNavigate: (view: ViewState) => void;
    onLogout: () => void;
}

export default function AdminSidebar({ currentView, onNavigate, onLogout }: AdminSidebarProps) {
    const mainLinks = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'analytics', label: 'Analytics', icon: BarChart2 },
        { id: 'blogs', label: 'Blog Writer', icon: PenTool },
        { id: 'journal', label: 'Journal', icon: Book },
        { id: 'editor', label: 'Portfolio', icon: Settings },
        { id: 'contacts', label: 'Inbox', icon: MessageSquare },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0A0A0A] text-gray-400 flex flex-col border-r border-white/10 z-50">
            {/* Logo Area */}
            <div className="p-6 border-b border-white/10 flex items-center gap-3">
                <div className="w-8 h-8 bg-[#FFF500] rounded-lg flex items-center justify-center">
                    <span className="text-black font-bold text-lg">C</span>
                </div>
                <span className="text-white font-bold tracking-tight">CreatorStudio</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {mainLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = currentView === link.id;

                    return (
                        <button
                            key={link.id}
                            onClick={() => onNavigate(link.id as ViewState)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? "bg-[#FFF500] text-black font-bold"
                                    : "hover:bg-white/10 text-gray-400 hover:text-white"
                                }`}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? "text-black" : "group-hover:text-white"}`} />
                            <span>{link.label}</span>
                        </button>
                    );
                })}
            </nav>

            {/* User Profile / Logout */}
            <div className="p-4 border-t border-white/10">
                <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between group hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xs">
                            DK
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-white truncate group-hover:text-[#FFF500] transition-colors">Deepanshu</p>
                            <p className="text-xs text-gray-500 truncate">Admin</p>
                        </div>
                    </div>
                    <button
                        onClick={onLogout}
                        className="text-gray-500 hover:text-red-400 transition-colors p-2"
                        title="Logout"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </aside>
    );
}
