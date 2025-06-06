"use client";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Sun, Moon, Globe, Star, Lock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Ayarlar() {
  const { user, logout } = useUser();
  const { theme, setTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const translations = {
    tr: {
      title: "Ayarlar",
      subtitle: "Hesap ayarlarınızı yönetin",
      userInfo: "Kullanıcı Bilgileri",
      name: "Ad",
      email: "E-posta",
      role: "Rol",
      changePassword: "Şifre Değiştir",
      currentPassword: "Mevcut Şifre",
      newPassword: "Yeni Şifre",
      confirmPassword: "Yeni Şifre (Tekrar)",
      updateButton: "Şifreyi Güncelle",
      updating: "Güncelleniyor...",
      theme: "Tema",
      language: "Dil",
      premiumTitle: "Premium Üyelik",
      premiumActive: "Premium üyeliğiniz aktif! 🎉",
      premiumFeatures: [
        "30 dakikadan uzun videoları özetleme",
        "Gelişmiş özet stili seçimi",
        "Özel not formatında çıktı",
        "Daha fazla dil seçeneği",
        "Özel video klasörü oluşturma",
        "Özetlere yorum ekleme",
        "AI destekli flashcard üretimi"
      ],
      premiumUpgrade: "Premium'a Yükselt",
      deleteAccount: "Hesabı Sil",
      passwordMismatch: "Yeni şifreler eşleşmiyor!",
      passwordUpdateSuccess: "Şifreniz başarıyla güncellendi!",
      passwordUpdateError: "Şifre değiştirme başarısız!",
      serverError: "Sunucu hatası!",
      deleteConfirm: "Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz!",
      deleteError: "Hesap silme işlemi başarısız!"
    },
    en: {
      title: "Settings",
      subtitle: "Manage your account settings",
      userInfo: "User Information",
      name: "Name",
      email: "Email",
      role: "Role",
      changePassword: "Change Password",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm New Password",
      updateButton: "Update Password",
      updating: "Updating...",
      theme: "Theme",
      language: "Language",
      premiumTitle: "Premium Membership",
      premiumActive: "Your premium membership is active! 🎉",
      premiumFeatures: [
        "Summarize videos longer than 30 minutes",
        "Advanced summary style selection",
        "Custom note format output",
        "More language options",
        "Create custom video folders",
        "Add comments to summaries",
        "AI-powered flashcard generation"
      ],
      premiumUpgrade: "Upgrade to Premium",
      deleteAccount: "Delete Account",
      passwordMismatch: "New passwords do not match!",
      passwordUpdateSuccess: "Your password has been updated successfully!",
      passwordUpdateError: "Password update failed!",
      serverError: "Server error!",
      deleteConfirm: "Are you sure you want to delete your account? This action cannot be undone!",
      deleteError: "Account deletion failed!"
    }
  };

  const t = translations[language as keyof typeof translations];

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (newPassword !== confirmPassword) {
      setError(t.passwordMismatch);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user?.email, currentPassword, newPassword }),
      });
      const data = await res.json();
      setLoading(false);
      if (!res.ok) {
        setError(data.error || t.passwordUpdateError);
      } else {
        setSuccess(t.passwordUpdateSuccess);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setLoading(false);
      setError(t.serverError);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm(t.deleteConfirm)) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/auth/delete-account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user?.email }),
      });
      setLoading(false);
      if (res.ok) {
        logout();
        window.location.href = "/";
      } else {
        setError(t.deleteError);
      }
    } catch (err) {
      setLoading(false);
      setError(t.serverError);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-2">
      <motion.div initial={{opacity:0, y:30}} animate={{opacity:1, y:0}} transition={{duration:0.5}} className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl p-8 flex flex-col gap-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black dark:text-white mb-2">{t.title}</h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-300">{t.subtitle}</p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <h2 className="text-lg font-semibold text-black dark:text-white mb-2">{t.userInfo}</h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">{t.name}: {user?.name}</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">{t.email}: {user?.email}</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">{t.role}: {user?.role}</p>
          </div>
          <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-black dark:text-white">{t.changePassword}</h2>
            <Input
              type="password"
              placeholder={t.currentPassword}
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              className="text-black dark:text-white"
            />
            <Input
              type="password"
              placeholder={t.newPassword}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="text-black dark:text-white"
            />
            <Input
              type="password"
              placeholder={t.confirmPassword}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="text-black dark:text-white"
            />
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            {success && <p className="text-sm text-green-500 text-center">{success}</p>}
            <Button type="submit" size="lg" className="w-full mt-2" disabled={loading}>
              {loading ? t.updating : t.updateButton}
            </Button>
          </form>
          <div className="flex items-center justify-between p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <h2 className="text-lg font-semibold text-black dark:text-white">{t.theme}</h2>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Tema Değiştir"
              className="rounded-full border border-transparent hover:border-primary transition-colors"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-zinc-800" />}
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
            <h2 className="text-lg font-semibold text-black dark:text-white">{t.language}</h2>
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="bg-white dark:bg-zinc-900 text-black dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-1"
            >
              <option value="tr">Türkçe</option>
              <option value="en">English</option>
            </select>
          </div>
          {user?.role === "PREMIUM" ? (
            <div className="p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <h2 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">{t.premiumTitle}</h2>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">{t.premiumActive}</p>
              <ul className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                {t.premiumFeatures.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
              <h2 className="text-lg font-semibold text-black dark:text-white">{t.premiumTitle}</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-300">Premium üye olarak şu özelliklere erişebilirsiniz:</p>
              <ul className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                {t.premiumFeatures.map((feature, index) => (
                  <li key={index}>• {feature}</li>
                ))}
              </ul>
              <Button className="w-full mt-4 bg-yellow-500 text-white hover:bg-yellow-600">{t.premiumUpgrade}</Button>
            </div>
          )}
          <Button variant="destructive" size="lg" className="w-full mt-2" onClick={handleDeleteAccount} disabled={loading}>
            {t.deleteAccount}
          </Button>
        </div>
      </motion.div>
    </div>
  );
} 