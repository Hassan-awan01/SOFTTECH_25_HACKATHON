import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import logo from "../../assets/Free/orignal.svg";
import {
  Menu,
  X,
  Globe2,
  Database,
  Brain,
  Smartphone,
  MessageSquareCode,
  Palette,
  ChevronDown,
} from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);

  const services = [
    { name: "Borrow", icon: <Globe2 />, link: "/browse/borrow" },
    { name: "Exchange", icon: <Database />, link: "/browse/exchange" },
    { name: "Request", icon: <Brain />, link: "/browse/request" },
  ];

  const handleClickOutside = (event) => {
    if (!event.target.closest(".navbar-dropdown")) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutsideMobileMenu = (event) => {
      if (
        isOpen &&
        !event.target.closest(".navbar-mobile-nav") &&
        !event.target.closest(".navbar-mobile-menu-button")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideMobileMenu);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideMobileMenu);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const toggleDropdown = (dropdownName, event) => {
    event.preventDefault();
    event.stopPropagation();
    if (window.innerWidth > 768) {
      setActiveDropdown((prevDropdown) =>
        prevDropdown === dropdownName ? null : dropdownName
      );
    } else {
      setActiveMobileDropdown((prevDropdown) =>
        prevDropdown === dropdownName ? null : dropdownName
      );
    }
  };

  const handleNavigation = () => {
    setIsOpen(false);
    setActiveDropdown(null);
    setActiveMobileDropdown(null);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link to="/" className="navbar-logo" onClick={handleNavigation}>
            <span className="company-name">Community Resource Hub</span>
            {/* <img src={logo} alt="Logo" className="company-name" /> */}
          </Link>

          <div className="navbar-desktop-nav">
            <Link to="/" className="navbar-nav-link" onClick={handleNavigation}>
              Home
            </Link>

            <Link
              to="/Product"
              className="navbar-nav-link"
              onClick={handleNavigation}
            >
              Products
            </Link>
          </div>

          <div className="navbar-auth-buttons">
            <Link to="/login" className="navbar-login-button">
              Sign In
            </Link>
            <Link to="/signup" className="navbar-register-button">
              Register
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="navbar-mobile-menu-button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      <div className={`navbar-mobile-nav ${isOpen ? "open" : ""}`}>
        <div className="navbar-mobile-header">
          <span className="navbar-mobile-logo">Community Resource Hub</span>
          <button
            className="navbar-mobile-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <Link to="/" className="navbar-mobile-nav-item" onClick={handleNavigation}>
          Home
        </Link>

        <Link
          to="/Product"
          className="navbar-mobile-nav-item"
          onClick={handleNavigation}
        >
          Products
        </Link>

        <div className="navbar-mobile-auth-buttons">
          <Link to="/login" className="navbar-login-button" onClick={handleNavigation}>
            Sign In
          </Link>
          <Link to="/signup" className="navbar-register-button" onClick={handleNavigation}>
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
