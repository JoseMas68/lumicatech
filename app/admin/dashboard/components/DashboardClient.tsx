"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Mail, Send, LogOut, BookOpen, Users, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { AvailabilityConfig } from "@/src/lib/availability-config";
import ScheduleConfig from "./ScheduleConfig";
import EmailPreview from "./EmailPreview";
import TestEmailForm from "./TestEmailForm";
import BookingsList from "./BookingsList";
import FollowUpTracker from "./FollowUpTracker";
import SeoPanel from "./SeoPanel";

type Tab = "schedule" | "bookings" | "email" | "test" | "seguimiento" | "seo";

interface Props {
  initialConfig: AvailabilityConfig;
}

export default function DashboardClient({ initialConfig }: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("schedule");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "schedule", label: "Horario", icon: <Calendar className="w-4 h-4" /> },
    { id: "bookings", label: "Reservas", icon: <BookOpen className="w-4 h-4" /> },
    { id: "email", label: "Vista Email", icon: <Mail className="w-4 h-4" /> },
    { id: "test", label: "Prueba Email", icon: <Send className="w-4 h-4" /> },
    { id: "seguimiento", label: "Seguimiento", icon: <Users className="w-4 h-4" /> },
    { id: "seo", label: "SEO", icon: <Search className="w-4 h-4" /> },
  ];

  // Scroll navigation for mobile
  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      const scrollAmount = 150;
      tabsRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const checkScrollButtons = () => {
    if (tabsRef.current) {
      setCanScrollLeft(tabsRef.current.scrollLeft > 0);
      setCanScrollRight(tabsRef.current.scrollLeft < tabsRef.current.scrollWidth - tabsRef.current.clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    if (tabsRef.current) {
      tabsRef.current.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
      return () => {
        tabsRef.current?.removeEventListener('scroll', checkScrollButtons);
        window.removeEventListener('resize', checkScrollButtons);
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1b24] text-white">
      {/* Header */}
      <header className="bg-[#23242f] border-b border-white/10 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="min-w-0">
          <h1 className="text-lg font-bold text-white truncate">LumicaTech Admin</h1>
          <p className="text-xs text-gray-400 hidden sm:block">Panel de administración</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm flex-shrink-0"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Cerrar sesión</span>
        </button>
      </header>

      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        {/* Tabs con scroll horizontal */}
        <div className="relative mb-6">
          {/* Scroll buttons - solo en móvil */}
          <button
            onClick={() => scrollTabs('left')}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-[#23242f] border border-white/10 rounded-full flex items-center justify-center lg:hidden transition-opacity ${
              canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => scrollTabs('right')}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-[#23242f] border border-white/10 rounded-full flex items-center justify-center lg:hidden transition-opacity ${
              canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Tabs scrollable */}
          <div 
            ref={tabsRef}
            className="flex gap-1 bg-[#23242f] p-1 rounded-xl border border-white/10 overflow-x-auto scrollbar-hide lg:w-fit"
            style={{ 
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="pb-8">
          {activeTab === "schedule" && (
            <ScheduleConfig initialConfig={initialConfig} />
          )}
          {activeTab === "bookings" && <BookingsList />}
          {activeTab === "email" && <EmailPreview />}
          {activeTab === "test" && <TestEmailForm />}
          {activeTab === "seguimiento" && <FollowUpTracker />}
          {activeTab === "seo" && <SeoPanel />}
        </div>
      </div>

      {/* Hide scrollbar CSS */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
