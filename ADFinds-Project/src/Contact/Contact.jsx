import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '../animations';
import styles from './Contact.module.css';

const Contact = () => {
    return (
        <section id="contact" className={styles.contact}>
            <div className={styles.container}>
                <motion.div
                    className={styles.content}
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.span variants={fadeIn} className={styles.badge}>
                        Get in Touch
                    </motion.span>

                    <motion.h2 variants={fadeIn} className={styles.title}>
                        Have a question, <br />
                        <span>collaboration idea,</span> or need help navigating Abu Dhabi?
                    </motion.h2>

                    <motion.p variants={fadeIn} className={styles.description}>
                        I'd love to hear from you. Reach out directly through WhatsApp or email <br />
                        and I'll get back to you as soon as I can.
                    </motion.p>

                    <motion.div variants={fadeIn} className={styles.ctaGroup}>
                        <a
                            href="https://wa.me/yournumber"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.cta} ${styles.whatsapp}`}
                        >
                            <div className={styles.iconWrapper}>
                                <i className="ri-whatsapp-line"></i>
                            </div>
                            <div className={styles.ctaText}>
                                <span className={styles.ctaLabel}>Message on</span>
                                <span className={styles.ctaValue}>WhatsApp</span>
                            </div>
                            <i className="ri-arrow-right-line className={styles.arrowIcon}"></i>
                        </a>

                        <a
                            href="mailto:your@email.com"
                            className={`${styles.cta} ${styles.email}`}
                        >
                            <div className={styles.iconWrapper}>
                                <i className="ri-mail-line"></i>
                            </div>
                            <div className={styles.ctaText}>
                                <span className={styles.ctaLabel}>Send an</span>
                                <span className={styles.ctaValue}>Email</span>
                            </div>
                            <i className="ri-arrow-right-line className={styles.arrowIcon}"></i>
                        </a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Decorative background elements */}
            <div className={styles.bgGlow}></div>
        </section>
    );
};

export default Contact;
