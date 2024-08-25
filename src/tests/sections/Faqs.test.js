import React from 'react';
import {
  cleanup,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppProvider } from '../../components/context/AppContext';
import { FAQSection } from '../../components/VisualPoetry/sections';

const renderHomeSection = async () => {
  render(
    <AppProvider> 
      <FAQSection />
    </AppProvider>
  );
};
describe('La sección Faqs debe funcionar correctamente', () => {
  afterEach(() => {
    cleanup();
  });
  const FAQS_DATA = [
    {
      question: '¿Qué es Visual Poetry?',
      answer:
        'Visual Poetry es una herramienta online que, permite subir una imagen, convertirla en un lienzo y luego pintar texto sobre ella con la forma de la figura principal de la imagen. Puedes personalizar el texto y exportar el resultado final como una nueva imagen',
    },
    {
      question: '¿Qué tipo de imágenes puedo usar?',
      answer:
        'Puedes usar cualquier imagen en formato JPG, PNG o WEBP. La app funciona mejor con imágenes que tengan un buen contraste entre el fondo y la figura principal.',
    },
    {
      question: '¿Qué navegadores web son compatibles con esta Web?',
      answer:
        'Esta Web App es compatible con los navegadores web modernos, como Chrome, Opera y Edge',
    },
    {
      question: '¿Cuánto tiempo tarda en procesarse una imagen?',
      answer:
        'El tiempo de procesamiento depende del tamaño y la complejidad de la imagen. En general, las imágenes se procesan en cuestión de segundos',
    },
    {
      question: '¿Cómo funciona?',
      answer:
        '1. Sube una imagen. 2. Escribe tu texto y personalízalo la fuente, colores y estilos. 3. Exporta tu creación como una nueva imagen',
    },
  ];

  test('Se debería renderizar el título y texto principal de la sección Faqs', async () => {
     renderHomeSection();

    const title = screen.getByTestId('faqsTitle');
    const text = screen.getByTestId('faqsText');

    expect(title).toHaveTextContent('Preguntas Frecuentes');
    expect(text).toHaveTextContent(
      'Encuentra respuestas a las preguntas más comunes sobre Visual Poetry.'
    );
  });
  test('Debería mostrar las preguntas y respuestas correctamente', () => {
    renderHomeSection();

    FAQS_DATA.forEach((faq) => {
      const question = screen.getByText(faq.question);
      const answer = screen.getByText(faq.answer);

      expect(question).toBeInTheDocument();
      expect(answer).toBeInTheDocument();
    });
  });
  test('debería manejar la expansión y colapso de preguntas', async () => {
     renderHomeSection();

    const question = FAQS_DATA[0].question;
    const answer = FAQS_DATA[0].answer;

    const firstQuestionButton = screen.getByText(question);
    const firstAnswer = await screen.findByText(answer);

    // Inicialmente la respuesta no está visible
    await waitFor(() => {
      expect(firstAnswer).not.toBeVisible();
    });

    // Simula el clic en la pregunta para expandir
    userEvent.click(firstQuestionButton);
    await waitFor(() => {
      expect(firstAnswer).toBeVisible();
    });

    // Simula el clic en la misma pregunta para colapsar
    userEvent.click(firstQuestionButton);
    await waitFor(() => {
      expect(firstAnswer).not.toBeVisible(); 
    }); 
  });
  test('debería tener el atributo aria-expanded correcto', async () => {
    renderHomeSection();

    const faqs = await screen.findAllByTestId('faq');
    const firstQuestion = faqs[0];

    // Inicialmente aria-expanded es false
    expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');

    // Simula el clic en la primera pregunta para expandir
    const button = within(firstQuestion).getAllByRole('button');
    userEvent.click(button[0]);

    // Se actualiza aria-expanded a true
    await waitFor(() => {
      expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');
    });

    // Simula el clic en la misma pregunta para colapsar
    userEvent.click(button[0]);

    // Se actualiza aria-expanded a false de nuevo
    await waitFor(() => {
      expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
