/**
 * @module layout
 * @description Conjunto de componentes principales de la aplicación. Incluye elementos esenciales para la estructura de la interfaz, como el pie de página, la cabecera, la barra lateral y más.
 * 
 * @see {@link module:layout/Footer|Footer} - Componente que representa el pie de página de la aplicación.
 * @see {@link module:layout/header/Header|Header} - Componente que representa el header de la aplicación.
 * @see {@link module:layout/header/DesktopHeader|DesktopHeader} - Componente que representa el header para dispositivos laptop.
 * @see {@link module:layout/header/MobileHeader|MobileHeader} - Componente que representa el header para dispositivos movil.
 * @see {@link module:layout/RenderNav|RenderNav} - Componente que renderiza un menú de navegación.
 * @see {@link module:layout/SideBar|SideBar} - Componente que representa la barra lateral de la aplicación.
 * @see {@link module:layout/SocialNetworks|SocialNetworks} - Componente para mostrar los enlaces a redes sociales.
 * @see {@link module:layout/EditorToolbox|EditorToolbox} - Componente que proporciona herramientas para la edición de texto.
 */

export { default as Footer } from './Footer';
export { default as Header } from './header/Header';
export { default as MobileHeader } from './header/MobileHeader';
export { default as DesktopHeader } from './header/DesktopHeader';
export { default as RenderNav } from './RenderNav';
export { default as SideBar } from './SideBar';
export { default as SocialNetworks } from './SocialNetworks';
export { default as EditorToolbox } from './EditorToolbox';
