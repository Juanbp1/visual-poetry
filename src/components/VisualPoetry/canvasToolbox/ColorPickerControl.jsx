import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { checkIsColorLight } from '../../utils';
import { HexColorInput, HexColorPicker } from 'react-colorful';
import { useCloseSelector } from '../../../hooks';
import { useColorPicker } from '../../../hooks/useColorPicker';
import classNames from 'classnames';

/**
 * `ColorPickerControl` es un componente de React que proporciona una interfaz para seleccionar colores.
 * Permite a los usuarios seleccionar un color a través de un selector de color y actualizar el color
 * de un ícono que se muestra en la interfaz de usuario.
 *
 * @module canvasToolbox/ColorPickerControl
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.id - Un identificador único para el componente.
 * @param {React.ElementType} props.IconComponent - El componente de ícono a mostrar.
 * @param {string} props.currentColor - El color actual en formato hexadecimal.
 * @param {Function} props.handleChange - Función que se llama cuando se cambia el color.
 * @param {string} props.title - El título que se mostrará para el selector de color.
 * @returns {JSX.Element} - Un elemento JSX que representa el componente `ColorPickerControl`.
 * @example
 * import React from 'react';
 * import { ColorPickerControl } from '../canvasToolbox'
 * const MyIcon = () => <svg>...</svg>;
 *
 * const MyComponent = () => (
 *   <ColorPickerControl
 *     id="colorPicker1"
 *     IconComponent={MyIcon}
 *     currentColor="#FF5733"
 *     handleChange={(newColor) => console.log('Nuevo color:', newColor)}
 *     title="Seleccione un color"
 *   />
 * );
 * export default MyComponent;
 */
const ColorPickerControl = ({
  id,
  IconComponent,
  currentColor,
  handleChange,
  title,
}) => {
  const [colorLight, setColorLight] = useState(false);
  const isDefaultColor = currentColor === '#FF000000';

  const { isOpen, toggleColorPicker, handleKeyDown } = useColorPicker();
  const pickerRef = useCloseSelector(toggleColorPicker, isOpen);

  /**
   * Maneja el cambio de color en el selector.
   * Llama a `handleChange` con el nuevo color seleccionado.
   * @member module:canvasToolbox/ColorPickerControl
   * @param {string} newColor - El nuevo color seleccionado en formato hexadecimal.
   */
  const handleColorChange = useCallback(
    (newColor) => handleChange(newColor),
    [handleChange]
  );

  /** 
   * Actualiza el estado `colorLight` basado en el color actual.
   * Se determina si el color es claro o oscuro utilizando `checkIsColorLight`.
   * @member module:canvasToolbox/ColorPickerControl
   */
  const updateColorLightStatus = useCallback(() => {
    const isColorLight = checkIsColorLight(currentColor);
    setColorLight(isColorLight);
  }, [currentColor]);

  useEffect(() => {
    updateColorLightStatus();
  }, [currentColor, updateColorLightStatus]);

  /**
   * Calcula la clase CSS del ícono en base al color actual y si es el color por defecto.
   * @member module:canvasToolbox/ColorPickerControl
   * @returns {string} - La clase CSS que se aplica al ícono.
   */
  const iconColorClass = classNames('toolbox__icon', 'toolbox--boxShadow', {
    toolbox__borderIcon: isDefaultColor || colorLight,
  });
  return (
    <span
      className="toolbox__wrapper toolbox__wrapper--no-pointer-events pickerColor"
      title={title}
      data-testid={id}
    >
      <label className="toolbox__title" data-testid={`${id}Title`}>
        {title}
      </label>
      <div className="toolbox__iconWrapper" ref={pickerRef}>
        <IconComponent
          data-testid="colorIcon"
          className={iconColorClass}
          onClick={toggleColorPicker}
          onKeyDown={(e) => handleKeyDown(e)}
          style={{ color: currentColor }}
          tabIndex="0"
          role="button"
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          aria-label={`Seleccionar ${title}`}

        />

        {isOpen && (
          <span
            className="pickerColor__container"
            data-testid="pickerColorPanel"
          >
            <HexColorInput
              className="pickerColor__input"
              data-testid="pickerColorInput"
              color={currentColor}
              onChange={handleColorChange}
              prefixed
            />
            <HexColorPicker
              id={id}
              label={title}
              color={currentColor}
              onChange={handleColorChange}
            />
          </span>
        )}
      </div>
    </span>
  );
};
 
ColorPickerControl.propTypes = {
  id: PropTypes.string.isRequired,
  IconComponent: PropTypes.elementType.isRequired,
  currentColor: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};
export default ColorPickerControl;
