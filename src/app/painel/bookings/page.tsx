"use client";

import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { useLocalStorage } from "@/lib/use-local-storage";

type Status = "CONFIRMED" | "PENDING" | "CANCELLED" | "COMPLETED";

interface Booking {
  id: number;
  client: string;
  service: string;
  date: string;
  time: string;
  status: Status;
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

const tabs = ["Todas", "Próximas", "Passadas", "Canceladas"] as const;
type Tab = (typeof tabs)[number];

const statusFilter: Record<Tab, Status[] | null> = {
  Todas: null,
  Próximas: ["CONFIRMED", "PENDING"],
  Passadas: ["COMPLETED"],
  Canceladas: ["CANCELLED"],
};

const statusLabels: Record<Status, string> = {
  CONFIRMED: "Confirmada",
  PENDING: "Pendente",
  CANCELLED: "Cancelada",
  COMPLETED: "Concluída",
};

const statusStyles: Record<Status, string> = {
  CONFIRMED: "bg-green-50 text-green-700",
  PENDING: "bg-yellow-50 text-yellow-700",
  CANCELLED: "bg-red-50 text-red-700",
  COMPLETED: "bg-gray-100 text-gray-600",
};

const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

function formatDateTime(date: string, time: string): string {
  const [year, month, day] = date.split("-");
  return `${parseInt(day)} ${monthNames[parseInt(month) - 1]}, ${year} — ${time}`;
}

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Todas");
  const [bookings, setBookings] = useLocalStorage<Booking[]>("bookwise-bookings", seedBookings);
  const [services] = useLocalStorage<Service[]>("bookwise-services", [
    { id: 1, name: "Corte de Cabelo", duration: 30, price: 35, color: "bg-blue-500" },
    { id: 2, name: "Coloração", duration: 90, price: 120, color: "bg-purple-500" },
    { id: 3, name: "Barba", duration: 15, price: 15, color: "bg-emerald-500" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [formClient, setFormClient] = useState("");
  const [formService, setFormService] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formTime, setFormTime] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filtered = statusFilter[activeTab]
    ? bookings.filter((b) => statusFilter[activeTab]!.includes(b.status))
    : bookings;

  function openModal() {
    setFormClient("");
    setFormService(services.length > 0 ? services[0].name : "");
    setFormDate("");
    setFormTime("");
    setShowModal(true);
  }

  function handleCreate() {
    if (!formClient || !formService || !formDate || !formTime) return;
    const newBooking: Booking = {
      id: Date.now(),
      client: formClient,
      service: formService,
      date: formDate,
      time: formTime,
      status: "PENDING",
    };
    setBookings((prev) => [...prev, newBooking]);
    setShowModal(false);
  }

  function handleConfirm(id: number) {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "CONFIRMED" as Status } : b))
    );
  }

  function handleCancel(id: number) {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "CANCELLED" as Status } : b))
    );
  }

  function handleComplete(id: number) {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "COMPLETED" as Status } : b))
    );
  }

  if (!mounted) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Marcações</h1>
        <div className="rounded-xl bg-white p-12 shadow-sm text-center text-gray-400">A carregar...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Marcações</h1>
        <button
          onClick={openModal}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Nova Marcação
        </button>
      </div>

      <div className="flex gap-1 rounded-lg bg-gray-100 p-1 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="rounded-xl bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-3 font-medium text-gray-500">Cliente</th>
                <th className="px-6 py-3 font-medium text-gray-500">Serviço</th>
                <th className="px-6 py-3 font-medium text-gray-500">Data e Hora</th>
                <th className="px-6 py-3 font-medium text-gray-500">Estado</th>
                <th className="px-6 py-3 font-medium text-gray-500">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {booking.client}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {booking.service}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {formatDateTime(booking.date, booking.time)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        statusStyles[booking.status]
                      }`}
                    >
                      {statusLabels[booking.status]}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {booking.status === "PENDING" && (
                        <button
                          onClick={() => handleConfirm(booking.id)}
                          className="rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
                        >
                          Confirmar
                        </button>
                      )}
                      {booking.status === "CONFIRMED" && (
                        <button
                          onClick={() => handleComplete(booking.id)}
                          className="rounded-md bg-emerald-600 px-3 py-1 text-xs font-medium text-white hover:bg-emerald-700 transition-colors"
                        >
                          Concluída
                        </button>
                      )}
                      {(booking.status === "PENDING" ||
                        booking.status === "CONFIRMED") && (
                        <button
                          onClick={() => handleCancel(booking.id)}
                          className="rounded-md border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                          Cancelar
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-400"
                  >
                    Nenhuma marcação encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Nova Marcação</h2>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-md p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Cliente</label>
                <input
                  type="text"
                  value={formClient}
                  onChange={(e) => setFormClient(e.target.value)}
                  placeholder="Nome do cliente"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Serviço</label>
                <select
                  value={formService}
                  onChange={(e) => setFormService(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Data</label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Hora</label>
                  <input
                    type="time"
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreate}
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Criar Marcação
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
