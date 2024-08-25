import React, { forwardRef, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '../../context/AppContext';

/**
 * Componente BaseCanvas.
 * Este componente renderiza un elemento canvas y maneja el procesamiento del borde de la imagen
 * mediante un contexto de aplicación.
 *
 * @module canvas/BaseCanvas
 * @param {Object} props - Propiedades del componente.
 * @param {(string|Object)} props.imagen - La imagen que se va a procesar.
 * @param {string} props.className - Nombre de la clase CSS para el canvas.
 * @param {boolean} [props.isImageBorderProcessed] - Indica si el borde de la imagen ha sido procesado.
 * @param {string} [props.dataTestId]- ID para pruebas de datos del canvas.
 * @param {string} [props.provideContextAction] - Acción del contexto a proporcionar.
 * @param {React.RefObject<HTMLCanvasElement>} ref - Referencia del elemento canvas.
 * @returns {JSX.Element} Elemento canvas.
 * @example
 * // Primer ejemplo de BaseCanvas
 * import React from 'react';
 * import BaseCanvas from './BaseCanvas'
 * const MyComponent = () => (
 * <BaseCanvas
 *   ref={canvasImageDataRef}
 *   imagen={image}
 *   provideContextAction={actionTypes.OBTAIN_SECOND_CONTEXT}
 *   contextType={'secondContext'}
 *   className={'canvas canvas--hidden'}
 *  />
 * );
 * export default MyComponent;
 *
 * @example
 * // Segundo ejemplo de BaseCanvas
 * import React from 'react';
 * import BaseCanvas from './BaseCanvas'
 * const MyComponent = () => (
 * <BaseCanvas
 *   ref={canvasBorderRef}
 *   imagen={imageBorder}
 *   isImageBorderProcessed={true}
 *   className={'canvas--hidden'}
 *  />
 * );
 * export default MyComponent;
 */
const BaseCanvas = forwardRef(
  (
    {
      isImageBorderProcessed,
      imagen,
      className,
      dataTestId,
      provideContextAction,
    },
    ref
  ) => {
    const { dispatch, actions } = useAppContext();
    const { checkImageProcessedAction, obtainImageBorderPixelsAction } =
      actions;

    /**
     * Obtiene los píxeles del borde de la imagen.
     * @param {object} context - Contexto del canvas.
     * @member module:canvas/BaseCanvas
     */
    const processBorderImagePixels = useCallback(
      (context) => {
        if (context) {
          obtainImageBorderPixelsAction(context);
        } 
      },
      [obtainImageBorderPixelsAction]
    );

    useEffect(() => {
      const canvas = ref.current;
      const context = canvas.getContext('2d', { willReadFrequently: true });

      if (canvas && context) {
        dispatch({ type: provideContextAction, payload: context });
        if (isImageBorderProcessed) {
          processBorderImagePixels(context);
          checkImageProcessedAction();
        }
      }
    }, [
      ref,
      isImageBorderProcessed,
      imagen,
      dispatch,
      processBorderImagePixels,
      provideContextAction,
      checkImageProcessedAction,
    ]);

    return (
      <canvas ref={ref} className={className} data-testid={dataTestId}></canvas>
    );
  }
);
BaseCanvas.propTypes = {
  isImageBorderProcessed: PropTypes.bool,
  imagen: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  className: PropTypes.string.isRequired,
  dataTestId: PropTypes.string,
  provideContextAction: PropTypes.string,
};
export default BaseCanvas;
