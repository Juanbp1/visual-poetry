import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';

/**
 * Este componente crea una animación de pulsación utilizando `react-spring`.
 * La animación hace que el contenido escale hacia arriba y hacia abajo.
 *
 * @module animations/Pulse
 * @param {object} props - Las propiedades que se pasan al componente.
 * @param {React.ReactNode} props.children - Contenido que se renderizará dentro del div animado.
 *
 * @returns {React.ReactElement} Componente `animated.div` con la animación de pulsación aplicada.
 *
 * @example
 * //Ejemplo simple del componente Pulse
 * import React from 'react';
 * import { Pulse } from '../animations';
 *
 * const SimplePulseExample = () => {
 *   return (
 *     <Pulse>
 *       <div>
 *         Error
 *       </div>
 *     </Pulse>
 *   );
 * };
 *
 * export default SimplePulseExample;
 */
const Pulse = ({ children }) => {
  const { scale } = useSpring({
    from: { scale: 1 },
    to: [{ scale: 1.3 }, { scale: 1 }],
    config: { duration: 400 },
    reset: true,
  });

  const transformScale = { transform: scale.to((s) => `scale(${s})`) };

  return <animated.div style={transformScale}>{children}</animated.div>;
};
Pulse.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Pulse;
