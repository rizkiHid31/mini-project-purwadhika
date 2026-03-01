import Header from "../components/header";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  city: string;
  address: string;
  category: string;
  image?: string;
  price?: number;
  quota: number;
  registered: number;
  description: string;
  organizer: string;
}

// ─── Data kosong — sambungkan ke database Anda ────────────────────────────────
const events: Event[] = [];

const categories = [
  "Semua",
  "Teknologi",
  "Musik",
  "Bisnis",
  "Olahraga",
  "Seni & Budaya",
  "Pendidikan",
];

const cities = [
  "Semua Kota",
  "Jakarta",
  "Bandung",
  "Surabaya",
  "Yogyakarta",
  "Medan",
  "Bali",
  "Semarang",
  "Makassar",
];

// ─── Helper ───────────────────────────────────────────────────────────────────
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatPrice(price?: number) {
  if (price === undefined || price === 0) return "Gratis";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

function slotsLeft(quota: number, registered: number) {
  return Math.max(quota - registered, 0);
}

// ─── Event Detail Modal ───────────────────────────────────────────────────────
function EventDetailModal({
  event,
  onClose,
}: {
  event: Event;
  onClose: () => void;
}) {
  const slots = slotsLeft(event.quota, event.registered);
  const isFull = slots === 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative h-48 sm:h-56 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-t-2xl overflow-hidden">
          {event.image && (
            <img
              src={event.image}
              alt={event.name}
              className="w-full h-full object-cover"
            />
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-black/40 hover:bg-black/60 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors"
          >
            ✕
          </button>
          <span className="absolute top-3 left-3 bg-white/90 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
            {event.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
          {/* Title & Price */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
              {event.name}
            </h2>
            <span
              className={`shrink-0 text-sm font-bold px-3 py-1 rounded-full ${
                event.price === 0 || event.price === undefined
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {formatPrice(event.price)}
            </span>
          </div>

          {/* Info Grid */}
          <div className="space-y-2.5 mb-4">
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <span className="text-base mt-0.5">📅</span>
              <div>
                <p className="font-medium">{formatDate(event.date)}</p>
                <p className="text-gray-400">{event.time} WIB</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <span className="text-base mt-0.5">📍</span>
              <div>
                <p className="font-medium">{event.location}</p>
                <p className="text-gray-400">{event.address}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="text-base">🎪</span>
              <p>Diselenggarakan oleh <span className="font-medium text-gray-800">{event.organizer}</span></p>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              <span className="text-base">👥</span>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span>{event.registered.toLocaleString("id-ID")} / {event.quota.toLocaleString("id-ID")} peserta</span>
                  <span className={isFull ? "text-red-500 font-semibold" : "text-green-600 font-semibold"}>
                    {isFull ? "Penuh" : `${slots.toLocaleString("id-ID")} slot tersisa`}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${isFull ? "bg-red-400" : "bg-green-500"}`}
                    style={{ width: `${Math.min((event.registered / event.quota) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 my-4" />

          {/* Deskripsi */}
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Tentang Event</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{event.description}</p>
          </div>

          {/* CTA */}
          <button
            disabled={isFull}
            className={`w-full font-semibold py-3 rounded-xl text-sm transition-colors duration-200 ${
              isFull
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isFull ? "Pendaftaran Penuh" : "Daftar Sekarang"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Event Card ───────────────────────────────────────────────────────────────
function EventCard({ event, onClick }: { event: Event; onClick: () => void }) {
  const slots = slotsLeft(event.quota, event.registered);
  const isFull = slots === 0;

  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
    >
      {/* Image */}
      <div className="relative h-40 bg-gradient-to-br from-blue-400 to-indigo-500 overflow-hidden">
        {event.image && (
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        <span className="absolute top-3 left-3 bg-white/90 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
          {event.category}
        </span>
        <span
          className={`absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full ${
            event.price === 0 || event.price === undefined
              ? "bg-green-500 text-white"
              : "bg-blue-600 text-white"
          }`}
        >
          {formatPrice(event.price)}
        </span>
        {isFull && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              PENUH
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          {event.name}
        </h3>
        <div className="space-y-1 text-xs sm:text-sm text-gray-500">
          <p className="flex items-center gap-1.5">
            <span>📅</span>
            {new Date(event.date).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}{" "}
            · {event.time} WIB
          </p>
          <p className="flex items-center gap-1.5">
            <span>📍</span>
            <span className="truncate">{event.location}, {event.city}</span>
          </p>
          <p className="flex items-center gap-1.5">
            <span>👥</span>
            <span className={isFull ? "text-red-500 font-medium" : "text-green-600 font-medium"}>
              {isFull ? "Penuh" : `${slots.toLocaleString("id-ID")} slot tersisa`}
            </span>
          </p>
        </div>
        <p className="mt-3 text-xs text-blue-600 font-semibold group-hover:underline">
          Lihat Detail →
        </p>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
function ExplorePage() {
  const [query, setQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [selectedCity, setSelectedCity] = useState<string>("Semua Kota");
  const [sortBy, setSortBy] = useState<string>("terbaru");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const filteredEvents = events
    .filter((event) => {
      const matchesQuery =
        event.name.toLowerCase().includes(query.toLowerCase()) ||
        event.location.toLowerCase().includes(query.toLowerCase()) ||
        event.organizer.toLowerCase().includes(query.toLowerCase());
      const matchesCategory =
        selectedCategory === "Semua" || event.category === selectedCategory;
      const matchesCity =
        selectedCity === "Semua Kota" || event.city === selectedCity;
      return matchesQuery && matchesCategory && matchesCity;
    })
    .sort((a, b) => {
      if (sortBy === "terbaru") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "terdekat") return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === "gratis") return (a.price ?? 0) - (b.price ?? 0);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Modal Detail */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Jelajahi Event
          </h1>
          <p className="text-sm text-gray-500">
            Temukan event seru di sekitar kamu.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 mb-6 space-y-3">

          {/* Search Bar */}
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari event, tempat, atau penyelenggara..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Filter Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Kategori */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Kategori</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Kota / Lokasi */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Lokasi</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>

            {/* Urutkan */}
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Urutkan</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
              >
                <option value="terbaru">Terbaru</option>
                <option value="terdekat">Paling Dekat</option>
                <option value="gratis">Gratis Dulu</option>
              </select>
            </div>
          </div>

          {/* Active Filter Tags */}
          {(selectedCategory !== "Semua" || selectedCity !== "Semua Kota" || query) && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-gray-400">Filter aktif:</span>
              {query && (
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                  "{query}"
                  <button onClick={() => setQuery("")} className="hover:text-blue-900">✕</button>
                </span>
              )}
              {selectedCategory !== "Semua" && (
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory("Semua")} className="hover:text-blue-900">✕</button>
                </span>
              )}
              {selectedCity !== "Semua Kota" && (
                <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-1 rounded-full">
                  {selectedCity}
                  <button onClick={() => setSelectedCity("Semua Kota")} className="hover:text-blue-900">✕</button>
                </span>
              )}
              <button
                onClick={() => { setQuery(""); setSelectedCategory("Semua"); setSelectedCity("Semua Kota"); }}
                className="text-xs text-red-500 hover:text-red-700 font-medium"
              >
                Hapus semua
              </button>
            </div>
          )}
        </div>

        {/* Result Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">
            {filteredEvents.length > 0
              ? `Menampilkan ${filteredEvents.length} event`
              : ""}
          </p>
        </div>

        {/* Event Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        ) : (
          // Empty State
          <div className="flex flex-col items-center justify-center py-24 text-gray-400 text-center">
            <span className="text-5xl mb-4">🔍</span>
            <p className="text-lg font-semibold text-gray-600">
              {query || selectedCategory !== "Semua" || selectedCity !== "Semua Kota"
                ? "Tidak ada event yang cocok"
                : "Belum ada event tersedia"}
            </p>
            <p className="text-sm mt-1 max-w-xs">
              {query || selectedCategory !== "Semua" || selectedCity !== "Semua Kota"
                ? "Coba ubah filter atau kata kunci pencarian kamu."
                : "Event akan muncul di sini setelah terhubung ke database."}
            </p>
            {(query || selectedCategory !== "Semua" || selectedCity !== "Semua Kota") && (
              <button
                onClick={() => { setQuery(""); setSelectedCategory("Semua"); setSelectedCity("Semua Kota"); }}
                className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Hapus semua filter
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExplorePage;
