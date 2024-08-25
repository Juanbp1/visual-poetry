
import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { useAppContext } from '../../context/AppContext';
import { DEVICE_TYPES } from '../../constants/uiConstants';
import {
  useCloseSelector,
  useScrollHandler,
  useResizeListener,
} from '../../../hooks';
import { DesktopHeader, MobileHeader } from '../';
import { ResponsiveComponent } from '../../common';

/**
 * Componente de encabezado que incluye un logotipo, un menú de navegación y un descargador de lienzo.
 * El componente ajusta su apariencia según la posición de desplazamiento y el tamaño de la pantalla.
 * También gestiona la visibilidad del encabezado y la barra lateral.
 *
 * @module layout/header/Header
 * @param {Object} props - Los props del componente Header
 * @param {string} props.classContainer - La clase CSS que se aplicará al encabezado.
 * @param {boolean} [props.showMenu] - Flag  que indica si se deben representar los elementos del menú.
 * @param {boolean} [props.useStickyStyles] - Flag  que indica si se deben utilizar estilos fijos para el encabezado.
 * @param {Object} [props.canvasRef] - Una referencia al elemento lienzo.
 * @returns {JSX.Element} The rendered Header component.
 *
 * @example
 *  // Ejemplo para el componente Header en el Home
 * import React from 'react';
 * import { Header } from '../layout';
 *
 * const MyComponent = () => (
 *   <Header
 *     classContainer="home-header"
 *     useStickyStyles={true}
 *   />
 * );
 *
 * export default MyComponent;
 *
 * @example
 * // Ejemplo para el componente Header en el AppViewer
 * import React from 'react';
 * import { Header } from '../layout/';
 *
 * const MyComponent = () => (
 *   <Header
 *     classContainer="appViewerContainer__header"
 *     canvasRef={canvasRef}
 *   />
 * )
 *
 * export default MyComponent;
 */
const Header = ({
  classContainer,
  showMenu = true,
  canvasRef,
  useStickyStyles = false,
}) => {
  const headerRef = useRef();
  const { state, actions } = useAppContext();
  const {updateGalleryToggleActionThird}= actions;
  const { LAPTOP, TABLET, MOBILE } = DEVICE_TYPES;
  const { scrolled, headerVisibility } = useScrollHandler();
  const { showGalleryThird } = state;

  const scrollHeaderClass = `${classContainer} header ${
    scrolled && useStickyStyles ? `${classContainer}--scrolled` : ''
  }`;

  const handleCloseGallery = useCallback(() => {
    updateGalleryToggleActionThird(false);
  }, [updateGalleryToggleActionThird]);

  const handleToggleGallery = useCallback(() => {
    updateGalleryToggleActionThird(!showGalleryThird);
  }, [updateGalleryToggleActionThird, showGalleryThird]);

  const sidebarRef = useCloseSelector(handleCloseGallery, showGalleryThird);
  useResizeListener(handleCloseGallery);

  return (
    <>
      <ResponsiveComponent
        visibleOnDeviceTypes={LAPTOP}
        componentToRender={
          <DesktopHeader
            headerRef={headerRef}
            scrollHeaderClass={scrollHeaderClass}
            headerVisibility={headerVisibility}
            showMenu={showMenu}
            canvasRef={canvasRef}
          />
        }
      />
      <ResponsiveComponent
        visibleOnDeviceTypes={[MOBILE, TABLET]}
        componentToRender={
          <MobileHeader
            sidebarRef={sidebarRef}
            scrollHeaderClass={scrollHeaderClass}
            headerVisibility={headerVisibility}
            handleToggleGallery={handleToggleGallery}
            handleCloseGallery={handleCloseGallery}
            canvasRef={canvasRef}
            showGalleryThird={showGalleryThird}
          />
        }
      />
    </>
  );
};

Header.propTypes = {
  classContainer: PropTypes.string.isRequired,
  showMenu: PropTypes.bool,
  useStickyStyles: PropTypes.bool,
  canvasRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({
      current: PropTypes.instanceOf(HTMLCanvasElement),
    }),
  ]),
};

export default Header;
