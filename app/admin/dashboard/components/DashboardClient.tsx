"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Mail, Send, LogOut, BookOpen, Users, Search, ReceiptText, UserRound, Wrench, Sparkles } from "lucide-react";
import { AvailabilityConfig } from "@/src/lib/availability-config";
import ScheduleConfig from "./ScheduleConfig";
import EmailPreview from "./EmailPreview";
import TestEmailForm from "./TestEmailForm";
import BookingsList from "./BookingsList";
import FollowUpTracker from "./FollowUpTracker";
import SeoPanel from "./SeoPanel";
import BudgetsPanel from "./BudgetsPanel";
import ClientsPanel from "./ClientsPanel";
import ServicesPanel from "./ServicesPanel";

type Tab = "schedule" | "bookings" | "budgets" | "clients" | "services" | "email" | "test" | "seguimiento" | "seo";

interface Props {
  initialConfig: AvailabilityConfig;
}

export default function DashboardClient({ initialConfig }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("budgets");

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "schedule", label: "Horario", icon: <Calendar className="w-4 h-4" /> },
    { id: "bookings", label: "Reservas", icon: <BookOpen className="w-4 h-4" /> },
    { id: "budgets", label: "Cotizaciones", icon: <ReceiptText className="w-4 h-4" /> },
    { id: "clients", label: "Clientes", icon: <UserRound className="w-4 h-4" /> },
    { id: "services", label: "Servicios", icon: <Wrench className="w-4 h-4" /> },
    { id: "email", label: "Vista Email", icon: <Mail className="w-4 h-4" /> },
    { id: "test", label: "Prueba Email", icon: <Send className="w-4 h-4" /> },
    { id: "seguimiento", label: "Seguimiento", icon: <Users className="w-4 h-4" /> },
    { id: "seo", label: "SEO", icon: <Search className="w-4 h-4" /> },
  ];

  const currentTab = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_10%,#2f3664_0%,#171a2b_35%,#0f111d_100%)] text-white">
      <div className="max-w-[1400px] mx-auto p-3 sm:p-5 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-4 lg:gap-6">
          <aside className="rounded-3xl border border-white/10 bg-[#141728]/90 backdrop-blur-xl p-4 lg:p-5">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 grid place-items-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold">LumicaTech CRM</p>
                <p className="text-[11px] text-slate-400">Panel Comercial</p>
              </div>
            </div>

            <div className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full px-3 py-2.5 rounded-xl text-sm transition flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-900/40"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={handleLogout}
              className="w-full mt-6 px-3 py-2.5 rounded-xl text-sm border border-white/10 text-slate-300 hover:bg-white/5 transition flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesion
            </button>
          </aside>

          <section className="space-y-4">
            <header className="rounded-3xl border border-white/10 bg-[#141728]/85 backdrop-blur-xl px-4 sm:px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h1 className="text-lg sm:text-xl font-bold">{currentTab?.label || "Dashboard"}</h1>
                <p className="text-xs sm:text-sm text-slate-400">Experiencia comercial inspirada en cotizador moderno</p>
              </div>
              <div className="lg:hidden">
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value as Tab)}
                  className="w-full sm:w-[260px] rounded-xl border border-white/10 bg-[#0f1220] px-3 py-2 text-sm"
                >
                  {tabs.map((tab) => (
                    <option key={tab.id} value={tab.id}>{tab.label}</option>
                  ))}
                </select>
              </div>
            </header>

            <div className="rounded-3xl border border-white/10 bg-[#141728]/70 backdrop-blur-xl p-4 sm:p-5 lg:p-6 min-h-[70vh]">
              {activeTab === "schedule" && (
                <ScheduleConfig initialConfig={initialConfig} />
              )}
              {activeTab === "bookings" && <BookingsList />}
              {activeTab === "budgets" && <BudgetsPanel />}
              {activeTab === "clients" && <ClientsPanel />}
              {activeTab === "services" && <ServicesPanel />}
              {activeTab === "email" && <EmailPreview />}
              {activeTab === "test" && <TestEmailForm />}
              {activeTab === "seguimiento" && <FollowUpTracker />}
              {activeTab === "seo" && <SeoPanel />}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
