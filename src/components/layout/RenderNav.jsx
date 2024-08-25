import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
/**
 * Componente que renderiza un menú de navegación.
 *
 * @module layout/RenderNav
 * @param {Object} props - Propiedades del componente.
 * @param {Array<Object>} props.menuItems - Array de objetos que representan los elementos del menú.
 * @param {string} props.menuItems[].href - URL a la que debe enlazar el elemento del menú.
 * @param {string} props.menuItems[].label - Texto del enlace del menú.
 * @param {string} props.className - Clase adicional que se aplica a los elementos de navegación.
 * @returns {JSX.Element} El componente de nav.
 * 
 * @example
 * import React from 'react';
 * import { RenderNav } from '../layout'
 * const menuItems = [
 *   { href: '/home', label: 'Home' },
 *   { href: '/about', label: 'About' },
 *   { href: '/contact', label: 'Contact' },
 * ];
 *
 * const MyComponent = () => {
 *  return(
 *     <RenderNav
 *       menuItems={menuItems}
 *       className="main-menu"
 *     />
 *   );
 *  }
 * export default MyComponent;
 */
const RenderNav = ({ menuItems, className }) => {
  const getClassName = (baseClass) => classNames(baseClass, {
    [`${baseClass}--${className}`]: className
  });
  
  const headerNav = getClassName('header__nav');
  const headerUl = getClassName('header__ul');
  const headerLi = getClassName('header__li');
  const headerLink = getClassName('header__link');
  return (
    <nav className={headerNav} data-testid={`${className}`}>
      <ul className={headerUl}>
        {menuItems.map((link, index) => (
          <li key={index} className={headerLi}>
            <a
              className={headerLink}
              href={link.href}
              data-testid={`href--${className}`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  ); 
};
RenderNav.propTypes = {
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  className: PropTypes.string.isRequired,
};
export default RenderNav;
