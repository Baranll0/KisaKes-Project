import { Card } from "@/components/ui/card";

interface TimelineItem {
  id: string;
  timestamp: number;
  title: string;
}

interface TimelineProps {
  items: TimelineItem[];
  onItemClick: (timestamp: number) => void;
}

export default function Timeline({ items, onItemClick }: TimelineProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Card className="p-4">
      <h2 className="text-lg font-semibold mb-4">Zaman Çizelgesi</h2>
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-2 hover:bg-muted rounded-lg cursor-pointer transition-colors"
            onClick={() => onItemClick(item.timestamp)}
          >
            <span className="text-sm text-muted-foreground">
              {formatTime(item.timestamp)}
            </span>
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </Card>
  );
} 