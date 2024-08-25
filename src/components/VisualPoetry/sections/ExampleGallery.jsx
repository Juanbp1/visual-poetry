import React, { useEffect, useState } from 'react';
import {
  IMAGE_GALLERY_EXAMPLE_DATA,
  CONTEXTS,
} from '../../constants/uiConstants';
import { ImageList } from '../imageGallery';
import { createImageDataList, scrollToSection } from '../../utils';
import { Button } from '../../common';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';

/**
 * Este componente carga una lista de imágenes de ejemplo utilizando `createImageDataList` y las muestra en una cuadrícula.
 *
 * @module sections/ExampleGallery
 * @example
 * // Ejemplo de uso del componente ExampleGallery
 * import React from 'react';
 * import { ExampleGallery } from '../sections';
 *
 * const Mycomponent = () => {
 *    return (
 *      <ExampleGallery />
 *    );
 *  }
 * export default MyComponent;
 */
const ExampleGallery = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const images = createImageDataList(
      IMAGE_GALLERY_EXAMPLE_DATA,
      CONTEXTS.imagesGalleryExample
    );
    setImages([images]);
  }, []);
  return (
    <section
      className="sections__exampleGalleryContainer exampleGalleryContainer"
      id="exampleGalleryId"
      data-testid="exampleGalleryId"
    >
      <div className="exampleGalleryContainer__exampleGallery exampleGallery">
        <div className="exampleGallery__article">
          <h2
            className="exampleGallery__title"
            data-testid="exampleGalleryTitle"
          >
            Inspírese con Diseños Creativos
          </h2>
          <p className="exampleGallery__text" data-testid="exampleGalleryText">
            Explore una galería de diseños creados con Visual Poetry para
            obtener ideas y descubrir su potencial
          </p>
        </div>
        <div className="exampleGallery__grid">
          <ImageList
            imagesList={images}
            classNameWrapper="exampleGallery__item"
            classNameImg="exampleGallery__img"
            id="exampleImage"
          />
        </div>
        <Button
          className="button__exampleGallery button__withIcon"
          name="Comenzar a crear"
          text="Comenzar a crear"
          Icon={BsFillArrowUpCircleFill}
          iconClassName="button__frontepageArrowIcon"
          handleClick={() => scrollToSection('dropzoneId')}
          title="Comenzar a crear"
          ariaLabel="Comenzar a crear"
          id="exampleGalleryButton"
        />
      </div>
    </section>
  );
};

export default ExampleGallery;
