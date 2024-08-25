import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '../../common';
/**
 * Renderiza un conjunto de botones para exportar una imagen en diferentes formatos.
 *
 * @module canvasToolbox/CanvasDownloader
 * @param {Object} props - Las propiedades del componente.
 * @param {Function} props.captureCanvas - Función que se llama cuando se hace clic en un botón, pasando el formato como argumento.
 * @returns {JSX.Element} - Un conjunto de botones que permiten exportar una imagen en los formatos especificados.
 * @example
 * const captureCanvas = (format) => {
 *   console.log(`Capturando canvas en formato: ${format}`);
 * };
 * const MyComponent = () =>{
 *   return (
 *     <RenderFormatButtons captureCanvas={captureCanvas} />
 *   );
 * }
 *
 */
const RenderFormatButtons = ({ captureCanvas }) => {
  const formats = ['png', 'jpg', 'webp'];
  
  const getButtonClassName = (format) =>
    classNames('button__toolboxFormats', {
      'button__toolboxFormats--png': format === 'png',
    });
  return (
    <>
      {formats.map((format, index) => (
        <Button
          key={index}
          className={getButtonClassName(format)}
          name={`${format}`}
          text={`${format}`}
          handleClick={() => captureCanvas(format)}
          ariaLabel={`Descargar la imagen como ${format}`}
          title={`Descargar la imagen en formato ${format}`}
        />
      ))}
    </>
  );
};
RenderFormatButtons.propTypes = {
  captureCanvas: PropTypes.func.isRequired,
};

export default RenderFormatButtons;
