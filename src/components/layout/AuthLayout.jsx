import vayzoLogo from "../../assets/logo/Vayzo_logo.png";
import vayzoLoginBg from "../../assets/loginpage.png";
import { ShieldCheck } from "lucide-react";

const AuthLayout = ({ children }) => {
  return (
    <main className="flex h-screen items-center justify-center bg-background overflow-hidden p-0 sm:p-6">
      <div className="grid h-screen w-full max-w-5xl overflow-hidden bg-surface shadow-xl sm:h-[600px] sm:grid-cols-[0.9fr_1.1fr] sm:rounded-2xl">
        {/* Left Brand Section - Image Based */}
        <section className="relative hidden overflow-hidden sm:flex sm:items-center sm:justify-center">
          <img 
            src={vayzoLoginBg} 
            alt="VAYZO Admin Portal" 
            className="h-full w-full object-cover"
          />
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
