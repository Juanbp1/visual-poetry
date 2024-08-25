import React from 'react';
import Step from './Step';
import { STEPS_DATA } from '../../../constants/stepsData';

/**
 * Componente que renderiza una lista de pasos usando datos predefinidos.
 *
 * @module sections/Steps/Steps
 *
 * @returns {JSX.Element} - El componente Steps con una lista de pasos renderizados.
 * @example
 * // Ejemplo de uso del componente Steps
 * import React from 'react';
 * import Steps from './Steps'; // Asegúrate de ajustar la ruta según la ubicación real del archivo
 *
 * const App = () => {
 *   return (
 *     <div>
 *       <Steps />
 *     </div>
 *   );
 * };
 *
 * export default App;
 */
const Steps = () => {
  return (
    <div className="quickStart__steps ">
      {STEPS_DATA.map((step, index) => (
        <Step key={index} index={index} {...step} />
      ))}
    </div>
  );
};

export default Steps;
