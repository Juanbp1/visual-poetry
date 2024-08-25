import { useCallback, useEffect } from 'react';
import { useAppContext } from '../components/context/AppContext';
import { drawImageOnCanvas } from '../components/utils';

/**
 * Hook personalizado para gestionar el dibujo de imágenes en un canvas.
 * Utiliza el contexto de la aplicación para acceder a los datos del canvas y la imagen.
 *
 * @module hooks/useCanvasDraw
 * @param {Function} addTextToCanvas - Función para añadir texto al canvas.
 * @returns {void}
 * @example
 * // Ejemplo de uso del hook useCanvasDraw
 * import React, { useRef, useEffect } from 'react';
 * import useCanvasDraw from './hooks/useCanvasDraw';
 * import { useAppContext } from './context/AppContext';
 *
 * const MyCanvasComponent = () => {
 *   const canvasRef = useRef(null);
 *   const { actions } = useAppContext();
 *
 *   // Función para añadir texto al canvas
 *   const addTextToCanvas = (context, text, x, y) => {
 *     context.font = '20px Arial';
 *     context.fillStyle = 'black';
 *     context.fillText(text, x, y);
 *   };
 *
 *   // Utilizar el hook personalizado
 *   useCanvasDraw(addTextToCanvas);
 *
 *   useEffect(() => {
 *     if (canvasRef.current) {
 *       const context = canvasRef.current.getContext('2d');
 *       actions.setMainContext(context); // Guardar el contexto en el estado global
 *     }
 *   }, [canvasRef, actions]);
 *
 *   return (
 *     <canvas ref={canvasRef} width={500} height={500} />
 *   );
 * };
 *
 * export default MyCanvasComponent;
 */
const useCanvasDraw = (addTextToCanvas) => {
  const { state, actions } = useAppContext();
  const { canvasSize, image, imageIsLoaded } = state;
  const { obtainCanvasSizeAction } = actions;

  /**
   * Callback para dibujar una imagen en el canvas.
   * @member module:hooks/useCanvasDraw
   * @param {CanvasRenderingContext2D} context - Contexto del canvas.
   * @param {HTMLImageElement} img - Imagen que se va a dibujar.
   * @param {boolean} addText - Determina si se debe añadir texto al canvas.
   * @param {boolean} drawImage - Determina si se debe dibujar la imagen.
   * @returns {void}
   
   */
  const drawImageOnCanvasCallback = useCallback(
    (context, img, addText, drawImage) => {
      return drawImageOnCanvas(
        context,
        img,
        addText,
        drawImage,
        canvasSize,
        obtainCanvasSizeAction,
        addTextToCanvas
      );
    },
    [canvasSize, obtainCanvasSizeAction, addTextToCanvas]
  );

  useEffect(() => {
    if (state.mainContext && image && imageIsLoaded) {
      drawImageOnCanvasCallback(state.mainContext, image, true, true);
    }
  }, [state.mainContext, drawImageOnCanvasCallback, image, imageIsLoaded]);

  useEffect(() => {
    if (state.secondContext && image) {
      drawImageOnCanvasCallback(state.secondContext, image, false, true);
    }
  }, [state.secondContext, image, drawImageOnCanvasCallback]);
};

export default useCanvasDraw;
