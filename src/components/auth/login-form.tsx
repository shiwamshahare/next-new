"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrutalButton } from "@/components/ui/brutal-button";
import { BrutalInput } from "@/components/ui/brutal-input";
import { ArrowRight, ShieldCheck, AlertTriangle } from "lucide-react";
import { loginUserAction } from "@/app/actions/auth";

export function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

      // Execute Server Action (API call happens on Node.js server)
      const result = await loginUserAction(formData);

      if (result.success) {
        setSuccessMsg(result.message || "Logged in successfully!");
        if (result.data) {
          localStorage.setItem("admin_token", result.data.accessToken || "");
          localStorage.setItem("admin_user", JSON.stringify(result.data.user || { username }));
        }
        setTimeout(() => {
          router.push("/admin");
        }, 1000);
      } else {
        setError(result.error || "Invalid credentials or login failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong during login");
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
          <ShieldCheck size={16} className="shrink-0 mt-0.5" />
          <div>{successMsg} Redirecting to dashboard...</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <BrutalInput
          label="Username"
          name="username"
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          autoFocus
        />

        <BrutalInput
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="pt-2">
          <BrutalButton
            type="submit"
            variant="accent"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Authenticating on Server..." : "Sign In →"}
          </BrutalButton>
        </div>
      </form>

      <div className="mt-6 pt-4 border-t-2 border-black text-center text-xs">
        <span className="text-neutral-600 font-bold uppercase">Don't have an account?</span>{" "}
        <Link
          href="/register"
          className="font-bold uppercase text-red-600 hover:underline inline-flex items-center gap-1 ml-1"
        >
          Register Here <ArrowRight size={12} />
        </Link>
      </div>
    </>
  );
}
