"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VideoPlayer from "@/components/features/VideoPlayer";
import Timeline from "@/components/features/Timeline";
import { useState } from "react";
import { motion } from "framer-motion";

// Örnek timeline verisi
const mockTimelineItems = [
  { id: "1", timestamp: 0, title: "Giriş" },
  { id: "2", timestamp: 120, title: "Ana Konu 1" },
  { id: "3", timestamp: 300, title: "Ana Konu 2" },
  { id: "4", timestamp: 480, title: "Sonuç" },
];

const mockLearnCards = [
  { id: 1, text: "Yapay zeka ile video özetleme nasıl çalışır?" },
  { id: 2, text: "Zaman damgaları ile önemli anlara atlama" },
  { id: 3, text: "Çoklu dilde özet ve Q&A desteği" },
];

export default function SummaryPage({
  params,
}: {
  params: { videoId: string };
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);
  const [showQA, setShowQA] = useState(false);

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  const handleTimelineClick = (timestamp: number) => {
    setSelectedTime(timestamp);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/60 dark:from-[#18181b] dark:to-[#23272f]">
      {/* Navbar üstte zaten sticky */}
      <div className="container mx-auto px-2 md:px-6 py-4 md:py-8 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        {/* Sol Ana Alan */}
        <div className="flex flex-col gap-6">
          {/* Video */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="p-0 shadow-xl overflow-hidden">
              <VideoPlayer
                videoId={params.videoId}
                onTimeUpdate={handleTimeUpdate}
                initialTime={selectedTime ?? 0}
              />
            </Card>
          </motion.div>

          {/* Timeline - yatay kaydırmalı */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-muted rounded-lg">
              <Timeline
                items={mockTimelineItems}
                onItemClick={handleTimelineClick}
              />
            </div>
          </motion.div>

          {/* Öğrenecekleriniz - yatay kaydırmalı kartlar */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <h3 className="font-semibold text-lg mb-2 mt-2">Bu videodan öğrenecekleriniz</h3>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-muted">
              {mockLearnCards.map((card) => (
                <Card key={card.id} className="min-w-[220px] p-4 flex items-center justify-center text-center shadow-md bg-gradient-to-br from-muted/60 to-background">
                  <span className="font-medium text-sm text-primary/90">{card.text}</span>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sağ Sticky Panel */}
        <div className="relative">
          <div className="lg:sticky lg:top-24 flex flex-col gap-6">
            {/* Dil Seçici */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="flex justify-end">
                <Select defaultValue="tr">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Dil Seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tr">Türkçe</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="de">Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {/* Özet Kartı */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <Card className="p-6 shadow-lg bg-gradient-to-br from-background/80 to-muted/60">
                <h2 className="text-lg font-semibold mb-4">Video Özeti</h2>
                <div className="prose prose-sm max-w-none">
                  <p>
                    Bu video, yapay zeka destekli video özetleme teknolojisini anlatıyor.
                    İzleyiciler, uzun videoları hızlıca özetleyebilir ve ana noktaları
                    yakalayabilirler.
                  </p>
                </div>
              </Card>
            </motion.div>

            {/* Q&A Slide-in Butonu (mobilde sabit, masaüstünde sticky) */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
              <Button
                className="w-full mt-2 lg:hidden"
                variant="secondary"
                onClick={() => setShowQA((v) => !v)}
              >
                Soru & Cevap Panelini {showQA ? "Kapat" : "Aç"}
              </Button>
              <div className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${showQA ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"} lg:hidden`} onClick={() => setShowQA(false)} />
              <div className={`fixed bottom-0 right-0 left-0 z-50 transition-transform duration-300 ${showQA ? "translate-y-0" : "translate-y-full"} lg:hidden`}> 
                <Card className="rounded-t-2xl p-4 shadow-2xl bg-background">
                  <Tabs defaultValue="qa">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="qa">Soru & Cevap</TabsTrigger>
                      <TabsTrigger value="notes">Notlar</TabsTrigger>
                    </TabsList>
                    <TabsContent value="qa" className="space-y-4">
                      <div className="space-y-2">
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm font-medium">Soru: Video ne hakkında?</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Cevap: Bu video, yapay zeka teknolojilerinin video özetleme
                            alanındaki kullanımını anlatıyor.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Sorunuzu yazın..."
                          className="flex-1 px-3 py-2 text-sm border rounded-md"
                        />
                        <Button size="sm">Sor</Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="notes">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Notlar burada görüntülenecek...
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
              </div>
              {/* Masaüstü için Q&A kutusu sticky */}
              <div className="hidden lg:block">
                <Card className="p-4 shadow-md mt-2">
                  <Tabs defaultValue="qa">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="qa">Soru & Cevap</TabsTrigger>
                      <TabsTrigger value="notes">Notlar</TabsTrigger>
                    </TabsList>
                    <TabsContent value="qa" className="space-y-4">
                      <div className="space-y-2">
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm font-medium">Soru: Video ne hakkında?</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Cevap: Bu video, yapay zeka teknolojilerinin video özetleme
                            alanındaki kullanımını anlatıyor.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Sorunuzu yazın..."
                          className="flex-1 px-3 py-2 text-sm border rounded-md"
                        />
                        <Button size="sm">Sor</Button>
                      </div>
                    </TabsContent>
                    <TabsContent value="notes">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Notlar burada görüntülenecek...
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
              </div>
            </motion.div>

            {/* İndirme Butonları */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.1 }}>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" className="flex-1">
                  PDF İndir
                </Button>
                <Button variant="outline" className="flex-1">
                  Word İndir
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      {/* Mobilde alt tab bar (isteğe bağlı) */}
      {/* <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t flex justify-around py-2 lg:hidden">
        <Button variant="ghost">Video</Button>
        <Button variant="ghost">Özet</Button>
        <Button variant="ghost">Q&A</Button>
      </div> */}
    </div>
  );
} 