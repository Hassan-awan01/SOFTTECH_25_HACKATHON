import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};

    if (!formData.name.trim()) tempErrors.name = "Name is required";

    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      tempErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      tempErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      tempErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const navigate = useNavigate();
  const { signup, error } = useAuthStore();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      setIsSubmitting(true);
      console.log("Form data submitted:", formData);
      try {
        const { email, password, name, confirmPassword } = formData;
        await signup(email, password, name, confirmPassword);
        navigate("/");
        alert("Account created successfully!");
      } catch (error) {
        console.log(error);
      } finally {
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h3>Create Account</h3>
          <div className="header-accent"></div>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group mb-3">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <div className="form-group mb-4">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className={`form-control ${
                errors.confirmPassword ? "is-invalid" : ""
              }`}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">{errors.confirmPassword}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn signup-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <div className="signup-footer">
          <p>
            Already have an account? <a href="login">Log In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
