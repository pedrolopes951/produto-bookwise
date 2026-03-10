"use client";

import { useState, useEffect } from "react";
import { useLocalStorage } from "@/lib/use-local-storage";

interface DaySchedule {
  day: string;
  active: boolean;
  start: string;
  end: string;
}

const seedSchedule: DaySchedule[] = [
  { day: "Segunda", active: true, start: "09:00", end: "17:00" },
  { day: "Terça", active: true, start: "09:00", end: "17:00" },
  { day: "Quarta", active: true, start: "09:00", end: "17:00" },
  { day: "Quinta", active: true, start: "09:00", end: "17:00" },
  { day: "Sexta", active: true, start: "09:00", end: "17:00" },
  { day: "Sábado", active: true, start: "10:00", end: "14:00" },
  { day: "Domingo", active: false, start: "09:00", end: "17:00" },
];

const timeOptions: string[] = [];
for (let h = 6; h <= 22; h++) {
  for (const m of ["00", "30"]) {
    timeOptions.push(`${h.toString().padStart(2, "0")}:${m}`);
  }
}

export default function AvailabilityPage() {
  const [schedule, setSchedule] = useLocalStorage<DaySchedule[]>("bookwise-availability", seedSchedule);
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function toggleDay(index: number) {
    setSchedule((prev) =>
      prev.map((d, i) => (i === index ? { ...d, active: !d.active } : d))
    );
  }

  function updateTime(index: number, field: "start" | "end", value: string) {
    setSchedule((prev) =>
      prev.map((d, i) => (i === index ? { ...d, [field]: value } : d))
    );
  }

  function handleSave() {
    localStorage.setItem("bookwise-availability", JSON.stringify(schedule));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!mounted) {
    return (
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Disponibilidade</h1>
        <div className="rounded-xl bg-white p-12 shadow-sm text-center text-gray-400">A carregar...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Disponibilidade</h1>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="space-y-4">
          {schedule.map((day, index) => (
            <div
              key={day.day}
              className="flex flex-col gap-3 sm:flex-row sm:items-center rounded-lg border border-gray-100 p-4"
            >
              <span className="w-28 text-sm font-medium text-gray-900">
                {day.day}
              </span>

              <button
                onClick={() => toggleDay(index)}
                className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                  day.active ? "bg-blue-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                    day.active ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>

              {day.active ? (
                <div className="flex items-center gap-2 sm:ml-4">
                  <select
                    value={day.start}
                    onChange={(e) => updateTime(index, "start", e.target.value)}
                    className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  >
                    {timeOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <span className="text-gray-400">até</span>
                  <select
                    value={day.end}
                    onChange={(e) => updateTime(index, "end", e.target.value)}
                    className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  >
                    {timeOptions.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <span className="text-sm text-gray-400 sm:ml-4">
                  Indisponível
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          {saved && (
            <span className="text-sm font-medium text-green-600">Alterações guardadas com sucesso!</span>
          )}
          <button
            onClick={handleSave}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
          >
            Guardar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}
