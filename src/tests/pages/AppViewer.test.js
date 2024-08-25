import React from 'react';
import 'jest-canvas-mock';
import {
  render,
  screen,
  waitFor,
  cleanup,
} from '@testing-library/react';
import { AppProvider } from '../../components/context/AppContext';
import { MemoryRouter, Route, Routes } from 'react-router';
import { Home, AppViewer } from '../../components/pages';
import { setupTestAppViewer } from '../helpers/userHelpers';

const toolboxTests = [
  ['el selector del color del texto', 'color'],
  ['el selector del color del fondo', 'background'],
  ['el selector del color de fuente de texto', 'fonts'],
  ['el selector del color de tamaño de texto', 'size'],
  ['la herramienta de selección', 'selectionTool'],
  ['el slider de punto de corte', 'cutPoint'], 
  ['el textarea', 'textarea'],
];

describe('La página AppViewer debe funcionar correctamente', () => {
  beforeEach(async () => {
    await setupTestAppViewer();  
  }); 
  afterEach(() => {   
    cleanup();
  });
  const appviewerTests = [['canvas'], ['toolbox'], ['header']];
  test.each(appviewerTests)(
    'Se debería renderizar %s y no debería renderizarse dropzone después de subir una imagen',
    async (testId) => {
      const renderedElement = await screen.findByTestId(testId);
      await waitFor(() => {
        expect(renderedElement).toBeInTheDocument();
      });
      await waitFor(() => {
        const dropzoneElement = screen.queryByTestId('dropzone');
        expect(dropzoneElement).not.toBeInTheDocument();
      });
    }
  );
  test('Debería navegar a Home si no hay una imagen cargada', async () => {
    const contextValue = {
      state: {},
      dispatch: jest.fn(),
    };
    const home = await screen.findByTestId('app');
    render(
      <AppProvider>
        <MemoryRouter
          initialEntries={['/appViewer']}
          contextValue={contextValue}
        >
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/appViewer" element={<AppViewer></AppViewer>} />
          </Routes>
        </MemoryRouter>
      </AppProvider>
    );

    await waitFor(() => {
      expect(home).toBeInTheDocument();
    });
  });
});

describe('Se debería renderizar correctamente los elementos del componente toolbox', () => {
  beforeEach(async () => {
    await setupTestAppViewer();
  });
  afterEach(() => {
    cleanup();
  });
  test.each(toolboxTests)(
    'Se debería renderizar %s del canvas',
    async (_, testId) => {
      const element = await screen.findByTestId(testId);
      const dropzoneElement = screen.queryByTestId('dropzone');

      expect(element).toBeInTheDocument();
      expect(dropzoneElement).not.toBeInTheDocument();
    }
  );
});

