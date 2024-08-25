import React from 'react';
import { LuGithub } from 'react-icons/lu';
import { SiGmail } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';
/**
 * Datos para el componente SocialNetworks.
 * @namespace SOCIALNETWORKS_DATA
 * @type {Array<Object>}
 * @property {React.Element} icon - El ícono representativo de la red social.
 * @property {string} href - El enlace de la red social o la dirección de correo electrónico.
 * @property {string} name - El nombre de la red social (como 'github', 'gmail', 'linkedin').
 * @example
 * // Acceder a la información de las redes sociales
 * const networks = SOCIAL_NETWORKS;
 * // Mostrar el nombre de la primera red social
 * console.log(networks[0].name); "github"
 * // Mostrar el enlace de la segunda red social
 * console.log(networks[1].href); "mailto:youremail@example.com"
 *
 * @see https://react-icons.github.io/react-icons
 */
export const SOCIAL_NETWORKS = [
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
