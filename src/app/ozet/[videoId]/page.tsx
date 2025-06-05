"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import VideoPlayer from "@/components/features/VideoPlayer";
import Timeline from "@/components/features/Timeline";
import { useState } from "react";

// Örnek timeline verisi
const mockTimelineItems = [
  { id: "1", timestamp: 0, title: "Giriş" },
  { id: "2", timestamp: 120, title: "Ana Konu 1" },
  { id: "3", timestamp: 300, title: "Ana Konu 2" },
  { id: "4", timestamp: 480, title: "Sonuç" },
];

export default function SummaryPage({
  params,
}: {
  params: { videoId: string };
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedTime, setSelectedTime] = useState<number | null>(null);

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  const handleTimelineClick = (timestamp: number) => {
    setSelectedTime(timestamp);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sol Kolon - Video ve Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* Video Oynatıcı */}
          <Card className="p-4">
            <VideoPlayer
              videoId={params.videoId}
              onTimeUpdate={handleTimeUpdate}
              initialTime={selectedTime ?? 0}
            />
          </Card>

          {/* Timeline */}
          <Timeline
            items={mockTimelineItems}
            onItemClick={handleTimelineClick}
          />
        </div>

        {/* Sağ Kolon - Özet ve Q&A */}
        <div className="space-y-6">
          {/* Dil Seçici */}
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

          {/* Özet */}
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Video Özeti</h2>
            <div className="prose prose-sm max-w-none">
              <p>
                Bu video, yapay zeka destekli video özetleme teknolojisini anlatıyor.
                İzleyiciler, uzun videoları hızlıca özetleyebilir ve ana noktaları
                yakalayabilirler.
              </p>
            </div>
          </Card>

          {/* Q&A */}
          <Card className="p-4">
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

          {/* İndirme Butonları */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              PDF İndir
            </Button>
            <Button variant="outline" className="flex-1">
              Word İndir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 