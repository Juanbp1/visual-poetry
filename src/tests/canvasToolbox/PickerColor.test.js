import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupTestAppViewer } from '../helpers/userHelpers';

describe('El selector de Color debería funcionar correctamente', () => {
  beforeEach(async () => {
    await setupTestAppViewer();
  });
  afterEach(() => {
    cleanup();
  });
  const COLOR_UPDATE = '#A23C5F';
  const COLOR_TEXT_DEFAULT = 'rgb(0, 0, 0)';
  const COLOR_BACKGROUND_DEFAULT = 'rgba(255, 0, 0, 0)';

  const colorPickerTests = [
    ['color', 'Color del texto', COLOR_TEXT_DEFAULT],
    ['background', 'Color del fondo', COLOR_BACKGROUND_DEFAULT],
  ];

  test.each(colorPickerTests)(
    'Se debería renderinzar el titulo del selector de %s',
    async (testId) => {
      const title = await screen.findByTestId(`${testId}Title`);
      expect(title).toBeInTheDocument();
    }
  );
  test.each(colorPickerTests)(
    'El selector de %s debería ser representado con estilos básicos',
    async (testId, titleText, expectedColor) => {
      const colorPicker = await screen.findByTestId(testId);
      const title = screen.getByText(titleText);
      const colorIcons = await screen.findAllByTestId('colorIcon');
      const icon = colorIcons[testId === 'color' ? 0 : 1];
      const style = icon.getAttribute('style');

      expect(colorPicker).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(style).toContain(`color: ${expectedColor};`);
    }
  );

  const openAndClosePicker = async (iconIndex) => {
    // Abrir el selector de color
    const colorIcons = await screen.findAllByTestId('colorIcon');
    const icon = colorIcons[iconIndex];

    // Abrir el selector de color
    userEvent.click(icon);
    const openPanel = screen.getByTestId('pickerColorPanel');
    await waitFor(() => {
      expect(openPanel).toBeVisible();
    });

    // Cerrar el selector de color
    userEvent.click(icon);

    await waitFor(() => {
      const closePanel = screen.queryByTestId('pickerColorPanel');
      expect(closePanel).not.toBeInTheDocument();
    });
  };

  test('El selector de color del texto debería abrirse y cerrarse al hacer clic al icono', async () => {
    await openAndClosePicker(0);
  });

  test('El selector de color del fondo debería abrirse y cerrarse al hacer clic al icono', async () => {
    await openAndClosePicker(1);
  });

  test.each(colorPickerTests)(
    'Deberia de cambiar el color del icono del selector de color de %s , cuando cambia la entrada del color',
    async (testId) => {
      const iconIndex = testId === 'color' ? 0 : 1;

      //Abrir el selector de color
      const colorIcons = await screen.findAllByTestId('colorIcon');
      const icon = colorIcons[iconIndex];
      userEvent.click(icon);

      //Cambiar el color del input
      const pickerInput = await screen.findByTestId('pickerColorInput');
      userEvent.clear(pickerInput);
      userEvent.type(pickerInput, COLOR_UPDATE);

      //Comprobar el color actual
      const updatedColorIcons = await screen.findAllByTestId('colorIcon');
      const updatedIcon = updatedColorIcons[iconIndex];

      expect(pickerInput).toHaveValue(COLOR_UPDATE);
      expect(updatedIcon).toHaveStyle(`color: ${COLOR_UPDATE}`);
    }
  );
  test.each(colorPickerTests)(
    'Se debería renderinzar el titulo del selector de %s',
    async (testId) => {
      // const colorPicker = await screen.findByTestId(testId);
      const iconIndex = testId === 'color' ? 0 : 1;
      const colorIcons = await screen.findAllByTestId('colorIcon');
      const icon = colorIcons[iconIndex];

      // Función para verificar que el panel está visible
      const expectPanelVisible = async () => {
        await waitFor(() => {
          expect(screen.getByTestId('pickerColorPanel')).toBeVisible();
        });
      };

      // Función para verificar que el panel no está en el documento
      const expectPanelNotVisible = async () => {
        await waitFor(() => {
          expect(
            screen.queryByTestId('pickerColorPanel')
          ).not.toBeInTheDocument();
        });
      };

      // Abrir el selector de color con espacio
      fireEvent.keyDown(icon, { key: ' ' });
      await expectPanelVisible(true);

      // Cerrar el selector de color con espacio
      fireEvent.keyDown(icon, { key: ' ' });
      await expectPanelNotVisible(false);

      // Abrir el selector de color con Enter
      fireEvent.keyDown(icon, { key: 'Enter' });
      await expectPanelVisible(true);

      // Cerrar el selector de color con Enter
      fireEvent.keyDown(icon, { key: 'Enter' });
      await expectPanelNotVisible(false);
    }
  );
});
