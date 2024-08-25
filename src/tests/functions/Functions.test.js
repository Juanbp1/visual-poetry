import { cleanup } from '@testing-library/react';
import { loremIpsum } from 'lorem-ipsum';
import {
  addTextToCanvas,
  filterCoordinates,
  getBorderCoordinates,
  generateTextLoremIpsum,
  checkPixelIsInsideFigure,
  drawImageOnCanvas,
} from '../../components/utils';

// Mock de la función loremIpsum para controlar su salida en las pruebas
jest.mock('lorem-ipsum', () => ({
  loremIpsum: jest.fn(),
}));

// Mock para simular el contexto y la imagen
const mockContext = {
  getImageData: (x, y, _, __) => {
    // Simular color de pixel para coordenadas específicas
    if (x === 10 && y === 20) {
      return {
        data: [10, 50, 200], // RGBA valores
      };
    } else {
      return {
        data: [255, 255, 255], // Color blanco (fuera de la figura)
      };
    }
  },
};

const canvasSize = {
  canvasWidth: 100,
  canvasHeight: 100,
};

describe('Comprobar que funciona correctamente la función generateTextLoremIpsum', () => {
  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });
  test('Debería generar un texto con una longitud mayor o igual al número de caracteres especificado', () => {
    const mockSentence = 'Sentence';
    loremIpsum.mockReturnValue(mockSentence);

    const numberCharacter = 100;
    const text = generateTextLoremIpsum(numberCharacter);

    // Verifica que el texto generado sea al menos tan largo como el número de caracteres especificado
    expect(text.length).toBeGreaterThanOrEqual(numberCharacter);
  });
});

describe('Comprobar que funciona correctamente la función checkPixelIsInsideFigure', () => {
  const testCases = [
    [
      'Devuelve true si el pixel está dentro de la figura (herramienta de selección desactivada)',
      mockContext,
      canvasSize,
      10,
      20,
      128,
      false,
      true,
    ],
    [
      'Devuelve false si el pixel está fuera de la figura (herramienta de selección desactivada)',
      mockContext,
      canvasSize,
      50,
      50,
      undefined,
      false,
      false,
    ],
    [
      'Devuelve false si el pixel está dentro de la figura (herramienta de selección activada)',
      mockContext,
      canvasSize,
      10,
      20,
      undefined,
      true,
      false,
    ],
    [
      'Devuelve true si el pixel está fuera de la figura (herramienta de selección activada)',
      mockContext,
      canvasSize,
      50,
      50,
      undefined,
      true,
      true,
    ],
    [
      'Devuelve false si el contexto es nulo',
      null,
      canvasSize,
      10,
      20,
      undefined,
      true,
      false,
    ],
    [
      'Devuelve false si el pixel está fuera del canvas',
      mockContext,
      canvasSize,
      150,
      150,
      undefined,
      true,
      false,
    ],
    [
      'Devuelve true si el pixel está dentro de la figura con threshold por defecto',
      mockContext,
      canvasSize,
      10,
      20,
      undefined,
      false,
      true,
    ],
  ];
  afterEach(() => {
    cleanup();
  });
  test.each(testCases)(
    '%s',
    (_, context, canvasSize, x, y, threshold, inversion, expected) => {
      const result = checkPixelIsInsideFigure(
        context,
        canvasSize,
        x,
        y,
        threshold,
        inversion
      );
      expect(result).toBe(expected);
    }
  );
});

describe('Comprobar que funciona correctamente la función getBorderCoordinates', () => {
  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });
  test('Debería devolver las coordenadas del borde correctas para los píxeles del borde blanco.', () => {
    // Datos de imagen simulados con una imagen de 3x3 donde el borde es blanco
    const imageBorderPixels = {
      data: [
        // row 1
        255,
        255,
        255,
        255, // x=0, y=0 (white border)
        0,
        0,
        0,
        255, // x=1, y=0 (black pixel)
        255,
        255,
        255,
        255, // x=2, y=0 (white border)
        // row 2
        0,
        0,
        0,
        255, // x=0, y=1 (black pixel)
        0,
        0,
        0,
        255, // x=1, y=1 (black pixel)
        0,
        0,
        0,
        255, // x=2, y=1 (black pixel)
        // row 3
        255,
        255,
        255,
        255, // x=0, y=2 (white border)
        0,
        0,
        0,
        255, // x=1, y=2 (black pixel)
        255,
        255,
        255,
        255, // x=2, y=2 (white border)
      ],
      width: 3,
      height: 3,
    };

    // Borde de lienzo simulado ref.
    const canvasBorderRef = {
      current: {
        width: 3,
        height: 3,
      },
    };

    // Resultado esperado: coordenadas del borde (excluyendo las esquinas si es necesario)
    const expectedCoordinates = [
      { x: 0, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 2 },
      { x: 2, y: 2 },
    ];

    const result = getBorderCoordinates(imageBorderPixels, canvasBorderRef);
    expect(result).toEqual(expectedCoordinates);
  });

  test('Debería devolver una matriz vacía si no hay píxeles de borde.', () => {
    // Datos de imagen simulados sin píxeles de borde
    const imageBorderPixels = {
      data: [
        // row 1
        0,
        0,
        0,
        255, // x=0, y=0 (black pixel)
        0,
        0,
        0,
        255, // x=1, y=0 (black pixel)
        0,
        0,
        0,
        255, // x=2, y=0 (black pixel)
        // row 2
        0,
        0,
        0,
        255, // x=0, y=1 (black pixel)
        0,
        0,
        0,
        255, // x=1, y=1 (black pixel)
        0,
        0,
        0,
        255, // x=2, y=1 (black pixel)
        // row 3
        0,
        0,
        0,
        255, // x=0, y=2 (black pixel)
        0,
        0,
        0,
        255, // x=1, y=2 (black pixel)
        0,
        0,
        0,
        255, // x=2, y=2 (black pixel)
      ],
      width: 3,
      height: 3,
    };

    // Borde de lienzo simulado ref.
    const canvasBorderRef = {
      current: {
        width: 3,
        height: 3,
      },
    };

    // Resultado esperado: sin coordenadas de borde
    const expectedCoordinates = [];

    const result = getBorderCoordinates(imageBorderPixels, canvasBorderRef);
    expect(result).toEqual(expectedCoordinates);
  });
});

describe('Comprobar que funciona correctamente la función filterCoordinates', () => {
  afterEach(() => {
    cleanup();
  });
  test('Debería filtrar y ajustar las coordenadas correctamente (izquierda)', () => {
    const coordinates = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ];
    const direction = 'left';
    const size = 1;
    const canvasSize = { canvasHeight: 2 };

    const expectedCoordinates = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
    ];

    const result = filterCoordinates(coordinates, direction, size, canvasSize);
    expect(result).toEqual(expectedCoordinates);
  });
  test('Debería filtrar y ajustar las coordenadas correctamente (derecha)', () => {
    const coordinates = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ];
    const direction = 'right';
    const size = 1;
    const canvasSize = { canvasHeight: 2 };

    const expectedCoordinates = [
      { x: 2, y: 0 },
      { x: 2, y: 1 },
    ];

    const result = filterCoordinates(coordinates, direction, size, canvasSize);
    expect(result).toEqual(expectedCoordinates);
  });
  test('Debería devolver una matriz vacía si no hay coordenadas válidas', () => {
    const coordinates = [
      { x: 0, y: 3 },
      { x: 1, y: 3 },
      { x: 2, y: 3 },
    ];
    const direction = 'left';
    const size = 1;
    const canvasSize = { canvasHeight: 2 };

    const expectedCoordinates = [];

    const result = filterCoordinates(coordinates, direction, size, canvasSize);
    expect(result).toEqual(expectedCoordinates);
  });
});

describe('Comprobar que funciona correctamente la función addTextToCanvas', () => {
  let context;
  let checkPixelIsInsideFigureCallback;
  const styleFont = {
    background: '#FF000000',
    color: '#000000',
    size: 12,
    font: 'Arial',
  };
  const inputData = 'Hello World';
  const inputPositionCoordinates = {
    start: [
      { x: 10, y: 20 },
      { x: 10, y: 40 },
      { x: 10, y: 80 },
      { x: 10, y: 120 },
    ],
  };
  const canvasSize = { canvasWidth: 60, canvasHeight: 200 };

  beforeEach(() => {
    context = {
      canvas: { width: 50, height: 500 },
      fillRect: jest.fn(),
      fillText: jest.fn(),
      measureText: jest.fn(),
      font: '',
      fillStyle: '',
    };

    checkPixelIsInsideFigureCallback = jest.fn();

    // Mock para devolver un ancho fijo para cada carácter
    context.measureText.mockImplementation((text) => ({
      width: text === ' ' ? 5 : text.length * 10,
    }));
  });
  afterEach(() => {
    cleanup();
  });
  test('Debe limpiar el lienzo con el color de fondo correcto', () => {
    const inputIsSetted = true;
    addTextToCanvas(
      context,
      checkPixelIsInsideFigureCallback,
      inputData,
      inputPositionCoordinates,
      canvasSize,
      inputIsSetted,
      styleFont
    );

    expect(context.fillRect).toHaveBeenCalledWith(0, 0, 50, 500);
  });

  test('Debería dibujar el texto dentro del lienzo correctamente', () => {
    const inputIsSetted = false;
    checkPixelIsInsideFigureCallback.mockImplementation(() => true); // Todos los píxeles están dentro de la figura.

    addTextToCanvas(
      context,
      checkPixelIsInsideFigureCallback,
      inputData,
      inputPositionCoordinates,
      canvasSize,
      inputIsSetted,
      styleFont
    );

    // Verificar que fillText se llame con cada carácter en la posición correcta
    expect(context.fillText).toHaveBeenCalledWith('H', 10, 40);
    expect(context.fillText).toHaveBeenCalledWith('e', 20, 40);
    expect(context.fillText).toHaveBeenCalledWith('l', 30, 40);
    expect(context.fillText).toHaveBeenCalledWith('l', 40, 40);
    expect(context.fillText).toHaveBeenCalledWith('o', 50, 40);
  });

  test('Debería manejar el paso a la siguiente línea si el texto llega al limite del lienzo', async () => {
    const inputIsSetted = false;
    checkPixelIsInsideFigureCallback.mockImplementation(() => true); // All pixels are inside the figure

    addTextToCanvas(
      context,
      checkPixelIsInsideFigureCallback,
      inputData,
      inputPositionCoordinates,
      canvasSize,
      inputIsSetted,
      styleFont
    );

    // Verificar que el texto pintado se haya movido a la siguiente línea
    expect(context.fillText).toHaveBeenCalledWith('H', 10, 40);
    expect(context.fillText).toHaveBeenCalledWith('e', 20, 40);
    expect(context.fillText).toHaveBeenCalledWith('l', 30, 40);
    expect(context.fillText).toHaveBeenCalledWith('l', 40, 40);
    expect(context.fillText).toHaveBeenCalledWith('o', 50, 40);

    // Verificar que el texto continúe en la siguiente línea
    expect(context.fillText).toHaveBeenCalledWith(' ', 10, 80);
    expect(context.fillText).toHaveBeenCalledWith('W', 15, 80);
    expect(context.fillText).toHaveBeenCalledWith('o', 25, 80);
    expect(context.fillText).toHaveBeenCalledWith('r', 35, 80);
    expect(context.fillText).toHaveBeenCalledWith('l', 45, 80);
    expect(context.fillText).toHaveBeenCalledWith('d', 55, 80);
  });

  test('Debe manejar correctamente cuando los píxeles no están dentro de la figura', async () => {
    const inputIsSetted = false;
    checkPixelIsInsideFigureCallback.mockImplementation((x, y) => x % 3 === 0); // Solo píxeles en posiciones pares están dentro de la figura

    addTextToCanvas(
      context,
      checkPixelIsInsideFigureCallback,
      inputData,
      inputPositionCoordinates,
      canvasSize,
      inputIsSetted,
      styleFont
    );

    // Verificar que se dibuja el espacio cuando el píxel no está dentro de la figura
    expect(context.fillText).toHaveBeenCalledWith(' ', 10, 40);
    expect(context.fillText).toHaveBeenCalledWith('H', 15, 40);
    expect(context.fillText).toHaveBeenCalledWith(' ', 25, 40);
    expect(context.fillText).toHaveBeenCalledWith('e', 30, 40);
    expect(context.fillText).toHaveBeenCalledWith(' ', 40, 40);
    expect(context.fillText).toHaveBeenCalledWith('l', 45, 40);
  });
});

describe('Comprobar que funciona correctamente la función drawImageOnCanvas', () => {
  let context;
  let obtainCanvasSizeAction;
  let addTextToCanvas;

  beforeEach(() => {
    context = {
      canvas: {
        parentNode: {
          offsetWidth: 500,
        },
        width: 0,
        height: 0,
      },
      fillStyle: '',
      fillRect: jest.fn(),
      drawImage: jest.fn(),
    };
    obtainCanvasSizeAction = jest.fn();
    addTextToCanvas = jest.fn();
  });
  afterEach(() => {
    cleanup();
  });
  const createImageMock = (width, height) => {
    const image = {
      width,
      height,
      onload: null,
      src: '',
    };
    global.Image = jest.fn(() => image);
    return image;
  };

  test('Debe establecer el ancho y alto del lienzo según el contenedor principal y la relación de aspecto de la imagen', () => {
    const image = createImageMock(100, 50);

    const canvasSize = {
      canvasWidth: null,
      canvasHeight: null,
    };

    drawImageOnCanvas(
      context,
      'data:image/png;base64,...',
      false,
      false,
      canvasSize,
      obtainCanvasSizeAction,
      addTextToCanvas
    );
    image.onload();

    expect(context.canvas.width).toBe(500);
    expect(context.canvas.height).toBe(250);
    expect(obtainCanvasSizeAction).toHaveBeenCalledWith({
      canvasWidth: 500,
      canvasHeight: 250,
    });
  });

  test('Debe llenar el lienzo con color blanco', () => {
    const image = createImageMock(100, 50);

    const canvasSize = {
      canvasWidth: null,
      canvasHeight: null,
    };

    drawImageOnCanvas(
      context,
      'data:image/png;base64,...',
      false,
      false,
      canvasSize,
      obtainCanvasSizeAction,
      addTextToCanvas
    );
    image.onload();

    expect(context.fillStyle).toBe('white');
    expect(context.fillRect).toHaveBeenCalledWith(0, 0, 500, 250);
  });

  test('Debería dibujar la imagen en el lienzo si drawImage es verdadero', () => {
    const image = createImageMock(100, 50);

    const canvasSize = {
      canvasWidth: null,
      canvasHeight: null,
    };

    drawImageOnCanvas(
      context,
      'data:image/png;base64,...',
      false,
      true,
      canvasSize,
      obtainCanvasSizeAction,
      addTextToCanvas
    );
    image.onload();

    expect(context.drawImage).toHaveBeenCalledWith(image, 0, 0, 500, 250);
  });

  test('Debería llamar a addTextToCanvas si addText es verdadero', () => {
    const image = createImageMock(100, 50);

    const canvasSize = {
      canvasWidth: null,
      canvasHeight: null,
    };

    drawImageOnCanvas(
      context,
      'data:image/png;base64,...',
      true,
      false,
      canvasSize,
      obtainCanvasSizeAction,
      addTextToCanvas
    );
    image.onload();

    expect(addTextToCanvas).toHaveBeenCalledWith(context);
  });

  test('No debería llamar a addTextToCanvas si addText es falso', () => {
    const image = createImageMock(100, 50);

    const canvasSize = {
      canvasWidth: null,
      canvasHeight: null,
    };

    drawImageOnCanvas(
      context,
      'data:image/png;base64,...',
      false,
      false,
      canvasSize,
      obtainCanvasSizeAction,
      addTextToCanvas
    );
    image.onload();

    expect(addTextToCanvas).not.toHaveBeenCalled();
  });

  test('Debería llamar a getCanvasSizeAction si el tamaño del lienzo no está definido', () => {
    const image = createImageMock(100, 50);

    const canvasSize = {
      canvasWidth: null,
      canvasHeight: null,
    };

    drawImageOnCanvas(
      context,
      'data:image/png;base64,...',
      false,
      false,
      canvasSize,
      obtainCanvasSizeAction,
      addTextToCanvas
    );
    image.onload();

    expect(obtainCanvasSizeAction).toHaveBeenCalledWith({
      canvasWidth: 500,
      canvasHeight: 250,
    });
  });

  test('No debería llamar a getCanvasSizeAction si el tamaño del lienzo ya está definido', () => {
    const image = createImageMock(100, 50);

    const canvasSize = {
      canvasWidth: 500,
      canvasHeight: 250,
    };

    drawImageOnCanvas(
      context,
      'data:image/png;base64,...',
      false,
      false,
      canvasSize,
      obtainCanvasSizeAction,
      addTextToCanvas
    );
    image.onload();

    expect(obtainCanvasSizeAction).not.toHaveBeenCalled();
  });

  test('Debe manejar todas las combinaciones de addText y drawImage', () => {
    const image = createImageMock(100, 50);

    const canvasSize = {
      canvasWidth: null,
      canvasHeight: null,
    };

    // addText: true, drawImage: true
    drawImageOnCanvas(
      context,
      'data:image/png;base64,...',
      true,
      true,
      canvasSize,
      obtainCanvasSizeAction,
      addTextToCanvas
    );
    image.onload();
    expect(context.drawImage).toHaveBeenCalledWith(image, 0, 0, 500, 250);
    expect(addTextToCanvas).toHaveBeenCalledWith(context);

    context.drawImage.mockClear();
    addTextToCanvas.mockClear();

    // addText: true, drawImage: false
    drawImageOnCanvas(
      context,
      'data:image/png;base64,...',
      true,
      false,
      canvasSize,
      obtainCanvasSizeAction,
      addTextToCanvas
    );
    image.onload();
    expect(context.drawImage).not.toHaveBeenCalled();
    expect(addTextToCanvas).toHaveBeenCalledWith(context);

    context.drawImage.mockClear();
    addTextToCanvas.mockClear();

    // addText: false, drawImage: true
    drawImageOnCanvas(
      context,
      'data:image/png;base64,...',
      false,
      true,
      canvasSize,
      obtainCanvasSizeAction,
      addTextToCanvas
    );
    image.onload();
    expect(context.drawImage).toHaveBeenCalledWith(image, 0, 0, 500, 250);
    expect(addTextToCanvas).not.toHaveBeenCalled();

    context.drawImage.mockClear();
    addTextToCanvas.mockClear();

    // addText: false, drawImage: false
    drawImageOnCanvas(
      context,
      'data:image/png;base64,...',
      false,
      false,
      canvasSize,
      obtainCanvasSizeAction,
      addTextToCanvas
    );
    image.onload();
    expect(context.drawImage).not.toHaveBeenCalled();
    expect(addTextToCanvas).not.toHaveBeenCalled();
  });
  test('Debería usarse valores predeterminados para addText y drawImage cuando no se proporcionan', () => {
    const image = createImageMock(100, 50);

    const canvasSize = {
      canvasWidth: null,
      canvasHeight: null,
    };

    // Llamada a la función sin los parámetros addText y drawImage
    drawImageOnCanvas(
      context,
      'data:image/png;base64,...',
      undefined,
      undefined,
      canvasSize,
      obtainCanvasSizeAction,
      addTextToCanvas
    );
    image.onload();

    // Verificar que los valores por defecto se usan
    expect(context.drawImage).not.toHaveBeenCalled();
    expect(addTextToCanvas).not.toHaveBeenCalled();
  });

  test('Debe manejar cuando addText es verdadero y no se proporciona drawImage', () => {
    const image = createImageMock(100, 50);

    const canvasSize = {
      canvasWidth: null,
      canvasHeight: null,
    };

    // Llamada a la función sin el parámetro drawImage
    drawImageOnCanvas(
      context,
      'data:image/png;base64,...',
      true,
      undefined,
      canvasSize,
      obtainCanvasSizeAction,
      addTextToCanvas
    );
    image.onload();

    // Verificar el comportamiento cuando addText es true y drawImage no está definido
    expect(context.drawImage).not.toHaveBeenCalled();
    expect(addTextToCanvas).toHaveBeenCalledWith(context);
  });
});
