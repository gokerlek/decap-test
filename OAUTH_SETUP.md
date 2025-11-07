# OAuth Setup Guide

## 🔧 GitHub OAuth App Kurulumu

### 1. GitHub OAuth App Oluştur

1. https://github.com/settings/developers adresine git
2. **OAuth Apps** → **New OAuth App** tıkla
3. Bilgileri doldur:
   ```
   Application name: Decap CMS (veya istediğin isim)
   Homepage URL: https://decap-test-ten.vercel.app
   Authorization callback URL: https://decap-test-ten.vercel.app/api/auth
   ```
4. **Register application** tıkla
5. **Client ID** kopyala
6. **Generate a new client secret** → Secret'ı kopyala

### 2. Vercel'de Environment Variables Ekle

1. Vercel dashboard'a git → Projeye tıkla
2. **Settings** → **Environment Variables**
3. Şu değişkenleri ekle:
   ```
   GITHUB_CLIENT_ID: (kopyaladığın Client ID)
   GITHUB_CLIENT_SECRET: (kopyaladığın Client Secret)
   ```
4. **Save** tıkla
5. **Deployments** → **Redeploy** (env variables için)

### 3. Test Et

1. `https://decap-test-ten.vercel.app/admin` adresine git
2. **Login with GitHub** tıkla
3. GitHub'a yönlendirecek → İzin ver
4. CMS açılacak! ✅

## 🎯 Sonuç

Artık tamamen Vercel + GitHub kullanıyorsun:
- ✅ Hosting: Vercel
- ✅ OAuth: Vercel Serverless Function
- ✅ Content: GitHub
- ✅ Hiçbir 3. parti servis yok!
