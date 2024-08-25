import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
/** 
 * Componente para mostrar enlaces a redes sociales con iconos.
 *
 * @module layout/SocialNetworks
 * @param {Object} props - Props del componente.
 * @param {Array.<Object>} props.socialNetworks - Array de objetos que representan redes sociales.
 * @param {React.Element} props.socialNetworks.icon - Icono que representa la red social.
 * @param {string} props.socialNetworks.href - URL del perfil en la red social.
 * @param {string} props.classContainer - Clase adicional para personalizar el estilo del componente.
 *
 * @returns {React.Element} El componente de redes sociales.
 * @example
 * import React from 'react';
 * import { SocialNetworks } from '../layout'
 *
 * const social = [
 *   { icon: <FacebookIcon />, href: 'https://facebook.com', name: 'Facebook' },
 *   { icon: <TwitterIcon />, href: 'https://twitter.com', name: 'Twitter' }
 * ];
 *
 * const MyComponent = () => {
 *   return(
 *     <SocialNetworks socialNetworks={social} classContainer="custom-class" />
 *    );
 *   }
 * export default MyComponent; 
 *
 *
 */
const SocialNetworks = ({ socialNetworks, classContainer }) => {
  const socialMedia = classNames(
    'socialMedia__socialNetworks',
    { [`socialMedia__socialNetworks--${classContainer}`]: classContainer }
  );
  
  const icon = classNames(
    'socialMedia__socialIcon',
    { [`socialMedia__socialIcon--${classContainer}`]: classContainer }
  );
  return (
    <div className={socialMedia}>
      {socialNetworks.map((social, index) => (
        <a
          key={index}
          className={icon}
          href={social.href}
          data-testid={`${social.name}Link`}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};
SocialNetworks.propTypes = {
  classContainer: PropTypes.string.isRequired,
  socialNetworks: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.element.isRequired,
      href: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default SocialNetworks;
