import React from 'react';
import { FaCheck } from 'react-icons/fa6';

/**
 * Componente que muestra una lista de puntos clave con íconos de verificación.
 *
 * @module sections/Checks
 * @returns {JSX.Element} - El componente Checks con una lista de elementos.
 * @example
 * // Ejemplo de uso del componente Checks
 * import React from 'react';
 * import Checks from './Checks'; // Asegúrate de ajustar la ruta según la ubicación real del archivo
 * 
 * const Mycomponent = () => {
 *   return (
 *     <div>
 *       <Checks />
 *     </div>
 *   );
 * };
 * 
 * export default Mycomponent;
 */
const Checks = () => {
  const checks = [
    { text: 'Disfruta de todas las funciones gratis' },
    { text: 'Diseño intuitivo y sencillo' },
    { text: 'Crea sin registrarte' },
  ];
  return (
    <div role='list' aria-label="Puntos clave">
      {checks.map((check, index) => (
        <div key={index} className="keyPoints__wrapper" role="listitem" aria-label={`Punto clave ${index+1}`}>
          <FaCheck className="keyPoints__icon" />
          <p className="keyPoints__text">{check.text}</p>
        </div>
      ))}
    </div>
  );
};

export default Checks;
