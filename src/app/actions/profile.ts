"use server";

import { cookies } from "next/headers";

export interface ServerProfileResult {
  success: boolean;
  data?: any;
  message?: string;
  error?: string;
}

/**
 * Server Action: Fetches the user social media profile from freeapi.app on the Node.js server
 */
export async function getProfileServerAction(tokenFromClient?: string): Promise<ServerProfileResult> {
  const cookieStore = await cookies();
  const token = tokenFromClient || cookieStore.get("admin_token")?.value;

  if (!token) {
    return {
      success: false,
      error: "No authentication token found. Please log in.",
    };
  }

  try {
    const res = await fetch("https://api.freeapi.app/api/v1/social-media/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const json = await res.json();
    if (res.ok && json.success) {
      return {
        success: true,
        data: json.data,
        message: json.message || "Profile fetched successfully on server",
      };
    } else {
      return {
        success: false,
        error: json.message || "Failed to fetch profile on server",
      };
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Server error fetching profile",
    };
  }
}

/**
 * Server Action: Updates user profile on freeapi.app (executes on Node.js server)
 */
export async function updateProfileServerAction(
  formData: FormData,
  tokenFromClient?: string
): Promise<ServerProfileResult> {
  const cookieStore = await cookies();
  const token = tokenFromClient || cookieStore.get("admin_token")?.value;

  if (!token) {
    return {
      success: false,
      error: "No authentication token found. Please log in.",
    };
  }

  const payload = {
    firstName: ((formData.get("firstName") as string) || "").trim(),
    lastName: ((formData.get("lastName") as string) || "").trim(),
    bio: ((formData.get("bio") as string) || "").trim(),
    location: ((formData.get("location") as string) || "").trim(),
    countryCode: ((formData.get("countryCode") as string) || "").trim(),
    phoneNumber: ((formData.get("phoneNumber") as string) || "").trim(),
  };

  console.log("[SERVER ACTION] Updating profile on Node.js server:", payload);

  try {
    const res = await fetch("https://api.freeapi.app/api/v1/social-media/profile", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (res.ok && json.success) {
      return {
        success: true,
        data: json.data,
        message: json.message || "Profile updated successfully!",
      };
    } else {
      return {
        success: false,
        error: json.message || "Failed to update profile on server",
      };
    }
  } catch (err) {
    console.error("[SERVER ACTION ERROR] updateProfileServerAction:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Server error updating profile",
    };
  }
}
