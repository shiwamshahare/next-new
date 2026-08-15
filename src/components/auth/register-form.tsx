"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrutalButton } from "@/components/ui/brutal-button";
import { BrutalInput } from "@/components/ui/brutal-input";
import { BrutalSelect } from "@/components/ui/brutal-select";
import { ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react";
import { registerUserAction } from "@/app/actions/auth";

export function RegisterForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ADMIN");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      setLoading(true);
      setError(null);
      setSuccessMsg(null);

      // Execute Server Action (API call happens on the server)
      const result = await registerUserAction(formData);

      if (result.success) {
        setSuccessMsg(result.message || "Account registered successfully!");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        setError(result.error || "Registration failed. Please check inputs.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div className="mb-4 p-3 border-2 border-black bg-red-100 text-red-700 text-xs font-bold uppercase flex items-start gap-2">
          <AlertTriangle size={16} className="shrink-0 mt-0.5" />
          <div>{error}</div>
        </div>
      )}

      {successMsg && (
        <div className="mb-4 p-3 border-2 border-black bg-green-100 text-green-800 text-xs font-bold uppercase flex items-start gap-2">
          <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
          <div>{successMsg} Redirecting to login page...</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <BrutalInput
          label="Username"
          name="username"
          type="text"
          placeholder="e.g. doejohn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
        />

        <BrutalInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="user.email@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <BrutalInput
          label="Password"
          name="password"
          type="password"
          placeholder="test@123"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <BrutalSelect
          label="Role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          options={["ADMIN", "USER"]}
        />

        <div className="pt-2">
          <BrutalButton
            type="submit"
            variant="accent"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Processing on Server..." : "Create Account →"}
          </BrutalButton>
        </div>
      </form>

      <div className="mt-6 pt-4 border-t-2 border-black text-center text-xs">
        <span className="text-neutral-600 font-bold uppercase">Already have an account?</span>{" "}
        <Link
          href="/login"
          className="font-bold uppercase text-red-600 hover:underline inline-flex items-center gap-1 ml-1"
        >
          <ArrowLeft size={12} /> Sign In
        </Link>
      </div>
    </>
  );
}
