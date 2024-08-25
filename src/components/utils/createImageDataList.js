import { v4 as uuidv4 } from 'uuid';

/**
 * Esta función toma una lista de imágenes y un contexto de módulo para importar las imágenes. Cada objeto en la lista resultante contiene la ruta de la imagen, el nombre, una propiedad de selección inicializada en `false` y un identificador único generado con `uuidv4()`.
 * 
 * @module utils/createImageDataList
 * @param {Array<{name: string}>} images - Una lista de objetos de imagen, cada uno con una propiedad `name` que representa el nombre de la imagen (sin la extensión).
 * @param {function(string): string} context - Una función de contexto que permite importar imágenes dinámicamente. Debe ser un contexto de módulo creado por `require.context` en Webpack.
 * @returns {Array<{path: string, name: string, selected: boolean, id: string}>} - Una lista de objetos de datos de imagen, cada uno con las propiedades `path`, `name`, `selected`, e `id`.
 *
 * @example
 * // Suponiendo que tenemos una lista de imágenes y una función de contexto adecuada:
 * const images = [{ name: 'logo' }, { name: 'banner' }];
 * const context = require.context('./images', true, /\.png$/);
 * 
 * const imageDataList = createImageDataList(images, context);
 * console.log(imageDataList);
 * // [{ path: './images/logo.png', name: 'logo', selected: false, id: 'uuid1' }, { path: './images/banner.png', name: 'banner', selected: false, id: 'uuid2' }]
 */
const createImageDataList = (images, context) => {
  // const imageContext = require.context(context, true, /\.png$/);
  
  return images.map((image) => ({
    path: context(`./${image.name}.png`),
    name: image.name,
    selected: false,
    id: uuidv4(),
  }));
};
export default createImageDataList;
