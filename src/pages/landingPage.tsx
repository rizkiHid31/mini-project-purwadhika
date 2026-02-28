import Header from "../components/header";
import { useState } from "react";

interface Event {
  id: number;
  name: string;
  date: string;
  location: string;
  category: string;
  image?: string;
  price?: number;
  attendees?: number;
}

// Data kosong — sambungkan ke database Anda
const events: Event[] = [];

function LandingPage() {
  const [query, setQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("Semua");

  const categories = ["Semua", "Teknologi", "Musik", "Bisnis", "Olahraga", "Seni & Budaya", "Pendidikan"];

  const filteredEvents = events.filter((event) => {
    const matchesQuery =
      event.name.toLowerCase().includes(query.toLowerCase()) ||
      event.location.toLowerCase().includes(query.toLowerCase());
    const matchesCategory =
      activeCategory === "Semua" || event.category === activeCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Wrapper utama dengan padding responsif */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

        {/* Judul & Deskripsi */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3">
            Welcome to the Event Management System
          </h1>
          <p className="text-base sm:text-lg text-gray-700">
            Manage your events efficiently and effortlessly.
          </p>
        </div>

        {/* Search Bar */}
        <section className="flex flex-col items-center mb-6 sm:mb-8">
          <div className="w-full max-w-md">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari event atau lokasi..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>
        </section>

        {/* Banner */}
        <section className="mb-8 sm:mb-10">
          <div className="w-full h-36 sm:h-52 lg:h-64 bg-amber-600 border border-amber-50 rounded-2xl flex items-center justify-center">
            <p className="text-white font-medium text-sm sm:text-base">banner</p>
          </div>
        </section>

        {/* Filter Kategori — scroll horizontal di mobile */}
        <section className="mb-6 sm:mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:overflow-visible sm:justify-start scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-colors duration-200 ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600 border-gray-300 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Event Grid */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-2xl font-semibold text-gray-800">
              {activeCategory === "Semua" ? "Semua Event" : `Event ${activeCategory}`}
            </h2>
            {filteredEvents.length > 0 && (
              <span className="text-xs sm:text-sm text-gray-500">
                {filteredEvents.length} event ditemukan
              </span>
            )}
          </div>

          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow duration-200"
                >
                  {/* Card Image */}
                  <div className="h-36 sm:h-40 bg-gradient-to-br from-blue-400 to-indigo-500 relative">
                    {event.image && (
                      <img
                        src={event.image}
                        alt={event.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                    {event.category && (
                      <span className="absolute top-3 left-3 bg-white/90 text-blue-700 text-xs font-semibold px-2 py-1 rounded-full">
                        {event.category}
                      </span>
                    )}
                    <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {event.price ? `Rp ${event.price.toLocaleString("id-ID")}` : "Gratis"}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    <h3 className="text-gray-900 font-semibold text-sm sm:text-base mb-2 line-clamp-2">
                      {event.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1 mb-1">
                      <span>📅</span>
                      {new Date(event.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1 mb-1">
                      <span>📍</span>
                      <span className="truncate">{event.location}</span>
                    </p>
                    {event.attendees !== undefined && (
                      <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">
                        <span>👥</span>
                        {event.attendees.toLocaleString("id-ID")} peserta
                      </p>
                    )}
                    <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors duration-200">
                      Lihat Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Empty State
            <div className="flex flex-col items-center justify-center py-16 sm:py-20 text-gray-400">
              <span className="text-4xl sm:text-5xl mb-4">🔍</span>
              <p className="text-base sm:text-lg font-medium text-center">
                {query || activeCategory !== "Semua"
                  ? "Tidak ada event yang cocok"
                  : "Belum ada event tersedia"}
              </p>
              <p className="text-xs sm:text-sm mt-1">Coba kata kunci atau kategori lain</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default LandingPage;
