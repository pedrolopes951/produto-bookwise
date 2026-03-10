import { Plus, Pencil, Trash2 } from "lucide-react";

const services = [
  {
    id: 1,
    name: "Corte de Cabelo",
    duration: "30 min",
    price: "€35",
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Coloração",
    duration: "90 min",
    price: "€120",
    color: "bg-purple-500",
  },
  {
    id: 3,
    name: "Barba",
    duration: "15 min",
    price: "€15",
    color: "bg-emerald-500",
  },
];

export default function ServicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Serviços</h1>
        <button className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          Adicionar Serviço
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="rounded-xl bg-white p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span
                  className={`inline-block h-3 w-3 rounded-full ${service.color}`}
                />
                <h3 className="text-lg font-semibold text-gray-900">
                  {service.name}
                </h3>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
              <span>{service.duration}</span>
              <span className="text-gray-300">|</span>
              <span className="font-medium text-gray-900">{service.price}</span>
            </div>

            <div className="mt-5 flex gap-2 border-t border-gray-100 pt-4">
              <button className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                <Pencil className="h-3.5 w-3.5" />
                Editar
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors">
                <Trash2 className="h-3.5 w-3.5" />
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
