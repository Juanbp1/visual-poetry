import { cleanup, screen, waitFor } from '@testing-library/react';
import { setupTestAppViewer } from '../helpers/userHelpers';

describe('Se debería renderizar correctamente los elementos del componente header', () => {
  beforeEach(async () => {
    await setupTestAppViewer();
  });
  afterEach(() => {
    cleanup(); 
  });
  const headerTests = [
    ['el botón de exportar', 'exportCanvas'],
    ['el logo del header', 'headerLogo'],
  ];
  test.each(headerTests)('Se debería renderizar %s', async (_, testId) => {
    const element = await screen.findByTestId(testId);
    const dropzoneElement = screen.queryByTestId('dropzone');
  
    await waitFor(() => {
      expect(element).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(dropzoneElement).not.toBeInTheDocument();
    });
  });
});
 