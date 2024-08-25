// useAppContext.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useAppContext } from '../components/context/AppContext'; // Ajusta la ruta según tu estructura de carpetas


// Prueba que lanza un error cuando el contexto no está disponible
test('debería lanzar un error si no está envuelto en un AppProvider', () => {
  const TestComponentWithoutProvider = () => {
    try {
      useAppContext();
      return <div>No debería llegar aquí</div>;
    } catch (error) {
      return <div>{error.message}</div>;
    }
  };

  render(<TestComponentWithoutProvider />);
  expect(screen.getByText('useAppContext debe ser utilizado dentro de un AppProvider')).toBeInTheDocument();
});
