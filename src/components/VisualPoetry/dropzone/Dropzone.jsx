import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDropzone } from 'react-dropzone';
import { useAppContext } from '../../context/AppContext';
import { ResponsiveComponent } from '../../common';
import { DropzoneButtons, DropzoneContent } from './';
import { VALIDATION_MESSAGES, DEVICE_TYPES } from '../../constants/uiConstants';
const { MOBILE, TABLET, LAPTOP } = DEVICE_TYPES;

/**
 * Componente que maneja la zona de arrastre y carga de imágenes.
 * Permite a los usuarios arrastrar y soltar imágenes o seleccionar imágenes desde el cuadro de diálogo.
 *
 * @module dropzone/Dropzone
 * @param {Object} props - Las propiedades del componente.
 * @param {string} [props.imageData] - Data de la imagen para simular una carga al inicializar el componente.
 *
 * @returns {JSX.Element} - El componente Dropzone.
 *
 * @example
 * // Ejemplo de uso del componente DropzoneContent
 * import React from 'react';
 * import DropzoneContent from './DropzoneContent';
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
const Dropzone = ({ imageData }) => {
  const { actions } = useAppContext();
  const { obtainImageAction, updateErrorUploadImageAction } = actions;

  /**
   * Maneja la carga de archivos cuando se arrastran y sueltan en la zona de arrastre.
   * Valida si el archivo es una imagen y llama a las acciones correspondientes.
   *
   * @member module:Dropzone/Dropzone
   * @param {File[]} acceptedFiles - Array de archivos aceptados por la zona de arrastre.
   */
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const fileType = file.type.toString();
        if (fileType.includes('image/')) {
          const reader = new FileReader();
          reader.onload = () => {
            const dataUrl = reader.result;
            obtainImageAction(dataUrl);
            updateErrorUploadImageAction('');
          };
          reader.readAsDataURL(file);
        } else {
          const errorMessage = VALIDATION_MESSAGES.DROPZONE_ERROR;
          updateErrorUploadImageAction(errorMessage);
        }
      });
    },
    [obtainImageAction, updateErrorUploadImageAction]
  );

  /**
   * Simula la carga de una imagen utilizando la URL proporcionada en las propiedades.
   * Se activa cuando cambia la URL de la imagen.
   *
   * @member module:Dropzone/Dropzone
   */
  const initializeImageUpload = useCallback(() => {
    if (imageData) {
      onDrop([imageData]);
    }
  }, [imageData, onDrop]);

  useEffect(() => {
    initializeImageUpload();
  }, [imageData, initializeImageUpload]);

  const fileInputRef = useRef(null);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  /**
   * Abre el cuadro de diálogo de selección de archivos.
   * @member module:Dropzone/Dropzone
   */
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  /**
   * Evita la propagación del evento de arrastre hacia los botones dentro de la zona de arrastre.
   * @member module:Dropzone/Dropzone
   * @param {Event} event - El evento del clic.
   */
  const handleRootClick = (event) => {
    const buttonElement = event.target.closest('button');
    if (buttonElement) {
      event.stopPropagation();
    }
  };
  // const dragActive = `dropzone ${isDragActive && 'active'}`;
  const dragActive = classNames('dropzone', {
    active: isDragActive,
  });
  return (
    <>
      <div
        className="dropzone__container"
        title="Arrastra y suelta una imagen PNG, JPG o WEBP"
        aria-label="Zona de arrastre para archivos"
      >
        <div className="dropzone__Wrapper">
          <div
            {...getRootProps({
              className: dragActive,
              onClick: handleRootClick,
            })}
          >
            <input
              {...getInputProps()}
              ref={fileInputRef}
              data-testid="dropzone"
            />
            <ResponsiveComponent
              visibleOnDeviceTypes={[TABLET, MOBILE]}
              componentToRender={
                <DropzoneButtons handleUploadClick={handleUploadClick} />
              }
            />
            <ResponsiveComponent
              visibleOnDeviceTypes={LAPTOP}
              componentToRender={
                <DropzoneContent
                  isDragActive={isDragActive}
                  handleUploadClick={handleUploadClick}
                />
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};
Dropzone.propTypes = {
  imageData: PropTypes.shape({
    path: PropTypes.string,
    name: PropTypes.string,
    selected: PropTypes.bool,
    id: PropTypes.string,
  }),
};
export default Dropzone;
