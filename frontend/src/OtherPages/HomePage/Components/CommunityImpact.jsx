import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CommunityImpact.module.css';

const CommunityImpact = () => {
  return (
    <section className={styles.homeImpactSection}>
      <div className={styles.homeImpactContainer}>
        <h2 className={styles.homeImpactTitle}>Our Community Impact</h2>
        <p className={styles.homeImpactSubtitle}>
          Together, we're building a more sustainable and connected future
        </p>
        
        <div className={styles.homeStatsContainer}>
          <div className={styles.homeStatItem}>
            <span className={styles.homeStatNumber}>5,280</span>
            <span className={styles.homeStatLabel}>Items Shared</span>
          </div>
          
          <div className={styles.homeStatItem}>
            <span className={styles.homeStatNumber}>Rs. 3.2M</span>
            <span className={styles.homeStatLabel}>Money Saved</span>
          </div>
          
          <div className={styles.homeStatItem}>
            <span className={styles.homeStatNumber}>12,450</span>
            <span className={styles.homeStatLabel}>Community Members</span>
          </div>
          
          <div className={styles.homeStatItem}>
            <span className={styles.homeStatNumber}>8.7 Tons</span>
            <span className={styles.homeStatLabel}>Waste Diverted</span>
          </div>
        </div>

        <Link to="/signup" className={styles.homeJoinButton}  style={{ textDecoration: 'none' }}> Join Our Community</Link>
        
        {/* <button className={styles.homeJoinButton}>
          Join Our Community
        </button> */}
      </div>
    </section>
  );
};

export default CommunityImpact; 