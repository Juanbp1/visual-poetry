import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Componente genérico que renderiza un video en una capa con imágenes superpuestas.
 * El video se reproduce en un bucle con una tasa de reproducción ajustada.
 * @module sections/videoPlayer/VideoPlayer
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.videoSource - La fuente del video.
 * @param {string} props.windowImageSource - La fuente de la capa de imagen de ventana.
 * @param {string} props.containerClass - La clase CSS para el contenedor del video.
 * @param {string} props.videoClass - La clase CSS para el video.
 * @param {string} props.altText - El texto alternativo para las imágenes.
 *
 * @returns {JSX.Element} - El componente VideoPlayer con video y capas de imágenes.
 *
 * @example
 * // Ejemplo de uso del componente VideoPlayer
 * import React from 'react';
 * import videoLayer from '../../../../assets/videos/video-layer.mp4';
 * import { VideoPlayer } from '../';
 * import {
 *   designImgLayer,
 *   windowImgLayer,
 * } from '../../../../assets/imgs/ui/design/layer';
 *
 *  const BrowserVideoPlayer = () => (
 *   <VideoPlayer
 *     designImgLayer={designImgLayer}
 *     videoSource={videoLayer}
 *     windowImageSource={windowImgLayer}
 *     containerClass="frontPage__containerLayer"
 *     imageClass="frontPage__windowsImageLayer frontPage__windowsImageLayer"
 *     videoClass="frontPage__videoLayer"
 *     altText="capa de imagen de ventana"
 *     id="browserVideoPlayer"
 *   />
 * );
 * export default BrowserVideoPlayer;
 */
const VideoPlayer = ({
  designImgLayer,
  videoSource,
  windowImageSource,
  containerClass,
  imageClass,
  videoClass,
  altText,
  id,
}) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.2;
    }
  }, []);

  return (
    <>
      <img
        className="frontPage__designImageLayer"
        src={designImgLayer}
        alt="capa de imagen de diseño"
      />
      <div className={containerClass}>
        <img className={imageClass} src={windowImageSource} alt={altText} />
        <video
          ref={videoRef}
          data-testid={id}
          className={videoClass}
          src={videoSource}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </>
  );
};
export default VideoPlayer;

VideoPlayer.propTypes = {
  designImgLayer: PropTypes.string.isRequired,
  videoSource: PropTypes.string.isRequired,
  windowImageSource: PropTypes.string.isRequired,
  containerClass: PropTypes.string.isRequired,
  videoClass: PropTypes.string.isRequired,
  imageClass: PropTypes.string.isRequired, 
  altText: PropTypes.string.isRequired,
  id: PropTypes.string,
};
