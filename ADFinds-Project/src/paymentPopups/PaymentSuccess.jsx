import { useEffect } from "react";
import styles from './PaymentPage.module.css';

export default function PaymentSuccess({ setPaymentActive }) {
  useEffect(() => {
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