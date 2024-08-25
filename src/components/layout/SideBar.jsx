import React from 'react';
import PropTypes from 'prop-types';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { FadeIn } from '../VisualPoetry/animations';
import { SocialNetworks } from './';
import { Button } from '../common';
/**
 * Componente `SideBar` que representa una barra lateral en la interfaz.
 *
 * @module layout/SideBar
 * @param {Object} props - Las propiedades del componente.
 * @param {React.ReactNode} props.children - Contenido que se mostrará dentro de la barra lateral.
 * @param {Function} props.handleCloseGallery - Función que se llama cuando se cierra la galería.
 * @param {boolean} props.isSideBarOpen - Indica si la barra lateral está abierta.
 * @param {string} props.classContainer - Clase CSS adicional para el contenedor principal.
 * @param {string} [props.classSiderBar] - Clase CSS adicional específica para la barra lateral.
 * @param {string} [props.classClose] - Clase CSS adicional para el botón de cerrar.
 * @param {string} [props.dataTestId] - Identificador para pruebas de datos.
 * @param {React.ReactNode} [props.logo] - Componente o elemento para mostrar el logo.
 * @param {Array<{ icon: React.ReactElement, href: string }>} [props.socialNetworks] - Lista de redes sociales con iconos y enlaces.
 * @returns {React.ReactElement} El componente `SideBar`.
 * @example
 * // Ejemplo de uso del componente SideBar
 * import React from 'react';
 * import { SideBar } from '../layout'
 *
 * const MyComponent = () => {
 *  return(
 *   <SideBar
 *    isSideBarOpen={true} 
 *    handleCloseGallery={() => console.log('Cerrar galería')}
 *    classContainer="my-sidebar"
 *    dataTestId="sidebar"
 *    logo={<img src="logo.png" alt="Logo" />}
 *    socialNetworks={[{ icon: <FaTwitter />, href: 'https://twitter.com' }]}
 *    classClose="close-icon"
 *  >
 *     <p>Contenido de la barra lateral</p>
 *   </SideBar>
 *   );
 * }
 * export default MyComponent;
 *
 */
const SideBar = ({
  children,
  handleCloseGallery,
  isSideBarOpen,
  classContainer,
  classSiderBar,
  dataTestId,
  logo,
  socialNetworks,
  classClose,
}) => {
  const sideBar = `sidebar sidebar${classSiderBar}`;

  return (
    <FadeIn fadeInClass={sideBar} isSideBarOpen={isSideBarOpen} testid={dataTestId}>
      <div className={classContainer}>
        <div className="sidebar__closeCircle">
          {logo}
          <Button
            id={`${dataTestId}Close`}
            iconClassName={classClose}
            handleClick={handleCloseGallery}
            Icon={IoCloseCircleOutline}
            ariaLabel="Cerrar menu de navegación"
          />
        </div>
        {children}
        {socialNetworks && (
          <SocialNetworks
            socialNetworks={socialNetworks}
            classContainer="frontePage"
          />
        )}
      </div>
    </FadeIn>
  ); 
};

SideBar.propTypes = {
  dataTestId: PropTypes.string,
  classSiderBar: PropTypes.string,
  classClose: PropTypes.string,
  children: PropTypes.node.isRequired,
  handleCloseGallery: PropTypes.func.isRequired,
  isSideBarOpen: PropTypes.bool.isRequired,
  classContainer: PropTypes.string.isRequired,
  logo: PropTypes.node,
  socialNetworks: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.element.isRequired,
      href: PropTypes.string.isRequired,
    })
  ),
};
export default SideBar;
