
// components/Hero.jsx
import styles from './Hero.module.css';


export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.hero_content}>
        <h1>Bigger than<br />architecture</h1>
        <div className={styles.explore}>
          <p>
            <button>EXPLORE</button> 
          </p>
        </div>
      </div>
      <div className={styles.picture}>
     
      </div>
    </div>
  );
}
