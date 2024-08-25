import React from 'react';
import { BsFillArrowDownCircleFill as ArrowDownCircle } from 'react-icons/bs';
import { scrollToSection } from '../../utils';
import { BrowserVideoPlayer, MobileVideoPlayer } from './';
import Checks from './checks/Checks';
import { DEVICE_TYPES } from '../../constants/uiConstants';
import { Button, ResponsiveComponent } from '../../common';
const { MOBILE, TABLET, LAPTOP } = DEVICE_TYPES;

/**
 * Componente de portada que presenta una introducción a Visual Poetry.
 *
 * @module sections/FrontPages
 * @example
 * // Ejemplo de uso del componente FrontPages
 * import React from 'react';
 * import { FrontPages } from '../sections';
 *
 * const Mycomponent = () => {
 *    return (
 *      <FrontPages />
 *    );
 *  }
 * export default MyComponent;
 */
const FrontPages = () => {
  return (
    <section
      className="sections__frontPageContainer frontPageContainer"
      id="frontpageSection"
      data-testid="frontpageId"
    >
      <div className="frontPageContainer__frontPage frontPage">
        <div className="frontPage__container">
          <div className="frontPage__content">
            <div className="frontPage__info">
              <h1 className="frontPage__title" data-testid="frontpageTitle">
                <span className="frontPage__keyword">Visual Poetry</span>
                Convierte imágenes en arte textual 
              </h1> 
              <p className="frontPage__text" data-testid="frontpageText">
                Desata tu creatividad: Convierte imágenes en arte textual único.
                Sube tu imagen, escribe tu mensaje y personaliza el estilo para
                crear algo especial.
              </p>
              <Button
                className={'button__frontepage button__withIcon'}
                name={'Comenza a crear'}
                text={'Comenza a crear'}
                Icon={ArrowDownCircle}
                iconClassName={'button__frontepageArrowIcon'}
                handleClick={() => scrollToSection('dropzoneId')}
                title={'Comenzar a crear'}
                ariaLabel={'Comenzar a crear'}
                id={'frontpageButton'}
              />
            </div>
            <ResponsiveComponent
              visibleOnDeviceTypes={[LAPTOP, TABLET]}
              componentToRender={<BrowserVideoPlayer />}
            />
            <ResponsiveComponent
              visibleOnDeviceTypes={MOBILE}
              componentToRender={<MobileVideoPlayer />}
            />
          </div>
          <div className="frontPage__keyPoints keyPoints">
            <Checks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FrontPages;
