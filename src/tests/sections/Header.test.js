import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import userEvent from '@testing-library/user-event';
import { AppProvider } from '../../components/context/AppContext';
import { Home, AppViewer } from '../../components/pages';
import { mockUseMediaQuery } from '../mockUseMediaQuery';

import { verifyLinks } from '../helpers/userHelpers';
import { Header } from '../../components/layout';
import { RenderNav } from '../../components/layout';

const MENU = [
  { href: '#quickStartId', label: 'Inicio rápido' },
  { href: '#dropzoneId', label: 'Subir imagen' },
  { href: '#exampleGalleryId', label: 'Galeria de ejemplos' },
  { href: '#faqsId', label: 'Preguntas frecuentes' },
];

const renderDesktopHeader = () => {
  return render(
    <AppProvider>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home>
                <RenderNav menuItems={MENU} className="--landscape" />
              </Home>
            }
          />
        </Routes>
      </MemoryRouter>
    </AppProvider>
  );
};

const renderMobileHeader = () => {
  mockUseMediaQuery({ isMobile: true });
  return render(
    <AppProvider>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            path="/"
            element={
              <Home>
                <Header
                  classContainer="frontPageContainer__header"
                  isOpenSideBar={true}
                />
              </Home>
            }
          />
        </Routes>
      </MemoryRouter>
    </AppProvider>
  );
};

describe('El header debe funcionar correctamente (desktop)', () => {
  afterEach(() => {
    cleanup();
  });
  // Verifica si el logo del header se renderiza correctamente comparando con un snapshot
  test('El logo se muestra correctamente', () => {
    renderDesktopHeader();
    const logo = screen.getByTestId('headerLogo');
    expect(logo).toMatchSnapshot();
  });

  // Verifica si el elemento de navegación del header se renderiza con las clases esperadas
  test('El nav de navegación se muestra correctamente', async () => {
    renderDesktopHeader();

    const headerNav = screen.getByTestId('landscape');
    expect(headerNav).toHaveClass('header__nav header__nav--landscape');
    expect(headerNav).toMatchSnapshot();
  });

  // Verifica que los enlaces de navegación redirigen correctamente a las secciones correspondientes
  test('Debería desplazarse a la sección correspondiente cuando se hace clic en un enlace de navegación', async () => {
    renderDesktopHeader();

    const links = screen.getAllByTestId('href--landscape');
    verifyLinks(links, MENU);
  });

  // Verifica si la clase header--scrolled se añade o se elimina correctamente según la posición de desplazamiento de la ventana.
  test('Debería cambiar la class de scroll según la posición de desplazamiento', async () => {
    renderDesktopHeader();
    const headerElement = screen.getByRole('banner');

    // Simula un scroll hacia abajo en la página
    window.scrollY = 150;
    window.dispatchEvent(new Event('scroll'));

    // Verifica si la class de scrolled se añade correctamente
    await waitFor(() => {
      expect(headerElement.className).toContain('header--scrolled');
    });

    // Simula un scroll hacia arriba en la página
    window.scrollY = 0; // Simulate scrolling up
    window.dispatchEvent(new Event('scroll'));

    // Verifica si la class de scrolled se elimina correctamente
    await waitFor(() => {
      expect(headerElement.className).not.toContain('header--scrolled');
    });
  });

  // Verficia que la función handleCloseGallery no se ejecuta cuando la aplicación está en modo móvil y ocurre un evento de redimensionamiento (resize).
  test('handleCloseGallery no debería llamarse cuando no es laptop y ocurre resize', async () => {
    const handleCloseGalleryMock = jest.fn();
    renderDesktopHeader();

    // Simular condición de vista móvil
    mockUseMediaQuery({ isMobile: true });

    // Simula un evento de redimensionamiento de ventana
    await waitFor(() => {
      window.dispatchEvent(new Event('resize'));
    });

    // Verifica que la función handleCloseGallery no se llama cuando se redimensiona la ventana en vista móvil
    expect(handleCloseGalleryMock).not.toHaveBeenCalled();
  });
});

describe('El header debe funcionar correctamente (mobile)', () => {
  afterEach(() => {
    cleanup();
  });
  test('Al hacer clic el botón de menú se debería abrir el sidebar', async () => {
    mockUseMediaQuery({ isMobile: true });

    renderMobileHeader();
    const menuButton = screen.getByLabelText('Abrir menu de navegación');
    const sidebar = await screen.findByTestId('menuSidebar');

    userEvent.click(menuButton);

    expect(sidebar).toBeVisible();
  });
  test('Al hacer clic el botón de close se debería cerrar el sidebar', async () => {
    mockUseMediaQuery({ isMobile: true });

    renderMobileHeader();
    const menuButton = screen.getByLabelText('Abrir menu de navegación');
    const closeButon = screen.getByTestId('menuSidebarClose');
    const sidebar = await screen.findByTestId('menuSidebar');

    userEvent.click(menuButton);
    expect(sidebar).toBeVisible();

    // El sidebar debe estar abierto
    await waitFor(() => {
      expect(sidebar).toHaveStyle('transform: translateX(0%);');
    });

    userEvent.click(closeButon);

    // El sidebar debe estar cerrado
    await waitFor(() => {
      expect(sidebar).toHaveStyle('transform: translateX(100%);');
    });
  });
  test('Debería desplazarse a la sección correspondiente cuando se hace clic en un enlace de navegación', async () => {
    mockUseMediaQuery({ isMobile: true });

    renderMobileHeader();
    const menuButton = screen.getByLabelText('Abrir menu de navegación');
    const sidebar = await screen.findByTestId('menuSidebar');

    userEvent.click(menuButton);
    expect(sidebar).toBeVisible();

    // El sidebar debe estar abierto
    await waitFor(() => {
      expect(sidebar).toHaveStyle('transform: translateX(0%);');
    });

    const links = screen.getAllByTestId('href--portrait');
    verifyLinks(links, MENU);
  });
  test('El logo se muestra correctamente', () => {
    renderMobileHeader();

    const logo = screen.getByTestId('uiLogoLogo');
    expect(logo).toMatchSnapshot();
  });
});
