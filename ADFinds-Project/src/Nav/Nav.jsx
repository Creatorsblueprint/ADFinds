import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Nav.module.css';

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Handle URL-based scrolling on mount and path changes
    const path = location.pathname.replace('/', '');
    const sectionId = path || 'home';
    
    const sections = ['home', 'about', 'ebook', 'contact'];
    if (sections.includes(sectionId)) {
      const element = document.getElementById(sectionId);
      if (element) {
        // Small delay to ensure the DOM is ready
        const timeoutId = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(sectionId);
        }, 100);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const sections = ['home', 'about', 'ebook', 'contact'];
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + height) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'ebook', label: 'Ebook', path: '/ebook' },
  ];

  const handleLinkClick = (id) => {
    setActiveSection(id);
    setIsMobileMenuOpen(false);
    // Path change will be handled by Link and useEffect, 
    // but we still scroll here to handle clicking the same link twice
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.logo}>
            AbuDhabi<span>Finds</span>
          </div>
        </div>

        <div className={styles.center}>
          <ul className={styles.links}>
            {navLinks.map((link) => (
              <li key={link.id} className={styles.linkItem}>
                <Link 
                  to={link.path} 
                  className={`${styles.link} ${activeSection === link.id ? styles.active : ''}`}
                  onClick={() => handleLinkClick(link.id)}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div 
                      layoutId="underline" 
                      className={styles.underline}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.right}>
          <div className={styles.desktopContact}>
            <Link 
              to="/contact"
              className={`${styles.contactBtn} ${activeSection === 'contact' ? styles.activeContact : ''}`}
              onClick={() => handleLinkClick('contact')}
            >
              <span className={styles.contactPill}>Contact</span>
              <span className={styles.arrowCircle}>
                <i className="ri-arrow-right-up-line"></i>
              </span>
            </Link>
          </div>
          
          <button 
            className={styles.hamburger} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <i className={isMobileMenuOpen ? "ri-close-line" : "ri-menu-3-line"}></i>
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className={styles.mobileMenu}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <ul className={styles.mobileLinks}>
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <Link 
                      to={link.path} 
                      className={activeSection === link.id ? styles.mobileActive : ''}
                      onClick={() => handleLinkClick(link.id)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li className={styles.mobileContactItem}>
                  <Link 
                    to="/contact"
                    className={`${styles.contactBtn} ${activeSection === 'contact' ? styles.mobileActive : ''}`}
                    onClick={() => handleLinkClick('contact')}
                  >
                    <span className={styles.contactPill}>Contact</span>
                    <span className={styles.arrowCircle}>
                      <i className="ri-arrow-right-up-line"></i>
                    </span>
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Nav;
