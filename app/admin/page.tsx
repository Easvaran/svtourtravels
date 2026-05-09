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
  Package as PackageIcon
} from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    fetchStats();
  }, []);

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
      color: "bg-blue-500",
      trend: "+2 this month",
      isPositive: true
    },
    { 
      label: "Total Packages", 
      value: stats?.packageCount || 0, 
      icon: PackageIcon, 
      color: "bg-indigo-500",
      trend: "+5 this month",
      isPositive: true
    },
    { 
      label: "Total Enquiries", 
      value: stats?.enquiryCount || 0, 
      icon: Users, 
      color: "bg-purple-500",
      trend: "+12% from last week",
      isPositive: true
    },
    { 
      label: "Recent Enquiries", 
      value: stats?.recentEnquiryCount || 0, 
      icon: Clock, 
      color: "bg-orange-500",
      trend: "Last 7 days",
      isPositive: true
    },
  ];

  return (
    <div className="space-y-8">
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
              className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={cn("p-3 rounded-2xl text-white", card.color)}>
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
              <p className="text-3xl font-black text-gray-900">{card.value}</p>
              <p className="text-gray-400 text-xs mt-2 font-medium">{card.trend}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Enquiries Table */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex items-center justify-between">
            <h2 className="text-xl font-black text-gray-900">Recent Enquiries</h2>
            <button className="text-primary font-bold text-sm hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Customer</th>
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Destination</th>
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Date</th>
                  <th className="px-8 py-4 text-xs font-black text-gray-400 uppercase tracking-widest">Status</th>
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
                      <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">
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
          <div className="bg-primary p-8 rounded-[2.5rem] text-white shadow-xl shadow-primary/20">
            <h3 className="text-2xl font-black mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/admin/tours/new" className="block w-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-center py-4 rounded-2xl font-black transition-all">
                Add New Tour
              </Link>
              <Link href="/admin/packages/new" className="block w-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-center py-4 rounded-2xl font-black transition-all">
                Add New Package
              </Link>
              <Link href="/admin/enquiries" className="block w-full bg-white text-primary text-center py-4 rounded-2xl font-black transition-all shadow-lg hover:-translate-y-1">
                Manage Enquiries
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
