"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar, Mail, Send, LogOut, BookOpen, Users, Search,
  ReceiptText, UserRound, Wrench, Sparkles, TrendingUp,
  Clock, CheckCircle2, XCircle, FileText, BarChart3,
  ChevronRight, ArrowUpRight, ArrowDownRight
} from "lucide-react";
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

interface StatsData {
  totalBudgets: number;
  acceptedBudgets: number;
  totalBookings: number;
  totalClients: number;
  totalRevenue: number;
  conversionRate: number;
  pendingBookings: number;
}

interface Props {
  initialConfig: AvailabilityConfig;
}

export default function DashboardClient({ initialConfig }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("budgets");
  const [stats, setStats] = useState<StatsData | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [budgetsRes, bookingsRes, clientsRes] = await Promise.all([
          fetch("/api/admin/budgets"),
          fetch("/api/admin/bookings"),
          fetch("/api/admin/clients"),
        ]);
        const budgets = (await budgetsRes.json()).budgets ?? [];
        const bookings = (await bookingsRes.json()).bookings ?? [];
        const clients = (await clientsRes.json()).clients ?? [];

        const accepted = budgets.filter((b: any) => b.status === "aceptado").length;
        const totalRevenue = budgets.reduce((sum: number, b: any) => sum + (b.finalTotal || 0), 0);
        const pendingBookings = bookings.filter((b: any) => {
          const today = new Date().toISOString().split("T")[0];
          return b.date >= today;
        }).length;

        setStats({
          totalBudgets: budgets.length,
          acceptedBudgets: accepted,
          totalBookings: bookings.length,
          totalClients: clients.length,
          totalRevenue,
          conversionRate: budgets.length > 0 ? (accepted / budgets.length) * 100 : 0,
          pendingBookings,
        });
      } catch {
        // Silently fail — stats are secondary
      } finally {
        setStatsLoading(false);
      }
    }
    loadStats();
  }, []);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: "budgets", label: "Cotizaciones", icon: <ReceiptText className="w-4 h-4" />, desc: "Presupuestos y propuestas" },
    { id: "bookings", label: "Reservas", icon: <BookOpen className="w-4 h-4" />, desc: "Citas y reuniones" },
    { id: "clients", label: "Clientes", icon: <UserRound className="w-4 h-4" />, desc: "Base de datos" },
    { id: "services", label: "Servicios", icon: <Wrench className="w-4 h-4" />, desc: "Catálogo de servicios" },
    { id: "schedule", label: "Horario", icon: <Calendar className="w-4 h-4" />, desc: "Disponibilidad" },
    { id: "email", label: "Email", icon: <Mail className="w-4 h-4" />, desc: "Vista previa" },
    { id: "test", label: "Prueba", icon: <Send className="w-4 h-4" />, desc: "Test emails" },
    { id: "seguimiento", label: "Seguimiento", icon: <Users className="w-4 h-4" />, desc: "Follow-ups" },
    { id: "seo", label: "SEO", icon: <Search className="w-4 h-4" />, desc: "Configuración" },
  ];

  const currentTab = tabs.find((tab) => tab.id === activeTab);

  // Recent budgets for the header
  const recentBudgets = useMemo(() => {
    if (!stats) return [];
    return [
      { label: "Total presupuestos", value: stats.totalBudgets, icon: <FileText className="w-4 h-4" />, trend: null },
      { label: "Aceptados", value: stats.acceptedBudgets, icon: <CheckCircle2 className="w-4 h-4" />, trend: stats.conversionRate, positive: true },
      { label: "Conversión", value: `${stats.conversionRate.toFixed(1)}%`, icon: <TrendingUp className="w-4 h-4" />, trend: null },
      { label: "Ingresos", value: `${stats.totalRevenue.toFixed(0)}€`, icon: <BarChart3 className="w-4 h-4" />, trend: null },
      { label: "Reservas pendientes", value: stats.pendingBookings, icon: <Clock className="w-4 h-4" />, trend: null },
      { label: "Clientes", value: stats.totalClients, icon: <Users className="w-4 h-4" />, trend: null },
    ];
  }, [stats]);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      {/* Top bar */}
      <div className="h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500" />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-[280px] min-h-screen bg-[#0f1322] border-r border-white/5 flex flex-col sticky top-0">
          {/* Logo */}
          <div className="p-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 grid place-items-center shadow-lg shadow-cyan-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold tracking-tight">LumicaTech</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">CRM Panel</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full group flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-cyan-500/15 to-blue-500/10 border border-cyan-500/20"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.03] border border-transparent"
                }`}
              >
                <span className={`transition-colors ${activeTab === tab.id ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300"}`}>
                  {tab.icon}
                </span>
                <div>
                  <p className={`text-sm font-medium ${activeTab === tab.id ? "text-white" : ""}`}>{tab.label}</p>
                  <p className="text-[10px] text-slate-600 leading-none mt-0.5">{tab.desc}</p>
                </div>
                {activeTab === tab.id && (
                  <ChevronRight className="w-3 h-3 text-cyan-400 ml-auto" />
                )}
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-3 border-t border-white/5">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:text-red-400 hover:bg-red-500/5 transition"
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-h-screen">
          {/* Header with stats */}
          <div className="px-6 py-5 border-b border-white/5">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h1 className="text-xl font-bold tracking-tight">{currentTab?.label || "Dashboard"}</h1>
                <p className="text-xs text-slate-500 mt-1">{currentTab?.desc}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-600 uppercase tracking-widest">Última actualización</p>
                <p className="text-xs text-slate-400">{new Date().toLocaleString("es-ES")}</p>
              </div>
            </div>

            {/* Stats grid */}
            {statsLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-[#111827] border border-white/5 rounded-xl p-4 animate-pulse">
                    <div className="h-4 w-8 bg-white/5 rounded mb-2" />
                    <div className="h-5 w-12 bg-white/10 rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {recentBudgets.map((s) => (
                  <div
                    key={s.label}
                    className="bg-[#111827] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-colors group cursor-default"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-500 group-hover:text-slate-400 transition-colors">{s.icon}</span>
                      {s.trend !== null && (
                        <span className={`text-[10px] font-medium flex items-center gap-0.5 ${s.positive ? "text-emerald-400" : "text-red-400"}`}>
                          {s.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {s.trend.toFixed(0)}%
                        </span>
                      )}
                    </div>
                    <p className="text-lg font-bold tracking-tight">{s.value}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tab content */}
          <div className="p-6">
            {activeTab === "schedule" && <ScheduleConfig initialConfig={initialConfig} />}
            {activeTab === "bookings" && <BookingsList />}
            {activeTab === "budgets" && <BudgetsPanel />}
            {activeTab === "clients" && <ClientsPanel />}
            {activeTab === "services" && <ServicesPanel />}
            {activeTab === "email" && <EmailPreview />}
            {activeTab === "test" && <TestEmailForm />}
            {activeTab === "seguimiento" && <FollowUpTracker />}
            {activeTab === "seo" && <SeoPanel />}
          </div>
        </main>
      </div>
    </div>
  );
}
