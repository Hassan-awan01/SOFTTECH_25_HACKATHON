import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import Home from "./OtherPages/HomePage/Home";
import LoginPage from "./OtherPages/Login/Login";
import Register from "./OtherPages/Signup/Signup";
import OtherProductDetails from "./OtherPages/HomePageDtails/ProductDetails";
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./OtherPages/HomePage/Navbar";
import Categories from "./components/Categories";
import ListItems from "./components/ListForm";

import { useAuthStore } from "./store/auth";
import axios from "axios";

const styles = {
  app: {},
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const authToken = localStorage.getItem("authToken");

  return isAuthenticated || authToken ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

const App = () => {
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/items`);
        const items = response.data;
        localStorage.setItem("items", JSON.stringify(items));
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };
    fetchItems();
  }, []);

  const location = useLocation();

  return (
    <div className={styles.app}>
      {/* Hide Navbar on login/signup routes */}
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Navbar />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route
          path="/ListItems"
          element={
            <ProtectedRoute>
              <ListItems />
            </ProtectedRoute>
          }
        />

        <Route
          path="/productdetails"
          element={
            <ProtectedRoute>
              <OtherProductDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories/:category"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Product"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/:category/product-details"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Register />} />
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
