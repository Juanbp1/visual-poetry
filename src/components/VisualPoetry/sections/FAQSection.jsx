import React from 'react';
import { Faqs } from './';

/**
 * Este componente muestra una sección de preguntas frecuentes (FAQs) sobre Visual Poetry.
 *
 * @module sections/FAQSection
 * @example
 * // Ejemplo de uso del componente Faqs
 * import React from 'react';
 * import { FAQSection } from '../sections';
 *
 * const Mycomponent = () => {
 *    return (
 *      <FAQSection />
 *    );
 *  }
 * export default MyComponent;
 */
const FAQSection = () => {
  return (
    <section
      className="sections__faqsContainer faqsContainer"
      id="faqsId"
      data-testid="faqsId"
    >
      <div className="faqsContainer__faqs">
        <div className="faqs__article">
          <h2 className="faqs__title" data-testid="faqsTitle">
            Preguntas Frecuentes
          </h2>
          <p className="faqs__text" data-testid="faqsText">
            Encuentra respuestas a las preguntas más comunes sobre Visual
            Poetry.
          </p>
        </div>
        <div className="faqs__group">
          <Faqs />
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
