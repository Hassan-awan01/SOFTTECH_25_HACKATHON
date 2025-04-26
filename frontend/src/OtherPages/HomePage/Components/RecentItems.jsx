// RecentItems.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaBookmark } from "react-icons/fa";
import styles from "./RecentItems.module.css";

const RecentItems = ({ onSelectProduct }) => {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef(null);
  const [clickStartTime, setClickStartTime] = useState(0);

  const recentItems = JSON.parse(localStorage.getItem("items")).data || [];
  console.log("Fetched items:", recentItems);

  const handleMouseDown = (e) => {
    setIsDragging(false);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    setClickStartTime(new Date().getTime());
  };

  const handleMouseMove = (e) => {
    if (!isDragging && new Date().getTime() - clickStartTime > 100) {
      setIsDragging(true);
    }

    if (isDragging) {
      e.preventDefault();
      const x = e.pageX - sliderRef.current.offsetLeft;
      const walk = (x - startX) * 2;
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    return () => document.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const handleCardClick = (item) => {
    if (!isDragging) {
      if (typeof onSelectProduct === "function") {
        onSelectProduct(item);
      } else {
        console.warn("onSelectProduct prop is not provided or not a function");
        localStorage.setItem("selectedProduct", JSON.stringify(item));
      }
      navigate("/ProductDetails");
    }
  };

  return (
    <section className={styles.recentItems}>
      <div className={styles.container}>
        <h2 className={styles.title}>Recently active items</h2>
        <div className={styles.viewAllContainer}>
          <Link
            to="/Product"
            className={styles.viewAllBtn}
            style={{ textDecoration: "none" }}
          >
            View All
          </Link>
        </div>
        <div
          className={styles.itemsSlider}
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
          onMouseUp={handleMouseUp}
        >
          {recentItems.map((item) => (
            <div
              key={item._id}
              className={styles.itemCard}
              onClick={() => handleCardClick(item)}
            >
              <div className={styles.itemImageContainer}>
                <img src={item.images[0]} alt={item.title} />
                {item.tradeType === "Exchange" && (
                  <span className={styles.popularTag}>EXCHANGE</span>
                )}
                <button
                  className={styles.bookmarkBtn}
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaBookmark />
                </button>
              </div>
              <div className={styles.itemInfo}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemDescription}>{item.description}</p>
                <div className={styles.itemMeta}>
                  <span className={styles.condition}>{item.condition}</span>
                  <div className={styles.location}>
                    <FaMapMarkerAlt />
                    <span>{item.location}</span>
                  </div>
                </div>
                <div className={styles.itemFooter}>
                  <div className={styles.postedBy}>
                    Posted By: {item.postedBy}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentItems;
