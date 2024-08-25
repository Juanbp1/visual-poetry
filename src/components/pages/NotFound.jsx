import React from 'react';
import { BsFillArrowLeftCircleFill as ArrowLeftCircle } from 'react-icons/bs';
import { Header } from '../layout';
import { Button } from '../common';
import { robot } from '../../assets/imgs/ui/design/illustrations';
import { useNavigate } from 'react-router-dom';
/**
 * Componente que muestra una página de error 404.
 * @module pages/NotFound
 * @returns {JSX.Element} El componente NotFound.
 * @example
 * import { NotFound } from '../pages';
 * const Mycomponent = () => {
 *    return (
 *      <NotFound />
 *    );
 * }
 */

// Maneja la redirección al inicio cuando el usuario hace clic en el botón.
const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };
  return (
    <section
      className="sections__notFoundContainer notFoundContainer"
      role="alert"
    >
      <Header classContainer="notFoundContainer__header" showMenu={true} />
      <div className="notFound__content">
        <div className="notFound__info">
          <h1 className="notFound__title">
            <span className="notFound__keyword">Error 404</span> Página No
            Encontrada
          </h1>
          <p className="notFound__text">
            ¡Oops! No podemos encontrar la página que buscas. ¿Tal vez nuestro
            robot la ha convertido en chatarra? ¡No te preocupes! Sigue la luz
            de nuestras secciones o haz clic en 'Volver a Inicio' para regresar
            al punto de partida.
          </p>
          <Button
            className="button__frontepage button__frontepage--reverse button__withIcon"
            name="Volver al Inicio"
            text="Volver al Inicio"
            Icon={ArrowLeftCircle}
            iconClassName="button__frontepageArrowIcon"
            handleClick={handleClick}
            ariaLabel="Volver al Inicio"
            id="notFoundButton"
          />
        </div>
        <img className="notFound__image" src={robot} alt="robot" />
      </div>
    </section>
  );
};

export default NotFound;
