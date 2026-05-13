import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../animations';
import styles from './Home.module.css';

const Home = () => {
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className={styles.home}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div className={styles.socialIcons} variants={fadeIn}>
            <a href="https://www.instagram.com/abudhabi.finds/" target="_blank"><i className="ri-instagram-line"></i></a>
            <a href="https://www.tiktok.com/@abudhabi.finds" target="_blank"><i className="ri-tiktok-fill"></i></a>
            <a href=""><i className="ri-facebook-circle-fill"></i></a>
          </motion.div>

          <motion.div className={styles.categories} variants={fadeIn}>
            <span>Culture</span>
            <span>Food</span>
            <span>Experience</span>
          </motion.div>

          <motion.h1 className={styles.title} variants={fadeIn}>
            AbuDhabi <br />
            <span className={styles.titleWithIcons}>
              <img src="/Icons/Vector.png" alt="Fork Spoon" className={styles.titleIcon} />
              <img src="/Icons/Vector-1.png" alt="Drink" className={styles.titleIcon} />
              <img src="/Icons/Vector-2.png" alt="Plane" className={styles.titleIcon} />
              Finds
            </span>
          </motion.h1>

          <motion.p className={styles.description} variants={fadeIn}>
            Sharing real, on-the-ground tips to help you <span className={styles.coloredText}>navigate life in Abu Dhabi</span>.
            From must-visit restaurants to hidden gems and everything you need to know
            <span className={styles.coloredText}> before and after moving</span>. Settle in smarter and discover the city
            <span className={styles.coloredText}> the right way</span>.
          </motion.p>

          <motion.div className={styles.cta} variants={fadeIn}>
            <Link
              to="/about"
              className={styles.learnBtn}
              onClick={() => handleScrollTo('about')}
            >
              Learn More
            </Link>
            <Link
              to="/ebook"
              className={styles.storyBtn}
              onClick={() => handleScrollTo('ebook')}
            >
              GET EBOOK
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.visuals}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.mainImage}>
            <img src="/Images/hero-img-1.png" alt="Abu Dhabi Experience" />
          </div>
          <div className={styles.thumbnails}>
            <img src="/Images/hero-img-2.png" alt="Location 1" />
            <img src="/Images/hero-img-3.png" alt="Location 2" />
            <img src="/Images/hero-img-4.png" alt="Location 3" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
