import actionTypes from '../constants/actionTypes';

/**
 * Utiliza la función `createAction` para generar las acciones a partir de los tipos de acción definidos en `actionTypes`.
 *
 * @namespace ACTIONS
 * @param {Function} createAction - Función para crear una acción.
 * @returns {Object} - Objeto con acciones.
 */
const defineActions = (createAction) => {
  /**
   * Acciones relacionadas con la manipulación y carga de imágenes.
   * @memberof ACTIONS
   * @typedef {Object} imageActions
   * @property {Function} checkImageLoadedAction - Acción para verificar si la imagen se ha cargado.
   * @property {Function} checkImageProcessedAction - Acción para verificar si la imagen ha sido procesada.
   * @property {Function} obtainImageAction - Acción para obtener una imagen.
   * @property {Function} obtainImageBorderAction - Acción para obtener el borde de una imagen.
   * @property {Function} obtainImageBorderPixelsAction - Acción para obtener los píxeles del borde de una imagen.
   * @property {Function} obtainImageGalleryAction - Acción para obtener la galería de imágenes.
   * @property {Function} toggleInvertImageAction - Acción para alternar la herramienta de selección de la imagen.
   * @property {Function} updateErrorUploadImageAction - Acción para actualizar el error en la carga de imagen.
   * @property {Function} updateImageGalleryAction - Acción para actualizar la galería de imágenes.
   */
  return {
    imageActions: {
      checkImageLoadedAction: createAction(actionTypes.CHECK_IMAGE_LOADED),
      checkImageProcessedAction: createAction(
        actionTypes.CHECK_IMAGE_PROCESSED
      ),
      obtainImageAction: createAction(actionTypes.OBTAIN_IMAGE),
      obtainImageBorderAction: createAction(actionTypes.OBTAIN_IMAGE_BORDER),
      obtainImageBorderPixelsAction: createAction(
        actionTypes.OBTAIN_IMAGE_BORDER_PIXELS
      ),
      obtainImageGalleryAction: createAction(actionTypes.OBTAIN_IMAGE_GALLERY),
      toggleInvertImageAction: createAction(actionTypes.TOGGLE_INVERT_IMAGE),
      updateErrorUploadImageAction: createAction(
        actionTypes.UPDATE_ERROR_UPLOAD_IMAGE
      ),
      updateImageGalleryAction: createAction(actionTypes.UPDATE_IMAGE_GALLERY),
    },
    /**
     * Acciones relacionadas con la actualización de estilos.
     *
     * @memberof ACTIONS
     * @typedef {Object} styleActions
     * @property {Function} updateStyleColorAction - Acción para actualizar el color de estilo de la fuente.
     * @property {Function} updateStyleBackgroundColorAction - Acción para actualizar el color de fondo del estilo de la fuente.
     * @property {Function} updateStyleFontAction - Acción para actualizar la fuente de estilo.
     * @property {Function} updateStyleSizeAction - Acción para actualizar el tamaño de la fuente de estilo.
     */
    styleActions: {
      updateStyleColorAction: createAction(actionTypes.UPDATE_STYLE_FONT),
      updateStyleBackgroundColorAction: createAction(
        actionTypes.UPDATE_STYLE_FONT
      ),
      updateStyleFontAction: createAction(actionTypes.UPDATE_STYLE_FONT),
      updateStyleSizeAction: createAction(actionTypes.UPDATE_STYLE_FONT),
    },
    /**
     * Acciones relacionadas con la entrada de datos del usuario.
     *
     * @memberof ACTIONS
     * @typedef {Object} inputActions
     * @property {Function} checkInputSettedAction - Acción para verificar si la entrada está establecida.
     * @property {Function} obtainInputPositionCoordinatesAction - Acción para obtener las coordenadas de la posición de entrada.
     * @property {Function} updateInputDataAction - Acción para actualizar los datos de entrada.
     */
    inputActions: {
      checkInputSettedAction: createAction(actionTypes.CHECK_INPUT_SETTED),
      obtainInputPositionCoordinatesAction: createAction(
        actionTypes.OBTAIN_INPUT_POSITION_COORDINATES
      ),
      updateInputDataAction: createAction(actionTypes.UPDATE_INPUT_DATA),
    },
    /**
     * Acciones relacionadas con otras funcionalidades diversas.
     *
     * @memberof ACTIONS
     * @typedef {Object} othersActions
     * @property {Function} obtainCanvasSizeAction - Acción para obtener el tamaño del lienzo.
     * @property {Function} obtainMainContextAction - Acción para obtener el contexto principal.
     * @property {Function} obtainSecondContextAction - Acción para obtener el segundo contexto.
     * @property {Function} obtainImageSelectedAction - Acción para obtener la imagen seleccionada.
     * @property {Function} resetAction - Acción para restablecer el estado.
     * @property {Function} updateFigureThresholdAction - Acción para actualizar el umbral de figura.
     * @property {Function} updateGalleryToggleAction - Acción para actualizar el interruptor de la galería.
     * @property {Function} updateGalleryToggleActionSecond - Acción para actualizar el segundo interruptor de la galería.
     * @property {Function} updateGalleryToggleActionThird - Acción para actualizar el tercer interruptor de la galería.
     */
    othersActions: {
      obtainCanvasSizeAction: createAction(actionTypes.OBTAIN_CANVAS_SIZE),
      obtainMainContextAction: createAction(actionTypes.OBTAIN_MAIN_CONTEXT),
      obtainSecondContextAction: createAction(
        actionTypes.OBTAIN_SECOND_CONTEXT
      ),
      obtainImageSelectedAction: createAction(
        actionTypes.OBTAIN_IMAGE_SELECTED
      ),
      resetAction: createAction(actionTypes.RESET),
      updateFigureThresholdAction: createAction(
        actionTypes.UPDATE_FIGURE_THRESHOLD
      ),
      updateGalleryToggleAction: createAction(
        actionTypes.UPDATE_GALLERY_TOGGLE
      ),
      updateGalleryToggleActionSecond: createAction(
        actionTypes.UPDATE_GALLERY_TOGGLE2
      ),
      updateGalleryToggleActionThird: createAction(
        actionTypes.UPDATE_GALLERY_TOGGLE3
      ),
    },
  };
};

export default defineActions;
