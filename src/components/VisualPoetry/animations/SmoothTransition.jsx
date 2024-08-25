import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';

/**
 * Este componente crea una transición suave para un elemento de preguntas frecuentes (FAQ).
 * Al hacer clic en el botón, el contenido se expande o se contrae con una animación.
 *
 * @module animations/SmoothTransition
 * @param {object} props - Las propiedades que se pasan al componente.
 * @param {string} props.question - La pregunta que se muestra en el botón de resumen.
 * @param {string} props.answer - La respuesta que se muestra en el contenido animado.
 * @param {number} props.index - Índice único para el id del elemento y para las pruebas.
 *
 * @returns {React.ReactElement} Componente con animación de transición suave.
 *
 * @example
 * //Ejemplo simple del componente SmoothTransition
 * import React from 'react';
 * import { SmoothTransition } from '../animations';
 * import { FAQS_DATA } from '../../constants/';
 *
 *  const Faqs = () => (
 *  <div>
 *    {FAQS_DATA.map((faq, index) => (
 *      <SmoothTransition
 *        key={index}
 *        index={index}
 *        question={faq.question}
 *        answer={faq.answer}
 *      />
 *    ))}
 *  </div>
 * );
 *
 * export default Faqs;
 */
const SmoothTransition = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  const animationProps = useSpring({
    from: { padding: '0rem 1.5rem', maxHeight: 0, opacity: 0 },
    to: {
      padding: isOpen ? '1.5rem 1.5rem' : '0rem 1.5rem',
      maxHeight: isOpen ? 200 : 0,
      opacity: isOpen ? 1 : 0,
    },
    config: { duration: 350 },
  });
  const handleToggle = () => setIsOpen(!isOpen);
  const faqIndex = `faqs-content-${index}`;
  const contentId = `content-${index}`;

  return (
    <div
      className="faqs__details"
      open={isOpen}
      aria-expanded={isOpen}
      data-testid="faq"
    >
      <button className="faqs__summary" onClick={handleToggle} id={faqIndex}>
        {question}
        <span className="material-symbols-outlined">expand_more</span>
      </button>
      <animated.p
        className="faqs__detailsContent" 
        style={animationProps}
        id={contentId}
        role="region"
        aria-labelledby={faqIndex}
      > 
        {answer}
      </animated.p>
    </div>
  );
};
SmoothTransition.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
export default SmoothTransition;
