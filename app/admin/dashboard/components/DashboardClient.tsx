"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Mail, Send, LogOut, BookOpen, Users } from "lucide-react";
import { AvailabilityConfig } from "@/src/lib/availability-config";
import ScheduleConfig from "./ScheduleConfig";
import EmailPreview from "./EmailPreview";
import TestEmailForm from "./TestEmailForm";
import BookingsList from "./BookingsList";
import FollowUpTracker from "./FollowUpTracker";

type Tab = "schedule" | "bookings" | "email" | "test" | "seguimiento";

interface Props {
  initialConfig: AvailabilityConfig;
}

export default function DashboardClient({ initialConfig }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("schedule");

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "schedule", label: "Horario",      icon: <Calendar   className="w-4 h-4" /> },
    { id: "bookings", label: "Reservas",     icon: <BookOpen   className="w-4 h-4" /> },
    { id: "email",    label: "Vista Email",  icon: <Mail       className="w-4 h-4" /> },
    { id: "test",        label: "Prueba Email",  icon: <Send  className="w-4 h-4" /> },
    { id: "seguimiento", label: "Seguimiento",    icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#1a1b24] text-white">
      {/* Header */}
      <header className="bg-[#23242f] border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-white">LumicaTech Admin</h1>
          <p className="text-xs text-gray-400">Panel de administración de reservas</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm"
        >
          <LogOut className="w-4 h-4" />
          Cerrar sesión
        </button>
      </header>

      <div className="max-w-5xl mx-auto p-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-[#23242f] p-1 rounded-xl mb-6 border border-white/10 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "schedule" && (
          <ScheduleConfig initialConfig={initialConfig} />
        )}
        {activeTab === "bookings" && <BookingsList />}
        {activeTab === "email" && <EmailPreview />}
        {activeTab === "test" && <TestEmailForm />}
        {activeTab === "seguimiento" && <FollowUpTracker />}
      </div>
    </div>
  );
}
