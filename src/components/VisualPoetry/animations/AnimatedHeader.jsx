import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
/**
 * Este componente crea una cabecera animada utilizando `react-spring`. La cabecera se mostrará o se ocultará
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
    const animationProps = useSpring({
      opacity: headerVisibility ? 1 : 0,
      transform: headerVisibility ? 'translateY(0%)' : 'translateY(-100%)',
      config: {
        tension: 190,
        friction: 40,
        mass: 1,
      },
    });

    return (
      <animated.header
        className={headerClassName}
        ref={ref}
        style={animationProps}
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
