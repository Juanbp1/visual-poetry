import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupTestAppViewer } from '../helpers/userHelpers';

describe('La herramienta de selección debería funcionar correctamente', () => {
  beforeEach(async () => {
    await setupTestAppViewer();
  });
  afterEach(() => {
    cleanup();
  });
  test('Se debería renderizar el titulo de la herramienta de selección', async () => {
    const title = await screen.findByTestId('selectionToolTitle');
    expect(title).toBeInTheDocument();
  });
  test('Debería activar el evento de clic en el selector "fuera", para cambiar la selección de "dentro" a "fuera', async () => {
    // testRadioSelection(out);
    const insideSelector = await screen.findByTitle(
      'Seleccionar dentro de la figura'
    ); 
    const outSelector = await screen.findByTitle(
      'Seleccionar fuera de la figura'
    );

    // Estado inicial: esta seleccinado el selector de dentro
    expect(insideSelector).toHaveClass('selected');
    expect(outSelector).not.toHaveClass('selected');

    userEvent.click(outSelector);

    // Verificar que ha cambiado: esta seleccionado el selector de afuera
    await waitFor(() => {
      expect(insideSelector).not.toHaveClass('selected');
    });
    await waitFor(() => {
      expect(outSelector).toHaveClass('selected');
    });
  });
  test('Debería activar el evento de clic en el selector "dentro", para cambiar la selección de "fuera" a "dentro', async () => {
    const insideSelector = await screen.findByTitle(
      'Seleccionar dentro de la figura'
    );
    const outSelector = await screen.findByTitle(
      'Seleccionar fuera de la figura'
    );

    // Estado inicial: esta seleccinado el selector de dentro
    expect(insideSelector).toHaveClass('selected');
    expect(outSelector).not.toHaveClass('selected');

    userEvent.click(outSelector);

    // Verificar que ha cambiado: esta seleccionado el selector de afuera
    await waitFor(() => {
      expect(insideSelector).not.toHaveClass('selected');
    });
    await waitFor(() => {
      expect(outSelector).toHaveClass('selected');
    });

    userEvent.click(insideSelector);

    // Verificar que ha cambiado: esta seleccionado el selector de dentro
    await waitFor(() => {
      expect(insideSelector).toHaveClass('selected');
    });
    await waitFor(() => {
      expect(outSelector).not.toHaveClass('selected');
    });
  });
  test('Debería funcionar alterna la selección de la imagen al presionar una tecla con espacio o enter, para cambiar la selección de "dentro" a "fuera"', async () => {
    const insideSelector = await screen.findByTitle(
      'Seleccionar dentro de la figura'
    );
    const outSelector = await screen.findByTitle(
      'Seleccionar fuera de la figura'
    );

    // Estado inicial: esta seleccinado el selector de dentro
    expect(insideSelector).toHaveClass('selected');
    expect(outSelector).not.toHaveClass('selected');

    // Verificar que ha cambiado: esta seleccionado el selector de afuera
    fireEvent.keyDown(outSelector, { key: ' ' });
    expect(insideSelector).not.toHaveClass('selected');
    expect(outSelector).toHaveClass('selected');

    // Verificar que ha cambiado: esta seleccionado el selector de dentro
    fireEvent.keyDown(insideSelector, { key: ' ' });
    expect(insideSelector).toHaveClass('selected');
    expect(outSelector).not.toHaveClass('selected');

    // Verificar que ha cambiado: esta seleccionado el selector de afuera
    fireEvent.keyDown(outSelector, { key: 'Enter' });
    expect(insideSelector).not.toHaveClass('selected');
    expect(outSelector).toHaveClass('selected');

    // Verificar que ha cambiado: esta seleccionado el selector de dentro
    fireEvent.keyDown(insideSelector, { key: 'Enter' });
    expect(insideSelector).toHaveClass('selected');
    expect(outSelector).not.toHaveClass('selected');
  });
});
