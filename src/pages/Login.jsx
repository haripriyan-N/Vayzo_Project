import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);
    navigate("/dashboard");
  };

  return (
    <div className="login-wrapper reference-login">
      <div className="login-container">
        <section className="login-brand reference-brand">
          <div className="brand-content">
            <div className="brand-logo">VAYZO</div>
            <h2>Everything you need,<br /><span>we get it.</span></h2>
            <p>VAYZO is your all-in-one solution for Food Delivery, Buy &amp; Get It, Bike Rides and Car Booking.</p>
            <div className="delivery-scene" aria-label="Vayzo delivery service illustration">
              <div className="cityline" />
              <div className="route route-one" /><div className="route route-two" />
              <div className="delivery-phone"><div className="phone-notch" /><div className="map-line" /><i className="map-pin pin-one">●</i><i className="map-pin pin-two">●</i><i className="map-pin pin-three">●</i></div>
              <div className="delivery-bike"><i className="bike-wheel wheel-one" /><i className="bike-wheel wheel-two" /><b>VAYZO</b></div>
              <div className="delivery-bag">VAYZO</div><div className="delivery-box">V</div>
            </div>
            <div className="brand-stats reference-trust"><div><strong>◈</strong><small>Secure &amp;<br />Reliable</small></div><div><strong>ϟ</strong><small>Super Fast<br />Delivery</small></div><div><strong>●</strong><small>Trusted by<br />Thousands</small></div><div><strong>◉</strong><small>24/7<br />Support</small></div></div>
          </div>
        </section>

        <section className="login-form-section reference-form-section">
          <div className="login-form-container reference-login-card">
            <div className="mobile-logo">VAYZO</div>
            <div className="login-heading"><h1>Welcome Back!</h1><p>Sign in to your VAYZO admin account</p></div>
            <form onSubmit={handleLogin}>
              <div className="form-group"><label>Email Address</label><div className="input-wrapper"><span className="input-icon">✉</span><input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div></div>
              <div className="form-group"><div className="password-header"><label>Password</label><Link to="/forgetpassword">Forgot Password?</Link></div><div className="input-wrapper"><span className="input-icon">▣</span><input type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required /><button type="button" className="show-password" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password visibility">{showPassword ? "◉" : "◌"}</button></div></div>
              <div className="login-options"><label className="remember"><input type="checkbox" /><span>Remember me</span></label></div>
              <button type="submit" className="login-button"><span>Login</span></button>
              <div className="login-divider"><span>or</span></div>
              <button type="button" className="otp-button"><span>♢</span> Login with OTP</button>
            </form>
            <p className="copyright">© 2024 VAYZO. All rights reserved.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;