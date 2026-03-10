"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Briefcase,
  Clock,
  Settings,
  Menu,
  X,
  Copy,
  Check,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Bookings", href: "/dashboard/bookings", icon: Calendar },
  { label: "Services", href: "/dashboard/services", icon: Briefcase },
  { label: "Availability", href: "/dashboard/availability", icon: Clock },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const BOOKING_LINK = "bookwise.app/book/your-business";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(`https://${BOOKING_LINK}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const sidebar = (
    <div className="flex h-full flex-col justify-between">
      <div>
        <div className="px-6 py-6">
          <span className="text-xl font-bold text-blue-600">Bookwise</span>
        </div>

        <nav className="mt-2 space-y-1 px-3">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-gray-200 px-4 py-4">
        <p className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
          Your booking link
        </p>
        <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2">
          <span className="truncate text-xs text-gray-600">{BOOKING_LINK}</span>
          <button
            onClick={handleCopy}
            className="ml-auto shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            title="Copy link"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col border-r border-gray-200 bg-white">
        {sidebar}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-200 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebar}
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-gray-600 hover:text-gray-900"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          <span className="text-lg font-bold text-blue-600">Bookwise</span>
        </header>

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
