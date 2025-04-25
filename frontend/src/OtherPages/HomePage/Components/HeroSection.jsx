import React from 'react';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroOverlay}></div>
      <div className={styles.heroContent}>
        <h1>Welcome to Community Exchange Resource</h1>
        <p>Share resources, build connections, and strengthen our community together</p>
        <div className={styles.heroButtons}>
          {/* <button className={styles.primaryBtn}>Browse Items</button>
          <button className={styles.secondaryBtn}>List an Item</button> */}
        </div>
        <form className={styles.searchForm}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search for items..."
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default HeroSection; 