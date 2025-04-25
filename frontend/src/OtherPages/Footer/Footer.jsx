// import React from 'react';
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Company Info Column */}
        <div className="footer-column company-info">
          {/* <img
            src="/path-to-your-logo.png"
            alt="Neurix Solution Logo"
            className="footer-logo"
          /> */}
          <h3 className="footer-compnay-name">Community Resource Hub</h3>
          <p className="company-description">
            💚 Why It Matters
          </p>
          <p>Reduces Waste – Give old items new life.</p>
          <p>Saves Money – Avoid unnecessary spending.</p>
          <p>Builds Community – Share resources, meet neighbors, and support each other.</p>
          <p>Promotes Sustainability – Make conscious choices together.</p>
          <div className="social-links">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link to="/Home">Home</Link>
            </li>
            <li>
              <Link to="/Aboutus">About Us</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>
        </div>

        {/* Services Column */}
        <div className="footer-column">
          <h3>Our Services</h3>
          <ul>
            <li>
              <Link to="/webservices">Donate</Link>
            </li>
            <li>
              <Link to="/CMSServices">Exchange</Link>
            </li>
            <li>
              <Link to="/AppServices">List Items</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="footer-column contact-info">
          <h3>Contact Us</h3>
          <ul>
            <li>
              <FaPhoneAlt />
              <span>
                +92 326 6319502
                <br />
                +92 307 6297161
              </span>
            </li>
            <li>
              <FaEnvelope />
              <span>crm@gmail.com</span>
            </li>
            <li>
              <FaMapMarkerAlt />
              <span>
                Faisal Town
                <br />
                Lahore, Pakistan
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="copyright-bar">
        <div className="copyright-content">
          <p>
            Copyright &copy; {new Date().getFullYear()} Community Resource Hub. All
            Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
