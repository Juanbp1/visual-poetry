import { useCallback, useEffect } from 'react';

/**
 * Hook personalizado para manejar el estilo de desbordamiento y la clase de desenfoque
 * basado en el estado del sidebar.
 * @module hooks/useScrollAndBlur
 * @param {boolean} isSideBarOpen - Indica si el sidebar está abierto o no.
 * @param {string} blurClassName - Nombre de la clase de desenfoque que se aplicará.
 * @returns {object} - Objeto que contiene el nombre de la clase de desenfoque.
 * @example
 * // Ejemplo de uso del hook useScrollAndBlur
 * import React, { useState } from 'react';
 * import useScrollAndBlur from './useScrollAndBlur';
 *
 * const SidebarExample = () => {
 *   const [isSideBarOpen, setIsSideBarOpen] = useState(false);
 *
 *   const { blurClass } = useScrollAndBlur(isSideBarOpen);
 *
 *   const toggleSidebar = () => {
 *     setIsSideBarOpen((prev) => !prev);
 *   };
 *
 *   return (
 *     <main className={`main-container ${blurClass}`}>
 *       <button onClick={toggleSidebar}>
 *         {isSideBarOpen ? 'Cerrar Sidebar' : 'Abrir Sidebar'}
 *       </button>
 *
 *       <div className={`sidebar ${isSideBarOpen ? 'open' : 'closed'}`}>
 *         <p>Contenido del sidebar...</p>
 *       </div>
 *     </main>
 *   );
 * };
 *
 * export default SidebarExample;
 *
 */
const useScrollAndBlur = (isSideBarOpen, blurClassName = '--blur') => {
  const overflowStyle = isSideBarOpen ? 'hidden' : 'auto';
  const blurClass = isSideBarOpen ? blurClassName : '';

  const handleScroll = useCallback((style) => {
    document.documentElement.style.overflow = style;
  }, []);

  useEffect(() => {
    window.addEventListener('change', handleScroll(overflowStyle));
    return () => {
      window.removeEventListener('change', handleScroll(overflowStyle));
    };
  }, [overflowStyle, handleScroll]);

  return { blurClass };
};

export default useScrollAndBlur;
