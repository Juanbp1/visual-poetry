import React from 'react';
import { Textarea } from '../../../common';

/**
 * Componente para la versión de escritorio del editor de texto.
 *  @module canvasToolbox/editor/CanvasTextEditor
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.title - El título que se mostrará en el editor de texto.
 * @param {string} props.id - El identificador único del componente.
 * @returns {JSX.Element} El componente `DesktopEditor`.
 */
const DesktopEditor = ({ title, id }) => (
  <>
    <label
      className="toolbox__title"
      htmlFor="textarea"
      data-testid={`${id}Title`}
    >
      {title}
    </label>
    <Textarea id="textarea" />
  </>
);
export default DesktopEditor;
