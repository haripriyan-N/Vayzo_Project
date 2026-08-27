import { useState } from "react";
import { ArrowLeft, ArrowRight, Mail, ShieldCheck } from "lucide-react";
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
    <main className="flex min-h-screen items-center justify-center bg-background p-0 sm:p-6">
      <section className="flex min-h-screen w-full items-center justify-center bg-surface px-7 py-12 shadow-xl sm:min-h-0 sm:max-w-lg sm:rounded-2xl sm:px-14 sm:py-16">
          <div className="w-full max-w-sm">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Account recovery</p>
              <h2 className="mt-3 text-3xl font-bold text-foreground">Forgot password?</h2>
              <p className="mt-2 text-sm leading-6 text-muted">Enter your registered email address and we will send you a password reset link.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="reset-email" className="mb-2 block text-sm font-semibold text-foreground">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                  <input id="reset-email" type="email" placeholder="Enter your email" value={email} onChange={(e) => { setEmail(e.target.value); setMessage(""); }} required className="h-12 w-full rounded-lg border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" />
                </div>
              </div>
              <button type="submit" className="flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-primary text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-hover"><span>Send Reset Link</span><ArrowRight size={19} /></button>
            </form>

            {message && <p role="status" className="mt-5 rounded-lg bg-primary-light px-4 py-3 text-center text-sm font-medium text-primary">{message}</p>}
            <p className="mt-7 flex items-center justify-center gap-2 text-center text-xs text-subtle"><ShieldCheck size={15} />Your connection is secure and encrypted</p>
            <Link to="/" className="mt-8 flex items-center justify-center gap-2 text-sm font-semibold text-primary hover:underline"><ArrowLeft size={17} />Back to Login</Link>
          </div>
      </section>
    </main>
  );
};

export default ForgotPassword;