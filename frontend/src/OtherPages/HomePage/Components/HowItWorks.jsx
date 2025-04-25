import React from 'react';
import { FaSearch, FaHandshake, FaUsers, FaLeaf } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './HowItWorks.module.css';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch />,
      title: "Search & Discover",
      description: "Browse through a variety of items available in your community for sharing or borrowing."
    },
    {
      icon: <FaHandshake />,
      title: "Connect & Share",
      description: "Connect with item owners, arrange meetups, and share resources within your local community."
    },
    {
      icon: <FaUsers />,
      title: "Build Community",
      description: "Join a network of like-minded people who believe in sustainable resource sharing."
    },
    {
      icon: <FaLeaf />,
      title: "Make an Impact",
      description: "Help reduce waste and environmental impact while saving money and building relationships."
    }
  ];

  return (
    <section className={styles.homeHowSection}>
      <div className={styles.homeHowContainer}>
        <h2 className={styles.homeHowTitle}>How It Works</h2>
        <p className={styles.homeHowSubtitle}>
          Join our community in four simple steps
        </p>

        <div className={styles.homeStepsContainer}>
          {steps.map((step, index) => (
            <div key={index} className={styles.homeStepItem}>
              <div className={styles.homeStepIcon}>
                {step.icon}
              </div>
              <div className={styles.homeStepContent}>
                <h3 className={styles.homeStepTitle}>{step.title}</h3>
                <p className={styles.homeStepDescription}>{step.description}</p>
              </div>
              {index < steps.length - 1 && <div className={styles.homeStepConnector} />}
            </div>
          ))}
        </div>

        <Link to="/Product" className={styles.homeStartButton}  style={{ textDecoration: 'none' }}>Start Sharing Today</Link>
        {/* <button className={styles.homeStartButton}>
          Start Sharing Today
        </button> */}
      </div>
    </section>
  );
};

export default HowItWorks; 