/**
 * @fileoverview Contexto y Reducer para la aplicación.
 * @module AppContext
 */
import React, { createContext, useContext, useReducer } from 'react';
import actionTypes from '../constants/actionTypes';
import { TEXT_STRINGS } from '../constants/uiConstants';
import actionsFactory from '../constants/actionsFactory';
import defineActions from '../constants/actions';

/**
 * @typedef {Object} AppState
 * @property {Image|null} image - La imagen actual.
 * @property {ImageBorder|null} imageBorder - El borde de la imagen.
 * @property {boolean} imageIsInverted - Indica si la imagen está invertida.
 * @property {Array<ImageGalleryItem>} imageGallery - La galería de imágenes.
 * @property {Object|null} imageSelected - La imagen seleccionada.
 * @property {boolean} imageIsLoaded - Indica si la imagen ha sido cargada.
 * @property {boolean} imageIsProcessed - Indica si la imagen ha sido procesada.
 * @property {boolean} inputIsSetted - Indica si la entrada está configurada.
 * @property {Object} imageBorderPixels - Los píxeles del borde de la imagen.
 * @property {Object} imageData - Datos de la imagen.
 * @property {Object} inputPositionCoordinates - Coordenadas de posición de entrada.
 * @property {string} inputData - Datos de entrada.
 * @property {Object} mainContext - Contexto principal del canvas.
 * @property {Object} secondContext - Segundo contexto del canvas.
 * @property {Object} canvasSize - Tamaño del canvas.
 * @property {Object} styleFont - Estilo de fuente actual.
 * @property {string|null} errorUploadImage - Error al subir la imagen.
 * @property {number} figureThreshold - Umbral para figuras.
 * @property {boolean} loading - Estado de carga.
 * @property {boolean} showGallery - Indica si se muestra la galería.
 * @property {boolean} showGallerySecond - Indica si se muestra la segunda galería.
 * @property {boolean} showGalleryThird - Indica si se muestra la tercera galería.
 */

/**
 * @type {React.Context<{state: AppState, dispatch: React.Dispatch<any>, actions: Object}>}
 */
const AppContext = createContext();

/**
 * Estado inicial del contexto de la aplicación.
 * @type {AppState}
 */
const initialState = {
  image: null,
  imageBorder: null,
  imageIsInverted: false,
  imageGallery: [],
  imageSelected: null,
  imageIsLoaded: false,
  imageIsProcessed: false,
  inputIsSetted: false,
  imageBorderPixels: {},
  imageData: {},
  inputPositionCoordinates: { start: [], end: [] },
  inputData: TEXT_STRINGS.INITIAL_TEXT,
  mainContext: null,
  secondContext: null,
  canvasSize: { canvasWidth: 0, canvasHeight: 0 },
  styleFont: {
    color: '#000000',
    background: '#FF000000',
    font: 'Arial',
    size: 8,
  },
  errorUploadImage: null,
  figureThreshold: 128,
  loading: false,
  showGallery: false,
  showGallerySecond: false,
  showGalleryThird: false,
};

const {
  CHECK_IMAGE_LOADED,
  CHECK_IMAGE_PROCESSED,
  CHECK_INPUT_SETTED,
  OBTAIN_CANVAS_SIZE,
  OBTAIN_IMAGE,
  OBTAIN_IMAGE_BORDER,
  OBTAIN_IMAGE_BORDER_PIXELS,
  OBTAIN_IMAGE_GALLERY,
  OBTAIN_IMAGE_SELECTED,
  OBTAIN_INPUT_POSITION_COORDINATES,
  OBTAIN_MAIN_CONTEXT,
  OBTAIN_SECOND_CONTEXT,
  RESET,
  TOGGLE_INVERT_IMAGE,
  UPDATE_ERROR_UPLOAD_IMAGE,
  UPDATE_FIGURE_THRESHOLD,
  UPDATE_GALLERY_TOGGLE,
  UPDATE_GALLERY_TOGGLE2,
  UPDATE_GALLERY_TOGGLE3,
  UPDATE_IMAGE_GALLERY,
  UPDATE_INPUT_DATA,
  UPDATE_LOADING,
  UPDATE_STYLE_FONT,
} = actionTypes;

/**
 * Función reductora para manejar acciones en el estado de la aplicación.
 * @param {AppState} state - El estado actual de la aplicación.
 * @param {Object} action - La acción que se va a procesar.
 * @param {string} action.type - El tipo de acción que indica qué operación realizar.
 * @param {any} [action.payload] - Los datos asociados a la acción, si los hay.
 * @returns {AppState} - El nuevo estado de la aplicación después de procesar la acción.
 */
const reducer = (state, action) => {
  switch (action.type) {
    case CHECK_IMAGE_LOADED:
      return { ...state, imageIsLoaded: true };

    case CHECK_IMAGE_PROCESSED:
      return { ...state, imageIsProcessed: true };

    case CHECK_INPUT_SETTED:
      return { ...state, inputIsSetted: true };

    case OBTAIN_CANVAS_SIZE:
      return { ...state, canvasSize: action.payload };

    case OBTAIN_IMAGE:
      return { ...state, image: action.payload };

    case OBTAIN_IMAGE_BORDER:
      return { ...state, imageBorder: action.payload };

    case OBTAIN_IMAGE_BORDER_PIXELS:
      if (action.payload && typeof action.payload.getImageData === 'function') {
        const context = action.payload;
        const imageDataPixels = context.getImageData(
          0,
          0,
          context.canvas.width,
          context.canvas.height
        );
        return { ...state, imageBorderPixels: imageDataPixels };
      }
      return { ...state, imageBorderPixels: {} };
    case OBTAIN_IMAGE_GALLERY:
      return { ...state, imageGallery: action.payload };

    case OBTAIN_INPUT_POSITION_COORDINATES:
      return { ...state, inputPositionCoordinates: action.payload };

    case OBTAIN_MAIN_CONTEXT:
      return { ...state, mainContext: action.payload };

    case OBTAIN_SECOND_CONTEXT:
      return { ...state, secondContext: action.payload };

    case OBTAIN_IMAGE_SELECTED:
      return { ...state, imageSelected: action.payload };

    case RESET:
      return { ...initialState };

    case TOGGLE_INVERT_IMAGE:
      return { ...state, imageIsInverted: action.payload };

    case UPDATE_ERROR_UPLOAD_IMAGE:
      return { ...state, errorUploadImage: action.payload };

    case UPDATE_FIGURE_THRESHOLD:
      return { ...state, figureThreshold: action.payload };

    case UPDATE_GALLERY_TOGGLE:
      return { ...state, showGallery: action.payload };

    case UPDATE_GALLERY_TOGGLE2:
      return { ...state, showGallerySecond: action.payload };

    case UPDATE_GALLERY_TOGGLE3:
      return { ...state, showGalleryThird: action.payload };

    case UPDATE_IMAGE_GALLERY:
      const id = action.payload;
      const imageSelected = state.imageGallery[0].map((img) => {
        return { ...img, selected: img.id === id ? !img.selected : false };
      });
      return { ...state, imageGallery: [imageSelected] };

    case UPDATE_INPUT_DATA:
      return { ...state, inputData: action.payload };

    case UPDATE_LOADING:
      return { ...state, loading: !state.loading };

    case UPDATE_STYLE_FONT:
      const updatedStyleFont = {
        ...state.styleFont,
        ...action.payload,
      };
      return {
        ...state,
        styleFont: updatedStyleFont,
      };

    default:
      return state;
  }
};

/**
 * Proveedor del contexto de la aplicación.
 * @param {Object} props - Las propiedades del componente.
 * @param {React.ReactNode} props.children - Los componentes hijos a envolver.
 * @returns {JSX.Element} - El componente Provider con el contexto.
 */
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const createAction = actionsFactory(dispatch);

  // Definir las acciones utilizando la fábrica de acciones
  const { imageActions, styleActions, inputActions, othersActions } =
    defineActions(createAction);

  const actions = {
    ...imageActions,
    ...styleActions,
    ...inputActions,
    ...othersActions,
  };

  return (
    <AppContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </AppContext.Provider>
  );
};

/**
 * Hook para utilizar el contexto de la aplicación.
 * @returns {Object} - El contexto de la aplicación que incluye el estado, el despachador y las acciones.
 * @throws {Error} - Lanza un error si el hook se usa fuera del proveedor de contexto.
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(
      'useAppContext debe ser utilizado dentro de un AppProvider'
    );
  }
  return context;
};
