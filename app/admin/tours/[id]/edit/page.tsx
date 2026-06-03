"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import TourForm from "@/components/admin/TourForm";
import { Loader2 } from "lucide-react";

export default function EditTourPage() {
  const { id } = useParams();
  const [tour, setTour] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/tours/${id}`)
      .then(res => res.json())
      .then(data => {
        setTour(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch tour:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-[#10b981] animate-spin" />
        <p className="text-gray-500 font-bold animate-pulse">Loading tour data...</p>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="text-center py-20 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
        <h3 className="text-2xl font-black text-gray-900 mb-2">Tour not found</h3>
        <p className="text-gray-500 font-medium mb-8">The tour destination you are trying to edit doesn't exist or has been removed.</p>
      </div>
    );
  }

  return <TourForm initialData={tour} isEdit={true} />;
}
