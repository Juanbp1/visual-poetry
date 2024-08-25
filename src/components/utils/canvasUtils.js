/**
 * Dibuja una imagen en un canvas y opcionalmente agrega texto
 *
 * @module utils/drawImageCanvas
 * @param {CanvasRenderingContext2D} context - El contexto 2D del canvas donde se dibujará la imagen.
 * @param {File|Blob} image - La imagen que se dibujará en el canvas.
 * @param {boolean} [addText=false] - Indica si se debe agregar texto al canvas después de dibujar la imagen.
 * @param {boolean} [drawImage=false] - Indica si se debe dibujar la imagen en el canvas.
 * @param {Object} canvasSize - Un objeto que contiene el ancho y alto del canvas.
 * @param {number} canvasSize.canvasWidth - El ancho del canvas.
 * @param {number} canvasSize.canvasHeight - El alto del canvas.
 * @param {Function} obtainCanvasSizeAction - Función que se llama para obtener el tamaño del canvas si aún no está definido.
 * @param {Function} addTextToCanvas - Función que se llama para agregar texto al canvas.
 * @return {void} No devuelve ningún valor.
 * @example
 * // Ejemplo de uso del canvasUtils
 * import drawImageOnCanvas from './utils/drawImageOnCanvas';
 *
 * const canvas = document.getElementById('myCanvas');
 * const context = canvas.getContext('2d');
 *
 * const canvasSize = {
 *   canvasWidth: 0,
 *   canvasHeight: 0,
 * };
 *
 * const obtainCanvasSizeAction = (size) => {
 *   console.log('Canvas size:', size);
 * };
 *
 * const addTextToCanvas = (context) => {
 *   context.font = '30px Arial';
 *   context.fillStyle = 'black';
 *   context.fillText('Hello, World!', 50, 50);
 * };
 *
 * const imageData = 'https://via.placeholder.com/800x600';
 *
 * drawImageOnCanvas(
 *   context,
 *   imageData,
 *   true,  // Agregar texto
 *   true,  // Dibujar la imagen
 *   canvasSize,
 *   obtainCanvasSizeAction,
 *   addTextToCanvas
 * );
 */
 const drawImageOnCanvas = (
  context,
  image,
  addText = false,
  drawImage = false,
  canvasSize,
  obtainCanvasSizeAction,
  addTextToCanvas
) => {
  const img = new Image();
  img.src = image;
  img.onload = () => {
    const padding = 0;
    const canvasContainer = context.canvas.parentNode.offsetWidth;

    //Ajusta al ancho del contenedor padre
    context.canvas.width = canvasContainer;

    //Ajusta la altura en relación a la altura de la imagen importación
    context.canvas.height = (context.canvas.width / img.width) * img.height;

    //calcula las dimensiones y posición de la imagen padre
    const imageWidth = context.canvas.width - 2 * padding;
    const imageHeight = context.canvas.height - 2 * padding;

    if (!canvasSize.canvasWidth || !canvasSize.canvasHeight) {
      obtainCanvasSizeAction({
        canvasWidth: imageWidth,
        canvasHeight: imageHeight,
      });
    }
    //Repintar de blanco por si existiera transparencia
    context.fillStyle = 'white';
    context.fillRect(padding, padding, imageWidth, imageHeight);

    if (drawImage) {
      context.drawImage(img, padding, padding, imageWidth, imageHeight);
    }
    if (addText) {
      addTextToCanvas(context);
    }
  };
};
export default drawImageOnCanvas