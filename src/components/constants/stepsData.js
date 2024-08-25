import React from 'react';
import {
  PiNumberCircleOneFill,
  PiNumberCircleTwoFill,
  PiNumberCircleThreeFill,
} from 'react-icons/pi';
import {
  imageGallery,
  designTool,
  imageExport,
} from '../../assets/imgs/ui/design/illustrations';
/**
 * Datos de los pasos para el componente Quick Start.
 * @namespace STEPS_DATA
 * @type {Array<Object>}
 * @property {string} imgSrc - Ruta de la imagen.
 * @property {JSX.Element} icon - Icono del paso.
 * @property {string} title - Título del paso.
 * @property {string} text - Descripción del paso.
 * @property {string} alt - Texto alternativo para la imagen.
 */
export const STEPS_DATA = [
  {
    imgSrc: imageGallery,
    icon: <PiNumberCircleOneFill className="quickStart__icon" />,
    title: 'Selecciona una Imagen',
    text: 'Elige una imagen de la galería o bien sube una imagen desde tu dispositivo, para empezar el proceso de diseño.',
    alt: 'Ejemplo de cómo elegir una imagen de la Galería de imágenes, para comenzar el proceso de diseño.',
  },
  {
    imgSrc: designTool,
    icon: <PiNumberCircleTwoFill className="quickStart__icon" />,
    title: 'Edita tu Imagen',
    text: 'Usa la herramienta de diseño para editar la imagen con selectores de color y texto.',
    alt: 'Ejemplo de cómo usar la herramienta de diseño, donde se muestra la imagen siendo modificada por selectores de color y texto.',
  },
  {
    imgSrc: imageExport,
    icon: <PiNumberCircleThreeFill className="quickStart__icon" />,
    title: 'Exporta tu Diseño',
    text: 'Exporta tu imagen en diferentes formatos como PNG, JPG o WEBP.',
    alt: 'Ejemplo de cómo exportar un imagen en diferentes formatos. Los formatos disponibles son PNG, JPG y WEBP',
  },
];
