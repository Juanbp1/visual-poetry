import { useState, useCallback } from 'react';

/**
 * Hook personalizado para manejar el estado del color picker.
 * @module hooks/useColorPicker
 * @returns {Object} - Un objeto con el estado del color picker y funciones para alternar y manejar eventos de teclado.
 * @example
 * // Ejemplo de uso del hook useColorPicker 
 * import React from 'react';
 * import { useColorPicker } from './hooks/useColorPicker';
 *
 * const ColorPickerComponent = () => {
 *   const { isOpen, toggleColorPicker, handleKeyDown } = useColorPicker();
 *
 *   return (
 *     <div>
 *       <button onClick={toggleColorPicker} onKeyDown={(e) => handleKeyDown(e)}>
 *         {isOpen ? 'Cerrar Color Picker' : 'Abrir Color Picker'}
 *       </button>
 *       {isOpen && <div>Color Picker Abierto</div>}
 *     </div>
 *   );
 * }
 */
export function useColorPicker() {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Alterna el estado del color picker.
   * @member hooks/useColorPicker
   */
  const toggleColorPicker = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  /**
   * Maneja los eventos de teclado, abriendo o cerrando el color picker con la tecla "Enter" o "Espacio".
   * @member hooks/useColorPicker
   * @param {KeyboardEvent} event - El evento de teclado.
   */
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        toggleColorPicker();
      }
      if (event.key === ' ') {
        toggleColorPicker();
      }
    },
    [toggleColorPicker]
  );

  return {
    isOpen,
    toggleColorPicker,
    handleKeyDown,
  };
}
