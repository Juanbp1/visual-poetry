import React from 'react';
import PropTypes from 'prop-types';
import { DropzoneButtons } from './';
import { TEXT_STRINGS } from '../../constants/uiConstants';

/**
 * Componente que muestra el contenido del área de arrastre (dropzone).
 * Muestra un mensaje diferente dependiendo de si el área está activa para arrastrar archivos.
 * 
 * @module dropzone/DropzoneContent
 * @param {Object} props - Las propiedades del componente.
 * @param {boolean} props.isDragActive - Indica si el área de arrastre está activa.
 * @param {Function} [props.handleUploadClick] - Función que se llama al hacer clic en el botón de carga.
 * 
 * @returns {React.Element} El contenido del área de arrastre.
 * @example
 * // Ejemplo de uso del componente DropzoneContent
 * import React from 'react';
 * import { DropzoneContent } from '../dropzone';
 *
 * const DropzoneContentExample = () => {
 *   const [isDragActive, setIsDragActive] = useState(false);
 * 
 *   // Simulación de función para manejar el clic en el botón de carga
 *   const handleUploadClick = () => {
 *     console.log('Botón de subir imagen clickeado');
 *   };
 * 
 *   return (
 *     <DropzoneContent
 *       isDragActive={isDragActive}
 *       handleUploadClick={handleUploadClick}
 *     />
 *   );
 * };
 *
 * export default DropzoneContentExample;
 */
const DropzoneContent = ({ isDragActive, handleUploadClick }) => {
  const { DROPZONE_ACTIVE, DROPZONE_MESSAGE, DROPZONE_OR } = TEXT_STRINGS;

  const dropzoneText = isDragActive ? DROPZONE_ACTIVE : DROPZONE_MESSAGE;
  return (
    <>
      <p className="dropzone__message" id="dropzone-message">
        {dropzoneText}
      </p>
      <div className="dropzone__messageWrapper">
        <p className="dropzone__message">{DROPZONE_OR}</p>
      </div>
      <div>
        <DropzoneButtons handleUploadClick={handleUploadClick} />
      </div>
    </>
  );
};

DropzoneContent.propTypes = {
  isDragActive: PropTypes.bool.isRequired,
  handleUploadClick: PropTypes.func,
};
export default DropzoneContent;
