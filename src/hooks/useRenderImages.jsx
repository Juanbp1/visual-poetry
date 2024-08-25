import React from 'react';
import { Images } from '../components/VisualPoetry/imageGallery';

/**
 * Hook personalizado para renderizar una lista de imágenes.
 *  @module hooks/useRenderImages
 * @param {Array} images - Lista de imágenes a renderizar.
 * @param {Function} handleImageSelect - Función para manejar la selección de imágenes.
 * @param {string} classNameWrapper - Clase CSS para el contenedor de la imagen.
 * @param {string} classNameImg - Clase CSS para la imagen.
 * @param {string} id - ID para el componente de imagen.
 * @returns {Function} - Función para renderizar las imágenes.
 * @example
 * // Ejemplo de uso del hook useRenderImages
 * import React, { useState } from 'react';
 * import useRenderImages from './hooks/useRenderImages';
 * import { Images } from '../components/VisualPoetry/imageGallery';
 * 
 * const ImageGallery = () => {
 *   const [selectedImage, setSelectedImage] = useState(null);
 * 
 *   const handleImageSelect = (image) => {
 *     setSelectedImage(image);
 *   };
 * 
 *   // Lista de imágenes de ejemplo
 *   const images = [
 *     'url1.jpg',
 *     'url2.jpg',
 *     'url3.jpg',
 *     // Añadir más URLs de imágenes aquí
 *   ];
 * 
 *   // Utilizar el hook personalizado
 *   const renderImages = useRenderImages(
 *     images,
 *     handleImageSelect,
 *     'image-wrapper', // Clase para el contenedor de la imagen
 *     'image',         // Clase para la imagen
 *     'image-id'       // ID para el componente de imagen
 *   );
 *  const MAX_IMAGES_TO_SHOW = 4;
 * 
 *   return (
 *     <div>
 *       <h1>Galería de Imágenes</h1>
 *       {renderImages(MAX_IMAGES_TO_SHOW)} 
 *       {selectedImage && <p>Imagen seleccionada: {selectedImage}</p>}
 *     </div>
 *   );
 * };
 * 
 * export default ImageGallery;
 * 
 */
const useRenderImages = (
  images,
  handleImageSelect,
  classNameWrapper,
  classNameImg,
  id
) => {
  const imageCount = !!images.length;

  /**
   * Función para renderizar las imágenes.
   * @member module:hooks/useRenderImages
   * @param {number} count - Número de imágenes a mostrar.
   * @returns {React.Element} - Elemento JSX que renderiza las imágenes.
   */
  const renderImages = (displayedImages) => {
    return imageCount > 0 ? (
      images
        .slice(0, displayedImages)
        .map((img, index) => (
          <Images
            key={index}
            img={img}
            handleImageSelect={handleImageSelect}
            classNameWrapper={classNameWrapper}
            classNameImg={classNameImg}
            id={id}
          />
        ))
    ) : (
      <p>Cargando ...</p>
    );
  };
  return renderImages;
};

export default useRenderImages;
