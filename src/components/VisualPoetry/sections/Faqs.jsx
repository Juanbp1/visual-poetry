import React from 'react';
import { SmoothTransition } from '../animations';
import FAQS_DATA from '../../constants/faqsData';

/**
 * Componente Faqs
 *
 * Este componente renderiza una lista de preguntas frecuentes (FAQs) usando el componente 
 * `SmoothTransition` para aplicar transiciones suaves entre cada pregunta y su respuesta.
 *
 * @module sections/Faqs
 * @example
 * return (
 *   <Faqs />
 * )
 *
 * @returns {JSX.Element} Un componente React que muestra una lista de FAQs.
 */
const Faqs = () => {
  return (
    <>
      {FAQS_DATA.map((faq, index) => (
        <SmoothTransition
          key={index}
          index={index}
          question={faq.question}
          answer={faq.answer}
        />
      ))}
    </>
  );
};

export default Faqs;
