"use client";

import { useState } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isBefore, startOfDay, addMonths, subMonths } from "date-fns";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Calendar,
  User,
  Mail,
  Phone,
  FileText,
} from "lucide-react";

type Service = {
  id: string;
  name: string;
  duration: number;
  price: number;
  currency: string;
};

type BookingFlowProps = {
  services: Service[];
  businessName: string;
};

const STEPS = ["Service", "Date & Time", "Details"] as const;

function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let hour = 9; hour < 17; hour++) {
    for (let min = 0; min < 60; min += 30) {
      const date = new Date(2000, 0, 1, hour, min);
      slots.push(format(date, "h:mm a"));
    }
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(price);
}

// ─── Progress Indicator ──────────────────────────────────────────────

function ProgressIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-8 flex items-center justify-center gap-2">
      {STEPS.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <div key={label} className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : isCompleted
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-400"
                }`}
              >
                {stepNum}
              </div>
              <span
                className={`hidden text-sm sm:inline ${
                  isActive
                    ? "font-medium text-gray-900"
                    : isCompleted
                      ? "text-gray-600"
                      : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`h-px w-8 sm:w-12 ${
                  isCompleted ? "bg-blue-300" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Step 1: Service Selection ───────────────────────────────────────

function ServiceStep({
  services,
  selectedId,
  onSelect,
}: {
  services: Service[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Select a service
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {services.map((service) => {
          const isSelected = selectedId === service.id;
          return (
            <button
              key={service.id}
              onClick={() => onSelect(service.id)}
              className={`cursor-pointer rounded-lg border-2 p-4 text-left transition-colors ${
                isSelected
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="mb-2 font-medium text-gray-900">
                {service.name}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{service.duration} min</span>
                </div>
                <div className="font-semibold text-gray-900">
                  {formatPrice(service.price, service.currency)}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 2: Date & Time ─────────────────────────────────────────────

function CalendarGrid({
  selectedDate,
  onSelect,
}: {
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
}) {
  const [viewMonth, setViewMonth] = useState(startOfMonth(new Date()));
  const today = startOfDay(new Date());

  const monthStart = startOfMonth(viewMonth);
  const monthEnd = endOfMonth(viewMonth);
  // Week starts on Monday (weekStartsOn: 1)
  const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days: Date[] = [];
  let cursor = calStart;
  while (cursor <= calEnd) {
    days.push(cursor);
    cursor = addDays(cursor, 1);
  }

  const canGoPrev = !isBefore(subMonths(viewMonth, 1), startOfMonth(today));

  return (
    <div>
      {/* Month header */}
      <div className="mb-3 flex items-center justify-between">
        <button
          onClick={() => setViewMonth(subMonths(viewMonth, 1))}
          disabled={!canGoPrev}
          className="rounded-lg p-1.5 transition-colors hover:bg-gray-100 disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </button>
        <span className="text-sm font-semibold text-gray-900">
          {format(viewMonth, "MMMM yyyy")}
        </span>
        <button
          onClick={() => setViewMonth(addMonths(viewMonth, 1))}
          className="rounded-lg p-1.5 transition-colors hover:bg-gray-100"
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="mb-1 grid grid-cols-7 text-center text-xs font-medium text-gray-500">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7">
        {days.map((day, i) => {
          const inMonth = isSameMonth(day, viewMonth);
          const isPast = isBefore(day, today);
          const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
          const isToday = isSameDay(day, today);
          const disabled = !inMonth || isPast;

          return (
            <button
              key={i}
              disabled={disabled}
              onClick={() => onSelect(day)}
              className={`mx-auto my-0.5 flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors ${
                isSelected
                  ? "bg-blue-600 font-semibold text-white"
                  : disabled
                    ? "cursor-default text-gray-300"
                    : isToday
                      ? "font-semibold text-blue-600 hover:bg-blue-50"
                      : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function DateTimeStep({
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
}: {
  selectedDate: Date | null;
  selectedTime: string | null;
  onSelectDate: (d: Date) => void;
  onSelectTime: (t: string) => void;
}) {
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Pick a date & time
      </h2>

      <div className="mb-6 rounded-lg border border-gray-200 p-4">
        <CalendarGrid selectedDate={selectedDate} onSelect={onSelectDate} />
      </div>

      {selectedDate && (
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Calendar className="h-4 w-4" />
            <span>{format(selectedDate, "EEEE, MMMM d, yyyy")}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {TIME_SLOTS.map((slot) => {
              const isSelected = selectedTime === slot;
              return (
                <button
                  key={slot}
                  onClick={() => onSelectTime(slot)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    isSelected
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Step 3: Details ─────────────────────────────────────────────────

type FormData = {
  name: string;
  email: string;
  phone: string;
  notes: string;
};

function DetailsStep({
  form,
  onChange,
}: {
  form: FormData;
  onChange: (f: FormData) => void;
}) {
  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Your details
      </h2>
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-gray-700">
            <User className="h-4 w-4" />
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => onChange({ ...form, name: e.target.value })}
            placeholder="Your full name"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-gray-700">
            <Mail className="h-4 w-4" />
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => onChange({ ...form, email: e.target.value })}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-gray-700">
            <Phone className="h-4 w-4" />
            Phone
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => onChange({ ...form, phone: e.target.value })}
            placeholder="(optional)"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="mb-1 flex items-center gap-1.5 text-sm font-medium text-gray-700">
            <FileText className="h-4 w-4" />
            Notes
          </label>
          <textarea
            value={form.notes}
            onChange={(e) => onChange({ ...form, notes: e.target.value })}
            placeholder="Anything we should know? (optional)"
            rows={3}
            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Success State ───────────────────────────────────────────────────

function SuccessView({
  service,
  date,
  time,
  form,
  onReset,
}: {
  service: Service;
  date: Date;
  time: string;
  form: FormData;
  onReset: () => void;
}) {
  return (
    <div className="py-8 text-center">
      <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
      <h2 className="mb-2 text-xl font-bold text-gray-900">Booking confirmed!</h2>
      <p className="mb-6 text-gray-600">
        We&apos;ve sent a confirmation to {form.email}
      </p>

      <div className="mx-auto max-w-sm rounded-lg border border-gray-200 p-4 text-left text-sm">
        <div className="mb-3 border-b border-gray-100 pb-3">
          <div className="font-semibold text-gray-900">{service.name}</div>
          <div className="text-gray-500">
            {service.duration} min &middot;{" "}
            {formatPrice(service.price, service.currency)}
          </div>
        </div>
        <div className="mb-3 border-b border-gray-100 pb-3">
          <div className="text-gray-500">Date & Time</div>
          <div className="font-medium text-gray-900">
            {format(date, "EEEE, MMMM d, yyyy")} at {time}
          </div>
        </div>
        <div>
          <div className="text-gray-500">Booked by</div>
          <div className="font-medium text-gray-900">{form.name}</div>
          <div className="text-gray-600">{form.email}</div>
          {form.phone && <div className="text-gray-600">{form.phone}</div>}
        </div>
      </div>

      <button
        onClick={onReset}
        className="mt-6 rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
      >
        Book another
      </button>
    </div>
  );
}

// ─── Main BookingFlow ────────────────────────────────────────────────

export function BookingFlow({ services, businessName }: BookingFlowProps) {
  void businessName;

  const [step, setStep] = useState(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [confirmed, setConfirmed] = useState(false);

  const selectedService = services.find((s) => s.id === selectedServiceId) ?? null;

  const canContinueStep1 = selectedServiceId !== null;
  const canContinueStep2 = selectedDate !== null && selectedTime !== null;
  const canSubmit = form.name.trim() !== "" && form.email.trim() !== "";

  function handleSubmit() {
    if (!canSubmit) return;
    // TODO: send booking to API
    setConfirmed(true);
  }

  function handleReset() {
    setStep(1);
    setSelectedServiceId(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setForm({ name: "", email: "", phone: "", notes: "" });
    setConfirmed(false);
  }

  if (confirmed && selectedService && selectedDate && selectedTime) {
    return (
      <SuccessView
        service={selectedService}
        date={selectedDate}
        time={selectedTime}
        form={form}
        onReset={handleReset}
      />
    );
  }

  return (
    <div>
      <ProgressIndicator currentStep={step} />

      {/* Step content */}
      {step === 1 && (
        <ServiceStep
          services={services}
          selectedId={selectedServiceId}
          onSelect={setSelectedServiceId}
        />
      )}

      {step === 2 && (
        <DateTimeStep
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onSelectDate={(d) => {
            setSelectedDate(d);
            setSelectedTime(null);
          }}
          onSelectTime={setSelectedTime}
        />
      )}

      {step === 3 && <DetailsStep form={form} onChange={setForm} />}

      {/* Navigation buttons */}
      <div className="mt-6 flex items-center justify-between">
        {step > 1 ? (
          <button
            onClick={() => setStep(step - 1)}
            className="flex items-center gap-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
        ) : (
          <div />
        )}

        {step < 3 ? (
          <button
            disabled={step === 1 ? !canContinueStep1 : !canContinueStep2}
            onClick={() => setStep(step + 1)}
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue
          </button>
        ) : (
          <button
            disabled={!canSubmit}
            onClick={handleSubmit}
            className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Confirm Booking
          </button>
        )}
      </div>
    </div>
  );
}
