"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";

const infoCards = [
  {
    title: "Hızlı Özet",
    desc: "Videolarınızı saniyeler içinde özetleyin.",
    icon: <PlayCircle className="w-7 h-7 text-primary" />,
  },
  {
    title: "Akıllı Zaman Damgaları",
    desc: "Önemli bölümlere hızlıca atlayın.",
    icon: <PlayCircle className="w-7 h-7 text-primary" />,
  },
  {
    title: "Çoklu Dil Desteği",
    desc: "Özetlerinizi istediğiniz dilde alın.",
    icon: <PlayCircle className="w-7 h-7 text-primary" />,
  },
];

export default function Home() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!url) {
      setError("Lütfen bir YouTube URL'si girin");
      return;
    }
    const videoId = extractVideoId(url);
    if (!videoId) {
      setError("Geçerli bir YouTube URL'si girin");
      return;
    }
    router.push(`/ozet/${videoId}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-br dark:from-[#18181b] dark:to-[#23272f] flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-2 pt-8 md:pt-16">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="w-full max-w-xl text-center mx-auto">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent leading-tight text-black dark:text-white drop-shadow-lg">
            YouTube Videolarınızı <span className="text-primary">Yapay Zeka</span> ile Özetleyin
          </h1>
          <p className="text-base md:text-lg text-black dark:text-zinc-200 mb-6 leading-relaxed">
            KısaKes ile uzun videoları hızlıca özetleyin, ana noktaları yakalayın ve zaman kazanın.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-center justify-center w-full max-w-lg mx-auto mb-4">
            <Input
              type="url"
              placeholder="https://youtube.com/..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={`flex-1 text-base py-3 px-3 shadow-md text-black ${error ? "border-red-500" : ""}`}
              autoFocus
            />
            <Button type="submit" size="lg" className="w-full sm:w-auto px-6 py-3 text-base font-semibold shadow-lg">
              Videoyu Özetle
            </Button>
          </form>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="mt-6 md:mt-10 w-full flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-3xl px-2">
            {infoCards.map((card, i) => (
              <div key={i} className="bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg p-4 sm:p-6 flex flex-col items-center text-center hover:scale-105 transition-transform min-w-0">
                <div className="mb-2">{card.icon}</div>
                <h3 className="font-semibold mb-1 text-base sm:text-lg text-black dark:text-white">{card.title}</h3>
                <p className="text-xs sm:text-sm text-black/70 dark:text-zinc-300">{card.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
      <footer className="w-full py-4 md:py-6 text-center text-xs text-black/60 dark:text-zinc-400 opacity-80">
        © {new Date().getFullYear()} KısaKes. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}
