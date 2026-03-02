import { useState } from 'react';
import CanvasLoader from "./components/common/CanvasLoader";
import ScrollWrapper from "./components/common/ScrollWrapper";
import Experience from "./components/experience";
import Footer from "./components/footer";
import Hero from "./components/hero";
import ContactPage from "./components/contact/ContactPage";

function App() {
  const [showContact, setShowContact] = useState(false);

  const handleContactClick = () => {
    setShowContact(true);
  };

  const handleBackToPortfolio = () => {
    setShowContact(false);
  };

  return (
    <>
      {showContact ? (
        <ContactPage onBack={handleBackToPortfolio} />
      ) : (
        <CanvasLoader onContactClick={handleContactClick}>
          <ScrollWrapper>
            <Hero/>
            <Experience/>
            <Footer/>
          </ScrollWrapper>
        </CanvasLoader>
      )}
    </>
  );
}

export default App;
