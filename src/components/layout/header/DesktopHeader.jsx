import React from 'react';
import { Logo } from '../../common';
import { MENU } from '../../constants/uiConstants';
import { AnimatedHeader } from '../../VisualPoetry/animations';
import { CanvasDownloader } from '../../VisualPoetry/canvasToolbox';
import RenderNav from '../RenderNav';
import PropTypes from 'prop-types';

/**
 * Componente DesktopHeader que renderiza el encabezado para la vista de escritorio.
 * Incluye el logo, un menú de navegación y una herramienta para descargar el canvas si se proporciona una referencia.
 *
 * @module layout/header/DesktopHeader
 * @param {Object} props - Propiedades pasadas al componente.
 * @param {React.RefObject} props.headerRef - Referencia al elemento del encabezado.
 * @param {string} props.scrollHeaderClass - Clase CSS aplicada al encabezado cuando se desplaza la página.
 * @param {boolean} props.headerVisibility - Controla la visibilidad del encabezado.
 * @param {boolean} props.showMenu - Indica si se debe mostrar el menú de navegación.
 * @param {React.RefObject|undefined} [props.canvasRef] - Referencia al elemento canvas para la herramienta de descarga. Si no se proporciona, se muestra el menú de navegación en su lugar.
 *
 * @returns {JSX.Element} El componente DesktopHeader renderizado.
 *
 * @example
 * // Ejemplo de uso del componente DesktopHeader
 * <DesktopHeader
 *   headerRef={headerRef}
 *   scrollHeaderClass="header--scrolled"
 *   headerVisibility={true}
 *   showMenu={true}
 *   canvasRef={canvasRef}
 * />
 */
const DesktopHeader = ({
  headerRef,
  scrollHeaderClass,
  headerVisibility,
  showMenu,
  canvasRef,
}) => (
  <AnimatedHeader
    headerClassName={scrollHeaderClass}
    ref={headerRef}
    headerVisibility={headerVisibility}
  >
    <div className="header__container" data-testid="header">
      <Logo className="header" />
      {!canvasRef && showMenu && (
        <RenderNav menuItems={MENU} className="landscape" />
      )}
      {canvasRef && <CanvasDownloader canvasRef={canvasRef} />}
    </div>
  </AnimatedHeader>
);

DesktopHeader.propTypes = {
  headerRef: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLElement),
  }).isRequired,
  scrollHeaderClass: PropTypes.string.isRequired,
  headerVisibility: PropTypes.bool.isRequired,
  showMenu: PropTypes.bool.isRequired,
  canvasRef: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLCanvasElement),
  }),
};

export default DesktopHeader;
