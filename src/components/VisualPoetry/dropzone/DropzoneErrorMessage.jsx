import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { Pulse } from '../animations';

/**
 * Componente que muestra un mensaje de error cuando hay un problema con la carga de una imagen.
 * Utiliza el contexto de la aplicación para acceder al estado de error de carga de imagen.
 *
 * @module dropzone/DropzoneErrorMessage
 * @returns {React.Element} Un elemento que muestra un mensaje de error envuelto en una animación si hay un error.
 * @example
 * // Ejemplo de uso del componente DropzoneErrorMessage
 * import React, { useState } from 'react';
 * import { DropzoneErrorMessage } from '../dropzone';
 * import { useAppContext } from '../../context/AppContext';
 *
 * const DropzoneErrorMessageExample = () => {
 *   const { actions } = useAppContext();
 *   const { updateErrorUploadImageAction } = actions;
 *   const [error, setError] = useState('');
 *
 *   // Simulación de función para establecer un mensaje de error
 *   const simulateError = () => {
 *     setError('Ha ocurrido un error al subir la imagen.');
 *     updateErrorUploadImageAction('Ha ocurrido un error al subir la imagen.');
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={simulateError}>Simular Error</button>
 *       <DropzoneErrorMessage />
 *     </div>
 *   );
 * };
 *
 * export default DropzoneErrorMessageExample;
 */
const DropzoneErrorMessage = () => {
  const { state } = useAppContext();
  return (
    <>
      {state.errorUploadImage && (
        <Pulse>
          <p
            className="dropzone__errorMessage"
            data-testid="dropzone-error"
            role="alert"
            aria-live="assertive"
          >
            {state.errorUploadImage}
          </p>
        </Pulse>
      )}
    </>
  );
};

export default DropzoneErrorMessage;
