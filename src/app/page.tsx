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
            href="#funcionalidades"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            Funcionalidades
          </a>
          <a
            href="#precos"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            Preços
          </a>
          <Link
            href="/signin"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            Entrar
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-[#2563eb] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1d4ed8]"
          >
            Começar Grátis
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
            Os seus clientes marcam.
            <br />
            O seu negócio cresce.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 md:text-xl">
            Sistema de reservas online para negócios locais em Portugal.
            <br className="hidden md:inline" /> Partilhe o link, receba marcações.
            Grátis para começar.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-lg bg-[#2563eb] px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#1d4ed8]"
            >
              Começar Grátis
            </Link>
            <a
              href="#como-funciona"
              className="rounded-lg border border-gray-300 px-8 py-3.5 text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Como Funciona
            </a>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="bg-gray-50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Como Funciona
          </h2>
          <p className="mt-4 text-center text-lg text-gray-600">
            Comece a receber marcações em três passos simples.
          </p>
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2563eb]/10">
                <Store className="h-8 w-8 text-[#2563eb]" />
              </div>
              <span className="mt-4 text-sm font-semibold text-[#2563eb]">
                Passo 1
              </span>
              <h3 className="mt-2 text-xl font-semibold text-gray-900">
                Crie a sua página
              </h3>
              <p className="mt-2 text-gray-600">
                Configure os seus serviços, preços e disponibilidade em minutos.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2563eb]/10">
                <LinkIcon className="h-8 w-8 text-[#2563eb]" />
              </div>
              <span className="mt-4 text-sm font-semibold text-[#2563eb]">
                Passo 2
              </span>
              <h3 className="mt-2 text-xl font-semibold text-gray-900">
                Partilhe o link
              </h3>
              <p className="mt-2 text-gray-600">
                Envie o seu link de marcações aos clientes por mensagem, email ou
                redes sociais.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2563eb]/10">
                <CalendarCheck className="h-8 w-8 text-[#2563eb]" />
              </div>
              <span className="mt-4 text-sm font-semibold text-[#2563eb]">
                Passo 3
              </span>
              <h3 className="mt-2 text-xl font-semibold text-gray-900">
                Receba marcações
              </h3>
              <p className="mt-2 text-gray-600">
                Os clientes escolhem o horário. Você é notificado de imediato.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section id="funcionalidades" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Tudo o que precisa para receber marcações
          </h2>
          <p className="mt-4 text-center text-lg text-gray-600">
            Funcionalidades poderosas, interface simples.
          </p>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563eb]/10">
                <Clock className="h-6 w-6 text-[#2563eb]" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Reservas Online 24/7
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Os seus clientes marcam quando lhes for conveniente.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563eb]/10">
                <Smartphone className="h-6 w-6 text-[#2563eb]" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Compatível com Telemóvel
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Perfeito em qualquer dispositivo, sem necessidade de app.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563eb]/10">
                <Bell className="h-6 w-6 text-[#2563eb]" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Notificações Instantâneas
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Confirmações por email para si e para os seus clientes.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#2563eb]/10">
                <Zap className="h-6 w-6 text-[#2563eb]" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Configuração em 5 Minutos
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                Sem conhecimentos técnicos. Se sabe preencher um formulário, sabe
                usar o Bookwise.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Preços */}
      <section id="precos" className="bg-gray-50 px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Preços simples e transparentes
          </h2>
          <p className="mt-4 text-center text-lg text-gray-600">
            Comece grátis. Faça upgrade quando quiser.
          </p>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {/* Plano Grátis */}
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <h3 className="text-lg font-semibold text-gray-900">Grátis</h3>
              <p className="mt-1 text-sm text-gray-600">
                Para começar
              </p>
              <p className="mt-6">
                <span className="text-4xl font-bold tracking-tight text-gray-900">
                  €0
                </span>
                <span className="text-sm text-gray-600">/mês</span>
              </p>
              <Link
                href="/signup"
                className="mt-8 block w-full rounded-lg border border-[#2563eb] py-3 text-center text-sm font-semibold text-[#2563eb] transition-colors hover:bg-[#2563eb]/5"
              >
                Começar Grátis
              </Link>
              <ul className="mt-8 space-y-3">
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="h-4 w-4 shrink-0 text-[#2563eb]" />1
                  página de marcações
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="h-4 w-4 shrink-0 text-[#2563eb]" />1
                  serviço
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="h-4 w-4 shrink-0 text-[#2563eb]" />
                  50 marcações/mês
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="h-4 w-4 shrink-0 text-[#2563eb]" />
                  Notificações por email
                </li>
              </ul>
            </div>

            {/* Plano Pro */}
            <div className="relative rounded-2xl border-2 border-[#2563eb] bg-white p-8">
              <span className="absolute -top-3 left-6 rounded-full bg-[#2563eb] px-3 py-0.5 text-xs font-semibold text-white">
                Popular
              </span>
              <h3 className="text-lg font-semibold text-gray-900">Pro</h3>
              <p className="mt-1 text-sm text-gray-600">
                Para negócios em crescimento
              </p>
              <p className="mt-6">
                <span className="text-4xl font-bold tracking-tight text-gray-900">
                  €15
                </span>
                <span className="text-sm text-gray-600">/mês</span>
              </p>
              <Link
                href="/signup"
                className="mt-8 block w-full rounded-lg bg-[#2563eb] py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#1d4ed8]"
              >
                Experimentar Grátis
              </Link>
              <ul className="mt-8 space-y-3">
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="h-4 w-4 shrink-0 text-[#2563eb]" />
                  Páginas de marcações ilimitadas
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="h-4 w-4 shrink-0 text-[#2563eb]" />
                  Serviços ilimitados
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="h-4 w-4 shrink-0 text-[#2563eb]" />
                  Marcações ilimitadas
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="h-4 w-4 shrink-0 text-[#2563eb]" />
                  Lembretes por SMS
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="h-4 w-4 shrink-0 text-[#2563eb]" />
                  Marca personalizada
                </li>
                <li className="flex items-center gap-3 text-sm text-gray-600">
                  <Check className="h-4 w-4 shrink-0 text-[#2563eb]" />
                  Suporte prioritário
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Rodapé */}
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
              Privacidade
            </a>
            <a
              href="/terms"
              className="text-sm text-gray-500 transition-colors hover:text-gray-700"
            >
              Termos
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
