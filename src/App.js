import React from 'react';
import { AppProvider } from './components/context/AppContext';
import { BrowserRouter } from 'react-router-dom';
import MyRoutes from './components/VisualPoetry/routes/MyRoutes';

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
    </AppProvider>
  );
};
export default App;

