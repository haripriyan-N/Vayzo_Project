import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import vayzoLogo from "../assets/logo/Vayzo_logo.png";
import { mockAdmin, mockAdminCredentials } from "../mock/vayzoApiMock";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
        {/* Right Login Section */}
        <section className="flex min-w-0 w-full items-center justify-center bg-[#fafbff] px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-10 xl:px-14">
          <div className="w-full min-w-0 max-w-md">
            <div className="w-full rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6 md:p-7 lg:p-8">
              {/* Heading */}
              <div className="mb-6 text-center sm:mb-7">
                <h1 className="text-2xl font-bold text-foreground sm:text-[26px] md:text-3xl">
                  Welcome Back!
                </h1>

                <p className="mt-2 text-xs text-muted sm:text-sm md:text-base">
                  Sign in to your VAYZO admin account
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-semibold text-foreground sm:text-sm"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      strokeWidth={1.8}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted sm:left-4 sm:h-5 sm:w-5"
                    />

                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-3 text-xs text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 sm:h-12 sm:pl-11 sm:pr-4 sm:text-sm"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-xs font-semibold text-foreground sm:text-sm"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      strokeWidth={1.8}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted sm:left-4 sm:h-5 sm:w-5"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-11 text-xs text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 sm:h-12 sm:pl-11 sm:pr-12 sm:text-sm"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-muted transition hover:text-primary sm:right-3"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>

                  {/* Forgot Password */}
                  <div className="mt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => navigate("/forgetpassword")}
                      className="text-[11px] font-semibold text-primary hover:underline sm:text-xs"
                    >
                      Forgot Password?
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <label className="flex cursor-pointer items-center gap-2 text-xs text-foreground sm:text-sm">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-border accent-primary"
                    />
                    Remember me
                  </label>
                </div>

                {/* Login */}
                <button
                  type="submit"
                  className="h-11 w-full rounded-lg bg-primary text-xs font-bold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-hover sm:h-12 sm:text-sm"
                >
                  Login
                </button>

                {/* OR */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="h-px flex-1 bg-border" />

                  <span className="text-[10px] text-muted sm:text-xs">or</span>

                  <div className="h-px flex-1 bg-border" />
                </div>

                {/* OTP */}
                <button
                  type="button"
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-primary/50 bg-background text-xs font-semibold text-primary transition hover:bg-primary-light sm:h-12 sm:text-sm"
                >
                  <ShieldCheck size={17} className="sm:h-[19px] sm:w-[19px]" />
                  Login with OTP
                </button>
              </form>
            </div>

            {/* Security */}
            <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[10px] text-subtle sm:mt-6 sm:gap-2 sm:text-xs">
              <ShieldCheck size={13} className="sm:h-[15px] sm:w-[15px]" />
              Your connection is secure and encrypted
            </p>

            {/* Copyright */}
            <p className="mt-4 text-center text-[9px] text-subtle sm:mt-5 sm:text-[10px]">
              © 2026 VAYZO. All rights reserved.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
