# TeknovaShop - Noticias + Sidebar de Ofertas

## Qué incluye
- Portada con noticias tecnológicas (RSS: The Verge, TechCrunch, Xataka)
- Sidebar con productos (lee `data/products.json`)
- API `/api/news` y `/api/refresh-news?token=...`
- Helpers en `app/lib`

## Requisitos
Añade `rss-parser` a tu `package.json`:
```json
"dependencies": {
  "rss-parser": "^3.12.0"
}
```
o instala localmente:
```
npm i rss-parser
```

## Cron en vercel.json
Añade esta entrada a `vercel.json` junto a tu otro cron:
```json
{
  "crons": [
    { "path": "/api/refresh?token=%REFRESH_TOKEN%", "schedule": "0 6 * * *" },
    { "path": "/api/refresh-news?token=%REFRESH_TOKEN%", "schedule": "*/30 * * * *" }
  ]
}
```
Y define `REFRESH_TOKEN` en **Vercel → Settings → Environment Variables**.

## Deploy
Sube los archivos al repositorio y haz redeploy con **Clear Build Cache**.
