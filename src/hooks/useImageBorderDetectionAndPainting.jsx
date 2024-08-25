import { useCallback, useEffect } from 'react';
import cv from '@techstark/opencv-js';
import { useAppContext } from '../components/context/AppContext';

/**
 * Hook personalizado para detectar y pintar los bordes de una imagen usando OpenCV.
 * @module hooks/useImageBorderDetectionAndPainting
 * @param {React.RefObject<HTMLCanvasElement>} canvasImageDataRef - Referencia al canvas que contiene los datos de la imagen.
 * @param {React.RefObject<HTMLCanvasElement>} canvasBorderRef - Referencia al canvas donde se pintarán los bordes detectados.
 * @example 
 * // Ejemplo d euso del hook useImageBorderDectectionAndPainting
 * import React, { useRef } from 'react';
 * import useImageBorderDetectionAndPainting from '../hooks/useImageBorderDetectionAndPainting';
 * import { useAppContext } from '../components/context/AppContext';
 * 
 * const ImageBorderComponent = () => {
 *   const { state } = useAppContext();
 *   const { imageIsLoaded } = state;
 * 
 *   // Referencias a los canvas
 *   const canvasImageDataRef = useRef(null);
 *   const canvasBorderRef = useRef(null);
 * 
 *   // Usar el hook
 *   useImageBorderDetectionAndPainting(canvasImageDataRef, canvasBorderRef);
 * 
 *   return (
 *     <div>
 *       <h1>Image Border Detection</h1>
 *       <canvas ref={canvasImageDataRef} width="640" height="480" />
 *       <canvas ref={canvasBorderRef} width="640" height="480" />
 *     </div>
 *   );
 * };
 * 
 * export default ImageBorderComponent;
 */
const useImageBorderDetectionAndPainting = (
  canvasImageDataRef,
  canvasBorderRef
) => {
  const { state, actions } = useAppContext();
  const {  imageIsInverted, imageIsLoaded } = state;

  const { obtainImageBorderAction } = actions;

   /**
   * Función memorizada para detectar y pintar los bordes de la imagen.
   * @member module:hooks/useImageBorderDetectionAndPainting
   */
  const detectAndPaintImageBorderCallback = useCallback(() => {
    obtainImageBorderAction(canvasBorderRef.current);

    let img = cv.imread(canvasImageDataRef.current);
    let padding = imageIsInverted ? 1 : 0;

    cv.copyMakeBorder(
      img,
      img,
      0,
      0,
      padding,
      0,
      cv.BORDER_CONSTANT,
      new cv.Scalar(0, 0, 0, 0)
    );

    cv.cvtColor(img, img, cv.COLOR_BGR2GRAY, 0);
    cv.Canny(img, img, 50, 100, 3, true);
    cv.imshow(canvasBorderRef.current, img);

    img.delete();
  }, [
    canvasBorderRef,
    obtainImageBorderAction,
    imageIsInverted,
    canvasImageDataRef,
  ]);

  
  useEffect(() => {
    if (imageIsLoaded) {
      detectAndPaintImageBorderCallback();
     
    }
  }, [detectAndPaintImageBorderCallback, imageIsLoaded,]);
};


export default useImageBorderDetectionAndPainting;
