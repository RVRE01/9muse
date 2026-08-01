import { processSteps } from '@/content/site';
import styles from './Site.module.css';

export function ProcessSection() {
  return (
    <section
      className={styles.processSection}
      id="process"
      aria-labelledby="process-title"
    >
      <div className={styles.processHeading}>
        <p className={styles.eyebrow}>Private Commission Process</p>
        <h2 id="process-title">From First Brief to Final Delivery.</h2>
        <p>
          The process stays deliberate: define the complete vehicle first,
          resolve dependencies before work begins, and keep the final handoff
          aligned with the approved scope.
        </p>
      </div>

      <ol className={styles.processList}>
        {processSteps.map((step) => (
          <li key={step.index}>
            <span>{step.index}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

