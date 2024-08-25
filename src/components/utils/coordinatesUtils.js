
/**
 * Obtiene las coordenadas del borde de la imagen pintada.
 * 
 * @module utils/getBorderCoordinates
 * @param {Object} imageBorderPixels - Datos de los píxeles de la imagen.
 * @param {Object} canvasBorderRef - Referencia del canvas.
 * @returns {Array} Coordenadas del borde de la imagen.
 * @example
 * // Ejemplo de uso del getBorderCoordinates
 * // Supongamos que tienes un canvas con un borde blanco y quieres obtener las coordenadas de ese borde.
 * import { getBorderCoordinates } from './utils/getBorderCoordinates';
 *
 * const canvas = document.getElementById('myCanvas');
 * const context = canvas.getContext('2d');
 * const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
 * const canvasRef = { current: canvas };
 *
 * // Obtener coordenadas del borde
 * const borderCoordinates = getBorderCoordinates(imageData, canvasRef);
 * console.log(borderCoordinates);
 * // [{ x: 10, y: 5 }, { x: 11, y: 5 }, ...]  // Ejemplo de salida
 */
export const getBorderCoordinates = (imageBorderPixels, canvasBorderRef) => {
  const imageData = imageBorderPixels.data;
  const targetColor = [255, 255, 255, 255];
  const pixelsBorder = [];
  let width;

  if (canvasBorderRef && canvasBorderRef.current) {
    width = canvasBorderRef.current.width;
  }

  for (let i = 0; i < imageData.length; i += 4) {
    const pixelColor = [
      imageData[i],
      imageData[i + 1],
      imageData[i + 2],
      imageData[i + 3],
    ];
    if (pixelColor.every((value, index) => value === targetColor[index])) {
      const x = (i / 4) % width;
      const y = Math.floor(i / 4 / width);
      pixelsBorder.push({ x, y });
    }
  }

  return pixelsBorder;
};

/**
 * Filtra las coordenadas donde se insertará el texto.
 * 
 * @module utils/filterCoordinates
 * @param {Array} coordinates - Coordenadas a filtrar.
 * @param {string} direction - Dirección ('left' o 'right').
 * @param {number} size - Tamaño del texto.
 * @param {Object} canvasSize - Tamaño del canvas.
 * @returns {Array} Coordenadas filtradas.
 * @example 
 * // Ejemplo de uso del filterCoordinates
 * // Supongamos que tienes coordenadas del borde de una imagen y quieres filtrar dónde insertar texto.
 * import { filterCoordinates } from './utils/filterCoordinates';
 *
 * const coordinates = [
 *   { x: 10, y: 20 },
 *   { x: 15, y: 20 },
 *   { x: 10, y: 30 },
 *   { x: 15, y: 30 }
 * ];
 * const canvasSize = { canvasWidth: 100, canvasHeight: 100 };
 * const filteredCoordinates = filterCoordinates(coordinates, 'left', 20, canvasSize);
 * console.log(filteredCoordinates);
 * // [{ x: 10, y: 20 }, { x: 10, y: 30 }]  // Ejemplo de salida
 */
export const filterCoordinates = (coordinates, direction, size, canvasSize) => {
  // Agrupar coordenadas por su valor de 'y'
  const groupedCoordinates = coordinates.reduce((groups, coord) => {
    const key = coord.y;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(coord);
    return groups;
  }, {});

  // Seleccionar una coordenada de cada grupo según la dirección(left, right)
  const result = Object.values(groupedCoordinates).flatMap((group) => {
    const sortedGroup = group.sort((c1, c2) =>
      direction === 'left' ? c1.x - c2.x : c2.x - c1.x
    );
    return [sortedGroup[0]]; // Escoger la primera coordenada después de ordenarla
  });

  const heightText = size;
  // const canvasHeight = canvasBorderRef.current.height;

  //Filtrar solo las líneas que estén separadas por una altura de texto determinada
  const filteredLines = result.filter((_, index) => index % heightText === 0);

  //Ajustar la posición del texto
  const adjustedLines = filteredLines.map(({ x, y }) => {
    // let coordinateLine = { x: x + heightText / 2, y: y + heightText / 2 };
    // let coordinateLine = { x:x-heightText, y:y-heightText/2};
    let coordinateLine = { x, y };

    if (coordinateLine.y <= canvasSize.canvasHeight) {
      return coordinateLine;
    } else {
      return null;
    }
  });

  // Filtrar las líneas nulas
  const finalLines = adjustedLines.filter((line) => line !== null);

  return finalLines;
};

/**
 * Añade texto al canvas.
 *
 * @module utils/addTextToCanvas
 * @param {CanvasRenderingContext2D} context - Contexto del canvas.
 * @param {Function} checkPixelIsInsideFigureCallback - Callback para comprobar si un píxel está dentro de la figura.
 * @param {string} inputData - Datos de entrada del texto.
 * @param {Object} inputPositionCoordinates - Coordenadas de la posición inicial del texto.
 * @param {Object} canvasSize - Tamaño del canvas.
 * @param {boolean} inputIsSetted - Indica si el input está configurado.
 * @param {Object} styleFont - Estilo de la fuente.
 *  @example
 * // Supongamos que quieres añadir texto a un canvas con ciertas restricciones.
 * import { addTextToCanvas } from './utils/addTextToCanvas';
 *
 * const canvas = document.getElementById('myCanvas');
 * const context = canvas.getContext('2d');
 * const inputData = "Hello World";
 * const inputPositionCoordinates = {
 *   start: [
 *     { x: 10, y: 30 },
 *     { x: 10, y: 50 }
 *   ]
 * };
 * const canvasSize = { canvasWidth: canvas.width, canvasHeight: canvas.height };
 * const inputIsSetted = true;
 * const styleFont = {
 *   background: '#FF000000',
 *   color: '#000000',
 *   size: 20,
 *   font: 'Arial'
 * };
 *
 * // Función de callback para comprobar si un píxel está dentro de una figura (simplificada)
 * const checkPixelIsInsideFigureCallback = (x, y) => true; // Para simplicidad, asumimos que todos los píxeles están dentro de la figura
 *
 * addTextToCanvas(
 *   context,
 *   checkPixelIsInsideFigureCallback,
 *   inputData,
 *   inputPositionCoordinates,
 *   canvasSize,
 *   inputIsSetted,
 *   styleFont
 * );
 * // El texto "Hello World" será añadido al canvas en las coordenadas especificadas
 */
export const addTextToCanvas = (
  context,
  checkPixelIsInsideFigureCallback,
  inputData,
  inputPositionCoordinates,
  canvasSize,
  inputIsSetted,
  styleFont
) => {
  const { background, color, size, font } = styleFont;
  const characters = inputData.split('');
  let currentLine = 1;
  let { x: currentX, y: currentY } =
    inputPositionCoordinates.start[currentLine] || {};
  const canvasWidth = canvasSize.canvasWidth;
  const space = ' ';
  const spaceWidth = context.measureText(space).width;
  const measurements = {}; // Almacenar las medidas de ancho de cada carácter

  if (context) {
    if (inputIsSetted && background === '#FF000000') {
      context.fillStyle = '#FFFFFF';
    } else {
      context.fillStyle = background;
    }
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    context.font = `${size}px ${font}`;
    context.fillStyle = color;

    characters.forEach((char) => {
      let charWidth = measurements[char];

      if (!charWidth) {
        charWidth = context.measureText(char).width;
        measurements[char] = charWidth;
      }

      // Pintar espacio vacío cuando esté fuera de la figura
      while (
        !checkPixelIsInsideFigureCallback(currentX, currentY) &&
        currentX < canvasWidth
      ) {
        context.fillText(space, currentX, currentY);
        currentX += spaceWidth;
      }

      // Pintar el texto cuando esté dentro de la figura
      if (currentX < canvasWidth) {
        context.fillText(char, currentX, currentY);
        currentX += charWidth;
      } else {
        currentLine++; // Cambia a la siguiente posición
        if (inputPositionCoordinates.start[currentLine]) {
          currentX = inputPositionCoordinates.start[currentLine].x;
          currentY = inputPositionCoordinates.start[currentLine].y;
          context.fillText(char, currentX, currentY);

          currentX += charWidth;
        }
      }
    });
  }
};
