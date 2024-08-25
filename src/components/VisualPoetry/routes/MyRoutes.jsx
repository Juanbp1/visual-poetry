import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router';
import { Spin } from '../animations';

const Home = lazy(() => import('../../pages/Home'));
const AppViewer = lazy(() => import('../../pages/AppViewer'));
const NotFound = lazy(() => import('../../pages/NotFound'));

/**
 * Componente que define las rutas de la aplicación utilizando carga diferida.
 *
 * @module Routes
 * @returns {JSX.Element} - El componente MyRoutes con rutas definidas.
 * 
 * @example
 * // Ejemplo de uso del componente MyRoutes
 * import MyRoutes from '../routes/MyRoutes';
 *
 * const App = () => {
 *   return (
 *     <div>
 *       <MyRoutes />
 *     </div>
 *   );
 * }
 *
 * export default App;
 *
 */
const MyRoutes = () => {
  return (
    <Suspense fallback={<Spin />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appViewer" element={<AppViewer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default MyRoutes;
