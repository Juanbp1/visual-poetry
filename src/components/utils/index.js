/**
 * @module utils
 * 
 * @description Este módulo exporta una colección de funciones utilitarias utilizadas en la aplicación. 
 * Estas funciones abarcan operaciones sobre lienzos, colores, coordenadas, imágenes y desplazamientos. 
 * Facilitan la implementación de funcionalidades comunes y específicas en la aplicación.
 * 
 * @see {@link module:utils/drawImageOnCanvas|drawImageOnCanvas} - Función para dibujar una imagen en un lienzo (canvas).
 * @see {@link module:utils/checkIsColorLight|checkIsColorLight} - Función para verificar si un color es claro u oscuro.
 * @see {@link module:utils/getBorderCoordinates|getBorderCoordinates} - Función para obtener las coordenadas de los bordes de un elemento.
 * @see {@link module:utils/filterCoordinates|filterCoordinates} - Función para filtrar y gestionar coordenadas en la aplicación.
 * @see {@link module:utils/addTextToCanvas|addTextToCanvas} - Función para añadir texto a un lienzo (canvas).
 * @see {@link module:utils/createImageDataList|createImageDataList} - Función para crear una lista de datos de imágenes.
 * @see {@link module:utils/generateTextLoremIpsum|generateTextLoremIpsum} - Función para generar texto de ejemplo (Lorem Ipsum).
 * @see {@link module:utils/checkPixelIsInsideFigure|checkPixelIsInsideFigure} - Función para verificar si un píxel está dentro de una figura.
 * @see {@link module:utils/scrollToTop|scrollToTop} - Función para desplazar la vista hacia la parte superior de la página.
 * @see {@link module:utils/scrollToSection|scrollToSection} - Función para desplazar la vista hacia una sección específica de la página.
 */
export { default as drawImageOnCanvas } from './canvasUtils';
export { default as checkIsColorLight } from './colorUtils';
export { getBorderCoordinates } from './coordinatesUtils';
export { filterCoordinates } from './coordinatesUtils';
export { addTextToCanvas } from './coordinatesUtils';
export { default as createImageDataList } from './createImageDataList';
export { default as generateTextLoremIpsum } from './loremIpsumUtils';
export { default as checkPixelIsInsideFigure } from './pixelUtils';
export { scrollToTop } from './scrollSection';
export { scrollToSection } from './scrollSection';
