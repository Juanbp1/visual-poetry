import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Componente que muestra una imagen con opciones para selección y clases personalizadas.
 *
 * @module imageGallery/Images
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.img - Objeto que representa la imagen.
 * @param {string} props.img.path - Ruta de la imagen.
 * @param {string} props.img.name - Nombre de la imagen.
 * @param {string} props.img.id - Identificador único de la imagen.
 * @param {boolean} props.img.selected - Estado de selección de la imagen.
 * @param {string} [props.classNameWrapper] - Clase CSS para el contenedor de la imagen.
 * @param {string} [props.classNameImg] - Clase CSS para la imagen.
 * @param {Function} [props.handleImageSelect] - Función que se llama al seleccionar la imagen.
 * @param {string} props.id - Identificador del componente.
 *
 * @returns {JSX.Element} - El componente Images.
 * @example
  * // Ejemplo de uso del componente Images en un componente React
 * import React from 'react';
 * import { Images } from '../imageGallery';
 *
 * const handleImageSelect = (event) => {
 *   const selectedImageId = event.target.getAttribute('data-value');
 *   console.log('Imagen seleccionada:', selectedImageId);
 * };
 *
 * const App = () => (
 *   <div>
 *     <h1>Galería de Imágenes</h1>
 *     <Images
 *       img={{ path: 'https://example.com/image.jpg', name: 'Image Name', id: 'unique-id', selected: false }}
 *       handleImageSelect={handleImageSelect}
 *       classNameWrapper="customWrapperClass"
 *       classNameImg="customImgClass"
 *       id="imageId"
 *     />
 *   </div>
 * );
 *
 * export default App;
 *
 */
const Images = ({
  img,
  handleImageSelect,
  classNameWrapper,
  classNameImg,
  id,
}) => {
  // const imageWrapperClass = `sidebar__imgWrapper ${
  //   img.selected ? 'sidebar__imgWrapper--selected' : ''
  // }`;
  // const imageElementClass = `sidebar__img ${
  //   img.selected ? 'sidebar__img--selected' : ''
  // }`;
  // const wrapperClass = classNameWrapper ? classNameWrapper : imageWrapperClass;
  // const imageClass = classNameImg ? classNameImg : imageElementClass;
  const wrapperClass = classNames(
    'sidebar__imgWrapper',
    {
      'sidebar__imgWrapper--selected': img.selected,
    },
    classNameWrapper
  );

  const imageClass = classNames(
    'sidebar__img',
    {
      'sidebar__img--selected': img.selected,
    },
    classNameImg
  );

  return (
    <span className={wrapperClass}>
      <img
        className={imageClass}
        src={`${img.path}`}
        alt={`${img.name}`}
        data-value={img.id}
        onClick={handleImageSelect}
        data-testid={id}
      />
    </span>
  );
};
Images.propTypes = {
  img: PropTypes.shape({
    path: PropTypes.string,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
  }).isRequired,
  classNameWrapper: PropTypes.string,
  classNameImg: PropTypes.string,
  handleImageSelect: PropTypes.func,
  id: PropTypes.string.isRequired,
};

export default Images;
