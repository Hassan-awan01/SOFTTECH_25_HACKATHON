import React from 'react';
import ProductDetails from './ProductDetails'; // Adjust the path as needed

const mockProduct = {
  title: "Bissell SpotClean Pro",
  category: "Carpet & Upholstery Cleaner",
  description: "A powerful portable carpet and upholstery cleaner that easily lifts away spots and stains from carpets, stairs, upholstery, and more.",
  condition: "Gently Used",
  availability: "Available",
  exchangeFor: "Steam Iron or Vacuum Cleaner",
  location: "Clerkenwell, London",
  postedBy: "Alice Johnson",
  contact: "+44 7900 123456",
  tradeType: "Exchange",
  images: [
    "cleaner.jpeg",
    "cleaner.jpeg",
    "cleaner.jpeg"
  ]
};

const ProductPage = () => {
  return <ProductDetails product={mockProduct} />;
};

export default ProductPage;
