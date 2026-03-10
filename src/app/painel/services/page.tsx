"use client";

import { useState, useEffect } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { useLocalStorage } from "@/lib/use-local-storage";

interface Service {
  id: number;
  name: string;
  duration: number;
  price: number;
  color: string;
}

const seedServices: Service[] = [
  { id: 1, name: "Corte de Cabelo", duration: 30, price: 35, color: "bg-blue-500" },
  { id: 2, name: "Coloração", duration: 90, price: 120, color: "bg-purple-500" },
  { id: 3, name: "Barba", duration: 15, price: 15, color: "bg-emerald-500" },
];

const durationOptions = [15, 30, 45, 60, 90, 120];

const colorOptions = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-emerald-500",
  "bg-red-500",
  "bg-amber-500",
  "bg-pink-500",
  "bg-cyan-500",
  "bg-orange-500",
];

const colorLabels: Record<string, string> = {
  "bg-blue-500": "Azul",
  "bg-purple-500": "Roxo",
  "bg-emerald-500": "Verde",
  "bg-red-500": "Vermelho",
  "bg-amber-500": "Âmbar",
  "bg-pink-500": "Rosa",
  "bg-cyan-500": "Ciano",
  "bg-orange-500": "Laranja",
};

export default function ServicesPage() {
  const [services, setServices] = useLocalStorage<Service[]>("bookwise-services", seedServices);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formName, setFormName] = useState("");
  const [formDuration, setFormDuration] = useState(30);
  const [formPrice, setFormPrice] = useState(0);
  const [formColor, setFormColor] = useState("bg-blue-500");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function openCreateModal() {
    setEditingId(null);
    setFormName("");
    setFormDuration(30);
    setFormPrice(0);
    setFormColor("bg-blue-500");
    setShowModal(true);
  }

  function openEditModal(service: Service) {
    setEditingId(service.id);
    setFormName(service.name);
    setFormDuration(service.duration);
    setFormPrice(service.price);
    setFormColor(service.color);
    setShowModal(true);
  }

  function handleSave() {
    if (!formName || formPrice <= 0) return;

    if (editingId !== null) {
      setServices((prev) =>
        prev.map((s) =>
          s.id === editingId
            ? { ...s, name: formName, duration: formDuration, price: formPrice, color: formColor }
            : s
        )
      );
    } else {
      const newService: Service = {
        id: Date.now(),
        name: formName,
        duration: formDuration,
        price: formPrice,
        color: formColor,
      };
      setServices((prev) => [...prev, newService]);
    }
    setShowModal(false);
  }

  function handleDelete(id: number) {
    if (confirm("Tem a certeza que quer eliminar este serviço?")) {
      setServices((prev) => prev.filter((s) => s.id !== id));
    }
  }

  if (!mounted) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Serviços</h1>
        <div className="rounded-xl bg-white p-12 shadow-sm text-center text-gray-400">A carregar...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Serviços</h1>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Adicionar Serviço
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="rounded-xl bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-block h-3 w-3 rounded-full ${service.color}`}
                />
                <h3 className="text-lg font-semibold text-gray-900">
                  {service.name}
                </h3>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
              <span>{service.duration} min</span>
              <span className="text-gray-300">|</span>
              <span className="font-medium text-gray-900">{"\u20AC"}{service.price}</span>
            </div>

            <div className="mt-5 flex gap-2 border-t border-gray-100 pt-4">
              <button
                onClick={() => openEditModal(service)}
                className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Pencil className="h-3.5 w-3.5" />
                Editar
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingId !== null ? "Editar Serviço" : "Novo Serviço"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-md p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Nome</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Nome do serviço"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Duração</label>
                <select
                  value={formDuration}
                  onChange={(e) => setFormDuration(Number(e.target.value))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                >
                  {durationOptions.map((d) => (
                    <option key={d} value={d}>{d} min</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Preço ({"\u20AC"})</label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  value={formPrice}
                  onChange={(e) => setFormPrice(Number(e.target.value))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Cor</label>
                <select
                  value={formColor}
                  onChange={(e) => setFormColor(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                >
                  {colorOptions.map((c) => (
                    <option key={c} value={c}>{colorLabels[c]}</option>
                  ))}
                </select>
                <div className="mt-2 flex gap-2">
                  {colorOptions.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setFormColor(c)}
                      className={`h-6 w-6 rounded-full ${c} ${
                        formColor === c ? "ring-2 ring-offset-2 ring-blue-600" : ""
                      }`}
                    />
                  ))}
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
                onClick={handleSave}
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                {editingId !== null ? "Guardar" : "Criar Serviço"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
