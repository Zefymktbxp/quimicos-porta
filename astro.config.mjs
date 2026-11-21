import { defineConfig } from 'astro/config';
import { site as sitio } from './src/config/site.js';

export default defineConfig({
  // Dirección pública del sitio (dominio provisional, se cambia en src/config/site.js).
  site: `https://${sitio.dominio}`,
  // La antigua página de contacto se unificó con la página «Ubícanos».
  redirects: {
    '/contacto': '/ubicanos/',
  },
});
