import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Pulse, Spin } from '../../components/VisualPoetry/animations';
import { useSpring } from 'react-spring';

jest.mock('react-spring', () => ({
  useSpring: jest.fn(),
  animated: {
    div: jest.fn(({ children, style }) => <div style={style}>{children}</div>),
  },
}));

describe('Comprobar que funcione correctamente el componente Pulse', () => {
  beforeEach(() => {
    const mockUseSpring = require('react-spring').useSpring;
    mockUseSpring.mockReturnValue({
      scale: {
        to: jest.fn().mockReturnValue('scale(1)'),
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  test('Debería representar a los hijos correctamente', () => {
    render(<Pulse>Animated Content</Pulse>);
    expect(screen.getByText('Animated Content')).toBeInTheDocument();
  });

  test('Debería aplicar la animación spring correctamente (scale 1.3)', () => {
    const mockUseSpring = require('react-spring').useSpring;
    const transformScale = { transform: 'scale(1.3)' };

    mockUseSpring.mockReturnValue({
      scale: { to: jest.fn().mockReturnValue(transformScale.transform) },
    });

    render(<Pulse>Animated Content</Pulse>);
    const animatedDiv = screen.getByText('Animated Content');

    expect(animatedDiv).toHaveStyle(transformScale);
  });
  test('Debería aplicar la animación spring correctamente (scale 1)', () => {
    const mockUseSpring = require('react-spring').useSpring;
    const transformScale = { transform: 'scale(1)' };

    mockUseSpring.mockReturnValue({
      scale: { to: jest.fn().mockReturnValue(transformScale.transform) },
    });

    render(<Pulse>Animated Content</Pulse>);
    const animatedDiv = screen.getByText('Animated Content');

    expect(animatedDiv).toHaveStyle(transformScale);
  });
});
 
describe('Comprobar que funciona correctamente el componente Spin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Debería aplicar la animación spin correctamente (transform: rotate(360deg))', async () => {
    // Mock de useSpring para retornar los valores adecuados
    useSpring.mockReturnValue({
      rotate: { to: (callback) => callback(360) },
    });

    render(<Spin />);
    // eslint-disable-next-line testing-library/no-node-access
    const animatedDiv = screen.getByTestId('spinAnimation').firstChild;

    await waitFor(() => {
      expect(animatedDiv).toHaveStyle('transform: rotate(360deg)');
    });
  });
});
