// ProductParent.jsx (renamed from ProductPage.jsx for clarity)
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecentItems from './RecentItems';
import ProductDetails from './ProductDetails';

const ProductParent = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <Routes>
      <Route path="/" element={<RecentItems onSelectProduct={handleSelectProduct} />} />
      <Route path="/ProductDetails" element={<ProductDetails product={selectedProduct} />} />
    </Routes>
  );
};

export default ProductParent;