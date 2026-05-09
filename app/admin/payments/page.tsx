"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  IndianRupee, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  Loader2,
  Calendar,
  Car
} from "lucide-react";
import { motion } from "framer-motion";
import PaymentTable from "@/components/admin/PaymentTable";
import PaymentForm from "@/components/admin/PaymentForm";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<any>(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await fetch("/api/payments");
      const data = await res.json();
      setPayments(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = payments.filter(p => {
    const matchesSearch = p.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.phone.includes(searchTerm);
    const matchesFilter = filterStatus === "All" || p.paymentStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: "Total Received", value: `₹${payments.filter(p => p.paymentStatus === 'success').reduce((acc, curr) => acc + curr.paidAmount, 0).toLocaleString()}`, icon: IndianRupee, color: "blue" },
    { label: "Success", value: payments.filter(p => p.paymentStatus === "success").length, icon: CheckCircle2, color: "green" },
    { label: "Pending", value: payments.filter(p => p.paymentStatus === "pending").length, icon: AlertCircle, color: "amber" },
  ];

  return (
    <div className="space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Payments</h1>
          <p className="text-gray-500 font-medium">Track transactions and manage customer payments</p>
        </div>
        <button 
          onClick={() => { setEditingPayment(null); setIsFormOpen(true); }}
          className="bg-primary text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-primary/20"
        >
          <Plus size={20} />
          <span>Add Manual Payment</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-${stat.color === 'blue' ? 'blue-50' : stat.color === 'green' ? 'green-50' : 'amber-50'} text-${stat.color === 'blue' ? 'blue-600' : stat.color === 'green' ? 'green-600' : 'amber-600'}`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-2xl font-black text-gray-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col lg:flex-row gap-6">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search by customer name or phone..."
            className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <select 
            className="bg-gray-50 border-2 border-transparent rounded-2xl py-4 px-6 focus:border-primary/10 focus:bg-white outline-none transition-all font-bold text-gray-900 appearance-none min-w-[180px]"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-gray-500 font-bold">Loading payment records...</p>
        </div>
      ) : filteredPayments.length > 0 ? (
        <PaymentTable 
          payments={filteredPayments} 
          onDelete={(id) => setPayments(payments.filter(p => p._id !== id))}
          onEdit={(payment) => { setEditingPayment(payment); setIsFormOpen(true); }}
        />
      ) : (
        <div className="bg-white rounded-[3rem] p-20 text-center border-2 border-dashed border-gray-100">
          <IndianRupee className="mx-auto text-gray-200 mb-6" size={80} />
          <h3 className="text-2xl font-black text-gray-900">No records found</h3>
          <p className="text-gray-500 font-medium">Start by adding your first payment record or wait for customer bookings.</p>
        </div>
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <PaymentForm 
          initialData={editingPayment} 
          onClose={() => setIsFormOpen(false)} 
          onSuccess={fetchPayments} 
        />
      )}
    </div>
  );
}
