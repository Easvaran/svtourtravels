"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { 
  Users, 
  MapPin, 
  TrendingUp, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Package as PackageIcon,
  Trash2,
  RefreshCw
} from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (res.ok) {
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleClearActivity = async () => {
    if (!confirm("Are you sure you want to clear all recent enquiry activity? This will delete all enquiries.")) return;
    
    setClearing(true);
    try {
      const res = await fetch("/api/admin/stats/clear", { method: "DELETE" });
      if (res.ok) {
        toast.success("Recent activity cleared ✨");
        fetchStats();
      } else {
        toast.error("Failed to clear activity");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setClearing(false);
    }
  };

  if (loading) return <div className="animate-pulse space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1,2,3,4].map(i => <div key={i} className="h-32 bg-gray-200 rounded-3xl" />)}
    </div>
    <div className="h-96 bg-gray-200 rounded-3xl" />
  </div>;

  const cards = [
    { 
      label: "Total Tours", 
      value: stats?.tourCount || 0, 
      icon: MapPin, 
      color: "bg-[#00bcd4]",
      trend: "+2 this month",
      isPositive: true
    },
    { 
      label: "Total Enquiries", 
      value: stats?.enquiryCount || 0, 
      icon: Users, 
      color: "bg-[#00bcd4]",
      trend: "+12% from last week",
      isPositive: true
    },
    { 
      label: "Recent Enquiries", 
      value: stats?.recentEnquiryCount || 0, 
      icon: Clock, 
      color: "bg-[#00bcd4]",
      trend: "Last 7 days",
      isPositive: true
    },
  ];

  return (
    <div className="space-y-8 font-poppins">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={cn("p-3 rounded-2xl text-white shadow-lg shadow-[#00bcd4]/20", card.color)}>
                  <Icon size={24} />
                </div>
                <div className={cn(
                  "flex items-center text-xs font-bold px-2 py-1 rounded-full",
                  card.isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                )}>
                  {card.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  <span className="ml-1">12%</span>
                </div>
              </div>
              <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider mb-1">{card.label}</h3>
              <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              <p className="text-gray-400 text-xs mt-2 font-medium">{card.trend}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Enquiries Table */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Recent Enquiries</h2>
            <div className="flex items-center gap-4">
              <button 
                onClick={handleClearActivity}
                disabled={clearing || !stats?.recentEnquiries?.length}
                className="flex items-center gap-2 text-red-500 font-bold text-xs uppercase tracking-widest hover:bg-red-50 px-4 py-2 rounded-xl transition-all disabled:opacity-30 disabled:hover:bg-transparent"
              >
                {clearing ? <RefreshCw size={14} className="animate-spin" /> : <Trash2 size={14} />}
                Clear Activity
              </button>
              <Link href="/admin/enquiries" className="text-[#00bcd4] font-bold text-sm hover:underline">View All</Link>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Destination</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Date</th>
                  <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {stats?.recentEnquiries?.map((enq: any, i: number) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-8 py-5">
                      <p className="font-bold text-gray-900">{enq.name}</p>
                      <p className="text-xs text-gray-500">{enq.phone}</p>
                    </td>
                    <td className="px-8 py-5">
                      <span className="inline-block px-3 py-1 bg-[#00bcd4]/10 text-[#00bcd4] rounded-full text-xs font-bold">
                        {enq.destination}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-sm text-gray-600 font-medium">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-5">
                      <span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-2" />
                      <span className="text-xs font-bold text-gray-900">New</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-[#0f172a] p-8 rounded-[2.5rem] text-white shadow-xl shadow-slate-900/20">
            <h3 className="text-2xl font-bold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/admin/tours/add" className="block w-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-center py-4 rounded-2xl font-bold transition-all text-white">
                Add New Tour
              </Link>
              <Link href="/admin/packages/new" className="block w-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-center py-4 rounded-2xl font-bold transition-all text-white">
                Add New Package
              </Link>
              <Link href="/admin/enquiries" className="block w-full bg-[#00bcd4] text-white text-center py-4 rounded-2xl font-bold transition-all shadow-lg shadow-[#00bcd4]/20 hover:-translate-y-1">
                Manage Enquiries
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
