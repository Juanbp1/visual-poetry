/**
 * @module canvasToolbox
 * @description Biblioteca de herramientas para la edición y manipulación de lienzos. Incluye varios componentes
 * que facilitan la interacción con el lienzo y el control del contenido visual.
 *
 * @see {@link module:canvasToolbox/CanvasDownloader|CanvasDownloader} - Componente para descargar el contenido del lienzo.
 * @see {@link module:canvasToolbox/RenderFormatButtons|RenderFormatButtons} - Componente para mostrar los botones con los formatos a exportar.
 * @see {@link module:canvasToolbox/editor/CanvasTextEditor|CanvasTextEditor} - Componente para editar texto dentro del lienzo.
 * @see {@link module:canvasToolbox/editor/DesktopEditor|DesktopEditor} - Componente para la versión de escritorio del editor de texto.
 * @see {@link module:canvasToolbox/editor/MobileEditor|MobileEditor} - Componente para la versión móvil del editor de texto.
 * @see {@link module:canvasToolbox/SelectionTool|SelectionTool} - componente que proporciona una interfaz para controlar el modo de selección de la imagen.
 * @see {@link module:canvasToolbox/SelectionButton|SelectionButton} - Componente auxiliar para representar un botón de selección
 * @see {@link module:canvasToolbox/ColorPickerControl|ColorPickerControl} - Componente para seleccionar colores para el lienzo.
 * @see {@link module:canvasToolbox/SelectDropdown|SelectDropdown} - Componente de selección desplegable para opciones.
 * @see {@link module:canvasToolbox/Slider|Slider} - Componente de deslizador para ajustar valores.
 */

export { default as CanvasDownloader } from './CanvasDownloader';
export { default as RenderFormatButtons } from './RenderFormatButtons';
export { default as CanvasTextEditor } from './editor/CanvasTextEditor';
export { default as DesktopEditor } from './editor/DesktopEditor';
export { default as MobileEditor } from './editor/MobileEditor';
export { default as SelectionTool } from './SelectionTool';
export { default as SelectionButton } from './SelectionButton';
export { default as ColorPickerControl } from './ColorPickerControl';
export { default as SelectDropdown } from './SelectDropdown';
export { default as Slider } from './Slider';
