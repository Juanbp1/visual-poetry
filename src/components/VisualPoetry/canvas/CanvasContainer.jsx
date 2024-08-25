import React, { useCallback, useRef, useEffect } from 'react';
import BaseCanvas from './BaseCanvas';
import { useAppContext } from '../../context/AppContext';
import { actionTypes } from '../../constants/';
import { Header } from '../../layout';
import { EditorToolbox } from '../../layout';
import {
  useCanvasDraw,
  useAddCanvasText,
  useImageBorderDetectionAndPainting,
  useGetBorderCoordinates,
  useFilterCoordinates,
} from '../../../hooks';

/**
 * Componente CanvasContainer.
 * Este componente gestiona la lógica y la renderización de varios elementos canvas, así como
 * las herramientas de edición y el encabezado. Utiliza múltiples hooks personalizados para
 * manejar el dibujo, detección de bordes y otras funcionalidades relacionadas con el canvas.
 * @module canvas/CanvasContainer
 * @returns {JSX.Element} Elemento contenedor del canvas con las herramientas de edición y el encabezado.
 * @example
 * // Ejemmplo del componente CanvasContainer
 * import React from 'react';
 * import CanvasContainer from '../CanvasContainer';
 *
 * const MyComponent = () => (
 *   <CanvasContainer />
 * );
 * export default MyComponent;
 */

const CanvasContainer = () => {
  const canvasRef = useRef(null);
  const canvasBorderRef = useRef(null);
  const canvasImageDataRef = useRef(null);

  const { state, actions } = useAppContext();
  const { image, imageIsProcessed, imageBorder } = state;
  const defaultImageBorder =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAgAB/3J5kAAAAABJRU5ErkJggg==';
  const {
    checkInputSettedAction,
    obtainInputPositionCoordinatesAction,
    obtainImageBorderAction,
  } = actions;

  useImageBorderDetectionAndPainting(canvasImageDataRef, canvasBorderRef);
  const getBorderCoordinatesCallback = useGetBorderCoordinates(canvasBorderRef);
  const filterCoordinatesCallback = useFilterCoordinates();
  const addTextToCanvas = useAddCanvasText();
  useCanvasDraw(addTextToCanvas);

  /**
   * Procesa las coordenadas del borde de la imagen y obtiene las posiciones inicial y final de cada línea.
   * @member module:canvas/CanvasContainer
   */
  const processBorderCoordinates = useCallback(() => {
    const coordinatesArray = getBorderCoordinatesCallback();
    const { coordinatesLeft, coordinatesRight } =
      filterCoordinatesCallback(coordinatesArray);

    obtainInputPositionCoordinatesAction({
      start: coordinatesLeft,
      end: coordinatesRight,
    });
  }, [
    filterCoordinatesCallback,
    getBorderCoordinatesCallback,
    obtainInputPositionCoordinatesAction,
  ]);

  useEffect(() => {
    if (imageIsProcessed) {
      processBorderCoordinates();
      checkInputSettedAction();

      const handleResize = () => {
        obtainImageBorderAction();
        processBorderCoordinates();
      };
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [
    checkInputSettedAction,
    imageIsProcessed,
    processBorderCoordinates,
    obtainImageBorderAction,
  ]);

  return (
    <div className="AppWrapper" data-testid="AppWrapper">
      <Header
        classContainer="appViewerContainer__header"
        canvasRef={canvasRef}
      />
      <EditorToolbox />
      <span className="canvasWrapper">
        <div className="canvasContainer">
          <BaseCanvas
            ref={canvasRef}
            imagen={image}
            provideContextAction={actionTypes.OBTAIN_MAIN_CONTEXT}
            contextType="mainContext"
            className="canvas canvas--visible"
            dataTestId="canvas"
          />
          <BaseCanvas
            ref={canvasImageDataRef}
            imagen={image}
            provideContextAction={actionTypes.OBTAIN_SECOND_CONTEXT}
            contextType="secondContext"
            className="canvas canvas--hidden"
          />
          <BaseCanvas
            ref={canvasBorderRef}
            imagen={imageBorder || defaultImageBorder}
            isImageBorderProcessed={true}
            className="canvas--hidden"
          />
        </div>
      </span>
    </div>
  );
};

export default CanvasContainer;
