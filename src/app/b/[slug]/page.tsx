import { BookingFlow } from "./booking-flow";

const business = {
  name: "Jane's Hair Studio",
  description: "Professional hair styling and coloring services in downtown.",
  services: [
    { id: "1", name: "Haircut", duration: 30, price: 35, currency: "USD" },
    {
      id: "2",
      name: "Hair Coloring",
      duration: 90,
      price: 120,
      currency: "USD",
    },
    { id: "3", name: "Beard Trim", duration: 15, price: 15, currency: "USD" },
    {
      id: "4",
      name: "Full Styling",
      duration: 60,
      price: 80,
      currency: "USD",
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
