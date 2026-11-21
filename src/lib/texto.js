// Minúsculas y sin tildes, para comparar búsquedas («curcuma» encuentra «cúrcuma»).
export function normalizar(texto) {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}
