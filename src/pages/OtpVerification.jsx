import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Phone, ArrowLeft } from "lucide-react";
import AuthLayout from "../components/layout/AuthLayout";
import { requestLoginOtp, verifyLoginOtp } from "../api/authApi";
import { mockAdmin } from "../mock/vayzoApiMock";

const OtpVerification = () => {
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1); // 1 = Mobile, 2 = Verify
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (!mobileNumber || mobileNumber.length < 10) {
      setError("Please enter a valid mobile number");
      return;
    }
    
    try {
      setLoading(true);
      await requestLoginOtp(mobileNumber);
      setStep(2);
      setTimer(30);
    } catch (err) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp.length < 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      const res = await verifyLoginOtp(mobileNumber, otp);
      
      // Successful Login
      localStorage.setItem("vayzo_admin_logged_in", "true");
      localStorage.setItem("vayzo_admin_user", JSON.stringify(res.user || mockAdmin));
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setError("");
    try {
      setTimer(30);
      await requestLoginOtp(mobileNumber);
    } catch (err) {
      setError("Failed to resend OTP");
    }
  };

  return (
    <AuthLayout>
      <div className="mb-6 text-center sm:mb-7">
        <h1 className="text-2xl font-bold text-foreground sm:text-[26px] md:text-3xl">
          Login with OTP
        </h1>
        <p className="mt-2 text-xs text-muted sm:text-sm md:text-base">
          {step === 1 ? "Enter your mobile number to receive a secure OTP" : `We've sent a 6-digit code to ${mobileNumber}`}
        </p>
      </div>

      {error && (
        <div className="mb-4 text-center text-xs font-medium text-danger">{error}</div>
      )}

      {step === 1 ? (
        <div className="space-y-4 sm:space-y-5">
          <div>
            <label htmlFor="mobile" className="mb-2 block text-xs font-semibold text-foreground sm:text-sm">
              Mobile Number
            </label>
            <div className="relative">
              <Phone size={18} strokeWidth={1.8} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted sm:left-4 sm:h-5 sm:w-5" />
              <input
                id="mobile"
                type="tel"
                placeholder="Enter your mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                onKeyDown={(e) => e.key === 'Enter' && handleSendOtp(e)}
                required
                className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-3 text-xs text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 sm:h-12 sm:pl-11 sm:pr-4 sm:text-sm"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleSendOtp}
            disabled={loading || mobileNumber.length < 10}
            className="h-11 w-full rounded-lg bg-primary text-xs font-bold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-hover sm:h-12 sm:text-sm disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-4 flex w-full items-center justify-center gap-2 text-xs font-semibold text-muted hover:text-foreground sm:text-sm transition-colors"
          >
            <ArrowLeft size={16} /> Back to Login
          </button>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-5">
          <div>
            <label htmlFor="otp" className="mb-2 block text-xs font-semibold text-foreground sm:text-sm">
              Enter OTP
            </label>
            <div className="relative">
              <ShieldCheck size={18} strokeWidth={1.8} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted sm:left-4 sm:h-5 sm:w-5" />
              <input
                id="otp"
                type="text"
                placeholder="123456"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                onKeyDown={(e) => e.key === 'Enter' && handleVerifyOtp(e)}
                required
                className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-3 text-xs tracking-widest text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 sm:h-12 sm:pl-11 sm:pr-4 sm:text-lg"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleVerifyOtp}
            disabled={loading || otp.length < 6}
            className="h-11 w-full rounded-lg bg-primary text-xs font-bold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-hover sm:h-12 sm:text-sm disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <div className="mt-4 text-center">
            {timer > 0 ? (
              <p className="text-xs text-muted sm:text-sm">Resend OTP in {timer}s</p>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-xs font-semibold text-primary hover:underline sm:text-sm"
              >
                Resend OTP
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setStep(1)}
            className="mt-6 flex w-full items-center justify-center gap-2 text-xs font-semibold text-muted hover:text-foreground sm:text-sm transition-colors"
          >
            <ArrowLeft size={16} /> Change Mobile Number
          </button>
        </div>
      )}
    </AuthLayout>
  );
};

export default OtpVerification;
