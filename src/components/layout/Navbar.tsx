import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          KısaKes
        </Link>
        
        <div className="flex items-center gap-4">
          <Link href="/nasil-calisir" className="text-sm hover:text-primary">
            Nasıl Çalışır?
          </Link>
          <Button variant="outline" asChild>
            <Link href="/giris">Giriş Yap</Link>
          </Button>
          <Button asChild>
            <Link href="/kayit">Kayıt Ol</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
} 