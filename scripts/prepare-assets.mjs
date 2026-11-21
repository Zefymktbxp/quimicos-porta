// Prepara los recursos de resources/ para la web. Se ejecuta a mano: node scripts/prepare-assets.mjs
import sharp from 'sharp';
import { copyFileSync } from 'node:fs';

// Logo horizontal: recorta el margen blanco sin deformarlo.
await sharp('resources/Logoempresa1.jpeg')
  .trim({ threshold: 20 })
  .extend({ top: 8, bottom: 8, left: 8, right: 8, background: '#ffffff' })
  .png()
  .toFile('src/assets/logo.png');

// Símbolo QP cuadrado -> favicon y logo compacto.
await sharp('resources/Logoempresa3.png').resize(256, 256).png().toFile('public/favicon.png');
await sharp('resources/Logoempresa3.png').resize(512, 512).png().toFile('src/assets/qp-simbolo.png');

// Fotos de producto: resources/Images/<archivo>.png -> src/assets/productos/<slug>.webp
// Aceite de oliva, sal de Epsom y vaselina no están en esa carpeta: conservan su foto anterior.
const fotos = {
  aceite_de_coco: 'aceite-de-coco',
  acido_acetico: 'acido-acetico-99-8',
  acido_fosforico: 'acido-fosforico-85',
  bicarbonato_de_sodio: 'bicarbonato-de-sodio',
  cartilago_de_tiburon: 'cartilago-de-tiburon',
  citrato_de_magnesio: 'citrato-de-magnesio',
  citrato_de_potasio: 'citrato-de-potasio',
  cloruro_de_magnesio: 'cloruro-de-magnesio',
  creatina: 'creatina-monohidratada',
  glicinato_de_magnesio: 'glicinato-de-magnesio',
  glucosamina: 'glucosamina',
  grenetina_gelatina_neutra: 'gelatina-sin-sabor',
  hipoclorito_de_sodio: 'hipoclorito-de-sodio',
  lecitina_de_soya: 'lecitina-de-soya-granulada',
  malato_de_magnesio: 'malato-de-magnesio',
  sulfato_de_aluminio: 'sulfato-de-aluminio',
  sulfato_de_cobre: 'sulfato-de-cobre',
  treonato_de_magnesio: 'treonato-de-magnesio',
  vitamina_c: 'vitamina-c',
};
for (const [archivo, slug] of Object.entries(fotos)) {
  await sharp(`resources/Images/${archivo}.png`).resize(900, 900).webp({ quality: 85 }).toFile(`src/assets/productos/${slug}.webp`);
}
// Colágeno: la imagen es horizontal; se recorta un cuadrado centrado en la bolsa.
await sharp('resources/Images/Bolsa transparente frontal con etiqueta original.png')
  .extract({ left: 379, top: 0, width: 929, height: 929 })
  .resize(900, 900)
  .webp({ quality: 85 })
  .toFile('src/assets/productos/colageno-hidrolizado.webp');
// Fotos sueltas de resources/ (no están en la carpeta imagenes/).
const sueltas = {
  'vaselina-solida': 'resources/imagen_taper_vaselina.jpeg',
};
for (const [slug, ruta] of Object.entries(sueltas)) {
  await sharp(ruta).resize(900, 900).webp({ quality: 85 }).toFile(`src/assets/productos/${slug}.webp`);
}
console.log('listo');

// Marca de agua QP: silueta blanca con transparencia, a partir del símbolo cuadrado (para fondos oscuros).
{
  const { data, info } = await sharp('resources/Logoempresa3.png').resize(900, 900).greyscale().raw().toBuffer({ resolveWithObject: true });
  const rgba = Buffer.alloc(info.width * info.height * 4, 255);
  for (let p = 0; p < info.width * info.height; p++) {
    rgba[p * 4 + 3] = Math.max(0, Math.min(255, Math.round((255 - data[p]) * 1.3)));
  }
  await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toFile('src/assets/qp-marca.png');
}
