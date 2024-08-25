import { useCallback } from 'react';
import { useAppContext } from '../components/context/AppContext';
import { generateTextLoremIpsum } from '../components/utils';

/**
 * Hook personalizado para generar texto Lorem Ipsum basado en el tamaño del canvas y la fuente.
 * @module hooks/useGenerateTextLoremIpsum
 * @returns {Function} - Una función que genera texto Lorem Ipsum con el número de caracteres calculado.
 * @example
 * // Ejemplo de uso del hook useGenerateTextLoremIpsum
 * import React from 'react';
 * import useGenerateTextLoremIpsum from '../hooks/useGenerateTextLoremIpsum';
 * 
 * const TextGeneratorComponent = () => {
 *   // Utilizamos el hook para obtener la función que genera el texto Lorem Ipsum
 *   const generateText = useGenerateTextLoremIpsum();
 * 
 *   // Llamamos a la función para obtener el texto Lorem Ipsum
 *   const handleGenerateText = () => {
 *     const loremIpsumText = generateText();
 *     console.log(loremIpsumText);
 *   };
 * 
 *   return (
 *     <div>
 *       <button onClick={handleGenerateText}>Generar Texto Lorem Ipsum</button>
 *     </div>
 *   );
 * };
 *
 *export default TextGeneratorComponent;
 */
const useGenerateTextLoremIpsum = () => {
  const { state } = useAppContext();
  const { styleFont, canvasSize } = state;

  /**
   * Calcula el número total de caracteres que se pueden ajustar en el canvas
   * basado en el tamaño de la fuente y el espaciado de línea.
   * @member module:Hook/useGenerateTextLoremIpsum
   * @returns {number} - Número total de caracteres que caben en el canvas.
   */
  const calculateTotalNumberCharacters = () => {
    const marginCharacter = 0.25;
    const lineSpacing = 0.7;

    const numberCharacterLine =
      canvasSize.canvasWidth / (styleFont.size * marginCharacter);
    const numberLines =
      canvasSize.canvasHeight / (styleFont.size * lineSpacing);

    return numberCharacterLine * numberLines;
  };

  const callbackGenerateTextLoremIpsum = useCallback((numberCharacter) => {
    return generateTextLoremIpsum(numberCharacter);
  }, []);

  /**
   * Maneja la generación de texto Lorem Ipsum utilizando el número total de caracteres calculado.
   *  @member module:Hook/useGenerateTextLoremIpsum
   * @returns {string} - Texto Lorem Ipsum generado.
   */
  const handleGenerate = () => {
    const totalNumberCharacters = calculateTotalNumberCharacters();
    return callbackGenerateTextLoremIpsum(totalNumberCharacters);
  };

  return handleGenerate;
};

export default useGenerateTextLoremIpsum;
