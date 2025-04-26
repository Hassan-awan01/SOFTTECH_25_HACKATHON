import React, { useState } from 'react';
import { FiSearch, FiPlusCircle } from 'react-icons/fi';
import styles from './ProductListingHero.module.css';

const ProductListingHero = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>Find What You Need</h1>
        <p className={styles.description}>Browse through our community's shared resources or list your own items</p>
        
        <div className={styles.actions}>
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <div className={styles.searchInputWrapper}>
              <FiSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search for items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <button type="submit" className={styles.searchButton}>
              Search
            </button>
          </form>

          <button className={styles.listButton}>
            <FiPlusCircle className={styles.plusIcon} />
            List an Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductListingHero; 