/**
 * Conjunto de tipos de acciones utilizados en el sistema.
 * @namespace ACTION_STYPE_DATA
 * @type {Object} 
 * @property {string} CHECK_IMAGE_LOADED - Acción para verificar si la imagen se ha cargado.
 * @property {string} CHECK_IMAGE_PROCESSED - Acción para verificar si la imagen ha sido procesada.
 * @property {string} CHECK_INPUT_SETTED - Acción para verificar si la entrada ha sido establecida.
 * @property {string} OBTAIN_CANVAS_SIZE - Acción para obtener el tamaño del lienzo.
 * @property {string} OBTAIN_IMAGE - Acción para obtener la imagen.
 * @property {string} OBTAIN_IMAGE_BORDER - Acción para obtener el borde de la imagen.
 * @property {string} OBTAIN_IMAGE_BORDER_PIXELS - Acción para obtener los píxeles del borde de la imagen.
 * @property {string} OBTAIN_IMAGE_GALLERY - Acción para obtener la galería de imágenes.
 * @property {string} OBTAIN_IMAGE_SELECTED - Acción para obtener la imagen seleccionada.
 * @property {string} OBTAIN_INPUT_POSITION_COORDINATES - Acción para obtener las coordenadas de posición de la entrada.
 * @property {string} OBTAIN_MAIN_CONTEXT - Acción para obtener el contexto principal.
 * @property {string} RESET - Acción para restablecer el estado.
 * @property {string} OBTAIN_SECOND_CONTEXT - Acción para obtener el segundo contexto.
 * @property {string} TOGGLE_INVERT_IMAGE - Acción para alternar la herramienta de selección de la imagen.
 * @property {string} UPDATE_ERROR_UPLOAD_IMAGE - Acción para actualizar el error al cargar la imagen.
 * @property {string} UPDATE_FIGURE_THRESHOLD - Acción para actualizar el umbral de la figura.
 * @property {string} UPDATE_IMAGE_GALLERY - Acción para actualizar la galería de imágenes.
 * @property {string} UPDATE_INPUT_DATA - Acción para actualizar los datos de entrada.
 * @property {string} UPDATE_LOADING - Acción para actualizar el estado de carga.
 * @property {string} UPDATE_STYLE_FONT - Acción para actualizar el estilo de la fuente.
 * @property {string} UPDATE_GALLERY_TOGGLE - Acción para actualizar el interruptor de la galería.
 * @property {string} UPDATE_GALLERY_TOGGLE2 - Acción para actualizar el segundo interruptor de la galería.
 * @property {string} UPDATE_GALLERY_TOGGLE3 - Acción para actualizar el tercer interruptor de la galería.
 */
const actionTypes = {
  CHECK_IMAGE_LOADED: 'CHECK_IMAGE_LOADED',
  CHECK_IMAGE_PROCESSED: 'CHECK_IMAGE_PROCESSED',
  CHECK_INPUT_SETTED: 'CHECK_INPUT_SETTED',
  OBTAIN_CANVAS_SIZE: 'OBTAIN_CANVAS_SIZE',
  OBTAIN_IMAGE: 'OBTAIN_IMAGE',
  OBTAIN_IMAGE_BORDER: 'OBTAIN_IMAGE_BORDER',
  OBTAIN_IMAGE_BORDER_PIXELS: 'OBTAIN_IMAGE_BORDER_PIXELS',
  OBTAIN_IMAGE_GALLERY: 'OBTAIN_IMAGE_GALLERY',
  OBTAIN_IMAGE_SELECTED: 'OBTAIN_IMAGE_SELECTED',
  OBTAIN_INPUT_POSITION_COORDINATES: 'OBTAIN_INPUT_POSITION_COORDINATES',
  OBTAIN_MAIN_CONTEXT: 'OBTAIN_MAIN_CONTEXT',
  RESET: 'RESET',
  OBTAIN_SECOND_CONTEXT: 'OBTAIN_SECOND_CONTEXT',
  TOGGLE_INVERT_IMAGE: 'TOGGLE_INVERT_IMAGE',
  UPDATE_ERROR_UPLOAD_IMAGE: 'UPDATE_ERROR_UPLOAD_IMAGE',
  UPDATE_FIGURE_THRESHOLD: 'UPDATE_FIGURE_THRESHOLD',
  UPDATE_IMAGE_GALLERY: 'UPDATE_IMAGE_GALLERY',
  UPDATE_INPUT_DATA: 'UPDATE_INPUT_DATA',
  UPDATE_LOADING: 'UPDATE_LOADING',
  UPDATE_STYLE_FONT: 'UPDATE_STYLE_FONT',
  UPDATE_GALLERY_TOGGLE: 'UPDATE_GALLERY_TOGGLE',
  UPDATE_GALLERY_TOGGLE2: 'UPDATE_GALLERY_TOGGLE2',
  UPDATE_GALLERY_TOGGLE3: 'UPDATE_GALLERY_TOGGLE3',
};

export default actionTypes;
