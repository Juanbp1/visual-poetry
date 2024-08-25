import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { useAppContext } from '../../context/AppContext';
import { ImageList } from './';
import { Button } from '../../common';
import { SideBar } from '../../layout/';
import { useCloseSelector } from '../../../hooks';
import { createImageDataList } from '../../utils';
import { IMAGE_DATA, CONTEXTS } from '../../constants/uiConstants';

/**
 * Componente para mostrar una galería de imágenes y permitir la selección y carga de imágenes.
 *
 * @module imageGallery/ImageGalleryContainer
 * @returns {JSX.Element} - El componente ImageGallery.
 * @example
 * // Ejemplo de uso del componente ImageGalleryContainer en un componente React
 * import React from 'react';
 * import { ImageGalleryContainer } from '../imageGallery';
 *
 * const MyComponent = () => {
 *   return (
 *     <div>
 *       <ImageGalleryContainer />
 *     </div>
 *   );
 * };
 *
 * export default MyComponent;
 *
 *
 */
const ImageGallery = () => {
  const { state, actions } = useAppContext();
  const { updateImageGalleryAction, obtainImageGalleryAction } = actions;
  const { showGallery, imageGallery, image } = state;
  const navigate = useNavigate();

  /**
   * Cierra la galería de imágenes actualizando el estado de `showGallery`.
   * @member module:imageGallery/ImageGalleryContainer
   */
  const handleCloseGallery = () => {
    actions.updateGalleryToggleAction(false);
  };
  const pickerRef = useCloseSelector(handleCloseGallery, showGallery);

  /**
   * Maneja la carga de la imagen seleccionada desde la galería.
   * Carga la imagen seleccionada y actualiza el estado con la imagen seleccionada.
   * @member module:imageGallery/ImageGalleryContainer
   */
  const handleUploadImage = async () => {
    const selectedImage = imageGallery[0].find((image) => image.selected);
    if (selectedImage && selectedImage.path) {
      const response = await fetch(selectedImage.path);
      const blob = await response.blob();
      const file = new File([blob], 'image.jpg', {
        type: 'image/jpg',
      });
      actions.obtainImageSelectedAction(file);
      actions.updateGalleryToggleAction(!showGallery);
    }
  };

  /**
   * Maneja la selección de una imagen desde la galería.
   * Actualiza el estado de la galería con la imagen seleccionada.
   * @member module:imageGallery/ImageGalleryContainer
   * @param {Event} event - El evento de clic que contiene la imagen seleccionada.
   */
  const handleImageSelect = (event) => {
    const id = event.target.getAttribute('data-value');
    updateImageGalleryAction(id);
  };

  useEffect(() => {
    const images = createImageDataList(IMAGE_DATA, CONTEXTS.imagesGallery);
    obtainImageGalleryAction([images]);

    if (image) {
      navigate('/appViewer');
    }
  }, [navigate, image]);

  return (
    <div ref={pickerRef}>
      <SideBar
        handleCloseGallery={handleCloseGallery}
        isSideBarOpen={showGallery}
        classContainer="sidebar__imageGallery"
        classSiderBar=""
        classClose="closeCircle closeCircle--imageGallery"
        dataTestId="gallery-sidebar"
      >
        <ImageList
          imagesList={imageGallery}
          handleImageSelect={handleImageSelect}
          id="image"
        />
        <div className="sidebar__buttonWrapper">
          <Button
            className="button__sidebar button__withIcon"
            name="Subir Imagen"
            text="Subir Imagen"
            handleClick={handleUploadImage}
            Icon={IoCloudUploadOutline}
            title="Subir Imagen para comenzar"
            ariaLabel="Subir Imagen"
            id="buttonSidebar"
          />
        </div>
      </SideBar>
    </div>
  );
};

export default ImageGallery;
