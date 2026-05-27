import React, { useState, useEffect } from 'react';
import Nav from './Nav/Nav';
import Home from './Home/Home';
import About from './About/About';
import Ebook from './Ebook/Ebook';
import Contact from './Contact/Contact';
import Footer from './Footer/Footer';
import PaymentSuccess from './paymentPopups/PaymentSuccess';
import PaymentCancel from './paymentPopups/PaymentCancel';
import './App.css';

function App() {
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      setPaymentStatus('success');
    } else if (params.get('cancel') === 'true') {
      setPaymentStatus('cancel');
    }

    // Clean up query parameters from the browser URL so refreshing doesn't re-trigger popups
    if (params.has('success') || params.has('cancel')) {
      const url = new URL(window.location.href);
      url.searchParams.delete('success');
      url.searchParams.delete('cancel');
      window.history.replaceState({}, document.title, url.pathname + url.search);
    }
  }, []);

  return (
    <div className="app">
      <Nav />
      <main className="mainContent">
        <Home />
        <About />
        <Ebook />
        <Contact />
      </main>
      <Footer />

      {paymentStatus === 'success' && (
        <PaymentSuccess setPaymentActive={() => setPaymentStatus(null)} />
      )}
      {paymentStatus === 'cancel' && (
        <PaymentCancel setPaymentActive={() => setPaymentStatus(null)} />
      )}
    </div>
  );
}

export default App;
