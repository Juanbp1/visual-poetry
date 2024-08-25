import { useCallback, useEffect, useRef } from 'react';

/**
 * Hook personalizado para cerrar un componente (picker) cuando se hace clic fuera de él
 * o se presiona la tecla "Escape".
 *
 * @module hooks/useCloseSelector
 * @param {Function} toggleFunction - Función para alternar el estado de visibilidad del componente.
 * @param {boolean} isActive - Estado que indica si el componente está activo.
 * @returns {React.RefObject} - Referencia al componente para determinar si el clic está fuera de él.
 * @example
 * // Ejemplo de uso del hook useCloseSelector
 * const MyComponent = () => {
 *   const [isOpen, setIsOpen] = useState(false);
 *   const ref = useCloseSelector(() => setIsOpen(false), isOpen);
 *
 *   return (
 *     <div ref={ref}>
 *       {isOpen && <MyPickerComponent />}
 *       <button onClick={() => setIsOpen(true)}>Open Picker</button>
 *     </div>
 *   );
 * };
 */
const useCloseSelector = (toggleFunction, isActive) => {
  const ref = useRef(null);

  /**
   * Maneja la tecla presionada, cerrando el componente si se presiona "Escape".
   * @member module:hooks/useCloseSelector
   * @param {KeyboardEvent} event - Evento de teclado.
   */
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape' && isActive) {
        toggleFunction();
      }
    },
    [toggleFunction, isActive]
  );

  /**
   * Maneja el clic fuera del componente, cerrándolo si el clic no está dentro del componente.
   * @member module:hooks/useCloseSelector
   * @param {MouseEvent} event - Evento de clic del ratón.
   */
  const handleClickOutside = useCallback(
    (event) => {
      if (ref.current && !ref.current.contains(event.target) && isActive) {
        toggleFunction();
      }
    },
    [toggleFunction, isActive]
  );
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    };
  }, [handleClickOutside, toggleFunction, isActive, handleKeyDown]);
  return ref;
};

export default useCloseSelector;
