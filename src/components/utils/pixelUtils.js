/**
 * Verifica si un píxel en un canvas se encuentra dentro de una figura basada en el umbral de intensidad de color.
 * 
 * @module utils/checkPixelIsInsideFigure
 * @param {CanvasRenderingContext2D} context - El contexto del canvas donde se realiza la verificación.
 * @param {Object} canvasSize - Tamaño del canvas.
 * @param {number} canvasSize.canvasWidth - Ancho del canvas.
 * @param {number} canvasSize.canvasHeight - Alto del canvas.
 * @param {number} coordX - La coordenada X del píxel a verificar.
 * @param {number} coordY - La coordenada Y del píxel a verificar.
 * @param {number} [threshold=128] - El umbral de intensidad de color para considerar el píxel dentro de la figura. El valor por defecto es 128.
 * @param {boolean} imageIsInvert - Indica si la imagen está invertida. Si es `true`, el píxel se considera dentro de la figura si su intensidad promedio es mayor que el umbral; si es `false`, si es menor.
 * @returns {boolean} `true` si el píxel está dentro de la figura según el umbral de intensidad y el estado de herramienta de selección; `false` si no lo está o si el píxel está fuera de los límites del canvas.
 * @example
 * // Ejemplo de uso en un componente de React
 * import React, { useRef, useEffect } from 'react';
 * import checkPixelIsInsideFigure from './utils/checkPixelIsInsideFigure';
 *
 * const PixelCheckComponent = () => {
 *   const canvasRef = useRef(null);
 *   const [isInside, setIsInside] = React.useState(false);
 *
 *   useEffect(() => {
 *     if (canvasRef.current) {
 *       const context = canvasRef.current.getContext('2d');
 *       const canvasWidth = canvasRef.current.width;
 *       const canvasHeight = canvasRef.current.height;
 *
 *       // Aquí asumimos que la figura es una imagen cargada previamente en el canvas
 *       const coordX = 50; // Coordenada X del píxel a verificar
 *       const coordY = 50; // Coordenada Y del píxel a verificar
 *       const threshold = 128; // Umbral de intensidad
 *       const imageIsInvert = false; // La imagen no está invertida
 *
 *       const result = checkPixelIsInsideFigure(
 *         context,
 *         { canvasWidth, canvasHeight },
 *         coordX,
 *         coordY,
 *         threshold,
 *         imageIsInvert
 *       );
 *
 *       setIsInside(result);
 *     }
 *   }, []);
 *
 *   return (
 *     <div>
 *       <canvas ref={canvasRef} width={200} height={200}></canvas>
 *       <p>El píxel está dentro de la figura: {isInside ? 'Sí' : 'No'}</p>
 *     </div>
 *   );
 * };
 *
 * export default PixelCheckComponent;
 */
const checkPixelIsInsideFigure = (
  context,
  canvasSize,
  coordX,
  coordY,
  threshold = 128,
  imageIsInvert
) => {
  if (!context) {
    return false;
  }
  const { canvasWidth, canvasHeight } = canvasSize;

  const isInsideCanvas =
    coordX >= 0 &&
    coordX <= canvasWidth &&
    coordY >= 0 &&
    coordY <= canvasHeight;

  if (isInsideCanvas) {
    //Obtener el valor de color del pixel
    const imageData = context.getImageData(coordX, coordY, 1, 1);
    const [r, g, b] = imageData.data;

    //Calcular valor promedio de intensidad de color
    const average = (r + g + b) / 3;

    return imageIsInvert ? average > threshold : average < threshold;
  }

  return false; //Fuera de los límites de la imagen
};

export default checkPixelIsInsideFigure;
