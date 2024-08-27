import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import { STICKY_THRESHOLD } from '../../constants/uiConstants';

/**
 * Este componente crea una header animado utilizando `react-spring`. El header se mostrará o se ocultará
 * en función de la propiedad `headerVisibility` que se le pase.
 *
 * @module animations/AnimatedHeader
 * @param {object} props - Las propiedades que se pasan al componente.
 * @param {string} [props.headerClassName] - Clase CSS para aplicar al elemento de la cabecera.
 * @param {React.ReactNode} props.children - Contenido que se renderizará dentro del header.
 * @param {boolean} props.headerVisibility - Determina si la cabecera es visible o no.
 * @param {React.Ref} ref - Referencia a pasar al elemento `header` animado.
 *
 * @returns {React.ReactElement} Componente `animated.header` con la animación aplicada.
 * @example
 * //Ejemplo simple del componente AnimatedHeader
 * import React, { useState } from 'react';
 * import { AnimatedHeader } from '../animations';
 *
 * const SimpleAnimatedHeaderExample = () => {
 *   const [headerVisibility, setHeaderVisibility] = useState(true);
 *
 *   return (
 *     <div>
 *       <button onClick={() => setHeaderVisibility(!headerVisibility)}>
 *         Toggle Header
 *       </button>
 *       <AnimatedHeader headerClassName="header" headerVisibility={headerVisibility}>
 *         <h1>Este es el encabezado animado.</h1>
 *       </AnimatedHeader>
 *     </div>
 *   );
 * };
 * export default SimpleAnimatedHeaderExample;
 */
const AnimatedHeader = forwardRef(
  ({ headerClassName, children, headerVisibility }, ref) => {
    const [isSticky, setIsSticky] = useState(false);

    // Detectar el scroll y actualizar el estado
    useEffect(() => {
      const handleScroll = () => {
        setIsSticky(window.scrollY > STICKY_THRESHOLD);
        console.log(window.scrollY)
      };
   
      window.addEventListener('scroll', handleScroll);

      // Limpiar el event listener al desmontar el componente
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const animationProps = useSpring({
      opacity:  headerVisibility ? 1 : 0,
      transform: headerVisibility ? 'translateY(0%)' : 'translateY(-100%)',
      config: {
        tension: 120,
        friction: 30,
        mass: 1,
      },
    });

    return (
      <animated.header
        className={headerClassName}
        ref={ref}
        style={{
          ...animationProps,
          // Estilo fijo para cuando el header está en la parte superior
          ...(!isSticky && { opacity: 1, transform: 'translateY(0%)'})
        }}
        aria-hidden={!headerVisibility}
      >
        {children}
      </animated.header>
    );
  }
);

AnimatedHeader.propTypes = {
  headerClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
  headerVisibility: PropTypes.bool.isRequired,
};

export default AnimatedHeader;
