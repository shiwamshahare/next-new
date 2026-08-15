import AdminDashboardClient from "@/components/admin/admin-dashboard-client";
import { getProfileServerAction } from "@/app/actions/profile";

export default async function ProfilePage() {
  // Server-Side Fetch profile data on server before rendering HTML
  const profileRes = await getProfileServerAction();
  const initialProfileData = profileRes.success ? profileRes.data : undefined;

  return (
    <AdminDashboardClient
      defaultView="profile"
      initialProfileData={initialProfileData}
    />
  );
}
