import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            AbuDhabiFinds
          </div>

          <div className={styles.social}>
            <span className={styles.socialLabel}>Media</span>
            <div className={styles.socialIcons}>
              <a href="#"><i className="ri-instagram-line"></i></a>
              <a href="#"><i className="ri-tiktok-fill"></i></a>
              <a href="#"><i className="ri-facebook-circle-fill"></i></a>
            </div>
          </div>

          <div className={styles.links}>
            <Link to="/" onClick={() => handleScrollTo('home')}>Home</Link>
            <Link to="/about" onClick={() => handleScrollTo('about')}>About</Link>
            <Link to="/ebook" onClick={() => handleScrollTo('ebook')}>Ebook</Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2026 AbuDhabi Finds. All rights reserved. | <a href="#">www.creatorsblueprint.io</a></p>
          <p className={styles.developedBy}>Developed by Creators Blueprint</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
