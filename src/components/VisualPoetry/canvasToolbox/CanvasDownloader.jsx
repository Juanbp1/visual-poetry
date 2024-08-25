import React, { useState } from 'react';
import PropTypes from 'prop-types';
import html2canvas from 'html2canvas';
import { LuDownload } from 'react-icons/lu';
import { Button } from '../../common';
import { useCloseSelector } from '../../../hooks';
import { RenderFormatButtons } from './';

/**
 * `CanvasDownloader` es un componente que permite a los usuarios exportar el contenido del lienzo
 * en varios formatos de imagen. Utiliza `html2canvas` para capturar el contenido del lienzo y generar
 * una imagen descargable en formatos como PNG, JPG o WEBP.
 *
 * @module canvasToolbox/CanvasDownloader
 * @param {object} props - Las propiedades que se pasan al componente.
 * @param {React.RefObject<HTMLCanvasElement>} props.canvasRef - Referencia al elemento HTMLCanvasElement que se va a capturar.
 * @returns {JSX.Element} El componente de CanvasDownloader.
 * @example
 * // Ejemplo del componente CanvasDownloader
 * import React, { useRef } from 'react';
 * import { CanvasDownloader } from '../canvasToolbox';
 *
 * const Example = () => {
 *   const canvasRef = useRef(null);
 *
 *   return (
 *     <div>
 *       <canvas ref={canvasRef} />
 *       <CanvasDownloader canvasRef={canvasRef} />
 *     </div>
 *   );
 * };
 *
 * export default Example;
 */
const CanvasDownloader = ({ canvasRef }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => setModalIsOpen(!modalIsOpen);
  const modalRef = useCloseSelector(toggleModal, modalIsOpen);

  /**
   * Descarga una imagen en el formato especificado.
   * @member module:canvasToolbox/CanvasDownloader
   * @param {string} format - El formato en el que se descargará la imagen (e.g., 'png', 'jpg', 'webp').
   * @param {string} data - La URL de datos de la imagen generada.
   */
  const downloadImage = (format, data) => {
    const link = document.createElement('a');
    link.href = data;
    link.download = `visual-poetry.${format}`;
    link.click();
  };

  /**
   * Captura el contenido del lienzo y descarga la imagen en el formato especificado.
   * @member module:canvasToolbox/CanvasDownloader
   * @param {string} format - El formato en el que se capturará y descargará la imagen.
   */
  const captureCanvas = (format) => {
    if (!canvasRef.current) return;
    const canvasElement = canvasRef.current;
    html2canvas(canvasElement, {
      scale: 1,
      imageTimeout: 0,
    }).then((canvas) => {
      const imgData = canvas.toDataURL(`image/${format}`);
      downloadImage(format, imgData);
    });
  };

  return (
    <div ref={modalRef} data-testid="exportCanvas">
      <Button
        className="button__toolbox button__withIcon"
        name="Exportar"
        text="Exportar"
        Icon={LuDownload}
        handleClick={toggleModal}
        title="Elige un formato para exportar la imagen"
        ariaLabel="Exportar la imagen"
      />
      {modalIsOpen && (
        <div
          className="appViewerContainer__modal modal"
          aria-modal="true"
          aria-labelledby="modalTitle"
          data-testid="modalDownload"
        >
          <label
            id="modalTitle"
            className="modal__title"
            aria-label="Exportar como"
            data-testid="modalTitle"
          >
            Exportar como:
          </label>
          <div className="modal__buttonsWrapper">
            <RenderFormatButtons captureCanvas={captureCanvas} />
          </div>
        </div>
      )}
    </div>
  );
};
CanvasDownloader.propTypes = {
  canvasRef: PropTypes.shape({
    current: PropTypes.instanceOf(HTMLCanvasElement),
  }).isRequired,
};
export default CanvasDownloader;
