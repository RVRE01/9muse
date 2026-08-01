import { InquiryForm } from './InquiryForm';
import styles from './Site.module.css';

export function InquirySection() {
  return (
    <section
      className={styles.inquirySection}
      id="inquiry"
      aria-labelledby="inquiry-title"
    >
      <div className={styles.inquiryHeading}>
        <div>
          <p className={styles.eyebrow}>Request a Private Build</p>
          <h2 id="inquiry-title">
            Begin With the Vehicle. Define Everything After.
          </h2>
        </div>
        <p>
          Tell us what you drive, what you want to change, and where the
          finished build needs to go. The first review focuses on fit, scope,
          timing, and the right next conversation.
        </p>
      </div>
      <InquiryForm />
    </section>
  );
}

