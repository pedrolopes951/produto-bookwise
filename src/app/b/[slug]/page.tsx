import { BookingFlow } from "./booking-flow";

const business = {
  name: "Estúdio da Joana",
  description: "Serviços profissionais de cabeleireiro e coloração no centro da cidade.",
  services: [
    { id: "1", name: "Corte de Cabelo", duration: 30, price: 35, currency: "EUR" },
    {
      id: "2",
      name: "Coloração",
      duration: 90,
      price: 120,
      currency: "EUR",
    },
    { id: "3", name: "Barba", duration: 15, price: 15, currency: "EUR" },
    {
      id: "4",
      name: "Styling Completo",
      duration: 60,
      price: 80,
      currency: "EUR",
    },
  ],
};

export default async function BookingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // TODO: fetch business from DB using slug
  void slug;

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {business.name}
          </h1>
          <p className="mt-2 text-gray-600">{business.description}</p>
        </div>

        <BookingFlow services={business.services} businessName={business.name} />

        <footer className="mt-12 text-center">
          <a
            href="https://bookwise.com"
            className="text-sm text-gray-400 transition-colors hover:text-gray-600"
          >
            Powered by Bookwise
          </a>
        </footer>
      </div>
    </div>
  );
}
