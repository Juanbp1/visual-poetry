import React from 'react';
import { LuMenu } from 'react-icons/lu';
import { Button, Logo } from '../../common';
import { SOCIAL_NETWORKS } from '../../constants/socialNetworks';
import { MENU } from '../../constants/uiConstants';
import { CanvasDownloader } from '../../VisualPoetry/canvasToolbox';
import RenderNav from '../RenderNav';
import SideBar from '../SideBar';
import { AnimatedHeader } from '../../VisualPoetry/animations';
import PropTypes from 'prop-types';

/**
 * Componente MobileHeader que renderiza el encabezado para la vista móvil.
 * Incluye el logo, un botón para abrir el menú de navegación, y una herramienta para descargar el canvas si se proporciona una referencia.
 * También renderiza una barra lateral (sidebar) con un menú y redes sociales.
 *
 * @module layout/header/MobileHeader
 * @param {Object} props - Propiedades pasadas al componente.
 * @param {React.RefObject} props.sidebarRef - Referencia al elemento de la barra lateral.
 * @param {string} props.scrollHeaderClass - Clase CSS aplicada al encabezado cuando se desplaza la página.
 * @param {boolean} props.headerVisibility - Controla la visibilidad del encabezado.
 * @param {Function} props.handleToggleGallery - Función que se ejecuta al abrir o cerrar la galería.
 * @param {Function} props.handleCloseGallery - Función que se ejecuta al cerrar la galería.
 * @param {React.RefObject|undefined} [props.canvasRef] - Referencia al elemento canvas para la herramienta de descarga. Si no se proporciona, se muestra el botón de menú de navegación en su lugar.
 * @param {boolean} props.showGalleryThird - Indica si la galería secundaria debe ser visible.
 *
 * @returns {JSX.Element} El componente MobileHeader renderizado.
 *
 * @example
 * // Ejemplo de uso del componente MobileHeader
 * <MobileHeader
 *   sidebarRef={sidebarRef}
 *   scrollHeaderClass="header--scrolled"
 *   headerVisibility={true}
 *   handleToggleGallery={toggleGallery}
 *   handleCloseGallery={closeGallery}
 *   canvasRef={canvasRef}
 *   showGalleryThird={true}
 * />
 */
const MobileHeader = ({
  sidebarRef,
  scrollHeaderClass,
  headerVisibility,
  handleToggleGallery,
  handleCloseGallery,
  canvasRef,
  showGalleryThird,
}) => (
  <>
    <AnimatedHeader
      headerClassName={scrollHeaderClass}
      ref={sidebarRef}
      headerVisibility={headerVisibility}
    >
      <div className="header__container">
        <Logo className="header" />
        {!canvasRef && (
          <Button
            id="menuButton"
            className="header__navMenu"
            handleClick={handleToggleGallery}
            Icon={LuMenu}
            ariaLabel="Abrir menu de navegación"
          />
        )}

        {canvasRef && <CanvasDownloader canvasRef={canvasRef} />}
      </div>
    </AnimatedHeader>
    <SideBar
      handleCloseGallery={handleCloseGallery}
      isSideBarOpen={showGalleryThird}
      classContainer="sidebar__nav"
      classSiderBar="--portrait"
      classClose="closeCircle closeCircle--nav"
      logo={<Logo className="uiLogo" />}
      socialNetworks={SOCIAL_NETWORKS}
      dataTestId="menuSidebar"
    >
      {showGalleryThird && <RenderNav menuItems={MENU} className="portrait" />}
    </SideBar>
  </>
);

MobileHeader.propTypes = {
  sidebarRef: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLElement),
  }).isRequired,
  scrollHeaderClass: PropTypes.string.isRequired,
  headerVisibility: PropTypes.bool.isRequired,
  handleToggleGallery: PropTypes.func.isRequired,
  handleCloseGallery: PropTypes.func.isRequired,
  canvasRef: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLCanvasElement),
  }),
  showGalleryThird: PropTypes.bool.isRequired,
};

export default MobileHeader;
