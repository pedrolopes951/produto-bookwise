import {
  CalendarCheck,
  CalendarDays,
  Users,
  DollarSign,
  Plus,
  Clock,
  Share2,
} from "lucide-react";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning!";
  if (hour < 18) return "Good afternoon!";
  return "Good evening!";
}

const stats = [
  {
    label: "Today's Bookings",
    value: "3",
    icon: CalendarCheck,
    color: "text-blue-600 bg-blue-50",
  },
  {
    label: "This Week",
    value: "12",
    icon: CalendarDays,
    color: "text-purple-600 bg-purple-50",
  },
  {
    label: "Total Clients",
    value: "48",
    icon: Users,
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    label: "Revenue This Month",
    value: "$1,240",
    icon: DollarSign,
    color: "text-amber-600 bg-amber-50",
  },
];

const upcomingBookings = [
  {
    client: "Sarah Johnson",
    service: "Haircut",
    dateTime: "Today, 10:00 AM",
    status: "confirmed" as const,
  },
  {
    client: "Mike Peters",
    service: "Hair Coloring",
    dateTime: "Today, 1:30 PM",
    status: "confirmed" as const,
  },
  {
    client: "Emma Wilson",
    service: "Beard Trim",
    dateTime: "Tomorrow, 9:00 AM",
    status: "pending" as const,
  },
];

const statusStyles = {
  confirmed: "bg-green-50 text-green-700",
  pending: "bg-yellow-50 text-yellow-700",
};

const quickActions = [
  { label: "Add Service", icon: Plus, href: "/dashboard/services" },
  { label: "Update Availability", icon: Clock, href: "/dashboard/availability" },
  { label: "Share Booking Link", icon: Share2, href: "#" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">{getGreeting()}</h1>

      {/* Stat cards */}
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

      {/* Upcoming bookings */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Upcoming Bookings
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-gray-500">
                <th className="pb-3 font-medium">Client</th>
                <th className="pb-3 font-medium">Service</th>
                <th className="pb-3 font-medium">Date & Time</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {upcomingBookings.map((booking) => (
                <tr key={`${booking.client}-${booking.dateTime}`}>
                  <td className="py-3 font-medium text-gray-900">
                    {booking.client}
                  </td>
                  <td className="py-3 text-gray-600">{booking.service}</td>
                  <td className="py-3 text-gray-600">{booking.dateTime}</td>
                  <td className="py-3">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                        statusStyles[booking.status]
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Quick Actions
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
