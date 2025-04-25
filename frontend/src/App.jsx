import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Home from './OtherPages/HomePage/Home';
import LoginPage from './OtherPages/Login/Login';
import Register from './OtherPages/Signup/Signup';
import OtherProductDetails from './OtherPages/HomePageDtails/ProductDetails';
import ProductDetails from './pages/ProductDetails';
import Navbar from './OtherPages/HomePage/Navbar';
import Categories from './components/Categories';

import ListItems from './components/ListForm'
const styles = {
  app: {
    // Add any styles you want for the app container
  },
};

const App = () => {
  const location = useLocation(); // Get the current location

  return (
    <div className={styles.app}>
      {location.pathname !== '/login' && location.pathname !== '/signup' && <Navbar />} {/* Conditionally render Navbar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/ListItems" element={<ListItems />} />
        <Route path="/productdetails" element={<OtherProductDetails />} />
        <Route path="/categories/:category" element={<Categories />} />
        <Route path="/Product" element={<Categories />} />
       

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Register />} />

        <Route path="/:category/product-details" element={<ProductDetails />} />

        
      </Routes>
    </div>
  );
};

const MainApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default MainApp;