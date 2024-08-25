import { cleanup, fireEvent, screen } from '@testing-library/react';
import { setupTestAppViewer } from '../helpers/userHelpers';

describe('El slider (punto de corte) debería funcionar correctamente', () => {
  const DEFAULT_VALUE = 128;
  const UPDATED_VALUE = 150;
  beforeEach(async () => {
    await setupTestAppViewer();
  });
  afterEach(() => {
    cleanup();
  });
  test('Se debería renderizar el titulo del slider', async () => {
    const title = await screen.findByTestId('cutPointTitle');
    expect(title).toBeInTheDocument();
  });

  test('El valor por defecto del slider debería ser correcto', async () => {
    const updatedSlider = await screen.findByTestId('cutPoint');
    const updatedValue = parseFloat(updatedSlider.value);
    expect(updatedValue).toEqual(DEFAULT_VALUE);
  });

  test('Debería de cambiar el valor cuando se actualiza el slider', async () => {
    const slider = await screen.findByTestId('cutPoint');

    // Simulamos el evento de cambio de valor en el slider
    fireEvent.input(slider, { target: { value: UPDATED_VALUE.toString() } });

    // Volvemos a buscar el slider actualizado después del evento
    const updatedSlider = await screen.findByTestId('cutPoint');
    const updatedValue = parseFloat(updatedSlider.value);

    // Verificamos que el valor actualizado sea igual al valor esperado
    expect(updatedValue).toEqual(UPDATED_VALUE);
  });
});
