# KısaKes - Video İçerik Özetleme ve Analiz Platformu

KısaKes, video içeriklerini otomatik olarak analiz eden, özetleyen ve çeşitli formatlarda çıktılar sunan yapay zeka destekli bir platformdur.

## 🚀 Özellikler

### AI Destekli Video İşleme
- YouTube videolarından otomatik ses indirme
- Whisper AI ile yüksek doğrulukta konuşma tanıma
- GPT-3.5 ile akıllı içerik özetleme
- Otomatik zaman damgalı bölümler
- Akıllı soru-cevap çiftleri oluşturma
- Çoklu dil desteği ile otomatik çeviri

### Çıktı Formatları
- PDF formatında detaylı raporlar
- Word belgesi olarak düzenlenmiş içerik
- Zaman damgalı bölüm listesi
- Soru-cevap formatında öğrenme materyali

## 🔮 Gelecek Özellikler

### AI Geliştirmeleri
- Daha gelişmiş özetleme algoritmaları
- Video içi önemli anların otomatik tespiti
- Duygu analizi ve ton tespiti
- Anahtar kelime ve konu çıkarma
- Görsel içerik analizi ve tanıma

### Platform Geliştirmeleri
- Web arayüzü ile kolay kullanım
- Toplu video işleme desteği
- Özelleştirilebilir çıktı formatları
- API entegrasyonu
- Kullanıcı hesapları ve geçmiş işlemler

## 🛠️ Teknik Altyapı

- Python tabanlı backend
- Whisper AI entegrasyonu
- OpenAI GPT-3.5 API
- Google Translate API
- PDF ve Word dosya işleme
- YouTube-DL entegrasyonu

## 📋 Gereksinimler

- Python 3.8+
- FFmpeg
- OpenAI API anahtarı
- İnternet bağlantısı

## 🔧 Kurulum

```bash
pip install -r requirements.txt
```

## 🎯 Kullanım

```python
from kisakes.ai.video_processor import VideoProcessor

processor = VideoProcessor()
result = processor.process_video("YOUTUBE_URL", target_lang="tr")
```

## 📝 Lisans

MIT License

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun 
