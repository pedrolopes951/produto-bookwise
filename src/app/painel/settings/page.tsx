"use client";

import { useState, useEffect } from "react";
import { Save, Globe, Bell, Palette } from "lucide-react";
import { useLocalStorage } from "@/lib/use-local-storage";

interface Settings {
  businessName: string;
  slug: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  notifyNewBooking: boolean;
  notifyCancellation: boolean;
  notifyDailyReminder: boolean;
  primaryColor: string;
}

const defaultSettings: Settings = {
  businessName: "Salão da Maria",
  slug: "salao-da-maria",
  description: "Salão de beleza no coração de Lisboa. Especializados em cortes modernos, coloração e tratamentos capilares.",
  phone: "+351 912 345 678",
  email: "maria@salaodamaria.pt",
  address: "Rua Augusta 45, 1100-053 Lisboa",
  notifyNewBooking: true,
  notifyCancellation: true,
  notifyDailyReminder: false,
  primaryColor: "#2563eb",
};

export default function SettingsPage() {
  const [settings, setSettings] = useLocalStorage<Settings>("bookwise-settings", defaultSettings);
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function updateField<K extends keyof Settings>(field: K, value: Settings[K]) {
    setSettings((prev) => ({ ...prev, [field]: value }));
  }

  function handleSave() {
    localStorage.setItem("bookwise-settings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!mounted) {
    return (
      <div className="space-y-8">
        <h1 className="text-2xl font-bold text-gray-900">Definições</h1>
        <div className="rounded-xl bg-white p-12 shadow-sm text-center text-gray-400">A carregar...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Definições</h1>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          <Save className="h-4 w-4" />
          {saved ? "Guardado!" : "Guardar Alterações"}
        </button>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Informação do Negócio</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Nome do Negócio</label>
            <input
              type="text"
              value={settings.businessName}
              onChange={(e) => updateField("businessName", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Slug (URL pública)</label>
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-400">bookwise.app/b/</span>
              <input
                type="text"
                value={settings.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              rows={3}
              value={settings.description}
              onChange={(e) => updateField("description", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Telefone</label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">Morada</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => updateField("address", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Bell className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Notificações</h2>
        </div>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Email para novas marcações</p>
              <p className="text-xs text-gray-500">Receber email quando um cliente faz uma marcação</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifyNewBooking}
              onChange={(e) => updateField("notifyNewBooking", e.target.checked)}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </label>
          <label className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Email para cancelamentos</p>
              <p className="text-xs text-gray-500">Receber email quando uma marcação é cancelada</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifyCancellation}
              onChange={(e) => updateField("notifyCancellation", e.target.checked)}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </label>
          <label className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Lembrete diário</p>
              <p className="text-xs text-gray-500">Resumo das marcações do dia seguinte às 20:00</p>
            </div>
            <input
              type="checkbox"
              checked={settings.notifyDailyReminder}
              onChange={(e) => updateField("notifyDailyReminder", e.target.checked)}
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
          </label>
          <label className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">SMS para clientes (Pro)</p>
              <p className="text-xs text-gray-500">Enviar lembrete por SMS 24h antes da marcação</p>
            </div>
            <input type="checkbox" disabled className="h-5 w-5 rounded border-gray-300 text-gray-300" />
          </label>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Palette className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Aparência (Pro)</h2>
        </div>
        <p className="mb-4 text-sm text-gray-500">Personalize a página de marcações com a sua marca.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Cor principal</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={settings.primaryColor}
                onChange={(e) => updateField("primaryColor", e.target.value)}
                className="h-10 w-10 cursor-pointer rounded border border-gray-300"
              />
              <span className="text-sm text-gray-500">{settings.primaryColor}</span>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Logotipo</label>
            <div className="flex h-10 items-center rounded-lg border border-dashed border-gray-300 px-3">
              <span className="text-sm text-gray-400">Arraste o ficheiro ou clique para enviar</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
