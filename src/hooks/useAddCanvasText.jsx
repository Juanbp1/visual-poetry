import { useEffect, useMemo } from 'react';
import { useAppContext } from '../components/context/AppContext';
import { checkPixelIsInsideFigure, addTextToCanvas } from '../components/utils';

/**
 * Hook personalizado para agregar texto a un lienzo (canvas) basado en el estado de la aplicación.
 * Utiliza el contexto de la aplicación para acceder a los datos y acciones necesarios.
 *
 * @module hooks/useAddCanvasText
 * @returns {Function} - Función para agregar texto al canvas, que se puede usar en otros componentes.
 *
 * @example
 * // Ejemplo de uso del hook useAddCanvasText
 * const addTextToCanvas = useAddCanvasText();
 *
 * const MyCanvasComponent = () => {
 *   const addTextToCanvas = useAddCanvasText();
 *   const canvasRef = useRef(null);
 *
 *   useEffect(() => {
 *     const canvas = canvasRef.current;
 *     const context = canvas.getContext('2d');
 *
 *     // Suponiendo que la imagen ya está cargada en el canvas y se cumplen los criterios necesarios
 *     if (canvas && context) {
 *       addTextToCanvas(context);
 *     }
 *   }, [addTextToCanvas]);
 *
 *   return <canvas ref={canvasRef} width={500} height={500} />;
 * };
 */
const useAddCanvasText = () => {
  const { state, actions } = useAppContext();
  const {
    styleFont,
    inputIsSetted,
    inputData,
    inputPositionCoordinates,
    canvasSize,
    figureThreshold,
    imageIsInverted,
  } = state;
  const { checkImageLoadedAction } = actions;

  /**
   * Verifica si un píxel está dentro de una figura en el canvas.
   * @member module:Hooks/useAddCanvasText
   * @param {number} coordX - Coordenada X del píxel.
   * @param {number} coordY - Coordenada Y del píxel.
   * @returns {boolean} - Retorna true si el píxel está dentro de la figura, false en caso contrario.   *
   */
  const checkPixelIsInsideFigureCallback = useMemo(() => {
    return (coordX, CoordY) => {
      return checkPixelIsInsideFigure(
        state.secondContext,
        canvasSize,
        coordX,
        CoordY,
        figureThreshold,
        imageIsInverted
      );
    };
  }, [canvasSize, state.secondContext, figureThreshold, imageIsInverted]);

  /**
   * Agrega texto al canvas utilizando el contexto y los datos proporcionados.
   * @member module:Hooks/useAddCanvasText
   * @param {CanvasRenderingContext2D} context - Contexto del canvas donde se dibujará el texto.
   * @returns {void}
   */
  const addTextToCanvasCallback = useMemo(() => {
    return (context) => {
      return addTextToCanvas(
        context,
        checkPixelIsInsideFigureCallback,
        inputData,
        inputPositionCoordinates,
        canvasSize,
        inputIsSetted,
        styleFont
      );
    };
  }, [
    checkPixelIsInsideFigureCallback,
    inputData,
    inputPositionCoordinates,
    canvasSize,
    inputIsSetted,
    styleFont,
  ]);

  useEffect(() => {
    if (state.mainContext) {
      checkImageLoadedAction();
    }
  }, [state.mainContext, checkImageLoadedAction]);
  return addTextToCanvasCallback;
};

export default useAddCanvasText;
