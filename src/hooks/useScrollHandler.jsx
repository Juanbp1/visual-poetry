import { useState, useCallback, useEffect } from 'react';
import { STICKY_THRESHOLD } from '../components/constants/uiConstants';

/**
 * Hook personalizado para manejar el scroll y la visibilidad del encabezado.
 * @module hooks/useScrollHandler
 * @returns {Object} - Un objeto que contiene el estado de scroll y visibilidad del encabezado.
 * @example
 * // Ejemplo de uso del hook useScrollHandler
 * import React, { useRef } from 'react';
 * import { useScrollHandler } from '../../hooks'; // Asegúrate de importar desde la ruta correcta
 * import { Logo, Button } from '../common';
 * import { LuMenu } from 'react-icons/lu';
 *
 * const SimpleHeader = ({ className, menuItems, useStickyStyles }) => {
 *   const headerRef = useRef();
 *   const { scrolled, headerVisibility } = useScrollHandler(); // Obtiene ambos estados del hook
 *
 *   // Determina la clase del encabezado en función del estado de desplazamiento y visibilidad
 *   const scrollHeaderClass = `${className} header ${scrolled && useStickyStyles ? `${className}--scrolled` : ''}`;
 *   const visibilityStyle = headerVisibility ? {} : { display: 'none' };
 *
 *   return (
 *     <header classContainer={scrollHeaderClass} ref={headerRef} style={visibilityStyle}>
 *       <div className="header__container">
 *         <Logo className="header__logo" />
 *         {showMenu && (
 *           <Button
 *             id="menuButton"
 *             className="header__navMenu"
 *             handleClick={() => console.log('Menu button clicked')}
 *             Icon={LuMenu}
 *             ariaLabel="Open navigation menu"
 *           />
 *         )}
 *       </div>
 *     </header>
 *   );
 * };
 *
 * export default SimpleHeader;
 *
 */
const useScrollHandler = () => {
  const initialPosition = 0;
  const [scrolled, setScrolled] = useState(false);
  const [headerVisibility, setHeaderVisibility] = useState(true);
  const [previousScrollPosition, setPreviousScrollPosition] =
    useState(initialPosition);
  // const STICKY_THRESHOLD = 80;

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      const currentPosition = window.scrollY;
      const isScrolled = currentPosition > initialPosition;

      // Actualiza el estado de "scrolled"
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Actualiza la visibilidad del encabezado
      if (
        currentPosition > previousScrollPosition &&
        headerVisibility &&
        currentPosition > STICKY_THRESHOLD
      ) {
        setHeaderVisibility(false);
      } else if (
        currentPosition < previousScrollPosition &&
        !headerVisibility
      ) {
        setHeaderVisibility(true);
      }
      setPreviousScrollPosition(currentPosition);
    });
  }, [scrolled, previousScrollPosition, headerVisibility, initialPosition]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { scrolled, headerVisibility };
};

export default useScrollHandler;
