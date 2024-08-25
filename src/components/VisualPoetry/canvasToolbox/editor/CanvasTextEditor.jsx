import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '../../../context/AppContext';
import { useGenerateTextLoremIpsum } from '../../../../hooks';
import { DEVICE_TYPES } from '../../../constants/uiConstants';
import { ResponsiveComponent } from '../../../common';
import DesktopEditor from './DesktopEditor';
import MobileEditor from './MobileEditor';

/**
 * Componente para editar texto en un lienzo.
 * Este componente permite a los usuarios editar texto en un lienzo, mostrando un área de texto y una barra lateral según el tipo de dispositivo.
 * En dispositivos móviles, se muestra un botón para abrir la galería de edición de texto.
 *
 *@module canvasToolbox/editor/CanvasTextEditor
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.title - El título que se mostrará en el editor de texto.
 * @param {string} props.id - El identificador único del componente.
 * @returns {JSX.Element} El componente `CanvasTextEditor`.
 * @example
 * import React from 'react';
 * import { CanvasTextEditor } from '../canvasToolbox'
 *
 * const title = "Título del Editor";
 * const id = "editor1";
 *
 * const MyComponent = () => (
 *    <CanvasTextEditor title={title} id={id} />
 * );
 * export default MyComponent;
 */
const CanvasTextEditor = ({ title, id }) => {
  const { state, actions } = useAppContext();
  const { canvasSize } = state;
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { updateInputDataAction } = actions;
  const { MOBILE, TABLET, LAPTOP } = DEVICE_TYPES;

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
  };

  /**
   * Establece el estado de la galería como cerrado.
   * @member module:canvasToolbox/CanvasTextEditor
   */
  const handleOpenGallery = () => {
    setIsGalleryOpen(!isGalleryOpen);
  };

  /**
   * Alterna el estado de la galería entre abierto y cerrado.
   * @member module:canvasToolbox/CanvasTextEditor
   */
  const generateText = useGenerateTextLoremIpsum();

  useEffect(() => {
    const newText = generateText();
    updateInputDataAction(state.inputData + newText);
  }, [canvasSize, updateInputDataAction]);
  return (
    <div className="toolbox__wrapper toolbox__form" data-testid={id}>
      <ResponsiveComponent
        visibleOnDeviceTypes={[TABLET, LAPTOP]}
        componentToRender={<DesktopEditor title={title} id={id} />}
      />
      <ResponsiveComponent
        visibleOnDeviceTypes={[MOBILE]}
        componentToRender={
          <MobileEditor
            isGalleryOpen={isGalleryOpen}
            handleOpenGallery={handleOpenGallery}
            handleCloseGallery={handleCloseGallery}
          />
        }
      />
    </div>
  );
};
export default CanvasTextEditor;
CanvasTextEditor.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
