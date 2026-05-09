"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Car, 
  Search, 
  Filter, 
  ChevronRight, 
  LayoutGrid, 
  Table as TableIcon,
  TrendingUp,
  CheckCircle2,
  Clock
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import VehicleTable from "@/components/admin/VehicleTable";

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const res = await fetch("/api/vehicles");
      const data = await res.json();
      setVehicles(data);
    } catch (error) {
      console.error("Failed to fetch vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredVehicles = vehicles.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "All" || v.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: "Total Fleet", value: vehicles.length, icon: Car, color: "blue" },
    { label: "Active", value: vehicles.filter(v => v.status === "active").length, icon: CheckCircle2, color: "green" },
    { label: "Popular", value: vehicles.filter(v => v.isPopular).length, icon: TrendingUp, color: "orange" },
  ];

  return (
    <div className="space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Vehicle Fleet</h1>
          <p className="text-gray-500 font-medium">Manage your transport inventory and 360° experiences</p>
        </div>
        <Link 
          href="/admin/vehicles/add"
          className="bg-primary text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-primary/20 hover:-translate-y-1 active:scale-95"
        >
          <Plus size={20} />
          <span>Add New Vehicle</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center gap-6"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-${stat.color}-50 text-${stat.color}-600`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-gray-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-6">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by vehicle name or type..."
            className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <select 
            className="bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900 appearance-none min-w-[160px]"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Luxury Van">Luxury Van</option>
            <option value="Minibus">Minibus</option>
          </select>
          <div className="bg-gray-100 p-1.5 rounded-2xl flex gap-1">
            <button className="p-2.5 bg-white text-primary rounded-xl shadow-sm"><LayoutGrid size={20} /></button>
            <button className="p-2.5 text-gray-400 hover:text-gray-600"><TableIcon size={20} /></button>
          </div>
        </div>
      </div>

      {/* Vehicle List */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3].map(i => (
            <div key={i} className="h-[400px] bg-white rounded-[2.5rem] animate-pulse border border-gray-100" />
          ))}
        </div>
      ) : filteredVehicles.length > 0 ? (
        <VehicleTable vehicles={filteredVehicles} onDelete={(id) => setVehicles(vehicles.filter(v => v._id !== id))} />
      ) : (
        <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-gray-100">
          <Car className="mx-auto text-gray-200 mb-6" size={80} />
          <h3 className="text-2xl font-black text-gray-900">No vehicles found</h3>
          <p className="text-gray-500 font-medium mb-8">Start by adding your first vehicle to the fleet.</p>
          <Link 
            href="/admin/vehicles/add"
            className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-lg shadow-primary/20"
          >
            <Plus size={20} />
            <span>Add Your First Vehicle</span>
          </Link>
        </div>
      )}
    </div>
  );
}
