import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const navigate = useNavigate();
  const { login, error } = useAuthStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validate()) {
      setIsSubmitting(true);
      console.log("Form data submitted:", formData);
      try {
        const { email, password } = formData;
        await login(email, password);
        navigate("/");
        alert("login successfully successfully!");
      } catch (error) {
        console.log(error);
        alert("Login failed. Please check your credentials.");
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
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h3>Log In</h3>
          <div className="header-accent"></div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
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

          <div className="form-group mb-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn login-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account? <a href="signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
