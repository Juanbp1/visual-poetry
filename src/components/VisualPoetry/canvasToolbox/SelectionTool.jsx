import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '../../context/AppContext';
import { SelectionButton } from '.';

/**
 * `SelectionTool` es un componente que proporciona una interfaz para controlar el modo de selección de la imagen.
 * Permite a los usuarios seleccionar entre dos opciones de herramienta de selección de imagen dentro de una figura.
 *
 * @module canvasToolbox/SelectionTool
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.id - Un identificador único para el componente, utilizado en pruebas y accesibilidad.
 * @param {string} props.title - El título que se mostrará para el selector de herramienta de selección de imagen, utilizado para la accesibilidad.
 * @returns {JSX.Element} - Un elemento JSX que representa el componente `SelectionTool`.
 */
const SelectionTool = ({ id, title }) => {
  const { state, actions } = useAppContext();
  const { imageIsInverted } = state;
  const { toggleInvertImageAction, obtainImageBorderAction } = actions;

  const handleToggleImageSelection = useCallback(
    (isInverted) => {
      toggleInvertImageAction(isInverted);
      obtainImageBorderAction();
    },
    [obtainImageBorderAction, toggleInvertImageAction]
  );

  const handleKeyDown = useCallback(
    (event, isInverted) => {
      if (['Enter', ' '].includes(event.key)) {
        handleToggleImageSelection(isInverted);
      }
    },
    [handleToggleImageSelection]
  );

  return (
    <div className="toolbox__wrapper" id={id} data-testid={id}>
      <label className="toolbox__title" data-testid={`${id}Title`}>
        {title}
      </label>
      <div className="toolbox__selectorWrapper">
        <SelectionButton
          isSelected={!imageIsInverted}
          isInverted={false}
          onClick={() => handleToggleImageSelection(false)}
          onKeyDown={(e) => handleKeyDown(e, false)}
          title="Seleccionar dentro de la figura"
          id={`${id}Title`}
        />
        <SelectionButton
          isSelected={imageIsInverted}
          isInverted={true}
          onClick={() => handleToggleImageSelection(true)}
          onKeyDown={(e) => handleKeyDown(e, true)}
          title="Seleccionar fuera de la figura"
          id={`${id}Title`}
        />
      </div>
    </div>
  );
};

SelectionTool.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default SelectionTool;