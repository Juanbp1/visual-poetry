import React from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '../../context/AppContext';

/**
 * Componente `Slider` que renderiza un control deslizante (input tipo "range") para ajustar un umbral de figura.
 *
 * @module canvasToolbox/Slider
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.id - El identificador único del elemento input.
 * @param {string} props.title - El título del control deslizante, mostrado en la etiqueta.
 *
 * @returns {JSX.Element} - Un elemento JSX que representa un control deslizante con su etiqueta.
 *
 * @example
 * // Ejemplo de uso del componente Slider
 * import React from 'react';
 * import { Slider } from '../canvasToolbox';
 *
 * const MyComponent = () => (
 *   <Slider
 *     id="figureThresholdSlider"
 *     title="Umbral de Figura"
 *   />
 * );
 * export default MyComponent;
 */
const Slider = ({ id, title }) => {
  const { state, actions } = useAppContext();
  const { figureThreshold } = state;

  const handleRangeFigureThreshold = (event) => {
    const newRange = Number(event.target.value);
    actions.updateFigureThresholdAction(newRange);
  };

  const MIN_VALUE = 42.5;
  const MAX_VALUE = 212.5;
  return (
    <span className="toolbox__wrapper slider" title={title}>
      <label className="toolbox__title" data-testid={`${id}Title`} htmlFor={id}>
        {title} ({figureThreshold})
      </label>
      <input
        className="slider__input"
        id={id}
        type="range"
        min={MIN_VALUE}
        max={MAX_VALUE}
        value={figureThreshold}
        onChange={handleRangeFigureThreshold}
        aria-label={`${title} slider`}
        aria-valuemin={MIN_VALUE}
        aria-valuemax={MAX_VALUE}
        aria-valuenow={figureThreshold}
        data-testid={id}
      />
    </span>
  );
};

Slider.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
export default Slider;
