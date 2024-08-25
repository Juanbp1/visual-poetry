import { useCallback, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

/**
 * Hook personalizado para manejar el evento de redimensión de la ventana,
 * ejecutando un callback solo si se cumple una condición específica.
 * @module hooks/useResizeListener
 * @param {Function} callback - La función que se ejecutará cuando se produzca un evento de redimensión.
 * @example
 * // Ejemplo de uso del hook useResizeListener
 * import React, { useState } from 'react';
 * import useResizeListener from './useResizeListener'; // Asegúrate de usar la ruta correcta
 * 
 * const ResizeComponent = () => {
 *   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
 * 
 *   // Función de callback que se ejecutará al redimensionar la ventana
 *   const handleResize = () => {
 *     setWindowWidth(window.innerWidth);
 *   };
 * 
 *   // Utiliza el hook para escuchar eventos de redimensión
 *   useResizeListener(handleResize);
 * 
 *   return (
 *     <div>
 *       <h1>Redimensiona la ventana</h1>
 *       <p>El ancho de la ventana es: {windowWidth}px</p>
 *     </div>
 *   );
 * };
 * 
 * export default ResizeComponent;
 */
const useResizeListener = (callback) => {
  const isLaptop = useMediaQuery({
    query: '(min-width: 1024px)',
  });
  const handleResize = useCallback(() => {
    if (isLaptop) {
      callback();
    }
  }, [callback, isLaptop]);

  useEffect(() => {
    // Agrega el listener de redimensión
    window.addEventListener('resize', handleResize);

    // Ejecuta el callback si la condición se cumple al montar el componente
    handleResize();

    // Limpia el listener al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [callback, isLaptop, handleResize]);
};

export default useResizeListener;
