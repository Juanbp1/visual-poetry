import React, { useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import { FaCircle } from 'react-icons/fa';
import { IoInvertMode } from 'react-icons/io5';
import { SIZE_TEXT, FONTS } from '../constants/uiConstants';
import {
  SelectionTool,
  CanvasTextEditor,
  ColorPickerControl,
  SelectDropdown,
  Slider,
} from '../VisualPoetry/canvasToolbox';

/**
 * Componente que representa la caja de herramientas del canvas.
 * @module layout/EditorToolbox
 * @returns {JSX.Element} El componente de la caja de herramientas del canvas.
 * @example
 * // Uso del componente EditorToolbox
 * import React from 'react';
 * import { EditorToolbox } from '../layout';
 *
 * const MyComponent = () => {
 * return(
 *   <EditorToolbox/>
 *  );
 * }
 * export default MyComponent;
 */
const EditorToolbox = () => {
  const { state, actions } = useAppContext();
  const { styleFont } = state;
  const { background, color, font } = styleFont;
  const {
    updateStyleColorAction,
    updateStyleBackgroundColorAction,
    updateStyleFontAction,
    updateStyleSizeAction,
  } = actions;

  /**
   * Maneja el cambio de color del texto.
   * @member module:layout/EditorToolbox
   * @param {string} newColor - El nuevo color que se aplicará al texto.
   */
  const handleInputColor = (newColor) => {
    updateStyleColorAction({ color: newColor });
  };

  /**
   * Maneja el cambio de color de fondo del lienzo.
   * @member module:layout/EditorToolbox
   * @param {string} newBackground - El nuevo color de fondo que se aplicará al lienzo.
   */
  const handleInputBackgroundColor = (newBackground) => {
    updateStyleBackgroundColorAction({ background: newBackground });
  };

  /**
   * Maneja la selección de la familia de fuentes para el texto.
   * @member module:layout/EditorToolbox
   * @param {React.ChangeEvent<HTMLSelectElement>} event - El evento de cambio desencadenado al seleccionar una nueva familia de fuentes.
   */
  const handleSelectFontFamily = useCallback(
    (event) => {
      const newFont = `${event.target.value}`;
      updateStyleFontAction({ font: newFont });
    },
    [updateStyleFontAction]
  );

  /**
   * Maneja la selección del tamaño del texto.
   * @member module:layout/EditorToolbox
   * @param {React.ChangeEvent<HTMLSelectElement>} event - El evento de cambio se activa al seleccionar un nuevo tamaño de texto.
   */
  const handleSelectSize = useCallback(
    (event) => {
      const newSize = `${event.target.value}`;
      updateStyleSizeAction({ size: newSize });
    },
    [updateStyleSizeAction]
  );

  return (
    <div className="toolbox" data-testid="toolbox">
      <ColorPickerControl
        id="color"
        IconComponent={FaCircle}
        currentColor={color}
        handleChange={handleInputColor}
        title="Color del texto"
      />
      <ColorPickerControl
        id="background"
        IconComponent={FaCircle}
        currentColor={background}
        handleChange={handleInputBackgroundColor}
        title="Color del fondo"
      />
      <SelectDropdown
        id="fonts"
        handleChange={handleSelectFontFamily}
        title="Fuente del texto"
        options={FONTS}
        defaultValue={font}
      />
      <SelectDropdown
        id="size"
        handleChange={handleSelectSize}
        title="Tamaño de texto"
        options={SIZE_TEXT}
        defaultValue={styleFont.size}
      />
      <SelectionTool
        id="selectionTool"
        IconComponent={IoInvertMode}
        title="Herramienta selección"
      />
      <Slider id="cutPoint" title="Punto de corte" />
      <CanvasTextEditor title="Texto" id="textEditor" />
    </div>
  );
};

export default EditorToolbox;
