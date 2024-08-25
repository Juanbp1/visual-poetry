import { cleanup, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import html2canvas from 'html2canvas';
import { mockUseMediaQuery } from '../mockUseMediaQuery';
import { setupTestAppViewer } from '../helpers/userHelpers';
import { TEXT_STRINGS } from '../../components/constants/uiConstants';

describe('El textarea debería funcionar correctamente', () => {
  const INITIAL_VALUE =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ';
  const ERROR_VALUE = 'Error al pegar texto :';
  const MOCK_GENERATED_TEXT = 'Nuevo texto lorem ipsum generado.';
  beforeEach(async () => {
    await setupTestAppViewer();
  }); 
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });
  
  beforeEach(() => {
    mockUseMediaQuery({ isDesktop: true });
  });
  test('Se debería renderizar el titulo del textEditor', async () => {
    const title = await screen.findByTestId('textEditorTitle');
    expect(title).toBeInTheDocument(); 
  });
  test('El textarea se renderiza correctamente', async () => {
    const textarea = await screen.findByTestId('textarea');
    expect(textarea).toBeInTheDocument();
  });
  test('El textarea debería mostrar el mensaje del placeholder', async () => {
    const placeHolder = 'Escribe aquí el contenido a rellenar de la figura ...';
    const textarea = await screen.findByTestId('textarea');
    expect(textarea).toHaveAttribute('placeholder', placeHolder);
  });
  test('Se debería poder abrir y cerrar el sidebar del textarea (mobile)', async () => {
    mockUseMediaQuery({ isMobile: true });
    const menuButton = await screen.findByLabelText('Editar texto');
    const textareaSidebar = await screen.findByTestId('textareaSidebar');
    const sidebarClose = await screen.findByTestId('textareaSidebarClose');

    userEvent.click(menuButton);
    expect(textareaSidebar).toBeVisible();

    // El sidebar debe estar abierto
    await waitFor(() => {
      expect(textareaSidebar).toHaveStyle('transform: translateX(0%);');
    });

    userEvent.click(sidebarClose);

    // El sidebar debe estar cerrado
    await waitFor(() => {
      expect(textareaSidebar).toHaveStyle('transform: translateX(100%);');
    });
  });
  test('Se debería renderizar inicialmente el valor por defecto en el textarea', async () => {
    const textarea = await screen.findByTestId('textarea');

    expect(textarea).toHaveValue(INITIAL_VALUE);
  });
  test('Se debería borrar el texto del textarea al hacer clic en el icono delete', async () => {
    const textarea = await screen.findByTestId('textarea');
    const deleteIcon = await screen.findByTitle('Borrar texto del editor');
    userEvent.click(deleteIcon);

    await waitFor(() => {
      expect(textarea).toHaveValue('');
    });
  });
  test('Debería devolver el texto del portapapeles', async () => {
    const textoDelPortapapeles = await navigator.clipboard.readText();
    expect(textoDelPortapapeles).toBe('Texto del portapapeles');
  });

  test('Se debería pegar el texto en el textarea al hacer click en el button paste', async () => {
    const textarea = await screen.findByTestId('textarea');
    const textoDelPortapapeles = await navigator.clipboard.readText();

    const pasteButton = screen.getByTitle('Pegar texto en el Editor');

    userEvent.click(pasteButton);
    userEvent.paste(textarea, textoDelPortapapeles);

    expect(screen.getByTestId('textarea')).toBeInTheDocument();
    expect(screen.getByTestId('textarea').value).toContain(
      'Texto del portapapeles'
    );
  });
  test('Se debería generar un texto lorem ipsum y se actualiza el texto en el textarea', async () => {
    const textarea = await screen.findByTestId('textarea');
    await waitFor(() => {
      expect(textarea.value).toBe(INITIAL_VALUE);
    });
    const generateButton = await screen.findByTitle('Generar texto random');
    userEvent.click(generateButton);

    await waitFor(() => {
      expect(textarea.value).not.toBe(INITIAL_VALUE);
    });
  });

  test('Debería manejar caso de error al intentar pegar texto del portapapeles1', async () => {
    // Mockear clipboard.readText para rechazar con un error 
    const error = new Error('Error al leer del portapapeles');
    const textarea = await screen.findByTestId('textarea');
    const pasteButton = await screen.findByTitle('Pegar texto en el Editor');
  
    // Valores iniciales
    const INITIAL_VALUE = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const ERROR_VALUE = TEXT_STRINGS.CLIPBOARD_ERROR_PERMISSION;
  
    // Mockear clipboard.readText
    navigator.clipboard.readText = jest.fn().mockRejectedValue(error);
  
    // Espiar console.error (si deseas capturar errores de consola)
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  
    // Espiar window.alert para verificar que se llame con el mensaje de error esperado
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
  
    // Simular clic en el botón de pegar
    userEvent.click(pasteButton);
  
    // Verificar que alert se ha llamado con el mensaje de error esperado
    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(ERROR_VALUE);
    });
  
    // Verificar que no hubo cambios en el textarea (inputData se mantiene con el texto por defecto)
    await waitFor(() => {
      expect(textarea.value).toContain(INITIAL_VALUE);
    });
  
    // Restaurar los mocks
    consoleSpy.mockRestore();
    alertSpy.mockRestore();
  });
  
});
describe('El botón de exportar debería funcionar correctamente', () => {
  const formats = [['png'], ['jpg'], ['webp']];
  let canvasRef = { current: document.createElement('canvas') };
  const canvasElement = canvasRef.current;
  canvasElement.classList.add('canvas', 'canvas--visible');
  canvasElement.dataset.testid = 'canvas';
  beforeEach(async () => {
    await setupTestAppViewer();
  });
  afterEach(() => {
    cleanup();
  });
  test('Se debería renderizar el titulo del modal exportar', async () => {
    const modalOpen = await screen.findByTitle(
      'Elige un formato para exportar la imagen'
    );

    userEvent.click(modalOpen);
    const title = await screen.findByTestId('modalTitle');
    expect(title).toBeInTheDocument();
  });
  test('El modal se debería abrir y cerrar', async () => {
    const button = await screen.findByTitle(
      'Elige un formato para exportar la imagen'
    );

    // Abrir modal
    userEvent.click(button);
    const openModal = await screen.findByTestId('modalDownload');
    expect(openModal).toBeVisible();

    //Cerrar modal
    userEvent.click(button);
    const closeModal = await waitFor(() => {
      return screen.queryByTestId('modalDownload');
    });
    expect(closeModal).not.toBeInTheDocument();
  });
 
  test.each(formats)(
    'Se debería mostrar el botón de formato "%s" en el modal exportar',
    async (format) => {
      const exportButton = await screen.findByRole('button', {
        name: /Exportar/,
      });
      userEvent.click(exportButton);

      const formatButton = await waitFor(() => {
        return screen.getByLabelText(`Descargar la imagen como ${format}`);
      });
      expect(formatButton).toBeInTheDocument();
    }
  );
  test.each(formats)(
    'Debería exportar el canvas con el formato correcto al hacer clic en el botón de formato (%s)',
    async (format) => {
      const exportButton = await screen.findByRole('button', {
        name: /Exportar/, 
      });
      userEvent.click(exportButton);

      const formatButton = await waitFor(() => {
        return screen.getByLabelText(`Descargar la imagen como ${format}`);
      });
      userEvent.click(formatButton);

      expect(html2canvas).toHaveBeenCalledWith(canvasElement, {
        imageTimeout: 0,
        scale: 1,
      });

      const canvasMock = await html2canvas(canvasElement);
      const dataURL = canvasMock.toDataURL(`${format}`);

      expect(dataURL).toMatch(`data:image/${format};base64,testImage`);
    }
  );
});
