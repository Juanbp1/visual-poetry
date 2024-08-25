import React from 'react';
import Steps from './steps/Steps';

/**
 * Componente de Inicio Rápido que proporciona una guía rápida para comenzar.
 *
 * @module sections/QuickStart
 * @example
 * // Ejemplo de uso del componente QuickStart
 * import React from 'react';
 * import { QuickStart } from '../sections';
 * 
 * const Mycomponent = () => {
 *    return (
 *      <QuickStart />
 *    );
 *  }
 * export default MyComponent;
 */ 
const QuickStart = () => {
  return (
    <section
      className="sections__quickStartContainer quickStartContainer"
      id="quickStartId"
      data-testid="quickStartId"
    >
      <div className="quickStartContainer__quickStart quickStart">
        <h2 className="quickStart__title" data-testid="quickStartTitle">
          Inicio Rápido
        </h2>
        <Steps />
      </div>
    </section>
  );
};

export default QuickStart;
