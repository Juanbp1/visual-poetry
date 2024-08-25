import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DEVICE_TYPES } from '../../constants/uiConstants';
import { useRenderImages } from '../../../hooks';
import { Button, ResponsiveComponent } from '../../common';

const { MOBILE, TABLET, LAPTOP } = DEVICE_TYPES;

/**
 * Componente que muestra una lista de imágene. Adaptandose a distintos tipo de dispositivos.
 *
 * @module imageGallery/ImageList
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {Array} props.imagesList - Lista de imágenes a mostrar.
 * @param {Function} props.handleImageSelect - Función que se llama cuando se selecciona una imagen.
 * @param {string} [props.classNameWrapper] - Clase CSS para el contenedor de imágenes.
 * @param {string} [props.classNameImg] - Clase CSS para las imágenes.
 * @param {string} [props.id] - Identificador del componente.
 *
 * @returns {JSX.Element} - El componente ImageList.
 * @example
 * // Ejemplo de uso del componente ImagesList en un componente React
 * import React from 'react';
 * import { ImageList } from '../imageGallery';
 *
 * const imagesArray = [
 *   { id: '1', src: 'https://example.com/image1.jpg', alt: 'Descripción de la imagen 1' },
 *   { id: '2', src: 'https://example.com/image2.jpg', alt: 'Descripción de la imagen 2' },
 *   { id: '3', src: 'https://example.com/image3.jpg', alt: 'Descripción de la imagen 3' },
 * ];
 *
 * const handleImageSelect = (id) => {
 *   console.log('Imagen seleccionada:', id);
 * };
 *
 * const MyComponent = () => (
 *   <div>
 *     <h1>Galería de Imágenes</h1>
 *     <ImageList
 *       imagesList={[imagesArray]}
 *       handleImageSelect={handleImageSelect}
 *       classNameWrapper="imageWrapperClass"
 *       classNameImg="imageClass"
 *       id="imageId"
 *     />
 *   </div>
 * );
 *
 * export default MyComponent;
 *
 */
const ImageList = ({
  imagesList,
  handleImageSelect,
  classNameWrapper,
  classNameImg,
  id,
}) => {
  const [showMore, setShowMore] = useState(false);
  const handleShowMore = () => setShowMore(!showMore);

  const images = imagesList?.[0] || [];

  const MIN_IMAGES_TO_SHOW = 4;
  const MAX_IMAGES_TO_SHOW = images.length;
  const imagesToShow = showMore ? MAX_IMAGES_TO_SHOW : MIN_IMAGES_TO_SHOW;

  const renderedImages = useRenderImages(
    images,
    handleImageSelect,
    classNameWrapper,
    classNameImg,
    id
  );
  const text = showMore ? 'Ocultar imágenes' : 'Ver más imágenes';
  return (
    <>
      <ResponsiveComponent
        visibleOnDeviceTypes={[LAPTOP, TABLET, MOBILE]}
        componentToRender={
          classNameWrapper !== 'exampleGallery__item' &&
          renderedImages(MAX_IMAGES_TO_SHOW)
        }
      />
      <ResponsiveComponent
        visibleOnDeviceTypes={[LAPTOP, TABLET]}
        componentToRender={
          classNameWrapper === 'exampleGallery__item' &&
          renderedImages(MAX_IMAGES_TO_SHOW)
        }
      />
      <ResponsiveComponent
        visibleOnDeviceTypes={[MOBILE]}
        componentToRender={
          <>
            <>
              {classNameWrapper === 'exampleGallery__item' &&
                renderedImages(imagesToShow)}
            </>
            {images && classNameWrapper === 'exampleGallery__item' && (
              <div className="exampleGallery__item--button">
                <Button
                  className="button__exampleGallery"
                  name={text}
                  text={text}
                  handleClick={handleShowMore}
                  title={text}
                  ariaLabel={text}
                />
              </div>
            )}
          </>
        }
      />
    </>
  );
};
ImageList.propTypes = {
  imagesList: PropTypes.array.isRequired,
  classNameWrapper: PropTypes.string,
  classNameImg: PropTypes.string,
  handleImageSelect: PropTypes.func,
};

export default ImageList;
