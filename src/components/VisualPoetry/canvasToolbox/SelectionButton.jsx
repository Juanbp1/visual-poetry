import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Componente auxiliar para representar un botón de selección.
 * @module canvasToolbox/SelectionButton
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} isSelected - Indica si el selector está seleccionado.
 * @param {boolean} isInverted - Indica si el selector es para la selección invertida.
 * @param {Function} onClick - Función a ejecutar al hacer clic en el selector.
 * @param {Function} onKeyDown - Función a ejecutar al presionar una tecla en el selector.
 * @param {string} title - El título que describe la acción del selector.
 * @param {string} id - Identificador único para accesibilidad.
 * @returns {JSX.Element} - Un elemento JSX que representa un botón de selección.
 */
const SelectionButton = ({ isSelected, isInverted, onClick, onKeyDown, title, id }) => {
  const selectorClass = classNames(
    `toolbox__selector`,
    `toolbox__selector--${isInverted ? 'out' : 'inside'}`,
    { 'selected': isSelected }
  );

  const selectorCircleClass = classNames(
    `toolbox__selectorCircle`,
    `toolbox__selectorCircle--${isInverted ? 'out' : 'inside'}`,
    { 'selected': isSelected }

  );

  return (
    <div
      className={selectorClass}
      aria-checked={isSelected}
      role="radio"
      onClick={onClick}
      onKeyDown={onKeyDown}
      title={title}
      tabIndex="0"
      aria-labelledby={id}
    >
      <div className={selectorCircleClass}></div>
    </div>
  );
};
export default SelectionButton;

SelectionButton.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  isInverted: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};