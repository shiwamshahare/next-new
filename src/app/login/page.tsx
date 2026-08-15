import { BrutalCard } from "@/components/ui/brutal-card";
import { BrutalBadge } from "@/components/ui/brutal-badge";
import { LogIn } from "lucide-react";
import { LoginForm } from "@/components/auth/login-form";

// Server Component (SSR) for the Login Page route
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col justify-center items-center p-4 relative font-mono">
      {/* Background Grid Pattern - Server Rendered */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Header Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-4 h-4 bg-red-600 border border-black" />
            <span className="font-bold text-xl uppercase tracking-widest">Admin // Portal</span>
          </div>
          <p className="text-xs text-neutral-600 font-bold uppercase tracking-wide">
            Sign in to access control panel
          </p>
        </div>

        <BrutalCard>
          <div className="p-6">
            <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-6">
              <h1 className="text-xl font-bold uppercase flex items-center gap-2">
                <LogIn size={20} className="text-red-600" /> Sign In
              </h1>
              <BrutalBadge tone="accent">AUTH</BrutalBadge>
            </div>

            {/* Interactive Form Hydrated on Client */}
            <LoginForm />
          </div>
        </BrutalCard>

        {/* Demo Credentials Tip */}
        <div className="mt-4 text-center text-xs font-mono text-neutral-500 border border-neutral-300 p-2 bg-neutral-50">
          Tip: You can register a new account or sign in with existing credentials.
        </div>
      </div>
    </div>
  );
}
