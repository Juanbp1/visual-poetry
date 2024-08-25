/**
 * @namespace UI_DATA
 */

/**
 * Constantes para cadenas de texto utilizadas en la interfaz de usuario.
 * @memberof UI_DATA
 * @property {string} DROPZONE_MESSAGE - Mensaje mostrado en la zona de arrastre de imágenes.
 * @property {string} DROPZONE_ACTIVE - Mensaje mostrado cuando la zona de arrastre está activa.
 * @property {string} DROPZONE_OR - Texto que indica una alternativa en la zona de arrastre.
 * @property {string} CLIPBOARD_ERROR - Mensaje de error al pegar texto desde el portapapeles.
 * @property {string} CLIPBOARD_ERROR_PERMISSION - Mensaje de error al pegar texto desde el portapapeles, por los permisos no habilitados.
 * @property {string} CLIPBOARD_ERROR_NOT_SUPPORTED - Mensaje de error del portapales porque el navegador no es compatible.
 * @property {string} INITIAL_TEXT - Texto inicial de ejemplo.
 */
export const TEXT_STRINGS = {
  DROPZONE_MESSAGE: 'Arrastra y suelta una imagen PNG, JPG, WEBP para empezar',
  DROPZONE_ACTIVE: 'Arrastre aquí ...',
  DROPZONE_OR: 'o bien',
  CLIPBOARD_ERROR: 'Error al pegar texto :',
  CLIPBOARD_ERROR_PERMISSION: 'Error al pegar texto: No se puede acceder al portapapeles. Habilita los permisos de lectura en tu navegador.',
  CLIPBOARD_ERROR_NOT_SUPPORTED: 'Error del portapapeles: La funcionalidad del portapapeles no es compatible con tu navegador o dispositivo. Por favor, actualiza tu navegador a la última versión o usa un dispositivo compatible',
  INITIAL_TEXT: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
};

/**
 * Mensajes de validación utilizados en la interfaz de usuario.
 * @memberof UI_DATA
 * @type {Object}
 * @property {string} DROPZONE_ERROR - Mensaje de error para archivos no válidos en la zona de arrastre.
 * @property {string} TEXTAREA_PLACEHOLDER - Texto de marcador de posición en el área de texto.
 */
export const VALIDATION_MESSAGES = {
  DROPZONE_ERROR:
    'El archivo no es válido. Por favor, carga solo imágenes (PNG, JPG, WEBP).',
  TEXTAREA_PLACEHOLDER: 'Escribe aquí el contenido a rellenar de la figura ...',
};

/**
 * Tipos de dispositivos soportados.
 * @memberof UI_DATA
 * @type {Object}
 * @property {string} MOBILE - Tipo de dispositivo móvil.
 * @property {string} TABLET - Tipo de dispositivo tableta.
 * @property {string} LAPTOP - Tipo de dispositivo portátil.
 */
export const DEVICE_TYPES = {
  MOBILE: 'mobile',
  TABLET: 'tablet',
  LAPTOP: 'laptop',
};

/**
 * Tamaños de texto disponibles para la interfaz de usuario.
 * @memberof UI_DATA
 * @type {Object[]}
 * @property {number} value - Valor numérico del tamaño del texto.
 * @property {string} label - Etiqueta descriptiva del tamaño del texto.
 */
export const SIZE_TEXT = [
  { value: 8, label: 'Mini' },
  { value: 16, label: 'Muy pequeño' },
  { value: 20, label: 'Pequeño' },
  { value: 26, label: 'Mediano' },
  { value: 30, label: 'Grande' },
  { value: 40, label: 'Muy grande' },
];

/**
 * Fuentes tipográficas disponibles para la interfaz de usuario.
 * @memberof UI_DATA
 * @type {Object[]}
 * @property {string} value - Valor de la fuente tipográfica.
 * @property {string} label - Etiqueta descriptiva de la fuente.
 */
export const FONTS = [
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Verdana', label: 'Verdana' },
  { value: 'Times New Roman', label: 'Times New Roman' },
];

/**
 * Datos de las imágenes disponibles para la interfaz de usuario.
 * @memberof UI_DATA
 * @type {Object[]}
 * @property {string} name - Nombre identificador de la imagen.
 */
export const IMAGE_DATA = [
  { name: 'barco' },
  { name: 'aguila' },
  { name: 'dinosaurio' },
  { name: 'buzo' },
  { name: 'gato 1' },
  { name: 'gato 2' },
  { name: 'okusai' },
  { name: 'tiburon' },
  { name: 'paloma' },
  { name: 'chica' },
  { name: 'monster' },
  { name: 'mago' },
  { name: 'slime' },
  { name: 'minecraft' },
  { name: 'pokemon 1' },
  { name: 'pokemon 2' },
  { name: 'pokemon 3' },
  { name: 'hombre' },
  { name: 'cafe' },
  { name: 'goblin' },
  { name: 'woman' },
  { name: 'motorista' },
  { name: 'araña' },
  { name: 'barbaro' },
];

/**
 * Datos de ejemplo para la galería de imágenes.
 * @memberof UI_DATA
 * @type {Object[]}
 * @property {string} name - Nombre identificador de la imagen.
 */
export const IMAGE_GALLERY_EXAMPLE_DATA = [
  { name: 'Image-1' },
  { name: 'Image-2' },
  { name: 'Image-3' },
  { name: 'Image-4' },
  { name: 'Image-5' },
  { name: 'Image-6' },
  { name: 'Image-7' },
  { name: 'Image-8' },
  { name: 'Image-9' },
  { name: 'Image-10' },
  { name: 'Image-11' },
  { name: 'Image-12' },
];

/**
 * Contextos para la carga de imágenes desde los directorios.
 * @memberof UI_DATA
 * @type {Object}
 * @property {function} imagesGallery - Contexto para las imágenes de la galería.
 * @property {function} imagesGalleryExample - Contexto para las imágenes de ejemplo.
 */
export const CONTEXTS = {
  imagesGallery: require.context(
    '../../assets/imgs/ui/content/gallery-images',
    true,
    /\.(png|jpe?g|svg)$/
  ),
  imagesGalleryExample: require.context(
    '../../assets/imgs/ui/content/examples-images',
    true,
    /\.(png|jpe?g|svg)$/
  ),
};

/**
 * Menú de navegación de la interfaz de usuario.
 * @memberof UI_DATA
 * @type {Object[]}
 * @property {string} href - URL del enlace del menú.
 * @property {string} label - Etiqueta descriptiva del ítem del menú.
 */
export const MENU = [
  { href: '/#quickStartId', label: 'Inicio rápido' },
  { href: '/#dropzoneId', label: 'Subir imagen' },
  { href: '/#exampleGalleryId', label: 'Galeria de ejemplos' },
  { href: '/#faqsId', label: 'Preguntas frecuentes' },
];
