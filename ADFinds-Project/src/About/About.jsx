import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { scrollReveal } from '../animations';
import styles from './About.module.css';

const About = () => {
  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          {...scrollReveal}
        >
          <h2 className={styles.title}>Hi, I'm Nadia</h2>
          <div className={styles.description}>
            <p>
              Also known as <span className={styles.coloredText}>Abu Dhabi Finds</span>, an expert documenting what life in Abu Dhabi
              actually looks like beyond the surface. I focus on practical insights, from where to eat
              and what to explore to how to navigate day to day life so you're not relying on guesswork.
            </p>
            <p>
              This is about making your move smoother, your decisions easier, and your experience
              here genuinely better.
            </p>
          </div>

          <Link 
            to="/ebook" 
            className={styles.link}
            onClick={() => handleScrollTo('ebook')}
          >
            Get My Free Guide Today, And Explore AbuDhabi!
          </Link>

          {/* <div className={styles.teaser}>
            <img src="/Images/ebook-cover.png" alt="Expat Starter Kit Teaser" className={styles.teaserImg} />
            <div className={styles.teaserActions}>
              <button className={styles.freeBtn}>Get Free Guide</button>
              <button className={styles.getBtn}>GET PART</button>
            </div>
          </div> */}
        </motion.div>

        <motion.div
          className={styles.visual}
          {...scrollReveal}
          transition={{ delay: 0.3 }}
        >
          <div className={styles.imageWrapper}>
            <img src="/Images/about-img.png" alt="Nadia - Abu Dhabi Finds" className={styles.mainImg} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
