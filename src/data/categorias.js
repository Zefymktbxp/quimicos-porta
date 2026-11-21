// Categorías del Inicio y del filtro del catálogo.
// - `fotos`: slugs de productos con foto. Si la categoría tiene fotos se muestra como hilera de estante;
//   con 3 fotos el orden es izquierda, centro (al frente) y derecha.
// - `compacta`: categorías sin foto, que se muestran como bloques pequeños bajo las hileras.
// - `consulta`: categoría sin productos cargados; en vez de filtrar el catálogo, abre WhatsApp con ese mensaje.
export const categorias = [
  {
    id: 'quimicos',
    nombre: 'Insumos químicos',
    descripcion: 'Ácidos, sales, sulfatos, glicerina, propilenglicol y más.',
    fotos: ['cloruro-de-magnesio', 'acido-fosforico-85', 'sal-de-epsom'],
  },
  {
    id: 'alimentarios',
    nombre: 'Insumos alimentarios',
    descripcion: 'Gomas, pectina, stevia, leches en polvo, aceites, lecitina y más.',
    fotos: ['colageno-hidrolizado', 'aceite-de-oliva-extra-virgen', 'vitamina-c'],
  },
  {
    id: 'naturales',
    nombre: 'Productos naturales',
    descripcion: 'Harinas de maca, moringa, cúrcuma, aguaje y camu camu; spirulina y sal rosada de Maras.',
    // Solo hay foto del cartílago de tiburón; agregar aquí las harinas cuando existan sus fotos.
    fotos: ['cartilago-de-tiburon'],
  },
  {
    id: 'limpieza',
    nombre: 'Limpieza',
    descripcion: 'Lejía, cloro granulado y en pastillas, amonio cuaternario, jabón líquido y más.',
    compacta: true,
  },
  {
    id: 'cosmetica',
    nombre: 'Cosmética y jabonería',
    descripcion: 'Glicerina, vaselinas, karité, ceras, tensioactivos y más.',
    compacta: true,
  },
  {
    id: 'laboratorio',
    nombre: 'Laboratorio',
    descripcion: 'Equipos, instrumentos, materiales y reactivos.',
    compacta: true,
    consulta: 'Hola, quisiera consultar por equipos, instrumentos, materiales o reactivos para laboratorio',
  },
];
