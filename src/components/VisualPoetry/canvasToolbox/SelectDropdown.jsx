import React from 'react';
import PropTypes from 'prop-types';

/**
 * Componente `SelectDropdown` para renderizar un menú desplegable (select) con opciones.
 *
 * @module canvasToolbox/SelectDropdown
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.id - El identificador único del elemento `<select>`.
 * @param {Function} props.handleChange - La función que se llama cuando se cambia la opción seleccionada.
 * @param {string} props.title - El título del menú desplegable, utilizado para la etiqueta y el atributo `title`.
 * @param {Array<{ value: string, label: string }>} props.options - La lista de opciones a mostrar en el menú desplegable.
 * @param {string} props.defaultValue - El valor por defecto seleccionado en el menú desplegable.
 *
 * @returns {JSX.Element} - Un elemento JSX que representa un menú desplegable con sus opciones.
 * @example
 * import React from 'react';
 * import { SelectDropdown } from '../canvasToolbox'
 *
 * const options = [
 *   { value: 'small', label: 'Small' },
 *   { value: 'medium', label: 'Medium' },
 *   { value: 'large', label: 'Large' },
 * ];
 * const MyComponent = () => (
 *   <SelectDropdown
 *     id="fontSize"
 *     title="Font Size"
 *     options={options}
 *     defaultValue="medium"
 *     handleChange={(e) => console.log(e.target.value)}
 *   />
 * );
 * export default MyComponent;
 */
const SelectDropdown = ({ id, handleChange, title, options, defaultValue }) => {
  return (
    <span className="toolbox__wrapper" title={title} data-testid={id}>
      <label className="toolbox__title" htmlFor={id} data-testid={`${id}Title`}>
        {title}
      </label>
      <span className="toolbox__selectContainer">
        <select
          className="toolbox__input toolbox--boxShadow"
          id={id}
          value={defaultValue}
          onChange={handleChange}
          data-testid={`${id}Options`}
          aria-label={title} 
          aria-labelledby={`${id}Title`}
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </span>
    </span>
  );
};
SelectDropdown.propTypes = {
  id: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default SelectDropdown;
