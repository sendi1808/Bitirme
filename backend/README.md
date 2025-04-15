# SPİNOVA Backend API

SPİNOVA Radyoloji Görüntüleme Platformu için RESTful API servisi.

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# .env.example dosyasını .env olarak kopyala ve değiştir
cp .env.example .env

# Geliştirme modunda çalıştır
npm run start:dev

# Ürün modunda derle
npm run build

# Ürün modunda çalıştır
npm run start:prod
```

## API Belgeleri

API belgeleri `http://localhost:3000/api/docs` adresinde bulunabilir (Swagger UI).

## Ana Özellikler

- Kullanıcı Yönetimi (Doktorlar için)
- Hasta Yönetimi
- Görüntüleme ve Tanı Sistemi
- JWT Kimlik Doğrulama
- E-posta Bildirimleri
- Swagger API Belgeleri

## Veritabanı

PostgreSQL veritabanı kullanılmaktadır. Veritabanı bağlantı ayarları `.env` dosyasında yapılandırılabilir.

## Teknoloji Stack

- NestJS: Temel çerçeve
- TypeORM: Veritabanı ORM
- PostgreSQL: Veritabanı
- Passport-JWT: Kimlik Doğrulama
- Swagger: API Belgeleri
- Jest: Test Çerçevesi

## API Endpoint'leri

### Kimlik Doğrulama

- POST `/api/auth/login` - Giriş
- POST `/api/auth/register` - Kayıt olma
- POST `/api/auth/forgot-password` - Şifre sıfırlama isteği
- POST `/api/auth/reset-password` - Şifre sıfırlama

### Kullanıcılar

- GET `/api/users` - Tüm kullanıcıları listele
- GET `/api/users/:id` - ID ile kullanıcı bul
- POST `/api/users` - Yeni kullanıcı oluştur
- PATCH `/api/users/:id` - Kullanıcıyı güncelle
- DELETE `/api/users/:id` - Kullanıcıyı sil

### Hastalar

- GET `/api/patients` - Tüm hastaları listele
- GET `/api/patients/:id` - ID ile hasta bul
- GET `/api/patients/tc/:tcId` - TC Kimlik No ile hasta bul
- POST `/api/patients` - Yeni hasta oluştur
- PATCH `/api/patients/:id` - Hastayı güncelle
- DELETE `/api/patients/:id` - Hastayı sil

### Görüntüleme

- GET `/api/imaging` - Tüm görüntüleri listele
- GET `/api/imaging/non-diagnosed` - Tanı konulmamış görüntüleri listele
- GET `/api/imaging/patient/:patientId` - Hasta ID'sine göre görüntüleri listele
- GET `/api/imaging/:id` - ID ile görüntü bul
- POST `/api/imaging` - Yeni görüntü oluştur
- PATCH `/api/imaging/:id` - Görüntüyü güncelle
- PATCH `/api/imaging/:id/diagnosis` - Görüntü tanısını güncelle
- DELETE `/api/imaging/:id` - Görüntüyü sil 