/**
 * Desplaza la ventana del navegador hasta la parte superior de la página.
 *
 * @module utils/scrollToTop
 * @return {void} No devuelve ningún valor.
 * @example
 * // Ejemplo de uso: Botón para volver al inicio
 * import { scrollToTop } from './utils/scrollToTop';
 *
 * const BackToTopButton = () => {
 *   return (
 *     <button onClick={scrollToTop}>
 *       Volver al inicio
 *     </button>
 *   );
 * };
 *
 * export default BackToTopButton;
 */
export const scrollToTop = () => {
  window.scrollTo(0, 0);
};

/**
 * Desplaza la ventana del navegador hasta el elemento con el identificador especificado.
 *
 * @module utils/scrollToSection
 * @param {string} id - El identificador del elemento al que se debe desplazar.
 * @return {void} No devuelve ningún valor.
 * @example
 * // Ejemplo de uso: Botón para desplazar a una sección específica
 * import { scrollToSection } from './utils/scrollToSection';
 *
 * const ScrollToSectionButton = () => {
 *   return (
 *     <button onClick={() => scrollToSection('section1')} >
 *       Ir a Sección 1
 *     </button>
 *   );
 * };
 *
 * export default ScrollToSectionButton;
 */
export const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
};
