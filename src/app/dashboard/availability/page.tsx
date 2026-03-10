"use client";

import { useState } from "react";

interface DaySchedule {
  day: string;
  active: boolean;
  start: string;
  end: string;
}

const initialSchedule: DaySchedule[] = [
  { day: "Monday", active: true, start: "09:00", end: "17:00" },
  { day: "Tuesday", active: true, start: "09:00", end: "17:00" },
  { day: "Wednesday", active: true, start: "09:00", end: "17:00" },
  { day: "Thursday", active: true, start: "09:00", end: "17:00" },
  { day: "Friday", active: true, start: "09:00", end: "17:00" },
  { day: "Saturday", active: true, start: "10:00", end: "14:00" },
  { day: "Sunday", active: false, start: "09:00", end: "17:00" },
];

const timeOptions: string[] = [];
for (let h = 6; h <= 22; h++) {
  for (const m of ["00", "30"]) {
    timeOptions.push(`${h.toString().padStart(2, "0")}:${m}`);
  }
}

export default function AvailabilityPage() {
  const [schedule, setSchedule] = useState<DaySchedule[]>(initialSchedule);

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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Availability</h1>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="space-y-4">
          {schedule.map((day, index) => (
            <div
              key={day.day}
              className="flex flex-col gap-3 sm:flex-row sm:items-center rounded-lg border border-gray-100 p-4"
            >
              {/* Day name */}
              <span className="w-28 text-sm font-medium text-gray-900">
                {day.day}
              </span>

              {/* Toggle */}
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

              {/* Time selectors */}
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
                  <span className="text-gray-400">to</span>
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
                  Unavailable
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
