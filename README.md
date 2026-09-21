# Cumpleaños para Valecita ❤️

```bash
npm install
npm run dev      # desarrollo (abre también desde el celular con la IP que muestra)
npm run build    # genera /dist listo para publicar
```

## Qué editar
- **Textos, fecha del contador, fotos y música:** `src/data/content.ts`
- **Fotos:** copia tus imágenes a `public/photos/` y cambia `src` (p. ej. `'/photos/nosotros.jpg'`).
- **Canción:** `public/music/cancion.mp3`
- **Colores:** variables en `src/styles/global.css` (`:root`)

## Estructura
`src/components/` → Loader, Hero, Message, Gallery, Special, Letter, FinalSection, MusicButton
`src/scripts/` → effects.ts (reveal, corazones, parallax) y confetti.ts
