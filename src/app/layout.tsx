import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { ThemeProvider } from "next-themes";
import { UserProvider } from "@/context/UserContext";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KısaKes - AI Destekli YouTube Video Özetleme",
  description: "YouTube videolarınızı yapay zeka ile özetleyin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <LanguageProvider>
          <UserProvider>
            <body className={`${inter.className} bg-white text-black dark:bg-black dark:text-white`}>
              <Navbar />
              <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white">
                {children}
              </main>
            </body>
          </UserProvider>
        </LanguageProvider>
      </ThemeProvider>
    </html>
  );
}
