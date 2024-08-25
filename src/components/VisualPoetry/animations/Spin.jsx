import React from 'react';
import { useSpring, animated } from 'react-spring';

/**
 * Este componente muestra un elemento con una animación de rotación continua utilizando `react-spring`.
 * El elemento gira indefinidamente con un efecto de rotación suave.
 * @module animations/Spin
 * @returns {React.ReactElement} Componente `animated.div` con la animación de rotación aplicada.
 *
 * @example
 * //Ejemplo simple del componente Spin
 * import React from 'react';
 * import { Spin } from '../animations';
 *
 * const SimpleSpinExample = () => {
 * return (
 *   <div>
 *     <Spin />
 *   </div>
 *  );
 *}
 *
 * export default SimpleSpinExample;
 */
const Spin = () => {
  const { rotate } = useSpring({
    from: { rotate: 0 },
    to: { rotate: 360 },
    config: { duration: 1300 },
    loop: true,
  });
  const transformRotate = {
    transform: rotate.to((r) => `rotate(${r}deg)`),
  };

  return (
    <div className="loading__container" data-testid="spinAnimation">
      <animated.div
        style={transformRotate}
        className="loading loading__element"
        data-testid="animatedElement"
        aria-label="cargando..." 
      ></animated.div>
    </div>
  );
};

export default Spin;
