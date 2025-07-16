import Datepicker from "../components/Datepicker";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50">
      <main className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-10 max-w-md w-full flex flex-col items-center">
        <h1 className="text-4xl font-bold text-center text-green-600 mb-4">
          Vite + React + Tailwind v4
        </h1>
        <a
          href="/login"
          className="inline-block px-6 py-3 font-semibold rounded-lg shadow border transition"
          style={{
            background: "var(--color-white)",
            color: "#16a34a",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          Login
        </a>
        <Datepicker />
      </main>
    </div>
  );
}