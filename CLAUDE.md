# Bookwise PT

Portuguese white-label version of the BookWise booking system, adapted for the Portuguese market (Portugal). All UI text is in Portuguese (PT-PT), currency is EUR, and locale conventions follow Portuguese standards.

Forked from the original BookWise template and localized.

## Stack
- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL + Prisma 7 (with `@prisma/adapter-pg`)
- **Auth**: NextAuth v5 (beta) with Prisma adapter
- **Payments**: Stripe (not yet wired)
- **Validation**: Zod v4
- **Icons**: lucide-react
- **Dates**: date-fns (with pt locale)

## Project Structure
```
src/
├── app/
│   ├── page.tsx                    # Landing page (hero, funcionalidades, preços)
│   ├── layout.tsx                  # Root layout (Inter font)
│   ├── globals.css                 # Tailwind v4 base styles
│   ├── signin/page.tsx             # Página de login
│   ├── signup/page.tsx             # Página de registo
│   ├── dashboard/
│   │   ├── layout.tsx              # Sidebar nav (client component)
│   │   ├── page.tsx                # Painel: estatísticas, próximas marcações
│   │   ├── bookings/page.tsx       # Lista de marcações com filtros
│   │   ├── services/page.tsx       # CRUD de serviços
│   │   └── availability/page.tsx   # Editor de horários semanais
│   ├── b/[slug]/
│   │   ├── page.tsx                # Página pública de marcações (server)
│   │   └── booking-flow.tsx        # Wizard de marcação em 3 passos (client)
│   └── api/
│       ├── bookings/
│       │   ├── route.ts            # POST criar marcação
│       │   └── [id]/route.ts       # GET/PATCH marcação individual
│       └── businesses/
│           └── [slug]/route.ts     # GET negócio + serviços
├── lib/
│   └── db.ts                       # Prisma client singleton
└── generated/prisma/               # Prisma generated client
prisma/
└── schema.prisma                   # Data model (currency default: EUR)
```

## Localization
- All UI strings in Portuguese (PT-PT)
- Currency: EUR (€)
- Date format: Portuguese locale (date-fns pt locale)
- Day names: Segunda, Terça, Quarta, Quinta, Sexta, Sábado, Domingo
- "bookings" → "marcações", "services" → "serviços"

## Data Model (prisma/schema.prisma)
- **User** → has many Businesses (owner)
- **Business** → has slug (public URL), services, availability, bookings
- **Service** → name, duration (min), price, color, currency default EUR
- **Availability** → weekly schedule (dayOfWeek 0-6, startTime/endTime strings)
- **Booking** → status enum (PENDING/CONFIRMED/CANCELLED/COMPLETED), client info, times
- Auth models: Account, Session, VerificationToken (NextAuth compatible)

## Current State
- All pages render with mock/hardcoded data
- No database connected yet — all data is mocked inline
- Auth pages exist but don't authenticate
- API routes return mock responses with TODO comments for real DB logic
- Stripe not integrated yet

## What Needs to Be Done (priority order)
1. **Connect real database** — set up Postgres (Supabase/Neon), run `npx prisma migrate dev`
2. **Wire up NextAuth** — credentials + Google OAuth, protect dashboard routes
3. **Replace mock data with Prisma queries** — dashboard, booking page, API routes
4. **Business onboarding flow** — after signup, create business with slug
5. **Email notifications** — confirm booking emails to both business owner and client
6. **Stripe integration** — Pro tier billing (€15/mês)
7. **Custom branding** — logo upload, color customization for Pro users
8. **SMS reminders** — Twilio integration for Pro tier
9. **Deploy** — Vercel + managed Postgres

## Business Model
- **Grátis**: 1 página de marcações, 1 serviço, 50 marcações/mês, notificações por email
- **Pro (€15/mês)**: Ilimitado (páginas/serviços/marcações), SMS, marca personalizada, suporte prioritário

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
- Private: github.com/pedrolopes951/produto-bookwise
