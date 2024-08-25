import React, { useEffect } from 'react';
import CanvasContainer from '../VisualPoetry/canvas/CanvasContainer';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

/**
 * `AppViewer` es un componente funcional que muestra el contenido del `CanvasContainer`
 * si existe una imagen en el estado de la aplicación. Si no hay una imagen, redirige
 * al usuario a la página principal.
 *
 * @module pages/AppViewer
 * @returns {JSX.Element} El componente de AppViewer.
 * @example
 * import { AppViewer } from '../pages/';
 * const MyComponent = () => {
 *   return (
 *     <AppViewer />
 *   );
 * }
 */
const AppViewer = () => {
  const { state } = useAppContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!state.image) {
      navigate('/');
    }
  }, [navigate, state.image]);
  return (
    <div>
      <div className="App" data-testid="app-container">
        {state.image && <CanvasContainer />}
      </div>
    </div>
  );
};

export default AppViewer;
