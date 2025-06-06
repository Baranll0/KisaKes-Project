"use client";
import { motion } from "framer-motion";
import { PlayCircle, FileText, MessageCircle, Languages } from "lucide-react";

const steps = [
  {
    icon: <PlayCircle className="w-8 h-8 text-primary" />, 
    title: "YouTube Linkini Yapıştır",
    desc: "Özetlemek istediğin videonun bağlantısını ana sayfadaki kutuya yapıştır.",
  },
  {
    icon: <FileText className="w-8 h-8 text-primary" />, 
    title: "Yapay Zeka Videoyu Analiz Etsin",
    desc: "Sistem otomatik olarak videoyu analiz eder, metne çevirir ve özet çıkarır.",
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-primary" />, 
    title: "Etkileşimli Özet ve Soru-Cevap",
    desc: "Özet, zaman çizelgesi ve soru-cevap kutusu ile sonucu incele.",
  },
  {
    icon: <Languages className="w-8 h-8 text-primary" />, 
    title: "Çoklu Dil ve İndirme",
    desc: "Özetini farklı dillerde görüntüle, PDF/Word olarak indir.",
  },
];

export default function NasilCalisir() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <motion.h1 initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.5}} className="text-3xl md:text-4xl font-bold text-center mb-8 text-black dark:text-white">
        KısaKes Nasıl Çalışır?
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{opacity:0, y:30}}
            animate={{opacity:1, y:0}}
            transition={{duration:0.5, delay:0.1*i}}
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center"
          >
            <div className="mb-3">{step.icon}</div>
            <h3 className="font-semibold text-lg mb-2 text-black dark:text-white">{step.title}</h3>
            <p className="text-sm text-zinc-700 dark:text-zinc-300">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 