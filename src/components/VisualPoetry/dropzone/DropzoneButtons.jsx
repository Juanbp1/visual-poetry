import React from 'react';
import PropTypes from 'prop-types';
import { GrGallery } from 'react-icons/gr';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useAppContext } from '../../context/AppContext';
import { Button } from '../../common';

/**
 * Componente que renderiza los botones para elegir una imagen desde la galería o subir una imagen desde el dispositivo.
 * Los botones tienen iconos y acciones asociadas para interactuar con la galería y el sistema de archivos.
 *
 * @module dropzone/DropzoneButtons
 * @param {Object} props - Las propiedades del componente.
 * @param {Function} props.handleUploadClick - Función que se llama cuando se hace clic en el botón de subir imagen.
 * @returns {JSX.Element} - El componente DropzoneButtons.
 *
 * @example
 * // Ejemplo de uso
 * import React from 'react';
 * import { DropzoneButtons } from '../dropzone';
 *
 * const handleUploadClick = () => {
 *   console.log('Botón de subir imagen clickeado');
 * };
 *
 * const MyComponent = () => (
 *   <DropzoneButtons handleUploadClick={handleUploadClick} />
 * );
 *
 * export default MyComponent;
 */
const DropzoneButtons = ({ handleUploadClick = () => {} }) => {
  const { state, actions } = useAppContext();

  /**
   * Maneja la apertura de la galería, alternando el estado de visibilidad de la galería.
   * @member module:dropzone/DropzoneButtons
   */
  const handleOpenGallery = () => {
    actions.updateGalleryToggleAction(!state.showGallery);
  };
  return (
    <div className="button__wrapper">
      <Button
        handleClick={handleOpenGallery}
        className="button__dropzoneGallery button__withIcon"
        name="Elegir de la Galería"
        text="Elegir de la Galería"
        Icon={GrGallery}
        title="Explora y selecciona una imagen de la galería"
        ariaLabel="Elegir de la Galería"
      />
      <Button
        handleClick={handleUploadClick}
        className="button__dropzoneImage button__withIcon"
        name="Subir Imagen"
        text="Subir Imagen"
        Icon={IoCloudUploadOutline}
        title="Sube una imagen directamente desde tu dispositivo"
        ariaLabel="Subir Imagen"
      />
    </div>
  );
};

DropzoneButtons.propTypes = {
  handleUploadClick: PropTypes.func.isRequired,
};
export default DropzoneButtons;
