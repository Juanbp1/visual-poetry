import React from 'react';

import { IoCloudUploadOutline } from 'react-icons/io5';
import { Button, Textarea } from '../../../common';
import { SideBar } from '../../../layout';

/**
 * Componente para la versión móvil del editor de texto.
 * @module canvasToolbox/editor/CanvasTextEditor
 * @param {Object} props - Las propiedades del componente.
 * @param {boolean} props.isGalleryOpen - Indica si la galería está abierta.
 * @param {Function} props.handleOpenGallery - Función para abrir o cerrar la galería.
 * @param {Function} props.handleCloseGallery - Función para cerrar la galería.
 * @returns {JSX.Element} El componente `MobileEditor`.
 */
const MobileEditor = ({
  isGalleryOpen,
  handleOpenGallery,
  handleCloseGallery,
}) => (
  <div>
    <SideBar
      handleCloseGallery={handleCloseGallery}
      isSideBarOpen={isGalleryOpen}
      classContainer="sidebar__textarea"
      dataTestId="textareaSidebar"
      classClose="closeCircle closeCircle--imageGallery"
    >
      <Textarea id="textarea" />
    </SideBar>
    <Button
      className="button__textarea button__withIcon"
      name="Editar Texto"
      text="Editar Texto"
      handleClick={handleOpenGallery}
      Icon={IoCloudUploadOutline}
      title="Editar texto del canvas"
      ariaLabel="Editar texto"
    />
  </div>
);

export default MobileEditor;
