import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email address.");
      return;
    }

    setMessage("Password reset link has been sent to your email.");
  };

  return (
    <div className="forgot-page">
      <div className="forgot-left">
        <div className="forgot-content">
          <h1>Vayzo</h1>
          <p>Reset your password and get back to your account.</p>
        </div>
      </div>

      <div className="forgot-right">
        <div className="forgot-box">
          <div className="forgot-icon">🔐</div>

          <h2>Forgot Password?</h2>

          <p className="forgot-description">
            Enter your registered email address and we'll send you
            a link to reset your password.
          </p>

          <form onSubmit={handleSubmit}>
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit">
              Send Reset Link
            </button>
          </form>

          {message && <p className="forgot-message">{message}</p>}

          <a href="/" className="back-login">
            ← Back to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;