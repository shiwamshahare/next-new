import { BrutalCard } from "@/components/ui/brutal-card";
import { BrutalBadge } from "@/components/ui/brutal-badge";
import { UserPlus } from "lucide-react";
import { RegisterForm } from "@/components/auth/register-form";

// Server Component (SSR) for the Register Page route
export default function RegisterPage() {
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
            <span className="font-bold text-xl uppercase tracking-widest">Admin // Control Panel</span>
          </div>
          <p className="text-xs text-neutral-600 font-bold uppercase tracking-wide">
            Register new administrator account
          </p>
        </div>

        <BrutalCard>
          <div className="p-6">
            <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-6">
              <h1 className="text-xl font-bold uppercase flex items-center gap-2">
                <UserPlus size={20} className="text-red-600" /> Register
              </h1>
              <BrutalBadge tone="accent">NEW USER</BrutalBadge>
            </div>

            {/* Interactive Form Hydrated on Client */}
            <RegisterForm />
          </div>
        </BrutalCard>
      </div>
    </div>
  );
}
