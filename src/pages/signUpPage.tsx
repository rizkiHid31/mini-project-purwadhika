import Header from "../components/header";
import { useState } from "react";

type UserRole = "customer" | "event_organizer";

interface SignUpForm {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  // Field khusus event organizer
  organizationName: string;
  organizationDescription: string;
}

function signUpPage() {
  const [role, setRole] = useState<UserRole>("customer");
  const [form, setForm] = useState<SignUpForm>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    organizationName: "",
    organizationDescription: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validasi
    if (!form.fullName || !form.email || !form.phone || !form.password || !form.confirmPassword) {
      setError("Semua field wajib diisi.");
      return;
    }
    if (role === "event_organizer" && !form.organizationName) {
      setError("Nama organisasi / komunitas wajib diisi.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }
    if (!agreeTerms) {
      setError("Kamu harus menyetujui syarat & ketentuan.");
      return;
    }

    setIsLoading(true);
    try {
      // TODO: sambungkan ke API / database Anda
      // Contoh:
      // const res = await fetch("/api/auth/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     role,
      //     fullName: form.fullName,
      //     email: form.email,
      //     phone: form.phone,
      //     password: form.password,
      //     ...(role === "event_organizer" && {
      //       organizationName: form.organizationName,
      //       organizationDescription: form.organizationDescription,
      //     }),
      //   }),
      // });
      // if (!res.ok) throw new Error("Pendaftaran gagal.");

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex flex-col items-center justify-center px-4 py-32 text-center">
          <span className="text-6xl mb-4">🎉</span>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Akun Berhasil Dibuat!
          </h2>
          <p className="text-gray-500 text-sm max-w-sm">
            {role === "event_organizer"
              ? "Akun Event Organizer kamu sedang ditinjau oleh admin. Kamu akan mendapat notifikasi melalui email."
              : "Selamat datang! Silakan login untuk mulai menjelajahi event."}
          </p>
          <a
            href="/login"
            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors"
          >
            Pergi ke Halaman Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex items-start justify-center px-4 sm:px-6 py-8 sm:py-12">
        <div className="w-full max-w-lg">

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
              Buat Akun Baru
            </h1>
            <p className="text-sm text-gray-500">
              Bergabung dan mulai kelola event favoritmu.
            </p>
          </div>

          {/* Pilih Role */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setRole("customer")}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                role === "customer"
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
              }`}
            >
              <span className="text-3xl">👤</span>
              <span className="text-sm font-semibold">Customer</span>
              <span className="text-xs text-center leading-snug opacity-70">
                Cari & beli tiket event
              </span>
            </button>
            <button
              type="button"
              onClick={() => setRole("event_organizer")}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 ${
                role === "event_organizer"
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
              }`}
            >
              <span className="text-3xl">🎪</span>
              <span className="text-sm font-semibold">Event Organizer</span>
              <span className="text-xs text-center leading-snug opacity-70">
                Buat & kelola event
              </span>
            </button>
          </div>

          {/* Card Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 space-y-4"
          >
            {/* Badge Role */}
            <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
              role === "customer"
                ? "bg-blue-100 text-blue-700"
                : "bg-purple-100 text-purple-700"
            }`}>
              <span>{role === "customer" ? "👤" : "🎪"}</span>
              {role === "customer" ? "Mendaftar sebagai Customer" : "Mendaftar sebagai Event Organizer"}
            </div>

            {/* Error */}
            {error && (
              <div className="px-4 py-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center gap-2">
                <span>⚠️</span>
                {error}
              </div>
            )}

            {/* Nama Lengkap */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Nama Lengkap <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Nama sesuai KTP"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="contoh@email.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* No. HP */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                No. Handphone <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">
                  +62
                </span>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="812 3456 7890"
                  className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Field khusus Event Organizer */}
            {role === "event_organizer" && (
              <>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs font-semibold text-purple-600 uppercase tracking-wider mb-3">
                    Informasi Organisasi
                  </p>

                  {/* Nama Organisasi */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nama Organisasi / Komunitas <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="organizationName"
                      value={form.organizationName}
                      onChange={handleChange}
                      placeholder="Contoh: Komunitas Tech Jakarta"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                  </div>

                  {/* Deskripsi Organisasi */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Deskripsi Singkat{" "}
                      <span className="text-gray-400 font-normal">(opsional)</span>
                    </label>
                    <textarea
                      name="organizationDescription"
                      value={form.organizationDescription}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Ceritakan tentang organisasi atau komunitas kamu..."
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                    />
                  </div>
                </div>
              </>
            )}

            {/* Password */}
            <div className="border-t border-gray-100 pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimal 8 karakter"
                  className="w-full px-4 py-2.5 pr-11 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg leading-none"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {/* Password strength indicator */}
              {form.password && (
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        form.password.length >= level * 3
                          ? form.password.length >= 12
                            ? "bg-green-500"
                            : form.password.length >= 8
                            ? "bg-yellow-400"
                            : "bg-red-400"
                          : "bg-gray-200"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-400 ml-1">
                    {form.password.length < 8
                      ? "Lemah"
                      : form.password.length < 12
                      ? "Cukup"
                      : "Kuat"}
                  </span>
                </div>
              )}
            </div>

            {/* Konfirmasi Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Konfirmasi Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Ulangi password"
                  className={`w-full px-4 py-2.5 pr-11 border rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                    form.confirmPassword && form.password !== form.confirmPassword
                      ? "border-red-400 bg-red-50"
                      : "border-gray-300"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-lg leading-none"
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {form.confirmPassword && form.password !== form.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">Password tidak cocok</p>
              )}
            </div>

            {/* Syarat & Ketentuan */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-blue-600 shrink-0"
                />
                <span className="text-xs text-gray-600 leading-relaxed">
                  Saya menyetujui{" "}
                  <a href="#" className="text-blue-600 hover:underline font-medium">
                    Syarat & Ketentuan
                  </a>{" "}
                  serta{" "}
                  <a href="#" className="text-blue-600 hover:underline font-medium">
                    Kebijakan Privasi
                  </a>{" "}
                  yang berlaku.
                </span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors duration-200 mt-2"
            >
              {isLoading ? "Memproses..." : "Buat Akun"}
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-500 pt-1">
              Sudah punya akun?{" "}
              <a href="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                Masuk di sini
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default signUpPage;
