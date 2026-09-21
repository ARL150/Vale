import { defineConfig } from 'astro/config';

export default defineConfig({
  // Para publicar en una subcarpeta (p. ej. GitHub Pages) agrega: base: '/nombre-repo'
  build: { inlineStylesheets: 'auto' },
});
