//Simula el componente CompareSlider
import React from 'react';
const MockCompareSlider = () => <div data-testid="react-compare" />;

const MockCompareSliderHandle = () => (
  <div data-testid="react-compare-slider-handle" />
);

const MockCompareSliderImage = ({ src, alt }) => (
  <img data-testid="react-compare-slider-image" src={src} alt={alt} />
);

jest.mock('react-compare-slider', () => ({
  ReactCompareSlider: MockCompareSlider,
  ReactCompareSliderHandle: MockCompareSliderHandle,
  ReactCompareSliderImage: MockCompareSliderImage,
}));


