import Image from 'next/image';
import { ArrowDownRight } from 'lucide-react';
import { serviceNavigation } from '@/content/site';
import styles from './Site.module.css';

export function ServiceIndex() {
  return (
    <nav className={styles.serviceIndex} aria-label="Service categories">
      {serviceNavigation.map((item) => (
        <a key={item.href} href={item.href}>
          <span className={styles.serviceIndexIcon} aria-hidden="true">
            <Image
              src={item.icon}
              alt=""
              fill
              sizes="(max-width: 900px) 128px, 160px"
            />
          </span>
          <span className={styles.serviceIndexLabel}>{item.label}</span>
          <ArrowDownRight aria-hidden size={17} />
        </a>
      ))}
    </nav>
  );
}
