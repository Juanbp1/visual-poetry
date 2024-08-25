import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProvider } from '../../components/context/AppContext';
import { mockUseMediaQuery } from '../mockUseMediaQuery';

import { testScrollToSection } from '../helpers/userHelpers';

import { ExampleGallery } from '../../components/VisualPoetry/sections';

const renderHomeSection = () => {
  render(
    <AppProvider> 
      <ExampleGallery />
    </AppProvider>
  );
};
describe('La sección Example Gallery debe funcionar correctamente', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });


  test('Se debería renderizar el título y texto principal de de la sección Example Gallery', () => {
    renderHomeSection();

    const title = screen.getByTestId('exampleGalleryTitle');
    const text = screen.getByTestId('exampleGalleryText');

    expect(title).toHaveTextContent('Inspírese con Diseños Creativos');
    expect(text).toHaveTextContent(
      'Explore una galería de diseños creados con Visual Poetry para obtener ideas y descubrir su potencial'
    );
  });
  test('Se debería renderizar las imagenes de la galeria de ejemplos', () => {
    renderHomeSection();

    const imageElements = screen.getAllByTestId('exampleImage');
    expect(imageElements.length).toBeGreaterThan(0);

    imageElements.forEach((image) => {
      expect(image).toBeVisible();
    });
  });
  test('Debería desplazarse a la sección Dropzone al hacer clic en el botón "Comenzar a crear" de galeria', () => {
    testScrollToSection('/', 'exampleGalleryButton', 'dropzoneId', {
      behavior: 'smooth',
      block: 'end',
    });
  });
  test('No debería desplazarse si la sección a la que se intenta ir no es la correcta', () => {
    testScrollToSection('/', 'exampleGalleryButton', 'dropzoneId', {}, false);
  });
  test('Se debería mostrar 4 imágenes por defecto (mobile)', () => {
    mockUseMediaQuery({ isMobile: true });
    renderHomeSection();

    const imageElements = screen.getAllByTestId('exampleImage');
    expect(imageElements.length).toBe(4);
  });
  test('Se debería mostrar el resto de imágenes, cuando se haga clic en button "Ver más imágenes" (mobile)', () => {
    mockUseMediaQuery({ isMobile: true });
    renderHomeSection();

    const button = screen.getByRole('button', { name: 'Ver más imágenes' });
    userEvent.click(button);

    const imageElements = screen.getAllByTestId('exampleImage');
    expect(imageElements.length).toBeGreaterThanOrEqual(12);
    // });
  });
  test('Se debería ocultar las imágenes, cuando se haga clic en button "Ocultar imágenes", y solo quedar visibles 4 imágenes (movíl)', () => {
    mockUseMediaQuery({ isMobile: true });
    renderHomeSection();

    const button = screen.getByRole('button', { name: 'Ver más imágenes' });
    userEvent.click(button);

    const button2 = screen.getByRole('button', { name: 'Ocultar imágenes' });
    userEvent.click(button2);

    const imageElements = screen.getAllByTestId('exampleImage');
    expect(imageElements.length).toBe(4);
    // });
  });
});
