"use client";

import { useState } from "react";

type Status = "CONFIRMED" | "PENDING" | "CANCELLED" | "COMPLETED";

interface Booking {
  id: number;
  client: string;
  service: string;
  dateTime: string;
  status: Status;
}

const bookings: Booking[] = [
  {
    id: 1,
    client: "Sarah Johnson",
    service: "Haircut",
    dateTime: "Mar 10, 2026 — 10:00 AM",
    status: "CONFIRMED",
  },
  {
    id: 2,
    client: "Mike Peters",
    service: "Hair Coloring",
    dateTime: "Mar 10, 2026 — 1:30 PM",
    status: "CONFIRMED",
  },
  {
    id: 3,
    client: "Emma Wilson",
    service: "Beard Trim",
    dateTime: "Mar 11, 2026 — 9:00 AM",
    status: "PENDING",
  },
  {
    id: 4,
    client: "James Lee",
    service: "Haircut",
    dateTime: "Mar 12, 2026 — 11:00 AM",
    status: "PENDING",
  },
  {
    id: 5,
    client: "Olivia Brown",
    service: "Hair Coloring",
    dateTime: "Mar 5, 2026 — 3:00 PM",
    status: "COMPLETED",
  },
  {
    id: 6,
    client: "Daniel Kim",
    service: "Beard Trim",
    dateTime: "Mar 3, 2026 — 10:30 AM",
    status: "CANCELLED",
  },
];

const tabs = ["All", "Upcoming", "Past", "Cancelled"] as const;
type Tab = (typeof tabs)[number];

const statusFilter: Record<Tab, Status[] | null> = {
  All: null,
  Upcoming: ["CONFIRMED", "PENDING"],
  Past: ["COMPLETED"],
  Cancelled: ["CANCELLED"],
};

const statusStyles: Record<Status, string> = {
  CONFIRMED: "bg-green-50 text-green-700",
  PENDING: "bg-yellow-50 text-yellow-700",
  CANCELLED: "bg-red-50 text-red-700",
  COMPLETED: "bg-gray-100 text-gray-600",
};

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("All");

  const filtered = statusFilter[activeTab]
    ? bookings.filter((b) => statusFilter[activeTab]!.includes(b.status))
    : bookings;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>

      {/* Filter tabs */}
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

      {/* Bookings table */}
      <div className="rounded-xl bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="px-6 py-3 font-medium text-gray-500">Client</th>
                <th className="px-6 py-3 font-medium text-gray-500">
                  Service
                </th>
                <th className="px-6 py-3 font-medium text-gray-500">
                  Date & Time
                </th>
                <th className="px-6 py-3 font-medium text-gray-500">Status</th>
                <th className="px-6 py-3 font-medium text-gray-500">
                  Actions
                </th>
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
                    {booking.dateTime}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        statusStyles[booking.status]
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {booking.status === "PENDING" && (
                        <button className="rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white hover:bg-blue-700 transition-colors">
                          Confirm
                        </button>
                      )}
                      {(booking.status === "PENDING" ||
                        booking.status === "CONFIRMED") && (
                        <button className="rounded-md border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                          Cancel
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
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
