import { useCallback } from 'react';
import { useAppContext } from '../components/context/AppContext';
import { getBorderCoordinates } from '../components/utils';

/**
 * Hook personalizado para obtener las coordenadas del borde de la imagen.
 * @module hooks/useGetBorderCoordinates
 * @param {React.RefObject<HTMLCanvasElement>} canvasBorderRef - Referencia al elemento canvas que se utiliza para calcular las coordenadas del borde.
 * @returns {Function} - Función que devuelve las coordenadas del borde calculadas.
 * @example
 * // Ejemplo de uso del hook useGetBorderCoordinates
 * import React, { useRef, useEffect, useState } from 'react';
 * import useGetBorderCoordinates from '../hooks/useGetBorderCoordinates';
 * 
 * const ImageBorderComponent = () => {
 *   // Crear una referencia para el elemento canvas
 *   const canvasBorderRef = useRef(null);
 *   
 *   // Usar el hook personalizado para obtener la función que calcula las coordenadas del borde
 *   const getBorderCoordinates = useGetBorderCoordinates(canvasBorderRef);
 *   
 *   // Estado para almacenar las coordenadas del borde
 *   const [borderCoordinates, setBorderCoordinates] = useState([]);
 *   
 *   // Efecto para calcular las coordenadas del borde cuando el componente se monta
 *   useEffect(() => {
 *     if (canvasBorderRef.current) {
 *       // Llamar a la función memorizada para obtener las coordenadas del borde
 *       const coordinates = getBorderCoordinates();
 *       // Actualizar el estado con las coordenadas obtenidas
 *       setBorderCoordinates(coordinates);
 *     }
 *   }, [getBorderCoordinates]);
 * 
 *   return (
 *     <div>
 *       <h1>Coordenadas del Borde de la Imagen</h1>
 *       <canvas ref={canvasBorderRef} width="500" height="500"></canvas>
 *       <div>
 *         <h2>Coordenadas:</h2>
 *         <pre>{JSON.stringify(borderCoordinates, null, 2)}</pre>
 *       </div>
 *     </div>
 *   );
 * };
 * 
 * export default ImageBorderComponent;
 */
const useGetBorderCoordinates = (canvasBorderRef) => {
  const { state } = useAppContext();
  const { imageBorderPixels } = state;

  /**
   * Función memorizada para obtener las coordenadas del borde de la imagen.
   * @member module:hooks/useGetBorderCoordinates
   * @returns {Array} - Coordenadas del borde calculadas.
   */
  const memoizedGetBorderCoordinates = useCallback(() => {
    return getBorderCoordinates(imageBorderPixels, canvasBorderRef);
  }, [canvasBorderRef, imageBorderPixels]);

  return memoizedGetBorderCoordinates;
};

export default useGetBorderCoordinates;
