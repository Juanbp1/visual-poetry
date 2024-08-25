import React from 'react';
import woman from '../../../assets/imgs/ui/content/compare-slider/woman.png';
import result from '../../../assets/imgs/ui/content/compare-slider/visual-poetry.png';
import ReactCompareImage from 'react-compare-image';
import Handle from './Handle';

/**
 * Componente `CompareSlider` que renderiza una comparación de imágenes utilizando un control deslizante.
 * 
 * Este componente muestra dos imágenes que se pueden comparar arrastrando un control deslizante
 * sobre ellas. Utiliza el componente `ReactCompareImage` para proporcionar esta funcionalidad.
 * @module compareImageSlider/CompareSlider
 * @returns {JSX.Element} - Un elemento JSX que representa el comparador de imágenes.
 * 
 * @example
 * // Ejemplo de uso del componente CompareSlider
 * import React from 'react';
 * import CompareSlider from '../compareImageSlider';
 *
 * const MyComponent = () => (
 *   <CompareSlider />
 * );
 * 
 * export default MyComponent;
 */
const CompareSlider = () => {
  return (
    <ReactCompareImage
      leftImage={woman}
      leftImageAlt="imagen original de mujer sonriendo"
      rightImage={result}
      rightImageAlt="imagen personalizada de mujer sonriendo "
      handle={<Handle />}
    />
  );
};

export default CompareSlider;
