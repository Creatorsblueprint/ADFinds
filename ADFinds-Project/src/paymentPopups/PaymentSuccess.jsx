import { useEffect } from "react";
import styles from './PaymentPage.module.css';

export default function PaymentSuccess({ setPaymentActive }) {
  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'purchase', {
        transaction_id: 't_' + new Date().getTime(),
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

    const timer = setTimeout(() => setPaymentActive(false), 8000); // Increased time slightly
    return () => clearTimeout(timer);
  }, [setPaymentActive]);

  return (
    <div className={styles.overlay}>
      <div className={styles.cardSuccess}>
        <div className={styles.iconContainerSuccess}>
          <i className="ri-check-line"></i>
        </div>
        <h1>Payment Successful!</h1>
        <p>
          Thank you for your purchase. Information to access your eBook has been sent to your email.
        </p>
        <button className={styles.closeButton} onClick={() => setPaymentActive(false)}>Close</button>
      </div>
    </div>
  );
}