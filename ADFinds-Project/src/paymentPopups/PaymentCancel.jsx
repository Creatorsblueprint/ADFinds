import { useEffect } from "react";
import styles from './PaymentPage.module.css';

export default function PaymentCancel({ setPaymentActive }) {
  useEffect(() => {
    const timer = setTimeout(() => setPaymentActive(false), 5000);
    return () => clearTimeout(timer);
  }, [setPaymentActive]);

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <div className={styles.iconContainerCancel}>
          <i className="ri-close-line"></i>
        </div>
        <h1>Payment Cancelled</h1>
        <p>Your payment process was cancelled. You have not been charged.</p>
        <button className={styles.closeButton} onClick={() => setPaymentActive(false)}>Close</button>
      </div>
    </div>
  );
}