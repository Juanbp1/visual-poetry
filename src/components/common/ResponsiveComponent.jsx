import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import { DEVICE_TYPES } from '../constants/uiConstants';

const { TABLET, MOBILE, LAPTOP } = DEVICE_TYPES;
/**
 * Componente que renderiza `componentToRender` basado en el tipo de dispositivo.
 * Utiliza media queries para detectar el tamaño de la pantalla y renderizar el componente asignado,
 * solo si el tipo de dispositivo actual está incluido en `visibleOnDeviceTypes`.
 *
 * @module common/ResponsiveComponent
 * @param {Object} props - Props del componente.
 * @param {Array<string>|string} props.visibleOnDeviceTypes - Tipo(s) de dispositivo para los que el componente debe ser visible.
 * Puede ser un array de tipos de dispositivos o un solo tipo de dispositivo.
 * @param {React.ReactNode} props.componentToRender - El componente que se renderiza si el tipo de dispositivo actual es uno de los `visibleOnDeviceTypes`.
 *
 * @returns {React.ReactElement} El componente renderizado o null si el tipo de dispositivo no está en `visibleOnDeviceTypes`.
 *
 * @example
 * // Ejemplo de uso del componente
 * import React from 'react';
 * import { ResponsiveComponent } from '../common';
 * import { DEVICE_TYPES } from '../constants/uiConstants';
 *
 * const { MOBILE, TABLET } = DEVICE_TYPES;
 *
 * const MyComponent = () => (
 *   <div>
 *     <ResponsiveComponent
 *       visibleOnDeviceTypes={[MOBILE, TABLET]}
 *       componentToRender={<div>Este componente es visible en dispositivos móviles y tabletas.</div>}
 *     />
 *
 *     <ResponsiveComponent
 *       visibleOnDeviceTypes={LAPTOP}
 *       componentToRender={<div>Este componente es visible solo en computadoras portátiles.</div>}
 *     />
 *   </div>
 * );
 *
 * export default MyComponent;
 */
const ResponsiveComponent = ({ visibleOnDeviceTypes, componentToRender }) => {
  const [currentDeviceType, setCurrentDeviceType] = useState(LAPTOP);

  // Media queries para distintos tipos de dispositivos
  const isMobile = useMediaQuery({ query: '(max-width: 430px)' });
  const isTablet = useMediaQuery({
    query: '(min-width: 430px) and (max-width: 1024px)',
  });

  const updateDeviceType = useCallback(() => {
    const currentDeviceType = isMobile ? MOBILE : isTablet ? TABLET : LAPTOP;
    setCurrentDeviceType(currentDeviceType);
  }, [isMobile, isTablet]);

  useEffect(() => {
    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);

    return () => {
      window.removeEventListener('resize', updateDeviceType);
    };
  }, [updateDeviceType]);

  // Devuelve el componente a renderizar si el tipo de dispositivo está en `visibleOnDeviceTypes`
  return visibleOnDeviceTypes.includes(currentDeviceType) && componentToRender;
};
ResponsiveComponent.propTypes = {
  visibleOnDeviceTypes: PropTypes.oneOfType([
    PropTypes.oneOf([MOBILE, TABLET, LAPTOP]),
    PropTypes.arrayOf(PropTypes.oneOf([MOBILE, TABLET, LAPTOP])),
  ]).isRequired,
  componentToRender: PropTypes.node.isRequired,
};

export default ResponsiveComponent;
 