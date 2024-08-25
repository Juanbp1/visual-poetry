import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { AppProvider } from '../../components/context/AppContext';

import {
  PiNumberCircleOneFill,
  PiNumberCircleThreeFill,
  PiNumberCircleTwoFill,
} from 'react-icons/pi';
import {
  imageGallery,
  designTool,
  imageExport,
} from '../../assets/imgs/ui/design/illustrations';

import { QuickStart } from '../../components/VisualPoetry/sections';

const STEPS_DATA = [
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

const renderHomeSection = () => {
  render(
    <AppProvider>
      <QuickStart />
    </AppProvider>
  );
}; 

describe('La sección Inicio Rápido debe funcionar correctamente', () => {
  afterEach(() => {
    cleanup();
  });
  test('Se debería renderizar el titulo y texto principal', () => {
    renderHomeSection();
    const title = screen.getByTestId('quickStartTitle');
    expect(title).toHaveTextContent('Inicio Rápido');
  });
  test('Se debería renderizar la sección Inicio Rápido', async () => {
    renderHomeSection();
    const quickstartSection = await screen.findByTestId('quickStartId');
    expect(quickstartSection).toBeInTheDocument();
  });
  test('Se debería renderizar las imágenes al cargar quickStart', async () => {
    renderHomeSection();
    const imageStep = await screen.findAllByTestId('imageStep');
    expect(imageStep.length).toBeGreaterThan(0);

    STEPS_DATA.forEach((step, index) => {
      expect(imageStep[index]).toBeInTheDocument();
      expect(imageStep[index]).toHaveAttribute('alt', step.alt);
    });
  });
  test('Se debería renderizar los titulos y textos al cargar quickStart', async () => {
    renderHomeSection();
    const titleStep = await screen.findAllByTestId('titleStep');
    const textStep = await screen.findAllByTestId('textStep');
    expect(titleStep.length).toBeGreaterThan(0);
    expect(textStep.length).toBeGreaterThan(0);

    STEPS_DATA.forEach((step, index) => {
      expect(titleStep[index]).toHaveTextContent(step.title);
      expect(textStep[index]).toHaveTextContent(step.text);
    });
  });
});
