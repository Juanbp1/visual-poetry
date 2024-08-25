/**
 * Comprueba si un color hexadecimal es claro.
 *
 * @module utils/checkIsColorLight
 * @param {string} hexColor - El color en formato hexadecimal (por ejemplo, "#RRGGBB" o "#RGB").
 * @returns {boolean} - Devuelve `true` si el color es claro, `false` si es oscuro o si el formato del color es inválido.
 *
 * @example
 * // Ejemplos de uso del colorUtils
 * checkIsColorLight("#FFFFFF"); // true
 * checkIsColorLight("#000000"); // false
 * checkIsColorLight("#GHIJKL"); // false (color inválido)
 * checkIsColorLight("#"); // false (color inválido)
 */

//Comprobar si un color es claro
const checkIsColorLight = (hexColor) => {
  if (!hexColor || !hexColor.match(/^#([0-9A-F]{3}){1,2}$/i)) {
    return false;
  }

  //Elimiar el símbolo "#" si esta presente
  hexColor = hexColor.replace(/^#/, '');

  //Convertir el valor hexadecimal a valores de RGB
  const red = parseInt(hexColor.substr(0, 2), 16);
  const green = parseInt(hexColor.substr(2, 2), 16);
  const blue = parseInt(hexColor.substr(4, 2), 16);

  const average = (red + green + blue) / 3;

  const threshold = 192;

  return average > threshold;
};
export default checkIsColorLight;
