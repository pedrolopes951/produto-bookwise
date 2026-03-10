"use client";

import { useState } from "react";
import { Save, Globe, Bell, Palette } from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
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

      {/* Business Info */}
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
              defaultValue="Salão da Maria"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Slug (URL pública)</label>
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-400">bookwise.app/b/</span>
              <input
                type="text"
                defaultValue="salao-da-maria"
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">Descrição</label>
            <textarea
              rows={3}
              defaultValue="Salão de beleza no coração de Lisboa. Especializados em cortes modernos, coloração e tratamentos capilares."
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Telefone</label>
            <input
              type="tel"
              defaultValue="+351 912 345 678"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              defaultValue="maria@salaodamaria.pt"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-sm font-medium text-gray-700">Morada</label>
            <input
              type="text"
              defaultValue="Rua Augusta 45, 1100-053 Lisboa"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Notifications */}
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
            <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          </label>
          <label className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Email para cancelamentos</p>
              <p className="text-xs text-gray-500">Receber email quando uma marcação é cancelada</p>
            </div>
            <input type="checkbox" defaultChecked className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
          </label>
          <label className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Lembrete diário</p>
              <p className="text-xs text-gray-500">Resumo das marcações do dia seguinte às 20:00</p>
            </div>
            <input type="checkbox" className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
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

      {/* Appearance */}
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
              <input type="color" defaultValue="#2563eb" className="h-10 w-10 cursor-pointer rounded border border-gray-300" />
              <span className="text-sm text-gray-500">#2563eb</span>
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
