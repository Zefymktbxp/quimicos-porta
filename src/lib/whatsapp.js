import { site } from '../config/site.js';

const ARTICULOS = { el: 'del', la: 'de la', los: 'de los', las: 'de las' };

// Mensaje: «Hola, quisiera consultar el precio y la disponibilidad del colágeno hidrolizado de 1 kg».
export function mensajeProducto(producto) {
  const art = ARTICULOS[producto.articulo] ?? 'de';
  const nombre = producto.nombre.charAt(0).toLowerCase() + producto.nombre.slice(1);
  // Con varias presentaciones no se fija ninguna: el cliente la elige en el chat.
  const pres = producto.presentaciones?.length === 1 ? ` de ${producto.presentaciones[0]}` : '';
  return `Hola, quisiera consultar el precio y la disponibilidad ${art} ${nombre}${pres}`;
}

export function enlaceWhatsApp(mensaje) {
  const base = `https://wa.me/${site.whatsappNumero}`;
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base;
}
