import React, { useState } from "react";
import { Link } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="login-wrapper">

      <div className="login-container">

        {/* LEFT BRAND SECTION */}
        <div className="login-brand">

          <div className="brand-content">

            <div className="brand-logo">
              VAYZO<span>.</span>
            </div>

            <div className="brand-line"></div>

            <h2>
              Manage everything.
              <br />
              <span>From one place.</span>
            </h2>

            <p>
              Welcome to the VAYZO Admin Portal. Manage users,
              orders, delivery partners and your entire platform
              with ease.
            </p>

            <div className="brand-stats">
              <div>
                <strong>12K+</strong>
                <small>Users</small>
              </div>

              <div>
                <strong>98%</strong>
                <small>Success</small>
              </div>

              <div>
                <strong>24/7</strong>
                <small>Support</small>
              </div>
            </div>

          </div>

          <div className="brand-circle circle-one"></div>
          <div className="brand-circle circle-two"></div>

        </div>

        {/* RIGHT LOGIN SECTION */}
        <div className="login-form-section">

          <div className="login-form-container">

            <div className="mobile-logo">
              VAYZO<span>.</span>
            </div>

            <div className="login-heading">
              <span>ADMIN PORTAL</span>

              <h1>Welcome back 👋</h1>

              <p>
                Sign in to continue to your dashboard.
              </p>
            </div>

            <form onSubmit={handleLogin}>

              {/* EMAIL */}
              <div className="form-group">

                <label>Email Address</label>

                <div className="input-wrapper">

                  <span className="input-icon">✉</span>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                </div>

              </div>

              {/* PASSWORD */}
              <div className="form-group">

                <div className="password-header">

                  <label>Password</label>

                  <a href="./forgetpassword">
                    Forgot password?
                  </a>

                </div>

                <div className="input-wrapper">

                  <span className="input-icon">🔒</span>

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  <button
                    type="button"
                    className="show-password"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>

              </div>

              {/* REMEMBER */}
              <div className="login-options">

                <label className="remember">

                  <input type="checkbox" />

                  <span>Remember me</span>

                </label>

              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="login-button"
              >
                <span>Sign In</span>
                <span className="arrow">→</span>
              </button>

            </form>

            <div className="security-note">
              🔒 Your connection is secure and encrypted
            </div>

            <p className="copyright">
              © 2026 VAYZO. All rights reserved.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;