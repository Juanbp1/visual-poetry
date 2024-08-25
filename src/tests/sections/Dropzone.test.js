import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import userEvent from '@testing-library/user-event';
import { AppProvider } from '../../components/context/AppContext';
import { Home, AppViewer } from '../../components/pages';
import {
  Dropzone,
  DropzoneContent,
} from '../../components/VisualPoetry/dropzone';

import { DropzoneContainer } from '../../components/VisualPoetry/sections';

const filePdf = new File(['contenido de archivo'], 'text.pdf', {
  type: 'text/pdf',
});
const image = new File(['contenido de imagen'], 'imagen.png', {
  type: 'image/png',
});

const imageUploadDrop = async () => {
  render(
    <AppProvider>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home>
                <Dropzone />
              </Home>
            }
          />
          <Route path="/appViewer" element={<AppViewer></AppViewer>} />
        </Routes>
      </MemoryRouter>
    </AppProvider>
  );
  const dropzoneInput = await screen.findByTestId('dropzone');

  Object.defineProperty(dropzoneInput, 'files', {
    value: [image],
  });

  fireEvent.drop(dropzoneInput);
};

const renderHomeSection = () => {
  render(
    <AppProvider>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home>
                <DropzoneContainer />
              </Home>
            }
          />
          <Route path="/appViewer" element={<AppViewer />} />
        </Routes>
      </MemoryRouter>
    </AppProvider>
  );
};

describe('La sección Dropzone debe funcionar correctamente', () => {
  afterEach(() => {
    cleanup();
  });
  const textDropzone =
    'Arrastra y suelta una imagen PNG, JPG, WEBP para empezar';
  const textOnDrag = 'Arrastre aquí ...';

  test('Se debería renderizar el titulo y texto principal de la sección Dropzone', () => {
    renderHomeSection();

    const title = screen.getByTestId('dropzoneTitle');
    const text = screen.getByTestId('dropzoneText');

    expect(title).toHaveTextContent('Transforma tus imágenes en arte textual');
    expect(text).toHaveTextContent(
      'Sube una imagen y conviértela en una obra de arte única con nuestro editor de texto en lienzo.'
    );
  });
  test('Se debería renderizar el CompareSlider', () => {
    renderHomeSection();

    const reactCompare = screen.getByTestId('container');
    expect(reactCompare).toBeInTheDocument();
  });
  test('Se debería renderizar el handle correctamente', async () => {
    renderHomeSection();

    // Verifica que el handle personalizado se renderice correctamente
    const handle = screen.getByTestId('handle');
    expect(handle).toBeInTheDocument();
  });

  test('Se debería renderizar las imágenes correctamente', () => {
    renderHomeSection();

    // Verifica que las imágenes se rendericen correctamente
    const leftImage = screen.getByAltText('imagen original de mujer sonriendo');
    const rightImage = screen.getByAltText(
      'imagen personalizada de mujer sonriendo'
    );

    expect(leftImage).toBeInTheDocument();
    expect(rightImage).toBeInTheDocument();
  });
  test('Se debería renderizar CanvasDropzone cuando no se ha proporcionado una imagen', () => {
    renderHomeSection();

    const dropzoneElement = screen.getByTestId('dropzone');
    expect(dropzoneElement).toBeInTheDocument();

    const canvasWrapper = screen.queryByTestId('AppWrapper');
    expect(canvasWrapper).not.toBeInTheDocument();
  });

  test('Se renderiza el componente DropzoneContent correctamente cuando isDragActive es true', () => {
    render(
      <AppProvider>
        <DropzoneContent isDragActive={true} />
      </AppProvider>
    );

    //Verificar que el texto "Arrastre aquí ..." este presente cuando isDragActive es true
    const dropText = screen.getByText(textOnDrag);
    expect(dropText).toBeInTheDocument();

    const text = screen.queryByText(textDropzone);
    expect(text).not.toBeInTheDocument();
  });

  test('Se renderiza el componente DropzoneContent correctamente cuando isDragActive es false', () => {
    render(
      <AppProvider>
        <DropzoneContent isDragActive={false} />
      </AppProvider>
    );

    //Verificar que el texto "Arrastre aquí ..." no este presente cuando isDragActive es false
    const dropText = screen.queryByText(textOnDrag);
    expect(dropText).not.toBeInTheDocument();

    const text = screen.getByText(textDropzone);
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent(textDropzone);
  });
  test('Se debería abrir el cuadro de diálogo al hacer click en el button Subir imagen', () => {
    renderHomeSection();

    const fileInput = screen.getByTestId('dropzone');
    const spy = jest.spyOn(fileInput, 'click');

    const button1 = screen.getByTitle(
      'Sube una imagen directamente desde tu dispositivo'
    );
    userEvent.click(button1);

    expect(spy).toHaveBeenCalled();
  });
  test('Se debería de poder subir una imagen al soltar una imagen en dropzone', async () => {
    await imageUploadDrop();

    const renderedElement = await screen.findByTestId('dropzone');
    expect(renderedElement).toBeInTheDocument();
    await waitFor(() => {
      const dropzoneElement = screen.queryByTestId('dropzone');
      expect(dropzoneElement).not.toBeInTheDocument();
    });
  });

  test('Se renderiza el mensaje error, cuando se proporciona un archivo con una extension no valida', async () => {
    renderHomeSection();

    const dropzoneInput = await screen.findByTestId('dropzone');
    const errorMessage = screen.queryByText(
      'El archivo no es válido. Por favor, carga solo imágenes (PNG, JPG, WEBP).'
    );
    expect(errorMessage).not.toBeInTheDocument();

    userEvent.upload(dropzoneInput, filePdf);

    await waitFor(() => {
      const errorMessage = screen.getByText(
        'El archivo no es válido. Por favor, carga solo imágenes (PNG, JPG, WEBP).'
      );
      expect(errorMessage).toHaveTextContent(
        'El archivo no es válido. Por favor, carga solo imágenes (PNG, JPG, WEBP).'
      );
    });
  });

  test('Se debería renderizar la galeria de imagenes cuando se haga clic en el boton "Elegir de la Galería"', async () => {
    renderHomeSection();

    const galleryButton = screen.getByRole('button', {
      name: 'Elegir de la Galería',
    });
    userEvent.click(galleryButton);

    const gallerySidebar = await screen.findByTestId('gallery-sidebar');
    expect(gallerySidebar).toBeVisible();
  });

  test('Se debería renderizar y  poder seleccionar una de las imagenes de la galeria', async () => {
    renderHomeSection();

    const galleryButton = screen.getByRole('button', {
      name: 'Elegir de la Galería',
    });
    userEvent.click(galleryButton);

    const imageElements = await screen.findAllByTestId('image');
    expect(imageElements.length).toBeGreaterThan(0);

    const imageElemnt = imageElements[0];
    userEvent.click(imageElemnt);

    await waitFor(() => {
      expect(imageElemnt).toHaveClass('sidebar__img--selected');
    });
  });
  test('Se debería de cerrar la galeria de imagenes al hacer clic fuera de el', async () => {
    renderHomeSection();

    const galleryButton = screen.getByRole('button', {
      name: 'Elegir de la Galería',
    });
    userEvent.click(galleryButton);

    const gallerySidebar = await screen.findByTestId('gallery-sidebar');
    expect(gallerySidebar).toBeVisible();

    userEvent.click(document.body);

    await waitFor(() => {
      expect(gallerySidebar).toHaveStyle('transform: translateX(100%);');
    });
  });
  test('Se debería de cerrar la galería de imágenes al pulsar la tecla Escape', async () => {
    renderHomeSection();

    const galleryButton = screen.getByRole('button', {
      name: 'Elegir de la Galería',
    });
    userEvent.click(galleryButton);
    const gallerySidebar = await screen.findByTestId('gallery-sidebar');
    expect(gallerySidebar).toBeVisible();

    fireEvent.keyDown(galleryButton, { key: 'Escape' });

    await waitFor(() => {
      expect(gallerySidebar).toHaveStyle('transform: translateX(100%);');
    });
  });
});
