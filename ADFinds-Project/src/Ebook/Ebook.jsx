import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { scrollReveal } from '../animations';
import styles from './Ebook.module.css';

const Ebook = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isEmailValid = validateEmail(email);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!isEmailValid) return;

    setIsLoading(true);
    try {
      const response = await fetch(
        "https://findsbackend-648711352735.me-west1.run.app/api/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: 36.70, // 10$ in AED
            email: email,
            successUrl: window.location.origin + "?success=true",
            cancelUrl: window.location.origin + "?cancel=true",
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Payment initialization failed");
      }

      const data = await response.json();

      // Extract redirect URL from Ziina backend response
      const checkoutUrl = data.redirect_url;

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        console.error("No checkout URL received from backend", data);
        alert("Could not initiate payment. Please try again.");
      }
    } catch (error) {
      console.error("Error during payment processing:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ebook" className={styles.ebook}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          {...scrollReveal}
        >
          {/* <h2 className={styles.title}>Move to Abu Dhabi With Confidence</h2>
          <p className={styles.subtitle}>A practical guide to navigating Abu Dhabi without overthinking it.</p> */}

          <div className={styles.offer}>
            <span className={styles.offerBadge}>Ebook</span>
            <h3 className={styles.offerTitle}>From Moving to Thriving in Abu Dhabi</h3>
            <p className={styles.offerDesc}>
              Moving to Abu Dhabi can feel overwhelming, so I made it simple. Fast, easy reference
              based guide to help you understand the city, navigate daily life, and settle in
              faster without the guesswork.
            </p>

            <div className={styles.priceTag}>
              <span className={styles.priceLabel}>Price</span>
              <span className={styles.priceValue}>10$</span>
            </div>

            <form className={styles.form} onSubmit={handlePayment}>
              <input
                type="email"
                placeholder="Enter your email address"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
              <button
                type="submit"
                className={`${styles.submitBtn} ${(!isEmailValid || isLoading) ? styles.disabled : ''}`}
                disabled={!isEmailValid || isLoading}
              >
                {isLoading ? "PROCESSING..." : "GET STARTED NOW!"}
              </button>
            </form>
            {/* <p className={styles.infoLink}><a href="#">Why get this Ebook? ⓘ</a></p> */}
          </div>
        </motion.div>

        <motion.div
          className={styles.visual}
          {...scrollReveal}
          transition={{ delay: 0.2 }}
        >
          <div className={styles.bookMockups}>
            <img src="/Images/ebook-cover.png" alt="Abu Dhabi Expat Starter Kit Covers" className={styles.mockupImg} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Ebook;
