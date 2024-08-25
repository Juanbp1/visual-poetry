import { useMemo } from 'react';
import { filterCoordinates } from '../components/utils';
import { useAppContext } from '../components/context/AppContext';

/**
 * Hook personalizado para filtrar coordenadas según el tamaño del canvas y la fuente.
 * @module hooks/useFilterCoordinates
 * @returns {Function} - Una función que filtra las coordenadas y devuelve las coordenadas filtradas para la izquierda y la derecha.
 * @example
 * // Ejemplo de uso del hook useFilterCoordinates
 * import React, { useCallback, useRef, useEffect } from 'react';
 * import BaseCanvas from './BaseCanvas';
 * import { useAppContext } from '../../context/AppContext';
 * import {
 *   useCanvasDraw,
 *   useGetBorderCoordinates,
 *   useFilterCoordinates,
 * } from '../../../hooks';
 * 
 * const SimpleCanvasContainer = () => {
 *   const canvasRef = useRef(null);
 * 
 *   const { state } = useAppContext();
 *   const { image } = state;
 * 
 *   const getBorderCoordinatesCallback = useGetBorderCoordinates(canvasRef);
 *   const filterCoordinatesCallback = useFilterCoordinates();
 *   const addTextToCanvas = useCallback(() => {
 *     // Función simplificada para añadir texto al canvas
 *     const ctx = canvasRef.current.getContext('2d');
 *     ctx.font = '20px Arial';
 *     ctx.fillText('Texto de Ejemplo', 50, 50);
 *   }, []);
 * 
 *   useCanvasDraw(addTextToCanvas);
 * 
 *   const processBorderCoordinates = useCallback(() => {
 *     const coordinatesArray = getBorderCoordinatesCallback();
 *     const { coordinatesLeft, coordinatesRight } =
 *       filterCoordinatesCallback(coordinatesArray);
 * 
 *     console.log('Coordenadas del borde izquierda:', coordinatesLeft);
 *     console.log('Coordenadas del borde derecha:', coordinatesRight);
 *   }, [filterCoordinatesCallback, getBorderCoordinatesCallback]);
 * 
 *   useEffect(() => {
 *     processBorderCoordinates();
 *   }, [processBorderCoordinates]);
 * 
 *   return (
 *     <div className="simpleCanvasWrapper">
 *       <div className="simpleCanvasContainer">
 *         <BaseCanvas
 *           ref={canvasRef}
 *           imagen={image}
 *           className={'canvas canvas--visible'}
 *         />
 *       </div>
 *     </div>
 *   );
 * };
 * 
 * export default SimpleCanvasContainer;
 * 
 */
const useFilterCoordinates = () => {
  const { state } = useAppContext();
  const { canvasSize, styleFont } = state;
  const { size } = styleFont;

  const filterCoordinatesCallback = useMemo(() => {
    return (coordinatesArray) => {
      const filteredCoordinatesLeft = filterCoordinates(
        coordinatesArray,
        'left',
        size,
        canvasSize
      );
      const filteredCoordinatesRight = filterCoordinates(
        coordinatesArray,
        'right',
        size,
        canvasSize
      );
      return {
        coordinatesLeft: filteredCoordinatesLeft,
        filteredCoordinatesRight,
      };
    };
  }, [canvasSize, size]);
  return filterCoordinatesCallback;
};

export default useFilterCoordinates;
