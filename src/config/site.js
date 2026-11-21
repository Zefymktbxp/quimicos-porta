// Configuración central del sitio. Edita aquí los datos de contacto.
// Dirección y WhatsApp: datos del flyer; la ficha de Google Maps del negocio los confirma
// (Jr. Áncash N.º 1159, Huancayo, teléfono 985 852 725).
// El dueño confirmó que Jr. Áncash N.º 1159 es el local PRINCIPAL, aunque algunos flyers impresos
// dicen «(Sucursal)» junto a esa dirección.
// Teléfono: el dueño decidió publicar SOLO el 985 852 725 (los otros números de los flyers no se usan).
// Dominio: PROVISIONAL. Por ahora quimicosporta.com; a futuro podría cambiar a quimicosportaingenieros.com.
// Para cambiarlo, edita solo `dominio` aquí (astro.config.mjs lo usa como dirección del sitio).
export const site = {
  dominio: 'quimicosporta.com',
  nombre: 'Químicos Porta Ingenieros',
  nombreCorto: 'Químicos Porta',
  titular: 'Insumos químicos, alimentarios y productos naturales en Huancayo',
  ventas: 'Venta al por mayor y al por menor',
  direccion: 'Jr. Áncash N.º 1159, Huancayo, Perú',
  // Número para el enlace de WhatsApp: solo dígitos, con código de país (51 = Perú).
  whatsappNumero: '51985852725',
  // Cómo se muestra el número en pantalla.
  whatsappVisible: '+51 985 852 725',
};

// Ubicación confirmada del negocio en Google Maps: «Empresa Químicos Porta Ingenieros EIRL».
// - mapaUrl: enlace del botón «Cómo llegar» (abre la ficha del negocio; desde ahí se piden indicaciones).
//   El número (cid) sale del identificador del lugar del mapa insertado.
// - mapaEmbedUrl: dirección del mapa integrado (el «src» del código «Insertar un mapa» de Google Maps).
// Para cambiarlos: en Google Maps, abre el negocio > «Compartir» > «Insertar un mapa» / «Copiar vínculo».
site.mapaNombre = 'Empresa Químicos Porta Ingenieros EIRL';
site.mapaUrl = 'https://www.google.com/maps?cid=421511783065063717';
// Vista de calle (Street View) frente al local: la toma más cercana es la del Jr. Áncash 1154,
// unos 8 m al oeste del local, y `3f112` la orienta hacia el local (este-sureste, hacia el 1159).
// Para cambiar la orientación, edita el número después de `!3f` (grados: 0 norte, 90 este, 180 sur, 270 oeste).
site.calleEmbedUrl =
  'https://www.google.com/maps/embed?pb=!4v1795241570347!6m8!1m7!1sQ_QEr7UGU3WxHwMfJPkMug!2m2!1d-12.0732849!2d-75.2061405!3f112!4f4!5f0.7820865974627469';
site.mapaEmbedUrl =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7366.237854743635!2d-75.20610240815364!3d-12.07335517354611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910e9715c3112731%3A0x5d982bbc23c1125!2sEmpresa%20Qu%C3%ADmicos%20Porta%20Ingenieros%20EIRL!5e0!3m2!1ses!2spe!4v1795241570347!5m2!1ses!2spe';

// Datos opcionales de la página «Ubícanos». Mientras estén vacíos, no se muestran.
// - horario: por ejemplo 'Lunes a sábado, 9 a. m. a 6 p. m.' (PENDIENTE: confirmar con el negocio).
// - indicaciones: lista de { medio, texto }, por ejemplo
//   { medio: 'A pie', texto: 'A dos cuadras de la plaza ...' }. Solo con datos verificados.
site.horario = 'De 8 a. m. a 8 p. m.'; // Confirmado por el dueño. Faltan los días de atención (no se inventan).
site.indicaciones = [];
