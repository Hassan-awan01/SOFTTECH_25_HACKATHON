import React from 'react';
import Navbar from './Navbar';
import HeroSection from './Components/HeroSection';
import RecentItems from './Components/RecentItems';
import CommunityImpact from './Components/CommunityImpact';
import HowItWorks from './Components/HowItWorks';
import styles from './Home.module.css';
import Footer from '../Footer/Footer';
const Home = () => {
  return (
    <div className={styles.home}>
      <Navbar />
      <HeroSection />
      <RecentItems />
      <CommunityImpact />
      <HowItWorks />
      <Footer />
    </div>
  );
};

export default Home;
