import React from 'react';
import { Footer, Header } from '../layout';
import {
  ExampleGallery,
  DropzoneContainer,
  QuickStart,
  FrontPages,
  FAQSection,
  Main,
} from '../VisualPoetry/sections';
/**
 * Componente funcional que representa la página de inicio.
 *
 * @module pages/Home
 * @returns {JSX.Element} El componente `Home` que incluye varios subcomponentes para construir la página principal.
 * @example
 * import { Home } from '../pages/'
 * 
 * const MyComponent = () =>{
 *   return (
 *     <Home />
 *   );
 * }
 */
const Home = () => {
  return (
    <div data-testid="app" className="home">
      <Main>
        <Header
          classContainer={'frontPageContainer__header'}
          showMenu={true}
          useStickyStyles={true}
        />
        <FrontPages />
        <QuickStart />
        <DropzoneContainer />
        <ExampleGallery />
        <FAQSection />
        <Footer />
      </Main>
    </div>
  );
};

export default Home;
