import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { AppProvider } from '../../components/context/AppContext';
import { mockUseMediaQuery } from '../mockUseMediaQuery';
import {
  BrowserVideoPlayer,
  MobileVideoPlayer,
} from '../../components/VisualPoetry/sections';

import { testScrollToSection } from '../helpers/userHelpers';

import { FrontPages } from '../../components/VisualPoetry/sections';

const renderHomeSection = () => {
  render(
    <AppProvider>
      <FrontPages />
    </AppProvider>
  );
};
describe('La sección frontpage debe funcionar correctamente', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('Se debería renderizar el título y la descripción principal', () => {
    renderHomeSection();
    const title = screen.getByTestId('frontpageTitle');
    const text = screen.getByTestId('frontpageText');

    expect(title).toHaveTextContent('Visual Poetry');
    expect(text).toHaveTextContent('Convierte imágenes en arte textual');
  });
  test('El boton "Comenzar a crear" bebería ser representado correctamente', () => {
    renderHomeSection();

    const button = screen.getByTestId('frontpageButton');
    expect(button).toMatchSnapshot();
  });
  test('Debería desplazarse a la sección Dropzone al hacer clic en el botón "Comenzar a crear"', () => {
    testScrollToSection('/', 'frontpageButton', 'dropzoneId', {
      behavior: 'smooth',
      block: 'end',
    });
  });
  test('No debería desplazarse si la sección a la que se intenta ir no es la correcta', () => {
    testScrollToSection('/', 'frontpageButton', 'dropzoneId', {}, false);
  });
  test('El video debería tener las propiedades autoPlay, muted, loop, playsInline y playbackRate', async () => {
    render(
      <AppProvider>
        <BrowserVideoPlayer />
      </AppProvider>
    );
    const videoElement = screen.getByTestId('browserVideoPlayer');
    expect(videoElement).toBeInTheDocument();

    expect(videoElement).toHaveAttribute('autoPlay');
    expect(videoElement).toHaveAttribute('loop');
    expect(videoElement).toHaveAttribute('playsInline');
    expect(videoElement.playbackRate).toBe(1.2);
  });

  test('El video (diseño movíl) debería tener las propiedades autoPlay, muted, loop, playsInline y playbackRate', async () => {
    mockUseMediaQuery({ isMobile: true });
    render(
      <AppProvider>
        <MobileVideoPlayer />
      </AppProvider>
    );
    const videoElement = screen.getByTestId('mobileVideoPlayer');
    expect(videoElement).toBeInTheDocument();

    expect(videoElement).toHaveAttribute('autoPlay');
    expect(videoElement).toHaveAttribute('loop');
    expect(videoElement).toHaveAttribute('playsInline');
    expect(videoElement.playbackRate).toBe(1.2);
  });
});
