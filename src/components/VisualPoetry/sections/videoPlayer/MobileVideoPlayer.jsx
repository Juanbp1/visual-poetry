import React from 'react';
import videoLayerMobile from '../../../../assets/videos/video-layer-mobile.mp4';
import { VideoPlayer } from '../';
import {
  designImgLayer,
  mobileImgLayer,
} from '../../../../assets/imgs/ui/design/layer/';
/**
 * Componente que renderiza un video en una capa con imágenes superpuestas.
 * Este componente está optimizado para ser utilizado en dispositivos móviles.
 *
 * @module sections/videoPlayer/VideoPlayer/MobileVideoPlayer
 *
 * @returns {JSX.Element} - El componente MobileVideoPlayer con video y capas de imágenes.
 *
 * @example
 * import React from 'react';
 * import { MobileVideoPlayer } from '../videoPlayer';
 *
 * const Mycomponent = () => (
 *   <div>
 *     <MobileVideoPlayer />
 *   </div>
 * );
 *
 * export default Mycomponent;
 */
const MobileVideoPlayer = () => (
  <VideoPlayer
    designImgLayer={designImgLayer}
    videoSource={videoLayerMobile}
    windowImageSource={mobileImgLayer}
    containerClass="frontPage__containerLayer frontPage__containerLayer--mobile"
    imageClass="frontPage__windowsImageLayer frontPage__windowsImageLayer--mobile"
    videoClass="frontPage__image frontPage__image--mobile"
    altText="capa de imagen de ventana móvil"
    id="mobileVideoPlayer"
  />
);

export default MobileVideoPlayer;
