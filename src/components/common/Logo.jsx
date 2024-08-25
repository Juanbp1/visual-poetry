import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Componente Logo que renderiza un logo SVG con un nombre de texto.
 *
 * @module common/Logo
 * @param {Object} props - Las propiedades del componente.
 * @param {string} props.className - Una clase adicional para aplicar al logo.
 *
 * @returns {JSX.Element} El componente Logo.
 *
 * @example
 * // Ejemplo de uso del componente Logo
 * import React from 'react';
 * import { Logo } from '../common';
 *
 * const MyComponent = () => {
 *   return (<Logo className="primary" />);
 * }
 * export default MyComponent;
 */
const Logo = ({ className = 'header' }) => {
  const logoIconClass = classNames('uiLogo__logoIcon', {
    [`uiLogo__logoIcon--${className}`]: className
  });
  
  const logoNameClass = classNames('uiLogo__logoName', {
    [`uiLogo__logoName--${className}`]: className
  });
  
  return (
    <a
      className="header__link--notUnderlined"
      href="/"
      data-testid={`${className}Logo`}
    >
      <span className="uiLogo__logo" aria-label="logo de la página web">
        <svg
          className={logoIconClass}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="32798 1839 45 53.598"
          version="1.1"
        >
          <g id="shape">
            <g className="fills">
              <path
                className={logoIconClass}
                d="M32819.572,1839.016C32820.318,1839.007,32821.079,1838.981,32821.822,1839.025C32832.019,1839.625,32840.751,1847.626,32842.625,1857.636C32843.863,1864.248,32842.012,1871.414,32837.387,1876.360C32835.487,1878.392,32834.341,1878.856,32834.343,1881.772L32834.345,1884.584C32834.345,1886.148,32834.263,1887.604,32832.443,1888.215L32832.377,1888.236C32831.957,1888.375,32831.390,1888.400,32830.963,1888.285L32830.906,1888.269C32828.714,1887.668,32828.814,1885.930,32828.813,1884.174L32828.812,1881.680C32828.811,1881.243,32828.853,1880.698,32828.725,1880.278C32827.897,1877.566,32824.267,1877.384,32823.411,1880.062C32823.168,1880.821,32823.273,1881.764,32823.273,1882.558L32823.277,1887.654C32823.276,1888.809,32823.482,1890.056,32822.962,1891.126C32822.363,1892.182,32821.216,1892.749,32820.003,1892.563L32819.947,1892.554C32817.906,1892.236,32817.681,1890.620,32817.680,1888.992L32817.679,1876.255C32817.678,1875.918,32817.712,1875.524,32817.616,1875.199C32816.823,1872.507,32813.213,1872.167,32812.372,1874.895L32812.352,1874.960C32811.917,1876.365,32812.772,1877.977,32811.631,1879.286C32810.101,1881.042,32808.196,1880.243,32806.677,1879.073L32805.299,1877.949C32791.627,1865.971,32798.290,1843.402,32815.924,1839.497C32817.126,1839.231,32818.345,1839.092,32819.572,1839.016ZZM32820.144,1853.839C32818.307,1854.000,32816.672,1854.768,32815.484,1856.200C32811.897,1860.525,32815.243,1867.030,32820.941,1866.720C32826.631,1866.328,32829.122,1859.154,32824.643,1855.367L32823.680,1854.684C32822.718,1854.097,32821.294,1853.672,32820.144,1853.839ZZ"
                fill="black"
              />
            </g>
          </g>
        </svg>
        <p className={logoNameClass}>Visual Poetry</p>
      </span>
    </a>
  );
};
Logo.propTypes = {
  className: PropTypes.string.isRequired,
};
export default Logo;
