import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { NotFound } from '../../components/pages'; // Assuming NotFound component is in the same directory
import { AppProvider } from '../../components/context/AppContext';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
})); 
describe('El componente NotFound debería renderizar correctamente', () => {
  const renderNotFound = () => {
    render(
      <AppProvider>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="*" element={<NotFound></NotFound>} />
          </Routes>
        </MemoryRouter>
      </AppProvider>
    );
  };
  afterEach(() => {
    cleanup();
  });
  test('Debería renderizar el contenido correctamente', async () => {
    renderNotFound();
    const titleElement = screen.getByText(/Error 404/i);
    const paragraphElement = screen.getByText(/Oops!/i);
    const buttonElement = screen.getByRole('button', {
      name: 'Volver al Inicio',
    });
    const imageElement = screen.getByRole('img', { alt: 'robot' });

    expect(titleElement).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
  });

  test('Debería redireccionar al Home cuando se pincha en el button Volver al Inicio', () => {
    const navigate = jest.fn();

    jest
      .spyOn(require('react-router-dom'), 'useNavigate')
      .mockReturnValue(navigate);

    renderNotFound();

    const button = screen.getByRole('button', { name: 'Volver al Inicio' });
    userEvent.click(button);

    expect(navigate).toHaveBeenCalledWith('/');
  });
});
