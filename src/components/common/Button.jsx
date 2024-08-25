import React from 'react';
import PropTypes from 'prop-types';

/**
 * Botón reutilizable con soporte para íconos.
 *
 * @module common/Button
 * @param {Object} props - Propiedades del componente.
 * @param {Function} props.handleClick - Función que se ejecuta al hacer clic en el botón.
 * @param {string} props.ariaLabel - Etiqueta aria para accesibilidad.
 * @param {string} [props.className] - Clase CSS para el botón.
 * @param {string} [props.name] -  Texto que se muestra en el botón.
 * @param {string} [props.text] - Texto del botón.
 * @param {React.ElementType} [props.Icon] -  Un componente React que se renderiza como un ícono.
 * @param {string} [props.iconClassName] - Clase CSS para el ícono.
 * @param {string} [props.title] - Título del botón (tooltip) que aparece al pasar el ratón sobre el botón.
 * @param {string} [props.id] - Un identificador único para el botón.
 *
 * @returns {JSX.Element} Componente de botón.
 *
 * @example
 * // Ejemplo de uso del componente Button
 * import React from 'react';
 * import { FaCoffee } from 'react-icons/fa';
 * import { Button } from '../common'
 *
 * const handleClick = () => {
 *   alert('Botón clicado');
 * }
 *
 * const MyComponent = () => {
 *   return(
 *     <Button
 *      className="btn-primary"
 *      handleClick={handleClick}
 *      title="Botón con ícono"
 *      text="Click me"
 *      Icon={FaCoffee}
 *      iconClassName="icon-class"
 *      ariaLabel="Botón de ejemplo"
 *      id="example-button"
 *      />
 *   };
 * );
 * export default MyComponent;
 */
const Button = ({
  className,
  name,
  text,
  handleClick,
  Icon,
  iconClassName,
  title,
  ariaLabel,
  id,
}) => {
  return (
    <button
      className={className}
      onClick={handleClick}
      title={title}
      name={name}
      aria-label={ariaLabel}
      data-testid={id}
      type="button"
    >
      {Icon && <Icon className={iconClassName} />}
      {text}
    </button>
  );
};
Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  className: PropTypes.string,
  iconClassName: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string,
  Icon: PropTypes.elementType,
  title: PropTypes.string,
  id: PropTypes.string,
};
export default Button;
