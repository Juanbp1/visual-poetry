import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';

/**
 * Este componente crea una animación de deslizamiento lateral utilizando `react-spring`.
 * La animación depende del estado de la propiedad `isSideBarOpen`.
 *
 * @module animations/FadeIn
 * @param {object} props - Las propiedades que se pasan al componente.
 * @param {React.ReactNode} props.children - Contenido que se renderizará dentro del div animado.
 * @param {string} [props.fadeInClass] - Clase CSS para aplicar al elemento div.
 * @param {boolean} props.isSideBarOpen - Determina si el sidebar está abierto o cerrado.
 * @param {string} props.testid - Identificador único para el atributo `data-testid` del elemento div.
 *
 * @returns {React.ReactElement} Componente `animated.div` con la animación aplicada.
 * @example
 * // Ejemplo simple del componente FadeIn
 * import React, { useState } from 'react';
 * import { FadeIn } from '../animations';
 *
 * const SimpleFadeInExample = () => {
 *   const [isSideBarOpen, setIsSideBarOpen] = useState(false);
 *
 *   return (
 *     <div>
 *       <button onClick={() => setIsSideBarOpen(!isSideBarOpen)}>
 *         Toggle Sidebar
 *       </button>
 *       <FadeIn fadeInClass="sidebar" isSideBarOpen={isSideBarOpen} id="sidebar">
 *         <p>Este es el contenido del sidebar.</p>
 *       </FadeIn>
 *     </div>
 *   );
 * };
 *
 * export default SimpleFadeInExample;
 */
const FadeIn = ({ children, fadeInClass, isSideBarOpen, testid }) => {
  const shadow = '-0.5rem 0.1rem 5.625rem rgb(128, 128, 128)';
  const animationProps = useSpring({
    transform: isSideBarOpen ? 'translateX(0%)' : 'translateX(100%)',
    boxShadow: isSideBarOpen ? shadow : null,

    config: { duration: 300, tension: 170, friction: 26 },
  });
  return (
    <animated.div
      className={fadeInClass}
      style={animationProps}
      data-testid={testid}
      aria-hidden={!isSideBarOpen}
    >
      {children}
    </animated.div>
  );
};

FadeIn.propTypes = {
  fadeInClass: PropTypes.string,
  children: PropTypes.node.isRequired,
  isSideBarOpen: PropTypes.bool.isRequired,
  testid: PropTypes.string.isRequired,
};
export default FadeIn;
