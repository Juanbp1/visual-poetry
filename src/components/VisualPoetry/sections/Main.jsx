import React from 'react';
import classNames from 'classnames';
import { useAppContext } from '../../context/AppContext';
import { useScrollAndBlur } from '../../../hooks';

/**
 * Componente principal de la aplicación que maneja el contenido principal y aplica una clase de desenfoque basada en el estado de la galería.
 *
 * @module sections/Main
 * @param {Object} props - Las propiedades del componente.
 * @param {React.ReactNode} props.children - Los elementos hijos que se renderizarán dentro del componente `<main>`.
 * @example
 * // Ejemplo de uso del componente Main
 * import React from 'react';
 * import { Main } from '../sections';
 *
 * const Mycomponent = () => {
 *    return (
 *      <Main>
 *        <h1>Contenido principal</h1>
 *      </Main>
 *    );
 *  }
 * export default MyComponent;
 */
const Main = ({ children }) => {
  const { state } = useAppContext();
  const { showGalleryThird, showGallery } = state;
  
  const { blurClass } = useScrollAndBlur(showGallery || showGalleryThird);

  const mainClass = classNames(
    'home__sections',
    'sections',
    `sections${blurClass}`
  );

  return <main className={mainClass}>{children}</main>;
};
export default Main;
