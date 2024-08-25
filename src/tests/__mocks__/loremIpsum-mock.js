const MOCK_GENERATED_TEXT = 'Nuevo texto lorem ipsum generado.';

jest.mock('../../hooks/useGenerateTextLoremIpsum', () => ({
  __esModule: true,
  default: jest.fn(() => MOCK_GENERATED_TEXT),
})); 

