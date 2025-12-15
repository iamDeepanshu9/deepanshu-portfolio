"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { ArrowRight, Eye, MousePointer2, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/app/lib/supabaseClient";

// Mock chart data for now
const data = [
    { name: 'Mon', views: 4000 },
    { name: 'Tue', views: 3000 },
    { name: 'Wed', views: 2000 },
    { name: 'Thu', views: 2780 },
    { name: 'Fri', views: 1890 },
    { name: 'Sat', views: 2390 },
    { name: 'Sun', views: 3490 },
];

export default function AnalyticsChart() {
    const [stats, setStats] = useState({
        totalViews: 0,
        engagement: 0,
        clicks: 0
    });
    const [recentActivity, setRecentActivity] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            // 1. Get total blogs as a proxy for "Total Views" or just "Total Content" for now
            const { count: blogCount } = await supabase.from('blogs').select('*', { count: 'exact', head: true });

            // 2. Get recent blogs for activity
            const { data: blogs } = await supabase.from('blogs').select('id, title, created_at').order('created_at', { ascending: false }).limit(5);

            setStats({
                totalViews: blogCount || 0, // Using blog count as "Content Pieces" for now
                engagement: 4.2, // Mock
                clicks: 156 // Mock
            });

            if (blogs) {
                setRecentActivity(blogs.map(b => ({
                    id: b.id,
                    title: `Published "${b.title}"`,
                    time: new Date(b.created_at).toLocaleDateString(),
                    type: 'post'
                })));
            }
        };
        fetchData();
    }, []);

    // Mock chart data for now
    const data = [
        { name: 'Mon', views: 4000 },
        { name: 'Tue', views: 3000 },
        { name: 'Wed', views: 2000 },
        { name: 'Thu', views: 2780 },
        { name: 'Fri', views: 1890 },
        { name: 'Sat', views: 2390 },
        { name: 'Sun', views: 3490 },
    ];

    const [activeIndex, setActiveIndex] = useState<number>(3); // Default highlighting 'Thu'

    return (
        <div className="space-y-6">
            {/* Key Metrics Row */}
            <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">Total Content</p>
                    <p className="text-4xl font-extrabold text-black">{stats.totalViews}</p>
                    <div className="flex items-center gap-1 text-green-600 text-xs font-bold mt-2">
                        <span>↑ 12%</span> <span>vs last month</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">Engagement Rate</p>
                    <p className="text-4xl font-extrabold text-black">{stats.engagement}%</p>
                    <div className="flex items-center gap-1 text-green-600 text-xs font-bold mt-2">
                        <span>↑ 0.8%</span> <span>vs last month</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-1">Portfolio Clicks</p>
                    <p className="text-4xl font-extrabold text-black">{stats.clicks}</p>
                    <div className="flex items-center gap-1 text-red-500 text-xs font-bold mt-2">
                        <span>↓ 2%</span> <span>vs last month</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-2xl font-bold">Content Performance</h3>
                        <select className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm font-bold text-gray-700 outline-none">
                            <option>Last 30 Days</option>
                            <option>Last 7 Days</option>
                            <option>This Year</option>
                        </select>
                    </div>

                    <div className="h-[300px] w-full relative">
                        {/* Custom Tooltip Overlay for the selected item */}
                        {activeIndex !== null && (
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 transform -translate-y-8">
                                5.2k (Today)
                                <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
                            </div>
                        )}

                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data} onMouseMove={(state: any) => {
                                if (state.activeTooltipIndex !== undefined) {
                                    setActiveIndex(state.activeTooltipIndex);
                                }
                            }}>
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 500 }}
                                    dy={10}
                                />
                                <Tooltip cursor={{ fill: 'transparent' }} content={<></>} />
                                <Bar dataKey="views" radius={[20, 20, 20, 20]}>
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={index === activeIndex ? '#FFF500' : '#FEFCE8'}
                                            className="transition-all duration-300"
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Right Column: Quick Create & Calendar */}
                <div className="space-y-6">
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold mb-6">Quick Create</h3>
                        <div className="space-y-4">
                            <button className="w-full p-4 rounded-3xl border border-gray-100 hover:shadow-md transition-shadow flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                        <FilePlusIcon className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-gray-800">New Blog Post</span>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors" />
                            </button>
                            <button className="w-full p-4 rounded-3xl border border-gray-100 hover:shadow-md transition-shadow flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                                        <ImagePlusIcon className="w-5 h-5" />
                                    </div>
                                    <span className="font-bold text-gray-800">Portfolio Entry</span>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold">October 2023</h3>
                            <div className="flex gap-2">
                                <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-black"><ArrowLeftIcon className="w-4 h-4" /></button>
                                <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-black"><ArrowRightIcon className="w-4 h-4" /></button>
                            </div>
                        </div>
                        {/* Mini Calendar Grid */}
                        <div className="grid grid-cols-7 gap-y-4 text-center text-xs font-bold text-gray-500 mb-2">
                            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                        </div>
                        <div className="grid grid-cols-7 gap-y-4 text-center text-sm font-medium text-gray-900">
                            {/* Mock days */}
                            <span className="text-gray-300">29</span>
                            <span className="text-gray-300">30</span>
                            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                            <span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span>
                            <span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span>
                            <span>20</span><span>21</span><span>22</span><span>23</span>
                            <span className="w-8 h-8 mx-auto flex items-center justify-center bg-[#FFF500] rounded-full text-black font-bold">24</span>
                            <span className="relative">25</span>
                            <span className="relative">26 <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></span></span>
                            <span>27</span><span className="relative">28 <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-purple-500 rounded-full"></span></span>
                            <span>29</span><span>30</span><span>31</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity Section */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold">Recent Activity</h3>
                    <button className="text-sm font-bold text-gray-500 hover:text-black flex items-center gap-1">
                        View All <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden divide-y divide-gray-100">
                    <ActivityItem
                        title="Minimalist Design Trends 2024"
                        subtitle="Blog Post • Edited 2h ago"
                        status="DRAFT"
                        image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=100"
                    />
                    <ActivityItem
                        title="Urban Architecture Portfolio"
                        subtitle="Portfolio • Published yesterday"
                        status="PUBLISHED"
                        statusColor="green"
                        image="https://images.unsplash.com/photo-1486325212027-8081648c42c9?auto=format&fit=crop&q=80&w=100"
                    />
                </div>
            </div>
        </div>
    );
}

function StatMetric({ label, value, change, icon }: any) {
    return (
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-black">
                        {icon}
                    </div>
                    {change && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">
                            {change}
                        </span>
                    )}
                </div>
                <p className="text-gray-500 text-sm font-bold">{label}</p>
                <p className="text-3xl font-extrabold text-black mt-1">{value}</p>
            </div>
        </div>
    )
}

function ActivityItem({ title, subtitle, status, statusColor = "yellow", image }: any) {
    return (
        <div className="p-6 flex items-center gap-4 hover:bg-gray-50 transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                <img src={image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
                <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{title}</h4>
                <p className="text-xs text-gray-500">{subtitle}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColor === 'green' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                {status}
            </span>
        </div>
    )
}

function FilePlusIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></svg>
    )
}

function ImagePlusIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /><line x1="12" y1="11" x2="12" y2="17" /><line x1="9" y1="14" x2="15" y2="14" /></svg>
    )
}

function ArrowLeftIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
    )
}

function ArrowRightIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
    )
}
