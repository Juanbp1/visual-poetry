import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupTestAppViewer } from '../helpers/userHelpers';

const expectedOptionsFonts = [
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Verdana', label: 'Verdana' },
  { value: 'Times New Roman', label: 'Times New Roman' },
];
const expectedOptionsSize = [
  { value: 8, label: 'Mini' },
  { value: 16, label: 'Muy pequeño' },
  { value: 20, label: 'Pequeño' },
  { value: 26, label: 'Mediano' },
  { value: 30, label: 'Grande' },
  { value: 40, label: 'Muy grande' },
];
describe('El selector de fuentes debería funcionar correctamente', () => {
  const FONT_DEFAULT = 'Georgia';
  const SIZE_DEFAULT = '8';
  const SIZE_UPDATE = '16';
  const FONT_UPDATE = 'Verdana';
  const selectTests = [
    ['fonts', 'fontsOptions', FONT_DEFAULT, FONT_UPDATE, expectedOptionsFonts],
    ['size', 'sizeOptions', SIZE_DEFAULT, SIZE_UPDATE, expectedOptionsSize],
  ];
  beforeEach(async () => {
    await setupTestAppViewer();
  });
  afterEach(() => {
    cleanup();
  });
  const checkOptionsTextContent = (options, expectedTexts) => {
    expectedTexts.forEach((text, index) => {
      expect(options[index].textContent).toBe(text.label);
    });
  };
  test.each(selectTests)(
    'Se debería de renderizar el titulo del select %s',
    async (testId) => {
      const title = await screen.findByTestId(`${testId}Title`);
      expect(title).toBeInTheDocument();
    }
  );
  test.each(selectTests)(
    'Debería tener  la opcion por defecto en select de %s',
    async (_, testId, defaultValue) => {
      const select = await screen.findByTestId(testId);
      expect(select.value).toBe(defaultValue);
    }
  );
  test.each(selectTests)(
    'Debería existir todas las opciones del select de %s',
    async (_, testId, __, ___, expectedOptions) => {
      const options = await screen.findByTestId(testId);
      checkOptionsTextContent(options, expectedOptions);
    }
  );

  test.each(selectTests)(
    'Debería poder cambiar la opción seleccionada del select de %s',
    async (_, testId, notSelectedOption, selectedOption) => {
      const select = await screen.findByTestId(testId);
      userEvent.selectOptions(select, selectedOption);

      expect(select.value).toBe(selectedOption);
      expect(select.value).not.toBe(notSelectedOption);
    }
  );
});
