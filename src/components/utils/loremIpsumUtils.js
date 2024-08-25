import { loremIpsum } from 'lorem-ipsum';
/**
 * Genera un texto de Lorem Ipsum con una longitud aproximada de caracteres especificada.
 *
 * @module utils/generateTextLoremIpsum
 * @param {number} numberCharacter - El número objetivo de caracteres del texto generado.
 * @returns {string} - Un texto Lorem Ipsum con una longitud cercana al número de caracteres especificado.
 *
 * @example
 * // Ejemplo de uso en un script
 * import generateTextLoremIpsum from './utils/generateTextLoremIpsum';
 *
 * // Generar un texto de aproximadamente 100 caracteres
 * const shortText = generateTextLoremIpsum(100);
 * console.log('Texto corto:', shortText);
 *
 * // Generar un texto de aproximadamente 250 caracteres
 * const mediumText = generateTextLoremIpsum(250);
 * console.log('Texto mediano:', mediumText);
 *
 * // Generar un texto de aproximadamente 500 caracteres
 * const longText = generateTextLoremIpsum(500);
 * console.log('Texto largo:', longText);
 */
const generateTextLoremIpsum = (numberCharacter) => {
  const options = {
    count: 1,
    units: 'sentences',
    format: 'plain',
  };

  let newText = '';
  // let textInitial = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ';
  let currentCharacterCount = 0;

  // Generar el texto hasta alcanzar el límite de caracteres
  while (currentCharacterCount < numberCharacter) {
    const sentence = loremIpsum(options);
    currentCharacterCount += sentence.length;

    if (currentCharacterCount <= numberCharacter) {
      newText += sentence + ' ';
    }
  }
  return newText;
};

export default generateTextLoremIpsum;
