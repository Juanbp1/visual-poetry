/**
 * @module hooks
 *
 * @description Este módulo exporta una colección de hooks personalizados utilizados para manejar diferentes aspectos de la funcionalidad de la aplicación. Estos hooks facilitan la reutilización del código y la gestión del estado y los efectos secundarios en los componentes.
 *
 * @see {@link module:hooks/useAddCanvasText|useAddCanvasText} - Hook para añadir texto al lienzo en la aplicación.
 * @see {@link module:hooks/useCanvasDraw|useCanvasDraw} - Hook para manejar el dibujo en un lienzo (canvas).
 * @see {@link module:hooks/useCloseSelector|useCloseSelector} - Hook para cerrar un selector o menú.
 * @see {@link module:hooks/useFilterCoordinates|useFilterCoordinates} - Hook para filtrar y gestionar coordenadas en la aplicación.
 * @see {@link module:hooks/useGenerateTextLoremIpsum|useGenerateTextLoremIpsum} - Hook para generar texto de ejemplo (Lorem Ipsum).
 * @see {@link module:hooks/useGetBorderCoordinates|useGetBorderCoordinates} - Hook para obtener las coordenadas de los bordes de un elemento.
 * @see {@link module:hooks/useImageBorderDetectionAndPainting|useImageBorderDetectionAndPainting} - Hook para detectar y pintar bordes en imágenes.
 * @see {@link module:hooks/useRenderImages|useRenderImages} - Hook para renderizar imágenes en la aplicación.
 * @see {@link module:hooks/useResizeListener|useResizeListener} - Hook para manejar eventos de redimensionamiento de la ventana.
 * @see {@link module:hooks/useScrollAndBlur|useScrollAndBlur} - Hook para gestionar el desplazamiento y el desenfoque de elementos.
 * @see {@link module:hooks/useScrollHandler|useScrollHandler} - Hook para manejar el comportamiento de desplazamiento en la aplicación.
 */
export { default as useAddCanvasText } from './useAddCanvasText';
export { default as useCanvasDraw } from './useCanvasDraw';
export { default as useCloseSelector } from './useCloseSelector';
export { default as useFilterCoordinates } from './useFilterCoordinates';
export { default as useGenerateTextLoremIpsum } from './useGenerateTextLoremIpsum';
export { default as useGetBorderCoordinates } from './useGetBorderCoordinates';
export { default as useImageBorderDetectionAndPainting } from './useImageBorderDetectionAndPainting';
export { default as useRenderImages } from './useRenderImages';
export { default as useResizeListener } from './useResizeListener';
export { default as useScrollAndBlur } from './useScrollAndBlur';
export { default as useScrollHandler } from './useScrollHandler';
