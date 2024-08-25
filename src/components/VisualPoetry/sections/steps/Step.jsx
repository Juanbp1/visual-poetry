import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Componente que representa un paso en una guía o tutorial, con una imagen, un ícono, un título y una descripción.
 *
 * @module sections/Steps/Step
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.imgSrc - Ruta de la imagen del paso.
 * @param {React.Element} props.icon - Ícono asociado con el paso.
 * @param {string} props.title - Título del paso.
 * @param {string} props.text - Descripción del paso.
 * @param {number} props.index - Índice del paso para determinar el orden.
 * @param {string} props.alt - Texto alternativo para la imagen.
 *
 * @returns {JSX.Element} - El componente Step.
 * @component
 * @example
 * // Ejemplo de uso del componente Step
 * import React from 'react';
 * import { STEPS_DATA } from '../../../constants/stepsData';
 *
 * const Steps = () => {
 *   return (
 *     <div className="quickStart__steps ">
 *       {STEPS_DATA.map((step, index) => (
 *         <Step key={index} index={index} {...step} />
 *       ))}
 *     </div>
 *   );
 * };
 */
const Step = ({ imgSrc, icon, title, text, index, alt }) => {
    const stepClass = classNames('quickStart__step', {
      'quickStart__step--reverse': index % 2 !== 0,
    });
  
  return (
    <div className={stepClass}>
      <img
        className="quickStart__img"
        src={imgSrc}
        alt={alt}
        data-testid="imageStep"
      />
      <div className="quickStart__stepContent">
        {icon}
        <div className="quickStart__stepWrapper">
          <h3 className="quickStart__stepTitle" data-testid="titleStep">
            {title}
          </h3>
          <p className="quickStart__text" data-testid="textStep">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};
Step.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Step;
