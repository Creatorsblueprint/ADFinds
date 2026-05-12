import React from 'react';
import Nav from './Nav/Nav';
import Home from './Home/Home';
import About from './About/About';
import Ebook from './Ebook/Ebook';
import Footer from './Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="app">
      <Nav />
      <main className="mainContent">
        <Home />
        <About />
        <Ebook />
      </main>
      <Footer />
    </div>
  );
}

export default App;
