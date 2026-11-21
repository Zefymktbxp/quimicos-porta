import { products } from '../data/products.js';

// Une cada producto con su foto (src/assets/productos/<slug>.webp), si existe.
const fotos = import.meta.glob('../assets/productos/*.webp', { eager: true, import: 'default' });

export const fotoDe = (slug) => fotos[`../assets/productos/${slug}.webp`] ?? null;

// Los productos que se venden por peso (1 kg en la foto) tienen estas presentaciones; lo confirmó el negocio.
// Los de volumen (1 L) conservan la suya. Para un producto con otras medidas, ponle su propio `presentaciones` en products.js.
export const PRESENTACIONES_PESO = ['1 kg', '500 g', '250 g', '100 g'];
const conImagen = products.map((p) => ({
  ...p,
  imagen: fotoDe(p.slug),
  presentaciones: p.presentaciones ?? (p.presentacion === '1 kg' ? PRESENTACIONES_PESO : p.presentacion ? [p.presentacion] : []),
}));
const porNombre = (x, y) => x.nombre.localeCompare(y.nombre, 'es', { sensitivity: 'base' });

// Primero los productos con foto (en el orden de products.js); después el resto, por orden alfabético.
export const catalogo = [
  ...conImagen.filter((p) => p.imagen),
  ...conImagen.filter((p) => !p.imagen).sort(porNombre),
];

export const TEXTO_SIN_PRESENTACION = 'Consulta las presentaciones disponibles';

// Fotos recortadas (fondo transparente) para componer conjuntos: src/assets/recortes/<slug>.webp
// Se generan con: node scripts/recortar-envases.mjs
const recortes = import.meta.glob('../assets/recortes/*.webp', { eager: true, import: 'default' });
export const recorteDe = (slug) => recortes[`../assets/recortes/${slug}.webp`] ?? null;
