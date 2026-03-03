import { useState, useCallback } from 'react';
import { Navigation } from './sections/Navigation';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Process } from './sections/Process';
import { Technology } from './sections/Technology';
import { Simulator } from './sections/Simulator';
import { ContactForm } from './sections/ContactForm';
import { Footer } from './sections/Footer';
import { Preloader } from './components/Preloader';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      <div className={`min-h-screen bg-gray-50 ${isLoading ? 'overflow-hidden max-h-screen' : ''}`}>
        <Navigation />

        <main>
          <Hero isReady={!isLoading} />
          <About />
          <Process />
          <Technology />
          <Simulator />
          <ContactForm />
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}

export default App;
