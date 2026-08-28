import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    navigate("/dashboard");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-0 sm:p-6">
      <div className="grid min-h-screen w-full max-w-5xl overflow-hidden bg-surface shadow-xl sm:min-h-0 sm:grid-cols-[0.9fr_1.1fr] sm:rounded-2xl">
        <section className="relative overflow-hidden bg-foreground px-7 py-10 text-white sm:px-10 sm:py-14">
          <div className="relative z-10 max-w-md">
            <p className="text-3xl font-black tracking-[0.18em]">VAYZO<span className="text-primary-hover">.</span></p>
            <div className="my-8 h-1 w-14 bg-primary-hover" />
            <h2 className="text-4xl font-bold leading-tight sm:text-5xl">Manage everything.<br /><span className="text-primary-hover">From one place.</span></h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/65">A clear, focused workspace for keeping your users, orders, and delivery operations moving.</p>
            <div className="mt-10 flex gap-8">
              {[['12K+', 'Users'], ['98%', 'Success'], ['24/7', 'Support']].map(([value, label]) => (
                <div key={label}><strong className="block text-xl">{value}</strong><span className="text-xs text-white/55">{label}</span></div>
              ))}
            </div>
          </div>
          <div className="absolute -right-32 -top-28 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -bottom-48 -left-48 h-[30rem] w-[30rem] rounded-full border border-white/10" />
        </section>

        <section className="flex items-center justify-center px-7 py-12 sm:px-14 sm:py-16">
          <div className="w-full max-w-sm">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Welcome</p>
              <h1 className="mt-3 text-3xl font-bold text-foreground">Welcome back</h1>
              <p className="mt-2 text-sm text-muted">Sign in to continue to your dashboard.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-foreground">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                  <input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="h-12 w-full rounded-lg border border-border bg-background pl-11 pr-4 text-sm text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between"><label htmlFor="password" className="text-sm font-semibold text-foreground">Password</label><a href="/forgetpassword" className="text-xs font-semibold text-primary hover:underline">Forgot password?</a></div>
                <div className="relative">
                  <LockKeyhole className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
                  <input id="password" type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required className="h-12 w-full rounded-lg border border-border bg-background pl-11 pr-12 text-sm text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10" />
                  <button type="button" onClick={() => setShowPassword((visible) => !visible)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted hover:text-primary" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs text-muted"><input type="checkbox" className="h-4 w-4 accent-primary" />Remember me</label>
              <button type="submit" className="flex h-12 w-full items-center justify-center gap-3 rounded-lg bg-primary text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:bg-primary-hover"><span>Sign In</span><ArrowRight size={19} /></button>
            </form>

            <p className="mt-7 flex items-center justify-center gap-2 text-center text-xs text-subtle"><ShieldCheck size={15} />Your connection is secure and encrypted</p>
            <p className="mt-8 text-center text-[10px] text-subtle">© 2026 VAYZO. All rights reserved.</p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;