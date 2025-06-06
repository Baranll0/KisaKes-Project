"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function Kayit() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        setError(data.error || "Kayıt başarısız!");
      } else {
        login(data);
        router.push("/dashboard");
      }
    } catch (err) {
      setLoading(false);
      setError("Sunucu hatası!");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-2">
      <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} transition={{duration:0.5}} className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl p-8 flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black dark:text-white mb-2">Kayıt Ol</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">KısaKes'e hemen ücretsiz kayıt ol</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Ad Soyad"
            value={name}
            onChange={e => setName(e.target.value)}
            className="text-black dark:text-white"
            autoFocus
          />
          <Input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="text-black dark:text-white"
          />
          <Input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="text-black dark:text-white"
          />
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
          <Button type="submit" size="lg" className="w-full mt-2" disabled={loading}>
            {loading ? "Kayıt Olunuyor..." : "Kayıt Ol"}
          </Button>
        </form>
        <div className="text-center text-sm text-zinc-600 dark:text-zinc-300">
          Zaten hesabın var mı?{' '}
          <Link href="/giris" className="text-primary font-medium hover:underline">Giriş Yap</Link>
        </div>
      </motion.div>
    </div>
  );
} 