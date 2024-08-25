import React from 'react';
import { scrollToTop } from '../utils';
import { IoArrowUp } from 'react-icons/io5';
import { SocialNetworks } from './';
import { Logo, Button, ResponsiveComponent } from '../common';
import { SOCIAL_NETWORKS } from '../constants/socialNetworks';
import { DEVICE_TYPES } from '../constants/uiConstants';
const { MOBILE, TABLET, LAPTOP } = DEVICE_TYPES;
/**
 *Componente que representa el pie de página de la aplicación.
 * @module layout/Footer
 * @returns {JSX.Element} El componente Footer
 * @example
 * import React from 'react';
 * import { Footer } from '../layout'
 *
 * const MyComponent = () => {
 *   <Footer />
 * };
 * export default MyComponent;
 */
const Footer = () => {
  return (
    <section className="sections__footerContainer footerContainer">
      <div className="footerContainer__footer footer">
        <div className="footer__content">
          <div className="uiLogo__logo">
            <Logo className="footer" />
          </div>
          <ResponsiveComponent
            visibleOnDeviceTypes={[TABLET, LAPTOP]}
            componentToRender={
              <Button
                className="button__footer button__withIcon "
                name="Volver arriba"
                text="Volver arriba"
                handleClick={() => scrollToTop()}
                Icon={IoArrowUp}
                iconClassName="button__footerArrowIcon"
                title="Volver al Inicio"
                ariaLabel="Volver al Inicio"
                id="footerButton"
              />
            }
          />
          <ResponsiveComponent
            visibleOnDeviceTypes={[MOBILE]}
            componentToRender={
              <Button
                className="button__footer button__withIcon button__circle"
                handleClick={() => scrollToTop()}
                Icon={IoArrowUp}
                iconClassName="button__footerArrowIcon"
                title="Volver al Inicio"
                ariaLabel="Volver al Inicio"
                id="footerButton"
              />
            }
          />
        </div>
        <div className="socialMedia__socialCopyManager">
          <SocialNetworks
            socialNetworks={SOCIAL_NETWORKS}
            classContainer="footer"
          />
          <p className="socialMedia__copyright ">
            Copyright © 2024 Juan Manuel Barea Pantoja
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
