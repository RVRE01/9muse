import { Plus } from 'lucide-react';
import { faqItems } from '@/content/site';
import styles from './Site.module.css';

export function FaqSection() {
  return (
    <section
      className={styles.faqSection}
      id="faq"
      aria-labelledby="faq-title"
    >
      <div className={styles.faqHeading}>
        <p className={styles.eyebrow}>Before the Brief</p>
        <h2 id="faq-title">Private Commission Questions.</h2>
        <p>
          The first conversation defines fit, scope, and the right technical
          path. These answers cover the common starting points.
        </p>
      </div>

      <div className={styles.faqList}>
        {faqItems.map((item) => (
          <details key={item.question}>
            <summary>
              {item.question}
              <Plus aria-hidden size={20} />
            </summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

