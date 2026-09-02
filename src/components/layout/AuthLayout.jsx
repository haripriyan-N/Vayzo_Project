import vayzoLogo from "../../assets/logo/Vayzo_logo.png";
import { ShieldCheck } from "lucide-react";

const AuthLayout = ({ children }) => {
  return (
    <main className="flex h-screen items-center justify-center bg-background overflow-hidden p-0 sm:p-6">
      <div className="grid h-screen w-full max-w-5xl overflow-hidden bg-surface shadow-xl sm:h-[600px] sm:grid-cols-[0.9fr_1.1fr] sm:rounded-2xl">
        {/* Left Brand Section - Image Based (Original Vayzo visual structure) */}
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

        {/* Right Auth Section */}
        <section className="flex min-w-0 w-full items-center justify-center bg-[#fafbff] px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-10 xl:px-14">
          <div className="w-full min-w-0 max-w-md">
            <div className="w-full rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6 md:p-7 lg:p-8">
              {children}
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

export default AuthLayout;
