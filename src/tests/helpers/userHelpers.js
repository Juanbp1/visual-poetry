import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { AppProvider } from '../../components/context/AppContext';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Home } from '../../components/pages';
import NotFound from '../../components/pages/NotFound';
import { AppViewer } from '../../components/pages';

// Función para verificar desplazamiento entre secciones
export const testScrollToSection = (
  initialEntries,
  buttonTestId,
  sectionTestId,
  scrollOptions,
  shouldScroll = true
) => {
  const mockScrollIntoView = jest.fn();
  window.Element.prototype.scrollIntoView = mockScrollIntoView;

  render(
    <AppProvider>
      <MemoryRouter initialEntries={[initialEntries]}>
        <Home />
        <NotFound />
      </MemoryRouter>
    </AppProvider>
  );

  // Si no se debe encontrar la sección, mock de document.getElementById para devolver null
  if (!shouldScroll) {
    jest.spyOn(document, 'getElementById').mockReturnValue(null);
  }

  const button = screen.getByTestId(buttonTestId);
  userEvent.click(button);

  const sectionElement = screen.getByTestId(sectionTestId);

  if (shouldScroll) {
    expect(sectionElement.scrollIntoView).toHaveBeenCalled();
    expect(sectionElement.scrollIntoView).toHaveBeenCalledWith(scrollOptions);
  } else {
    expect(sectionElement.scrollIntoView).not.toHaveBeenCalled();
  }

  // Limpiar el simulacro después de la prueba
  window.Element.prototype.scrollIntoView.mockRestore();
  jest.spyOn(document, 'getElementById').mockRestore(); // If used
};
// Función para verificar el deplazamiento hacia arriba
export const testScrollToTop = (
  initialEntries,
  buttonTestId,
  shouldScroll = true
) => {
  const mockScrollTo = jest.fn();
  window.scrollTo = mockScrollTo;

  render(
    <AppProvider>
      <MemoryRouter initialEntries={[initialEntries]}>
        <Home />
      </MemoryRouter>
    </AppProvider>
  );

  const button = screen.getByTestId(buttonTestId);
  expect(button).toBeInTheDocument(); // Asegurarse de que el botón existe
  userEvent.click(button);

  if (shouldScroll) {
    expect(mockScrollTo).toHaveBeenCalled();
    expect(mockScrollTo).toHaveBeenCalledWith(0, 0);
  } else {
    expect(mockScrollTo).not.toHaveBeenCalled();
  }

  window.scrollTo.mockRestore();
};

// Función para verificar los enlaces de navegación
export const verifyLinks = async (links, expectedRoutes) => {
  for (const [index, menuItem] of expectedRoutes.entries()) {
    const link = links[index]; // Obtiene el enlace correspondiente
    const linkExpected = menuItem.href;

    userEvent.click(link);

    // Verifica que el href contiene la URL correcta
    expect(link).toHaveAttribute('href', `/${linkExpected}`);

    // Espera a que la URL de la página actual cambie a la hash correspondiente
    await waitFor(() => {
      expect(window.location.hash).toBe(linkExpected);
    });
  }
};

// Función para comprobar si el elemnto radio ha sido seleccionado
export const testRadioSelection = async (selectedIndex) => {
  const radio = await screen.findAllByRole('radio');
  const insideSelector = radio[0];
  const outSelector = radio[1];

  // Comprobar el estado inicial
  expect(insideSelector).toHaveClass('selected');
  expect(outSelector).not.toHaveClass('selected');

  // Hacer clic en el selector especificado
  userEvent.click(radio[selectedIndex]);

  // Verificar el estado después del clic
  await waitFor(() => {
    if (selectedIndex === 0) {
      expect(insideSelector).toHaveClass('selected');
      expect(outSelector).not.toHaveClass('selected');
    } else {
      expect(insideSelector).not.toHaveClass('selected');
      expect(outSelector).toHaveClass('selected');
    }
  });
};

// Función para simular la carga del archivo por dropzone
export const setupTestAppViewer = jest.fn(async () => {
  // Implementación mock
  render(
    <AppProvider>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/appViewer" element={<AppViewer />} />
        </Routes>
      </MemoryRouter>
    </AppProvider>
  );

  // Simular la carga del archivo
  const image = new File(['contenido de imagen'], 'imagen.png', {
    type: 'image/png',
  });

  const dropzoneInput = await screen.findByTestId('dropzone');
  userEvent.upload(dropzoneInput, image);
});
