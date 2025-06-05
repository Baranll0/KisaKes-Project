import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">
          YouTube Videolarınızı Yapay Zeka ile Özetleyin
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          KısaKes ile uzun videoları hızlıca özetleyin, ana noktaları yakalayın ve zaman kazanın.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4 max-w-xl mx-auto">
            <div className="flex-1">
              <Input
                type="url"
                placeholder="https://youtube.com/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className={error ? "border-red-500" : ""}
              />
              {error && (
                <p className="text-sm text-red-500 mt-1 text-left">{error}</p>
              )}
            </div>
            <Button type="submit" size="lg">
              Videoyu Özetle
            </Button>
          </div>
        </form>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Hızlı Özet</h3>
            <p className="text-sm text-muted-foreground">
              Videolarınızı saniyeler içinde özetleyin
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Akıllı Zaman Damgaları</h3>
            <p className="text-sm text-muted-foreground">
              Önemli bölümlere hızlıca atlayın
            </p>
          </div>
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-2">Çoklu Dil Desteği</h3>
            <p className="text-sm text-muted-foreground">
              Özetlerinizi istediğiniz dilde alın
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
