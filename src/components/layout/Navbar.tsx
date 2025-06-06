"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useLanguage } from "@/context/LanguageContext";

const translations = {
  tr: {
    howItWorks: "Nasıl Çalışır?",
    login: "Giriş Yap",
    register: "Kayıt Ol",
    dashboard: "Dashboard",
    adminDashboard: "Admin Dashboard",
    settings: "Ayarlar",
    logout: "Çıkış Yap"
  },
  en: {
    howItWorks: "How It Works?",
    login: "Login",
    register: "Register",
    dashboard: "Dashboard",
    adminDashboard: "Admin Dashboard",
    settings: "Settings",
    logout: "Logout"
  }
};

const navLinks = [
  { href: "/nasil-calisir", label: "Nasıl Çalışır?" },
  { href: "/giris", label: "Giriş Yap" },
  { href: "/kayit", label: "Kayıt Ol" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, logout } = useUser();
  const { language } = useLanguage();
  const router = useRouter();

  const t = translations[language as keyof typeof translations];

  const handleLogout = () => {
    logout();
    router.push("/giris");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-black border-b shadow-lg transition-colors">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 select-none group">
          <Image src="/logo.svg" alt="KısaKes Logo" width={32} height={32} priority className="drop-shadow-lg group-hover:scale-110 transition-transform" />
          <span className="text-2xl font-bold tracking-tight text-black dark:text-white drop-shadow-lg group-hover:text-primary transition-colors">KısaKes</span>
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          {/* Tema Toggle */}
          <Button
            variant="ghost"
            size="icon"
            aria-label="Tema Değiştir"
            className="rounded-full border border-transparent hover:border-primary transition-colors"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-zinc-800" />}
          </Button>
          {user ? (
            <>
              <Link
                href={user.role === "ADMIN" ? "/admin-dashboard" : "/dashboard"}
                className="px-3 py-1.5 rounded-md text-sm font-medium text-black dark:text-white bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                {user.role === "ADMIN" ? t.adminDashboard : t.dashboard}
              </Link>
              <Link
                href="/nasil-calisir"
                className="px-3 py-1.5 rounded-md text-sm font-medium text-black dark:text-white hover:bg-primary/10 hover:text-primary dark:hover:text-primary transition-colors duration-150"
              >
                {t.howItWorks}
              </Link>
              <Link
                href="/ayarlar"
                className="px-3 py-1.5 rounded-md text-sm font-medium text-black dark:text-white hover:bg-primary/10 hover:text-primary dark:hover:text-primary transition-colors duration-150"
              >
                {t.settings}
              </Link>
              <Button variant="outline" size="sm" className="ml-2" onClick={handleLogout}>
                {t.logout}
              </Button>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link
                href="/nasil-calisir"
                className="px-3 py-1.5 rounded-md text-sm font-medium text-black dark:text-white hover:bg-primary/10 hover:text-primary dark:hover:text-primary transition-colors duration-150"
              >
                {t.howItWorks}
              </Link>
              <Link
                href="/giris"
                className="px-3 py-1.5 rounded-md text-sm font-medium text-black dark:text-white hover:bg-primary/10 hover:text-primary dark:hover:text-primary transition-colors duration-150"
              >
                {t.login}
              </Link>
              <Link
                href="/kayit"
                className="px-3 py-1.5 rounded-md text-sm font-medium text-black dark:text-white hover:bg-primary/10 hover:text-primary dark:hover:text-primary transition-colors duration-150"
              >
                {t.register}
              </Link>
            </div>
          )}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setOpen(!open)} aria-label="Menüyü Aç/Kapat">
              {open ? <X className="w-6 h-6 text-black dark:text-white" /> : <Menu className="w-6 h-6 text-black dark:text-white" />}
            </Button>
          </div>
        </div>
      </div>
      {/* Mobil Menü */}
      <div
        className={`md:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-black backdrop-blur border-b shadow-lg transition-transform duration-300 ${open ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          {user ? (
            <>
              <Link
                href={user.role === "ADMIN" ? "/admin-dashboard" : "/dashboard"}
                className="px-3 py-2 rounded-md text-base font-semibold text-black dark:text-white bg-primary/10 hover:bg-primary/20 transition-colors"
              >
                {user.role === "ADMIN" ? t.adminDashboard : t.dashboard}
              </Link>
              <Link
                href="/nasil-calisir"
                className="px-3 py-2 rounded-md text-base font-semibold text-black dark:text-white hover:bg-primary/10 hover:text-primary dark:hover:text-primary transition-colors duration-150"
              >
                {t.howItWorks}
              </Link>
              <Link
                href="/ayarlar"
                className="px-3 py-2 rounded-md text-base font-semibold text-black dark:text-white hover:bg-primary/10 hover:text-primary dark:hover:text-primary transition-colors duration-150"
              >
                {t.settings}
              </Link>
              <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
                {t.logout}
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/nasil-calisir"
                className="px-3 py-2 rounded-md text-base font-semibold text-black dark:text-white hover:bg-primary/10 hover:text-primary dark:hover:text-primary transition-colors duration-150"
              >
                {t.howItWorks}
              </Link>
              <Link
                href="/giris"
                className="text-base font-semibold py-2 text-black dark:text-white hover:text-primary transition-colors"
                onClick={() => setOpen(false)}
              >
                {t.login}
              </Link>
              <Link
                href="/kayit"
                className="text-base font-semibold py-2 text-black dark:text-white hover:text-primary transition-colors"
                onClick={() => setOpen(false)}
              >
                {t.register}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
} 