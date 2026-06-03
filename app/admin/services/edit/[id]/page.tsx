"use client";

import ServiceForm from "@/components/admin/ServiceForm";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function EditServicePage() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/services/${id}`);
        const data = await res.json();
        setService(data);
      } catch (error) {
        console.error("Failed to fetch service:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!service) return <div>Service not found</div>;

  return <ServiceForm initialData={service} isEdit={true} />;
}
