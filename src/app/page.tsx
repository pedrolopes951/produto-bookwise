import Link from "next/link";
import {
  Store,
  Link as LinkIcon,
  CalendarCheck,
  Clock,
  Smartphone,
  Bell,
  Zap,
  Check,
} from "lucide-react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-gray-900">
          Bookwise
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            Pricing
          </a>
          <Link
            href="/signin"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-[#2563eb] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1d4ed8]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 md:text-6xl">
            Your clients book.
            <br />
            You grow.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 md:text-xl">
            Simple, beautiful appointment scheduling for small businesses.
            <br className="hidden md:inline" /> Share your link, get booked.
            Free to start.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-lg bg-[#2563eb] px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#1d4ed8]"
            >
              Get Started Free
            </Link>
            <a
              href="#how-it-works"
              className="rounded-lg border border-gray-300 px-8 py-3.5 text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gray-50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-center text-lg text-gray-600">
            Get up and running in three simple steps.
          </p>
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2563eb]/10">
                <Store className="h-8 w-8 text-[#2563eb]" />
              </div>
              <span className="mt-4 text-sm font-semibold text-[#2563eb]">
                Step 1
              </span>
              <h3 className="mt-2 text-xl font-semibold text-gray-900">
                Create your page
              </h3>
              <p className="mt-2 text-gray-600">
                Set up your services, prices, and availability in minutes.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2563eb]/10">
                <LinkIcon className="h-8 w-8 text-[#2563eb]" />
              </div>
              <span className="mt-4 text-sm font-semibold text-[#2563eb]">
                Step 2
              </span>
              <h3 className="mt-2 text-xl font-semibold text-gray-900">
                Share your link
              </h3>
              <p className="mt-2 text-gray-600">
                Send your unique booking link to clients via text, email, or
                social media.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2563eb]/10">
                <CalendarCheck className="h-8 w-8 text-[#2563eb]" />
              </div>
              <span className="mt-4 text-sm font-semibold text-[#2563eb]">
                Step 3
              </span>
              <h3 className="mt-2 text-xl font-semibold text-gray-900">
                Get booked
              </h3>
              <p className="mt-2 text-gray-600">
                Clients pick a time that works. You get notified instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Everything you need to get booked
          </h2>
          <p className="mt-4 text-center text-lg text-gray-600">
            Powerful features, simple interface.
          </p>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563eb]/10">
                <Clock className="h-6 w-6 text-[#2563eb]" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                24/7 Online Booking
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Your clients book when it&apos;s convenient for them.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563eb]/10">
                <Smartphone className="h-6 w-6 text-[#2563eb]" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Mobile Friendly
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Beautiful on every device, no app required.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563eb]/10">
                <Bell className="h-6 w-6 text-[#2563eb]" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Instant Notifications
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Email confirmations for you and your clients.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563eb]/10">
                <Zap className="h-6 w-6 text-[#2563eb]" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Set Up in 5 Minutes
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                No tech skills needed. If you can fill out a form, you can use
                Bookwise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-gray-50 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-center text-lg text-gray-600">
            Start free. Upgrade when you&apos;re ready.
          </p>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* Free Plan */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <h3 className="text-lg font-semibold text-gray-900">Free</h3>
              <p className="mt-1 text-sm text-gray-600">
                For getting started
              </p>
              <p className="mt-6">
                <span className="text-4xl font-bold tracking-tight text-gray-900">
                  $0
                </span>
                <span className="text-sm text-gray-600">/month</span>
              </p>
              <Link
                href="/signup"
                className="mt-8 block w-full rounded-lg border border-[#2563eb] py-3 text-center text-sm font-semibold text-[#2563eb] transition-colors hover:bg-[#2563eb]/5"
              >
                Start Free
              </Link>
              <ul className="mt-8 space-y-3">
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="h-4 w-4 shrink-0 text-[#2563eb]" />1
                  booking page
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="h-4 w-4 shrink-0 text-[#2563eb]" />1
                  service
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="h-4 w-4 shrink-0 text-[#2563eb]" />
                  50 bookings/mo
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="h-4 w-4 shrink-0 text-[#2563eb]" />
                  Email notifications
                </li>
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="relative rounded-2xl border-2 border-[#2563eb] bg-white p-8">
              <span className="absolute -top-3 left-6 rounded-full bg-[#2563eb] px-3 py-0.5 text-xs font-semibold text-white">
                Popular
              </span>
              <h3 className="text-lg font-semibold text-gray-900">Pro</h3>
              <p className="mt-1 text-sm text-gray-600">
                For growing businesses
              </p>
              <p className="mt-6">
                <span className="text-4xl font-bold tracking-tight text-gray-900">
                  $19
                </span>
                <span className="text-sm text-gray-600">/month</span>
              </p>
              <Link
                href="/signup"
                className="mt-8 block w-full rounded-lg bg-[#2563eb] py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#1d4ed8]"
              >
                Start Free Trial
              </Link>
              <ul className="mt-8 space-y-3">
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="h-4 w-4 shrink-0 text-[#2563eb]" />
                  Unlimited booking pages
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="h-4 w-4 shrink-0 text-[#2563eb]" />
                  Unlimited services
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="h-4 w-4 shrink-0 text-[#2563eb]" />
                  Unlimited bookings
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="h-4 w-4 shrink-0 text-[#2563eb]" />
                  SMS reminders
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="h-4 w-4 shrink-0 text-[#2563eb]" />
                  Custom branding
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="h-4 w-4 shrink-0 text-[#2563eb]" />
                  Priority support
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-500">
            &copy; 2026 Bookwise
          </p>
          <div className="flex gap-6">
            <a
              href="/privacy"
              className="text-sm text-gray-500 transition-colors hover:text-gray-700"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-sm text-gray-500 transition-colors hover:text-gray-700"
            >
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
