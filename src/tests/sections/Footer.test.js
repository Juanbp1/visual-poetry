import React from 'react';
import {
  cleanup,
  render,
  screen,
  
} from '@testing-library/react';

import { AppProvider } from '../../components/context/AppContext';
import {  Footer } from '../../components/layout';
import { Logo } from '../../components/common';
import { LuGithub } from 'react-icons/lu';
import { SiGmail } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';
import { mockUseMediaQuery } from '../mockUseMediaQuery';

import {
  testScrollToTop,
} from '../helpers/userHelpers';

const SOCIAL_NETWORKS = [
  {
    icon: <LuGithub />,
    href: 'https://github.com/your-github-username',
    name: 'github',
  },
  { icon: <SiGmail />, href: 'mailto:youremail@example.com', name: 'gmail' },
  {
    icon: <FaLinkedinIn />,
    href: 'https://www.linkedin.com/in/your-linkedin-profile/',
    name: 'linkedin',
  },
];

describe('El footer debe funcionar correctamente', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

    test('El logo se muestra correctamente', () => {
      render(
        <AppProvider>
          <Footer>
            <Logo className={'footer'} />
          </Footer>
        </AppProvider>
      );
      const logo = screen.getByTestId('footerLogo');
      expect(logo).toMatchSnapshot();
    });
    test.each(SOCIAL_NETWORKS.map((social) => [social.name, social.href]))(
      'Debería renderizar el link de la red social %s',
      async (name, href) => {
        render(
          <AppProvider>
            <Footer />
          </AppProvider>
        );
   
        const link = screen.getByTestId(`${name}Link`);
        expect(link).toHaveAttribute('href', href);
      }
    );
  
    test.each(SOCIAL_NETWORKS.map((social) => [social.name]))(
      'Se deberia mostrar la red social correctamente %s',
      (name) => {
        render(
          <AppProvider>
            <Footer />
          </AppProvider>
        );
   
        const button = screen.getByTestId(`${name}Link`);
        expect(button).toMatchSnapshot();
      } 
    );
    test('Debería desplazarse a la sección frontpage al hacer clic en el botón "Volver al inicio" (mobile)', () => {
      mockUseMediaQuery({ isMobile: true, isTablet: true });
      testScrollToTop('/', 'footerButton');
    });
    test('Debería desplazarse a la sección frontpage al hacer clic en el botón "Volver al inicio"', () => {
      testScrollToTop('/', 'footerButton');
    }); 
  });