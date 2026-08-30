import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import vayzoLogo from "../assets/logo/Vayzo_logo.png";
import { mockAdmin, mockAdminCredentials } from "../mock/vayzoApiMock";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === mockAdminCredentials.email &&
      password === mockAdminCredentials.password
    ) {
      localStorage.setItem("vayzo_admin_logged_in", "true");
      localStorage.setItem("vayzo_admin_user", JSON.stringify(mockAdmin));

      navigate("/dashboard");
      return;
    }

    alert("Invalid email or password");
  };

  return (
    <main className="flex h-screen items-center justify-center bg-background overflow-hidden p-0 sm:p-6">
      <div className="grid h-screen w-full max-w-5xl overflow-hidden bg-surface shadow-xl sm:h-[600px] sm:grid-cols-[0.9fr_1.1fr] sm:rounded-2xl">
        {/* Left Brand Section - Image Based */}
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-primary to-primary-hover sm:flex sm:items-center sm:justify-center">
          <div className="relative z-10 flex flex-col items-center justify-center p-10">
            <img src={vayzoLogo} alt="VAYZO" className="w-full max-w-md" />
            <p className="mt-8 text-center text-sm text-white/80">
              Super Admin Portal
            </p>
          </div>
          <div className="absolute -right-32 -top-28 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -bottom-48 -left-48 h-[30rem] w-[30rem] rounded-full border border-white/10" />
        </section>

        {/* Right Login Section */}
        <section className="flex items-center justify-center px-5 py-8 sm:px-14 sm:py-16">
          <div className="w-full max-w-sm">
            <div className="mb-6 sm:mb-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary sm:text-xs">
                Admin Portal
              </p>
              <h1 className="mt-2 text-xl font-bold text-foreground sm:mt-3 sm:text-3xl">
                Welcome back 👋
              </h1>
              <p className="mt-1 text-xs text-muted sm:mt-2 sm:text-sm">
                Sign in to continue to your dashboard.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-xs font-semibold text-foreground sm:mb-2 sm:text-sm"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted sm:left-4"
                    size={16}
                  />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-xs text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 sm:h-12 sm:pl-11 sm:pr-4 sm:text-sm"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="mb-1.5 flex items-center justify-between sm:mb-2">
                  <label
                    htmlFor="password"
                    className="text-xs font-semibold text-foreground sm:text-sm"
                  >
                    Password
                  </label>
                  <a
                    href="/forgetpassword"
                    className="text-[10px] font-semibold text-primary hover:underline sm:text-xs"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <LockKeyhole
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted sm:left-4"
                    size={16}
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-10 text-xs text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 sm:h-12 sm:pl-11 sm:pr-12 sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-primary sm:right-3"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <label className="flex items-center gap-2 text-[11px] text-muted sm:text-xs">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 accent-primary sm:h-4 sm:w-4"
                />
                Remember me
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-primary text-xs font-bold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-hover sm:h-12 sm:gap-3 sm:text-sm"
              >
                <span>Sign In</span>
                <ArrowRight size={16} className="sm:h-[19px] sm:w-[19px]" />
              </button>
            </form>

            {/* Security Note */}
            <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[10px] text-subtle sm:mt-7 sm:gap-2 sm:text-xs">
              <ShieldCheck size={13} className="sm:h-[15px] sm:w-[15px]" />
              Your connection is secure and encrypted
            </p>

            {/* Copyright */}
            <p className="mt-6 text-center text-[9px] text-subtle sm:mt-8 sm:text-[10px]">
              © 2026 VAYZO. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
