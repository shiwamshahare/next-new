"use server";

import { cookies } from "next/headers";

export interface ServerActionResult {
  success: boolean;
  message?: string;
  error?: string;
  data?: any;
}

/**
 * Server Action: Registers a new user on freeapi.app (executes on Node.js server)
 */
export async function registerUserAction(formData: FormData): Promise<ServerActionResult> {
  const username = (formData.get("username") as string) || "";
  const email = (formData.get("email") as string) || "";
  const password = (formData.get("password") as string) || "";
  const role = (formData.get("role") as string) || "ADMIN";

  if (!username.trim() || !email.trim() || !password.trim()) {
    return {
      success: false,
      error: "Username, email, and password are required",
    };
  }

  const payload = {
    username: username.trim(),
    email: email.trim(),
    password: password,
    role: role,
  };

  console.log("[SERVER ACTION] Registering user on server:", payload);

  try {
    const res = await fetch("https://api.freeapi.app/api/v1/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json = await res.json();

    if (res.ok && json.success) {
      return {
        success: true,
        message: json.message || "Account registered successfully!",
        data: json.data,
      };
    } else {
      return {
        success: false,
        error: json.message || "Registration failed. Please check your inputs.",
      };
    }
  } catch (err) {
    console.error("[SERVER ACTION ERROR]", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Server error occurred during registration",
    };
  }
}

/**
 * Server Action: Authenticates a user on freeapi.app (executes on Node.js server)
 */
export async function loginUserAction(formData: FormData): Promise<ServerActionResult> {
  const username = (formData.get("username") as string) || "";
  const password = (formData.get("password") as string) || "";

  if (!username.trim() || !password.trim()) {
    return {
      success: false,
      error: "Username and password are required",
    };
  }

  const payload = {
    username: username.trim(),
    password: password,
  };

  console.log("[SERVER ACTION] Logging in user on server:", payload.username);

  try {
    const res = await fetch("https://api.freeapi.app/api/v1/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json = await res.json();

    if (res.ok && json.success) {
      if (json.data?.accessToken) {
        const cookieStore = await cookies();
        cookieStore.set("admin_token", json.data.accessToken, {
          path: "/",
          httpOnly: false,
          maxAge: 60 * 60 * 24 * 7,
        });
      }
      return {
        success: true,
        message: json.message || "Logged in successfully!",
        data: json.data,
      };
    } else {
      return {
        success: false,
        error: json.message || "Invalid credentials or login failed",
      };
    }
  } catch (err) {
    console.error("[SERVER ACTION ERROR]", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Server error occurred during login",
    };
  }
}

/**
 * Server Action: Clears user session cookie on Node.js server
 */
export async function logoutUserAction() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  return { success: true };
}
