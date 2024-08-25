import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '../context/AppContext';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { MdContentPaste } from 'react-icons/md';
import { GiInvertedDice5 } from 'react-icons/gi';
import { TEXT_STRINGS, VALIDATION_MESSAGES } from '../constants/uiConstants';
import { Button } from './';
import { useGenerateTextLoremIpsum } from '../../hooks';

/**
 * Componente `Textarea` que permite al usuario editar y manipular texto en un área de texto.
 * Ofrece funcionalidades para borrar, pegar y generar texto lorem ipsum.
 *
 * @module common/Textarea
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.id - Identificador único para el área de texto.
 *
 * @returns {JSX.Element}  El componente de área de texto con botones para manipular el texto.
 *
 * @example
 * // Ejemplo de uso del componente Textarea
 * import React from 'react';
 * import {Textarea} from '../common'
 *
 * const MyComponent = () =>{
 *   return(
 *    <Textarea id="my-textarea" /> *
 *   )
 * }
 * export default MyComponent;
 */
const Textarea = ({ id }) => {
  const { actions, state } = useAppContext();
  const { updateInputDataAction } = actions;
  const { inputData } = state;

  /**
   * Maneja la actualización del texto en el área de texto.
   * @param {React.ChangeEvent<HTMLTextAreaElement>} event - Evento de cambio en el área de texto.
   * @member module:common/Textarea
   */
  const handleUpdateText = (event) => {
    const newText = event.target.value;
    updateInputDataAction(newText);
  };

  /**
   * Maneja la acción de borrar el texto en el área de texto.
   * @member module:common/Textarea
   */
  const handleDeleteText = () => updateInputDataAction('');

  /**
   * Maneja la acción de pegar el texto desde el portapapeles en el área de texto.
   * @member module:common/Textarea
   */
  const handlePasteText = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .readText()
        .then((clipText) => actions.updateInputDataAction(inputData + clipText))
        .catch(() => {
          alert(TEXT_STRINGS.CLIPBOARD_ERROR_PERMISSION);
        });
    } else {
      alert(TEXT_STRINGS.CLIPBOARD_ERROR_NOT_SUPPORTED);
    }
  };
  const handle = useGenerateTextLoremIpsum();

  /**
   * Maneja la acción de generar texto lorem ipsum y actualizar el área de texto con él.
   * @member module:common/Textarea
   */
  const handleGenerateTextLoremIpsum = () => {
    const newText = handle();
    updateInputDataAction(newText);
  };

  const buttons = [
    {
      handleClick: handleDeleteText,
      title: 'Borrar texto del editor',
      ariaLabel: 'Borrar texto',
      Icon: RiDeleteBin6Line,
    },
    {
      handleClick: handlePasteText,
      title: 'Pegar texto en el Editor',
      ariaLabel: 'Pegar texto',
      Icon: MdContentPaste,
    },
    {
      handleClick: handleGenerateTextLoremIpsum,
      title: 'Generar texto random',
      ariaLabel: 'Generar texto',
      Icon: GiInvertedDice5,
    },
  ];
  useEffect(() => {
    const initialText = TEXT_STRINGS.INITIAL_TEXT;
    updateInputDataAction(initialText);
  }, [updateInputDataAction]);

  return (
    <>
      <div className="textEditor__wrapper" tabIndex="0">
        <div className="textEditor__iconGroup">
          {buttons.map((btn, index) => (
            <div key={index} className="textEditor__iconWrapper">
              <Button
                className="textEditor__icon"
                handleClick={btn.handleClick}
                title={btn.title}
                ariaLabel={btn.ariaLabel}
                Icon={btn.Icon}
              />
            </div>
          ))}
        </div>
        <textarea
          className="textEditor__textarea"
          id={id}
          data-testid={id}
          value={inputData}
          placeholder={VALIDATION_MESSAGES.TEXTAREA_PLACEHOLDER}
          autoComplete="off"
          spellCheck="false"
          onChange={handleUpdateText}
        />
      </div>
    </>
  );
};
Textarea.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Textarea;
