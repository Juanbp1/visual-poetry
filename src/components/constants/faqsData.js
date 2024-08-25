/**
 * Este módulo exporta una constante que contiene un array de objetos, cada uno representando una pregunta y su respuesta correspondiente.
 * @type {Array<Object>} 
 * @property {string} question - La pregunta que se muestra en la sección de Preguntas Frecuentes.
 * @property {string} answer - La respuesta correspondiente a la pregunta en la sección de Preguntas Frecuentes.
 * @example
 * Acceder a los datos de las preguntas frecuentes
 * const faqs = FAQS_DATA;
 * Obtener la primera pregunta
 * console.log(faqs[0].question);
 * Output: "¿Qué es Visual Poetry?"
 * Obtener la respuesta a la primera pregunta
 * console.log(faqs[0].answer);
 * Output: "Visual Poetry es una herramienta online que permite subir una imagen, convertirla en un lienzo
 * y luego pintar texto sobre ella con la forma de la figura principal de la imagen. Puedes personalizar
 * el texto y exportar el resultado final como una nueva imagen."
 */
const FAQS_DATA = [
  {
    question: '¿Qué es Visual Poetry?',
    answer:
      'Visual Poetry es una herramienta online que, permite subir una imagen, convertirla en un lienzo y luego pintar texto sobre ella con la forma de la figura principal de la imagen. Puedes personalizar el texto y exportar el resultado final como una nueva imagen',
  },
  {
    question: '¿Qué tipo de imágenes puedo usar?',
    answer:
      'Puedes usar cualquier imagen en formato JPG, PNG o WEBP. La app funciona mejor con imágenes que tengan un buen contraste entre el fondo y la figura principal.',
  },
  {
    question: '¿Qué navegadores web son compatibles con esta Web?',
    answer:
      'Esta Web App es compatible con los navegadores web modernos, como Chrome, Opera y Edge',
  },
  {
    question: '¿Cuánto tiempo tarda en procesarse una imagen?',
    answer:
      'El tiempo de procesamiento depende del tamaño y la complejidad de la imagen. En general, las imágenes se procesan en cuestión de segundos',
  },
  {
    question: '¿Cómo funciona?',
    answer:
      '1. Sube una imagen. 2. Escribe tu texto y personalízalo la fuente, colores y estilos. 3. Exporta tu creación como una nueva imagen',
  },
];

export default FAQS_DATA;
