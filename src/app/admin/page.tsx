import AdminDashboardClient, { InitialUsersData } from "@/components/admin/admin-dashboard-client";

export const dynamic = "force-dynamic";

async function getInitialUsersData(): Promise<InitialUsersData | undefined> {
  try {
    const res = await fetch("https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=10", {
      cache: "no-store",
    });
    if (!res.ok) return undefined;
    const json = await res.json();
    if (json.success && json.data) {
      return {
        users: json.data.data || [],
        paginationInfo: {
          page: json.data.page,
          totalPages: json.data.totalPages,
          totalItems: json.data.totalItems,
          nextPage: json.data.nextPage,
          previousPage: json.data.previousPage,
        },
      };
    }
  } catch (error) {
    console.error("Server-side fetch error for random users:", error);
  }
  return undefined;
}

export default async function AdminDashboardPage() {
  const initialUsersData = await getInitialUsersData();

  return (
    <AdminDashboardClient
      defaultView="dashboard"
      initialUsersData={initialUsersData}
    />
  );
}