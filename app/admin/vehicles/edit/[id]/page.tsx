"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import VehicleForm from "@/components/admin/VehicleForm";
import { Loader2 } from "lucide-react";

export default function EditVehiclePage() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/vehicles/${id}`)
      .then(res => res.json())
      .then(data => {
        setVehicle(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch vehicle:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
        <p className="text-gray-500 font-bold animate-pulse">Loading vehicle data...</p>
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="text-center py-20 bg-white rounded-[3rem] border border-gray-100 shadow-sm">
        <h3 className="text-2xl font-black text-gray-900 mb-2">Vehicle not found</h3>
        <p className="text-gray-500 font-medium mb-8">The vehicle you are trying to edit doesn't exist or has been removed.</p>
      </div>
    );
  }

  return <VehicleForm initialData={vehicle} isEdit={true} />;
}
