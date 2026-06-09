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

  const product = [
    {
      type: "ebook",
      title: "The Abu Dhabi Relocation Guide",
      description: "Moving to Abu Dhabi can feel overwhelming, so I made it simple. Fast, easy reference based guide to help you understand the city, navigate daily life, and settle in faster without the guesswork.",
      price: 36.70,
      currency: "aed",
      image: "https://Creatorsblueprint.github.io/ADFinds/Images/ebook-cover.png",
      email: email,
      successUrl: window.location.origin + "?success=true",
      cancelUrl: window.location.origin + "?cancel=true",
    }
  ];

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!isEmailValid) return;

    setIsLoading(true);

    if (window.gtag) {
      window.gtag('event', 'begin_checkout', {
        value: 36.70,
        currency: 'AED',
        items: [{
          item_id: 'ebook_abudhabi_finds',
          item_name: 'From Moving to Thriving in Abu Dhabi Ebook',
          price: 36.70,
          quantity: 1
        }]
      });
    }

    try {
      const response = await fetch(
        "https://findsbackend-648711352735.me-west1.run.app/api/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product[0]),
        },
      );

      if (!response.ok) {
        throw new Error("Payment initialization failed");
      }

      const data = await response.json();

      // Extract redirect URL from Stripe backend response
      const checkoutUrl = data.url;

      if (checkoutUrl) {
        if (window.gtag) {
          window.gtag('event', 'redirect_to_payment_gateway', {
            event_category: 'ecommerce',
            event_label: 'Ziina Redirect'
          });
        }
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

  const handleBuyNow = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (window.gtag) {
      window.gtag('event', 'begin_checkout', {
        value: 35.00,
        currency: 'USD',
        items: [{
          item_id: 'ebook_abudhabi_finds_samcart',
          item_name: 'The Abu Dhabi Relocation Guide',
          price: 35.00,
          quantity: 1
        }]
      });
    }

    setTimeout(() => {
      window.location.href = "https://abudhabifinds.samcart.com/products/the-abu-dhabi-relocation-guide";
    }, 800);
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
              <span className={styles.priceValue}>35$</span>
            </div>

            {/* <form className={styles.form} onSubmit={handlePayment}>
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
            </form> */}

            {/* <div style={{ maxWidth: '450px', width: '100%', margin: '0 auto 20px' }}>
              <button
                onClick={handleBuyNow}
                className={`${styles.submitBtn} ${isLoading ? styles.disabled : ''}`}
                style={{ width: '100%', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer' }}
                disabled={isLoading}
              >
                {isLoading ? "PROCESSING..." : "Buy Now!"}
              </button>
            </div> */}
            <form className={styles.form} onSubmit={handlePayment}>
              <button
                onClick={handleBuyNow}
                className={`${styles.submitBtn} ${isLoading ? styles.disabled : ''}`}
                style={{ width: '100%', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer' }}
                disabled={isLoading}
              >
                {isLoading ? "PROCESSING..." : "Buy Now!"}
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
