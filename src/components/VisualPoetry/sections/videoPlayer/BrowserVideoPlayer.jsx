import React from 'react';
import videoLayer from '../../../../assets/videos/video-layer.mp4';
import { VideoPlayer } from '../';
import {
  designImgLayer,
  windowImgLayer,
} from '../../../../assets/imgs/ui/design/layer';
/**
 * Componente que renderiza un video en una capa con imágenes superpuestas.
 * Este componente está optimizado para ser utilizado en navegadores de escritorio.
 *
 * @module sections/videoPlayer/VideoPlayer/BrowserVideoPlayer
 *
 * @returns {JSX.Element} - El componente BrowserVideoPlayer con video y capas de imágenes.
 *
 * @example
 * import React from 'react';
 * import { BrowserVideoPlayer } from './path/to/VideoPlayer';
 *
 * const App = () => (
 *   <div>
 *     <BrowserVideoPlayer />
 *   </div>
 * );
 *
 * export default App;
 */
const BrowserVideoPlayer = () => (
  <VideoPlayer
    designImgLayer={designImgLayer}
    videoSource={videoLayer}
    windowImageSource={windowImgLayer}
    containerClass="frontPage__containerLayer"
    imageClass="frontPage__windowsImageLayer frontPage__windowsImageLayer"
    videoClass="frontPage__videoLayer"
    altText="capa de imagen de ventana"
    id="browserVideoPlayer"
  />
);
export default BrowserVideoPlayer;
