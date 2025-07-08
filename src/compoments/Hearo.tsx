
// components/Hero.jsx
import styles from './Hero.module.css';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.hero_content}>
        <h1>Bigger than<br />architecture</h1>
        <div className={styles.explore}>
          <p>
            <button>EXPLORE</button> Be a <strong>hero.</strong>
          </p>
        </div>
      </div>
      <div className={styles.picture}>
        <p>
          Picture by{' '}
          <Link href="https://unsplash.com/@hernanlucio" target="_blank">
            @hernanlucio
          </Link>
        </p>
      </div>
    </div>
  );
}
