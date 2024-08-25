import React from 'react';
import { ReactCompareSlider } from 'react-compare-slider';
import { ImageGalleryContainer } from '../imageGallery';
import { PiArrowFatLineRightFill } from 'react-icons/pi';
import CompareSlider from '../compareImageSlider/CompareSlider';
import { Dropzone, DropzoneErrorMessage } from '../dropzone';
import { useAppContext } from '../../context/AppContext';

/**
 * Este componente maneja la carga de imágenes y las características de comparación. Permite a los usuarios subir una imagen, ver una comparación entre la imagen original y la editada, y visualizar una galería de imágenes.
 *
 * @module sections/DropzoneContainer
 * @example
 * // Ejemplo de uso del componente DropzoneContainer
 * import React from 'react';
 * import { DropzoneContainer } from '../sections'
 *
 * const MyComponent = () => {
 *    return (
 *      <DropzoneContainer />
 *    );
 * };
 * export default MyComponent;
 */
const DropzoneContainer = () => {
  const { state } = useAppContext();
  return (
    <section
      className="sections__dropzoneContainer dropzoneContainer"
      id="dropzoneId"
      data-testid="dropzoneId"
    >
      <div className="dropzoneContainer__dropzoneElement dropzoneElement">
        <div className="dropzoneElement__article">
          <h2 className="dropzoneElement__title" data-testid="dropzoneTitle">
            Transforma tus imágenes en arte textual
          </h2>
          <p className="dropzoneElement__text" data-testid="dropzoneText">
            Sube una imagen y conviértela en una obra de arte única con nuestro
            editor de texto en lienzo.
          </p>
        </div>
        <DropzoneErrorMessage />
        <div className="dropzoneElement__wrapper">
          <div className="dropzoneElement__compareImageContainer">
            <div className="dropzoneElement__compareImage">
              <CompareSlider ReactCompareSlider={ReactCompareSlider} />
            </div>
            <p className="dropzoneElement__compareImageText">
              Imagen original (izquierda) Resultado final (derecha)
            </p>
          </div>
          <PiArrowFatLineRightFill
            className="dropzoneElement__arrowIcon"
            aria-hidden="true"
          />
          <Dropzone imageData={state.imageSelected} />
          <ImageGalleryContainer />
        </div>
      </div>
    </section>
  );
};
export default DropzoneContainer;
