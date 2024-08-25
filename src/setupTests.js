import '@testing-library/jest-dom';
import 'jest-canvas-mock';
import React from 'react';

//Simula el html2canva
jest.mock('html2canvas', () => ({
  __esModule: true,
  default: jest.fn(() =>
    Promise.resolve({
      toDataURL: (format) => `data:image/${format};base64,testImage`,
    })
  ),
}));


// Simula el componente Suspense
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  Suspense: ({ children }) => children,
}));


// Simula el clipboard
Object.assign(navigator, {
  clipboard: {
    readText: jest.fn().mockResolvedValue('Texto del portapapeles'),
  },
});

// Simula el atributo muted de video
Object.defineProperty(HTMLMediaElement.prototype, 'muted', {
  set: () => 'muted',
}); 

// Simula la función useMediaQuery
jest.mock('react-responsive', () => ({
  useMediaQuery: jest.fn(),
}));


class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.ResizeObserver = ResizeObserver;

// Restablecer mocks
beforeEach(() => {
  jest.clearAllMocks();
});

