"use client";

import { useUser } from "@/context/UserContext";
import { useState } from "react";

export default function Dashboard() {
  const { user, updateRole } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:8080/api/auth/upgrade-to-premium?email=" + user?.email, {
        method: "POST",
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        setError(data.error || "Yükseltme başarısız!");
      } else {
        updateRole("PREMIUM");
        setSuccess(true);
      }
    } catch (err) {
      setLoading(false);
      setError("Sunucu hatası!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-zinc-900">
      <h1 className="text-3xl font-bold text-black dark:text-white mb-4">Kullanıcı Dashboard</h1>
      <p className="text-lg text-zinc-700 dark:text-zinc-300">KısaKes'e hoş geldiniz!</p>
      {user?.role === "USER" && !success && (
        <button
          className="mt-6 px-6 py-2 rounded bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition-colors disabled:opacity-60"
          onClick={handleUpgrade}
          disabled={loading}
        >
          {loading ? "Yükseltiliyor..." : "Premium'a Yükselt"}
        </button>
      )}
      {user?.role === "PREMIUM" && (
        <p className="mt-6 text-green-600 font-semibold">Premium üyesiniz! 🎉</p>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {success && <p className="mt-4 text-green-600">Premium üyeliğiniz aktif!</p>}
    </div>
  );
} 