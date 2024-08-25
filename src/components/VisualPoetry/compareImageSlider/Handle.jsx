import React, { useRef } from 'react';

/**
 * Componente `Handle` que representa el control deslizante en el comparador de imágenes.
 *
 * Este componente renderiza el "mango" que se usa para arrastrar y comparar dos imágenes en el componente
 * `ReactCompareImage`. Está diseñado para ser accesible y tiene un rol de botón.
 *
 * @module compareImageSlider/Handle
 * @returns {JSX.Element} - Un elemento JSX que representa el mango del control deslizante.
 *
 * @example
 * // Ejemplo de uso del componente Handle
 * import React from 'react';
 * import ReactCompareImage '../compareImageSlider'
 * import Handle from '../compareImageSlider';
 *
 * const CompareSlider = () => {
 *   return (
 *     <ReactCompareImage
 *       leftImage={woman}
 *       leftImageAlt="imagen original de mujer sonriendo"
 *       rightImage={visualPoetry}
 *       rightImageAlt="imagen personalizada de mujer sonriendo "
 *       handle={<Handle />}
 *     />
 *   );
 * };
 * 
 * export default CompareSlider;
 */
const Handle = () => {
  const handleRef = useRef(null);

  return (
    <div
      className="compareImage__handle"
      ref={handleRef}
      tabIndex={0}
      role="button"
      aria-label="Control deslizante"
      data-testid="handle"
    >
      <div className="compareImage__triangle compareImage__triangle--left"></div>
      <div className="compareImage__triangle compareImage__triangle--right"></div>
    </div>
  );
};

export default Handle;
