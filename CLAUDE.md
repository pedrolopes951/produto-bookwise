# Bookwise

Booking & appointment scheduling SaaS for non-technical small business owners (salons, clinics, tutors, etc.). Calendly-style but simpler and cheaper.

## Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL + Prisma 7 (with `@prisma/adapter-pg`)
- **Auth**: NextAuth v5 (beta) with Prisma adapter
- **Payments**: Stripe (not yet wired)
- **Validation**: Zod v4
- **Icons**: lucide-react
- **Dates**: date-fns

## Project Structure
```
src/
├── app/
│   ├── page.tsx                    # Landing page (hero, features, pricing)
│   ├── layout.tsx                  # Root layout (Inter font)
│   ├── globals.css                 # Tailwind v4 base styles
│   ├── signin/page.tsx             # Sign in page
│   ├── signup/page.tsx             # Sign up page
│   ├── dashboard/
│   │   ├── layout.tsx              # Sidebar nav (client component)
│   │   ├── page.tsx                # Overview: stats, upcoming bookings
│   │   ├── bookings/page.tsx       # Bookings list with filters
│   │   ├── services/page.tsx       # Service CRUD
│   │   └── availability/page.tsx   # Weekly schedule editor
│   ├── b/[slug]/
│   │   ├── page.tsx                # Public booking page (server)
│   │   └── booking-flow.tsx        # 3-step booking wizard (client)
│   └── api/
│       ├── bookings/
│       │   ├── route.ts            # POST create booking
│       │   └── [id]/route.ts       # GET/PATCH single booking
│       └── businesses/
│           └── [slug]/route.ts     # GET business + services
├── lib/
│   └── db.ts                       # Prisma client singleton
└── generated/prisma/               # Prisma generated client (gitignored? check)
prisma/
└── schema.prisma                   # Full data model
```

## Data Model (prisma/schema.prisma)
- **User** → has many Businesses (owner)
- **Business** → has slug (public URL), services, availability, bookings
- **Service** → name, duration (min), price, color
- **Availability** → weekly schedule (dayOfWeek 0-6, startTime/endTime strings)
- **Booking** → status enum (PENDING/CONFIRMED/CANCELLED/COMPLETED), client info, times
- Auth models: Account, Session, VerificationToken (NextAuth compatible)

## Current State
- All pages render with mock/hardcoded data
- Build passes cleanly (`npx next build` — 0 errors)
- No database connected yet — all data is mocked inline
- Auth pages exist but don't authenticate
- API routes return mock responses with TODO comments for real DB logic
- Stripe not integrated yet

## What Needs to Be Done (priority order)
1. **Connect real database** — set up Postgres (local or Supabase/Neon), run `npx prisma migrate dev`
2. **Wire up NextAuth** — credentials + Google OAuth, protect dashboard routes
3. **Replace mock data with Prisma queries** — dashboard, booking page, API routes
4. **Business onboarding flow** — after signup, create business with slug
5. **Email notifications** — confirm booking emails to both business owner and client
6. **Stripe integration** — Pro tier billing ($19/mo)
7. **Custom branding** — logo upload, color customization for Pro users
8. **SMS reminders** — Twilio integration for Pro tier
9. **Deploy** — Vercel + managed Postgres

## Business Model
- **Free tier**: 1 booking page, 1 service, 50 bookings/mo, email notifications
- **Pro ($19/mo)**: Unlimited pages/services/bookings, SMS, custom branding, priority support

## Design
- Primary color: blue-600 (#2563eb)
- White backgrounds, clean typography (Inter)
- Mobile-first responsive
- Dashboard: sidebar nav + white cards on gray-50 background

## Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint
npx prisma migrate dev   # Run migrations (once DB connected)
npx prisma studio        # Visual DB browser
```

## Repo
- Private: github.com/MaximoOliveira/bookwise
- Reference repo: github.com/msitarzewski/agency-agents (AI agent prompts)
