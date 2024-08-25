import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';

import { Home } from '../../components/pages';
import { AppProvider } from '../../components/context/AppContext';

const sectionsTests = [ 
  ['la sección frontpage debe estar presente', 'frontpageId'],
  ['la sección quickStart debe estar presente', 'quickStartId'],
  ['la sección dropzone debe estar presente', 'dropzoneId'],
  ['la sección exampleGallery debe estar presente', 'exampleGalleryId'],
  ['la sección faqs debe estar presente', 'faqsId'],
];
const renderHome = () => {
  render(
    <AppProvider>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </MemoryRouter>
    </AppProvider>
  );
};
describe('El componente Home debe funcionar correctamente', () => {
  afterEach(() => {
    cleanup();
  });
  // Verifica si el componente se encuentra en el documento después de renderizar
  test('El componente Home debe renderizar correctamente', async () => {
    renderHome();
    const appElement = await screen.findByTestId('app');
    expect(appElement).toBeInTheDocument();
  });
}); 

describe('Se debería renderizar correctamente los elementos del componente toolbox', () => {
  afterEach(() => {
    cleanup();
  });
  test.each(sectionsTests)(
    'Se debería renderizar %s del home',
    async (_, testId) => {
      renderHome();
      const element = await screen.findByTestId(testId);
      expect(element).toBeInTheDocument();
    }
  );
});

