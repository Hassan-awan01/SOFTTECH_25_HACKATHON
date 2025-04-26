import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import CategoryItems from "../pages/CategoryItems";
import SearchBar from "./SearchBar";
import "bootstrap/dist/css/bootstrap.min.css";

const Categories = () => {
  const [searchParams, setSearchParams] = useState({});
  const location = useLocation();
  const category = location.pathname.split("/").pop() || 'all';

  const getMockProducts = () => {
    const allProducts = [
      // Electronics
      {
        id: 1,
        title: "DJ equipment package",
        category: "electronics",
        condition: "Like New",
        location: "Westside",
        postedBy: "Ali",
        tradeType: "Exchange",
        image: "dj-equipment.jpg",
        description: "Professional DJ setup with mixer, turntables, and speakers"
      },
      {
        id: 2,
        title: "Wireless Headphones",
        category: "electronics",
        condition: "Good",
        location: "Downtown",
        postedBy: "Sarah",
        tradeType: "Borrow",
        image: "headphones.jpg",
        description: "Noise-cancelling wireless headphones with 20hr battery life"
      },
      {
        id: 3,
        title: "Smartphone",
        category: "electronics",
        condition: "Fair",
        location: "Northside",
        postedBy: "Mike",
        tradeType: "Exchange",
        image: "smartphone.jpg",
        description: "Last year's model, fully functional with minor scratches"
      },
  
      // Appliances
      {
        id: 4,
        title: "Vacuum cleaner",
        category: "appliances",
        condition: "Second hand",
        location: "Lahore",
        postedBy: "Ahmed",
        tradeType: "Borrow",
        image: "vacuum.jpg",
        description: "Powerful vacuum cleaner with HEPA filter"
      },
      {
        id: 5,
        title: "Blender",
        category: "appliances",
        condition: "Like New",
        location: "East End",
        postedBy: "Lisa",
        tradeType: "Exchange",
        image: "blender.jpg",
        description: "High-speed blender with multiple attachments"
      },
      {
        id: 6,
        title: "Microwave Oven",
        category: "appliances",
        condition: "Good",
        location: "Southside",
        postedBy: "Robert",
        tradeType: "Request",
        image: "microwave.jpg",
        description: "Compact microwave with convection feature"
      },
  
      // Furniture
      {
        id: 7,
        title: "Leather Sofa",
        category: "furniture",
        condition: "Good",
        location: "Central",
        postedBy: "James",
        tradeType: "Exchange",
        image: "sofa.jpg",
        description: "3-seater leather sofa in brown color"
      },
      {
        id: 8,
        title: "Office Desk",
        category: "furniture",
        condition: "Like New",
        location: "Westside",
        postedBy: "Emma",
        tradeType: "Borrow",
        image: "desk.jpg",
        description: "Adjustable height office desk"
      },
      {
        id: 9,
        title: "Dining Table Set",
        category: "furniture",
        condition: "Fair",
        location: "Hillside",
        postedBy: "David",
        tradeType: "Exchange",
        image: "dining-table.jpg",
        description: "6-seater dining table with chairs"
      },
  
      // Tools
      {
        id: 10,
        title: "Power Drill Set",
        category: "tools",
        condition: "Like New",
        location: "Northside",
        postedBy: "Tom",
        tradeType: "Borrow",
        image: "drill.jpg",
        description: "Cordless drill with multiple bits"
      },
      {
        id: 11,
        title: "Ladder",
        category: "tools",
        condition: "Good",
        location: "East End",
        postedBy: "Rachel",
        tradeType: "Exchange",
        image: "ladder.jpg",
        description: "6-foot aluminum ladder"
      },
  
      // Sports
      {
        id: 12,
        title: "Mountain Bike",
        category: "sports",
        condition: "Good",
        location: "Westside",
        postedBy: "Alex",
        tradeType: "Exchange",
        image: "bike.jpg",
        description: "24-speed mountain bike with suspension"
      },
      {
        id: 13,
        title: "Tennis Racket",
        category: "sports",
        condition: "Like New",
        location: "Central",
        postedBy: "Nadia",
        tradeType: "Borrow",
        image: "tennis.jpg",
        description: "Professional grade tennis racket"
      }
    ];
    
    return allProducts;
  };

  const filterProducts = (products, category, location) => {
    let filtered = [...products];
    
    if (category && category !== "all") {
      filtered = filtered.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (location) {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    return filtered;
  };

  const allProducts = useMemo(() => getMockProducts(), []);
  const products = useMemo(() => 
    filterProducts(allProducts, category, searchParams.location), 
    [allProducts, category, searchParams.location]
  );

  const handleSearch = (searchData) => {
    setSearchParams(searchData);
  };

  const getPageTitle = () => {
    if (searchParams.location) {
      return `${category === 'all' ? 'All Items' : category.charAt(0).toUpperCase() + category.slice(1)} in ${searchParams.location}`;
    }
    return category === "all" ? "All Items" : `${category.charAt(0).toUpperCase() + category.slice(1)}`;
  };

  return (
    <div style={{ backgroundColor: "#0B1C27", minHeight: "100vh", padding: "6rem 0 4rem" }}>
      <div className="container text-white">
        <SearchBar onSearch={handleSearch} currentCategory={category} />
        <h1 className="mb-5 text-center">{getPageTitle()}</h1>
        <CategoryItems products={products} category={category} />
      </div>
    </div>
  );
};

export default Categories;