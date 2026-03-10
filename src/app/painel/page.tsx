"use client";

import { useState, useEffect } from "react";
import {
  CalendarCheck,
  CalendarDays,
  Users,
  DollarSign,
  Plus,
  Clock,
  Share2,
} from "lucide-react";
import { useLocalStorage } from "@/lib/use-local-storage";

interface Booking {
  id: number;
  client: string;
  service: string;
  date: string;
  time: string;
  status: "CONFIRMED" | "PENDING" | "CANCELLED" | "COMPLETED";
}

interface Service {
  id: number;
  name: string;
  duration: number;
  price: number;
  color: string;
}

const seedBookings: Booking[] = [
  { id: 1, client: "Sara Oliveira", service: "Corte de Cabelo", date: "2026-03-10", time: "10:00", status: "CONFIRMED" },
  { id: 2, client: "Miguel Santos", service: "Coloração", date: "2026-03-10", time: "13:30", status: "CONFIRMED" },
  { id: 3, client: "Ana Costa", service: "Barba", date: "2026-03-11", time: "09:00", status: "PENDING" },
  { id: 4, client: "Tiago Ferreira", service: "Corte de Cabelo", date: "2026-03-12", time: "11:00", status: "PENDING" },
  { id: 5, client: "Beatriz Lopes", service: "Coloração", date: "2026-03-05", time: "15:00", status: "COMPLETED" },
  { id: 6, client: "Daniel Sousa", service: "Barba", date: "2026-03-03", time: "10:30", status: "CANCELLED" },
];

const seedServices: Service[] = [
  { id: 1, name: "Corte de Cabelo", duration: 30, price: 35, color: "bg-blue-500" },
  { id: 2, name: "Coloração", duration: 90, price: 120, color: "bg-purple-500" },
  { id: 3, name: "Barba", duration: 15, price: 15, color: "bg-emerald-500" },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Bom dia!";
  if (hour < 18) return "Boa tarde!";
  return "Boa noite!";
}

const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

function formatDateTime(date: string, time: string): string {
  const [year, month, day] = date.split("-");
  return `${parseInt(day)} ${monthNames[parseInt(month) - 1]}, ${year} — ${time}`;
}

function getToday(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getWeekRange(): [string, string] {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  const monday = new Date(now);
  monday.setDate(now.getDate() - diffToMonday);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  function fmt(d: Date) {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }
  return [fmt(monday), fmt(sunday)];
}

function getMonthRange(): [string, string] {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const first = `${year}-${String(month + 1).padStart(2, "0")}-01`;
  const lastDay = new Date(year, month + 1, 0).getDate();
  const last = `${year}-${String(month + 1).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
  return [first, last];
}

const statusStyles = {
  confirmada: "bg-green-50 text-green-700",
  pendente: "bg-yellow-50 text-yellow-700",
};

const quickActions = [
  { label: "Adicionar Serviço", icon: Plus, href: "/painel/services" },
  { label: "Atualizar Disponibilidade", icon: Clock, href: "/painel/availability" },
  { label: "Partilhar Link de Marcações", icon: Share2, href: "#" },
];

export default function DashboardPage() {
  const [bookings] = useLocalStorage<Booking[]>("bookwise-bookings", seedBookings);
  const [services] = useLocalStorage<Service[]>("bookwise-services", seedServices);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const today = getToday();
  const [weekStart, weekEnd] = getWeekRange();
  const [monthStart, monthEnd] = getMonthRange();

  const todayBookings = bookings.filter(
    (b) => b.date === today && (b.status === "CONFIRMED" || b.status === "PENDING")
  ).length;

  const weekBookings = bookings.filter(
    (b) => b.date >= weekStart && b.date <= weekEnd && b.status !== "CANCELLED"
  ).length;

  const uniqueClients = new Set(bookings.map((b) => b.client)).size;

  const monthRevenue = bookings
    .filter((b) => b.date >= monthStart && b.date <= monthEnd && b.status === "COMPLETED")
    .reduce((sum, b) => {
      const svc = services.find((s) => s.name === b.service);
      return sum + (svc ? svc.price : 0);
    }, 0);

  const upcomingBookings = bookings
    .filter((b) => (b.status === "CONFIRMED" || b.status === "PENDING") && b.date >= today)
    .sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return a.time.localeCompare(b.time);
    })
    .slice(0, 5);

  const stats = [
    {
      label: "Marcações Hoje",
      value: mounted ? String(todayBookings) : "...",
      icon: CalendarCheck,
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "Esta Semana",
      value: mounted ? String(weekBookings) : "...",
      icon: CalendarDays,
      color: "text-purple-600 bg-purple-50",
    },
    {
      label: "Total de Clientes",
      value: mounted ? String(uniqueClients) : "...",
      icon: Users,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      label: "Receita Este Mês",
      value: mounted ? `\u20AC${monthRevenue}` : "...",
      icon: DollarSign,
      color: "text-amber-600 bg-amber-50",
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">{getGreeting()}</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-xl bg-white p-5 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className={`rounded-lg p-2.5 ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Próximas Marcações
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-500">
                <th className="pb-3 font-medium">Cliente</th>
                <th className="pb-3 font-medium">Serviço</th>
                <th className="pb-3 font-medium">Data e Hora</th>
                <th className="pb-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mounted && upcomingBookings.map((booking) => {
                const statusLabel = booking.status === "CONFIRMED" ? "confirmada" : "pendente";
                return (
                  <tr key={booking.id}>
                    <td className="py-3 font-medium text-gray-900">
                      {booking.client}
                    </td>
                    <td className="py-3 text-gray-600">{booking.service}</td>
                    <td className="py-3 text-gray-600">{formatDateTime(booking.date, booking.time)}</td>
                    <td className="py-3">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                          statusStyles[statusLabel]
                        }`}
                      >
                        {statusLabel}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {mounted && upcomingBookings.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-400">
                    Sem marcações futuras.
                  </td>
                </tr>
              )}
              {!mounted && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-400">
                    A carregar...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Ações Rápidas
        </h2>
        <div className="flex flex-wrap gap-3">
          {quickActions.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
            >
              <Icon className="h-4 w-4" />
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
