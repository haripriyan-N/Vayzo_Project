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
    <div className="forgot-page forgot-page-unique">
      <div className="forgot-right">
        <div className="forgot-box">
          <Link to="/" className="forgot-brand">VAYZO<span>.</span></Link>
          <div className="forgot-icon">↗</div>
          <p className="forgot-kicker">ACCOUNT RECOVERY</p>
          <h2>Reset your access.</h2>
          <p className="forgot-description">No worries. Enter the email connected to your VAYZO account and we will send a secure reset link.</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="reset-email">Work email address</label>
            <input id="reset-email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit">Send secure link <span>→</span></button>
          </form>
          {message && <p className="forgot-message">{message}</p>}
          <Link to="/" className="back-login">← Return to login</Link>
          <small className="forgot-security">Encrypted recovery flow · VAYZO Admin</small>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;