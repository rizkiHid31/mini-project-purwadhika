import Header from "../components/header";
import { useState } from "react";

// Tipe user — nanti diganti dari data session/auth Anda
type UserRole = "customer" | "event_organizer";

// Simulasi user yang sedang login
// TODO: ganti dengan data user dari context/auth Anda
const currentUserRole: UserRole = "event_organizer";

interface EventForm {
  name: string;
  category: string;
  date: string;
  time: string;
  location: string;
  address: string;
  description: string;
  price: string;
  quota: string;
  image: File | null;
}

const categories = [
  "Teknologi",
  "Musik",
  "Bisnis",
  "Olahraga",
  "Seni & Budaya",
  "Pendidikan",
];

function createEventPage() {
  const [form, setForm] = useState<EventForm>({
    name: "",
    category: "",
    date: "",
    time: "",
    location: "",
    address: "",
    description: "",
    price: "",
    quota: "",
    image: null,
  });

  const [isFree, setIsFree] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Jika bukan event organizer, tampilkan halaman akses ditolak
  if (currentUserRole !== "event_organizer") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center px-4 py-32 text-center">
          <span className="text-6xl mb-4">🚫</span>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Akses Ditolak
          </h2>
          <p className="text-gray-500 text-sm max-w-sm">
            Halaman ini hanya dapat diakses oleh <strong>Event Organizer</strong>. 
            Silakan hubungi admin jika ingin mengajukan akses.
          </p>
          <a
            href="/"
            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
          >
            Kembali ke Beranda
          </a>
        </div>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, image: file });
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validasi dasar
    if (!form.name || !form.category || !form.date || !form.time || !form.location || !form.address || !form.description || !form.quota) {
      setError("Semua field wajib diisi.");
      return;
    }
    if (!isFree && !form.price) {
      setError("Masukkan harga tiket atau centang 'Event Gratis'.");
      return;
    }

    setIsLoading(true);
    try {
      // TODO: sambungkan ke API / database Anda
      // Contoh menggunakan FormData untuk upload gambar:
      //
      // const formData = new FormData();
      // formData.append("name", form.name);
      // formData.append("category", form.category);
      // formData.append("date", form.date);
      // formData.append("time", form.time);
      // formData.append("location", form.location);
      // formData.append("address", form.address);
      // formData.append("description", form.description);
      // formData.append("price", isFree ? "0" : form.price);
      // formData.append("quota", form.quota);
      // if (form.image) formData.append("image", form.image);
      //
      // const res = await fetch("/api/events", {
      //   method: "POST",
      //   body: formData,
      // });
      // if (!res.ok) throw new Error("Gagal membuat event.");

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Heading */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Buat Event Baru
          </h1>
          <p className="text-sm text-gray-500">
            Isi detail event yang ingin kamu selenggarakan.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 px-4 py-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg flex items-center gap-2">
            <span>✅</span>
            Event berhasil dibuat! Menunggu persetujuan admin.
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center gap-2">
            <span>⚠️</span>
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 space-y-6"
        >
          {/* Upload Gambar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Gambar Event
            </label>
            <div className="w-full h-40 sm:h-48 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors overflow-hidden relative cursor-pointer">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-2">
                  <span className="text-4xl">🖼️</span>
                  <p className="text-sm">Klik untuk upload gambar</p>
                  <p className="text-xs">PNG, JPG hingga 5MB</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Nama Event */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Nama Event <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Contoh: Tech Conference Jakarta 2025"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Kategori <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
            >
              <option value="">Pilih kategori...</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Tanggal & Waktu */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Tanggal <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Waktu <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Lokasi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Nama Tempat / Venue <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Contoh: Jakarta Convention Center"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Alamat Lengkap */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Alamat Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Contoh: Jl. Gatot Subroto No.1, Jakarta Selatan"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Deskripsi Event <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Ceritakan detail event Anda: agenda, pembicara, manfaat yang didapat peserta..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
            />
          </div>

          {/* Harga & Kuota */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Harga */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Harga Tiket <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                  Rp
                </span>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  disabled={isFree}
                  placeholder="0"
                  min="0"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100 disabled:text-gray-400"
                />
              </div>
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFree}
                  onChange={(e) => {
                    setIsFree(e.target.checked);
                    if (e.target.checked) setForm({ ...form, price: "0" });
                  }}
                  className="w-4 h-4 accent-blue-600"
                />
                <span className="text-xs text-gray-600">Event Gratis</span>
              </label>
            </div>

            {/* Kuota */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Kuota Peserta <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="quota"
                value={form.quota}
                onChange={handleChange}
                placeholder="Contoh: 500"
                min="1"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              className="w-full sm:w-auto flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-2.5 rounded-lg text-sm transition-colors duration-200"
            >
              Simpan Draft
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors duration-200"
            >
              {isLoading ? "Memproses..." : "Publikasikan Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default createEventPage;
