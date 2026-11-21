// Recorta el fondo crema de las fotos de producto (src/assets/productos) y guarda
// versiones con transparencia en src/assets/recortes. Ejecutar a mano:
//   node scripts/recortar-envases.mjs
// El fondo se detecta desde los bordes de la foto (relleno por inundación con tolerancia).
import sharp from 'sharp';
import { readdirSync, mkdirSync } from 'node:fs';

const ENTRADA = 'src/assets/productos';
const SALIDA = 'src/assets/recortes';
const TAM = 640;
const TOLERANCIA_DEGRADADO = 45; // fotos nuevas: fondo beige con degradado
const TOLERANCIA_PLANO = 14; // fotos antiguas: fondo crema liso
const TOLERANCIA = null; // distancia máxima respecto al color de las esquinas (el fondo puede tener degradado)
const SALTO = 6; // diferencia máxima entre píxeles vecinos: el fondo cambia suave, el borde del envase no

mkdirSync(SALIDA, { recursive: true });

for (const archivo of readdirSync(ENTRADA).filter((f) => f.endsWith('.webp'))) {
  const { data, info } = await sharp(`${ENTRADA}/${archivo}`)
    .resize(TAM, TAM)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const ch = 4;

  // Color de fondo: promedio de las 4 esquinas.
  const esquinas = [[2, 2], [w - 3, 2], [2, h - 3], [w - 3, h - 3]];
  const bg = [0, 0, 0];
  for (const [x, y] of esquinas) for (let c = 0; c < 3; c++) bg[c] += data[(y * w + x) * ch + c] / 4;

  const tol = bg[0] > 240 ? TOLERANCIA_PLANO : TOLERANCIA_DEGRADADO;
  const dist = (i, j) => Math.hypot(data[i] - j[0], data[i + 1] - j[1], data[i + 2] - j[2]);
  const esFondo = (i, origen) => {
    if (dist(i, bg) > tol) return false;
    if (bg[0] > 240) return true;
    return origen === undefined || dist(i, [data[origen], data[origen + 1], data[origen + 2]]) <= SALTO;
  };

  // Relleno por inundación desde todo el borde.
  const fondo = new Uint8Array(w * h);
  const pila = [];
  const empujar = (x, y, desde) => {
    const p = y * w + x;
    if (fondo[p] || !esFondo(p * ch, desde === undefined ? undefined : desde * ch)) return;
    fondo[p] = 1;
    pila.push(p);
  };
  for (let x = 0; x < w; x++) { empujar(x, 0); empujar(x, h - 1); }
  for (let y = 0; y < h; y++) { empujar(0, y); empujar(w - 1, y); }
  while (pila.length) {
    const p = pila.pop();
    const x = p % w, y = (p / w) | 0;
    if (x > 0) empujar(x - 1, y, p);
    if (x < w - 1) empujar(x + 1, y, p);
    if (y > 0) empujar(x, y - 1, p);
    if (y < h - 1) empujar(x, y + 1, p);
  }

  // Se conserva solo la pieza más grande (el envase): quita franjas sueltas de mesa o sombra.
  {
    const etiqueta = new Int32Array(w * h);
    const tamanos = [0];
    for (let ini = 0; ini < w * h; ini++) {
      if (fondo[ini] || etiqueta[ini]) continue;
      const id = tamanos.length;
      tamanos.push(0);
      const cola = [ini];
      etiqueta[ini] = id;
      while (cola.length) {
        const p = cola.pop();
        tamanos[id]++;
        const x = p % w, y = (p / w) | 0;
        for (const [nx, ny] of [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]) {
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          const q = ny * w + nx;
          if (!fondo[q] && !etiqueta[q]) { etiqueta[q] = id; cola.push(q); }
        }
      }
    }
    let mayor = 1;
    for (let i = 1; i < tamanos.length; i++) if (tamanos[i] > tamanos[mayor]) mayor = i;
    for (let p = 0; p < w * h; p++) if (!fondo[p] && etiqueta[p] !== mayor) fondo[p] = 1;
  }

  // Alfa: 0 en el fondo, 255 en el producto; luego se suaviza el borde.
  const alfa = Buffer.alloc(w * h);
  for (let p = 0; p < w * h; p++) alfa[p] = fondo[p] ? 0 : 255;
  const { data: alfaSuave, info: infoAlfa } = await sharp(alfa, { raw: { width: w, height: h, channels: 1 } })
    .blur(1.2)
    .threshold(110)
    .blur(0.8)
    .extractChannel(0)
    .raw()
    .toBuffer({ resolveWithObject: true });
  if (infoAlfa.channels !== 1) throw new Error(`alfa con ${infoAlfa.channels} canales`);

  const salida = Buffer.from(data);
  for (let p = 0; p < w * h; p++) salida[p * ch + 3] = alfaSuave[p];

  await sharp(salida, { raw: { width: w, height: h, channels: 4 } })
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 1 })
    .webp({ quality: 88, alphaQuality: 95 })
    .toFile(`${SALIDA}/${archivo}`);
  console.log('recortado', archivo, 'fondo', bg.map(Math.round).join(','));
}
