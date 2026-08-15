"use client";

import { useState, useEffect } from "react";
import {
  LayoutGrid,
  Users,
  Building2,
  Trash2,
  Menu,
  Grid3x3,
  UserCheck,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  UserCircle,
} from "lucide-react";
import { BrutalButton } from "@/components/ui/brutal-button";
import { BrutalCard } from "@/components/ui/brutal-card";
import { BrutalInput } from "@/components/ui/brutal-input";
import { BrutalSelect } from "@/components/ui/brutal-select";
import { BrutalBadge } from "@/components/ui/brutal-badge";
import { ProfileView, UserProfile } from "@/components/admin/profile-view";

export type Designation = {
  id: number;
  title: string;
  level: string;
  department: string;
};

export type Department = {
  id: number;
  name: string;
  code: string;
  headcount: number;
};

export interface RandomUser {
  id: number;
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: { number: number; name: string };
    city: string;
    state: string;
    country: string;
    postcode: string | number;
  };
  email: string;
  phone: string;
  cell: string;
  login: {
    uuid: string;
    username: string;
  };
  dob: {
    date: string;
    age: number;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

export interface InitialUsersData {
  users: RandomUser[];
  paginationInfo: {
    page: number;
    totalPages: number;
    totalItems: number;
    nextPage: boolean;
    previousPage: boolean;
  };
}

const initialDesignations: Designation[] = [
  { id: 1, title: "Software Engineer", level: "L2", department: "Engineering" },
  { id: 2, title: "Senior Software Engineer", level: "L3", department: "Engineering" },
  { id: 3, title: "Product Manager", level: "L3", department: "Product" },
  { id: 4, title: "HR Executive", level: "L1", department: "Human Resources" },
  { id: 5, title: "Sales Lead", level: "L3", department: "Sales" },
];

const initialDepartments: Department[] = [
  { id: 1, name: "Engineering", code: "ENG", headcount: 42 },
  { id: 2, name: "Human Resources", code: "HR", headcount: 8 },
  { id: 3, name: "Sales", code: "SLS", headcount: 15 },
  { id: 4, name: "Product", code: "PRD", headcount: 11 },
];

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
}

function NavItem({ icon: Icon, label, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 border-b-2 border-black font-bold uppercase text-sm tracking-wide text-left cursor-pointer ${
        active ? "bg-red-600 text-white" : "bg-white text-black hover:bg-black hover:text-white"
      }`}
    >
      <Icon size={18} strokeWidth={2.5} />
      {label}
    </button>
  );
}

interface StatCardProps {
  label: string;
  value: number;
  accent?: boolean;
  onClick?: () => void;
}

function StatCard({ label, value, accent, onClick }: StatCardProps) {
  const content = (
    <>
      <div className={`text-4xl font-bold mb-1 ${accent ? "text-red-600" : ""}`}>{value}</div>
      <div className="text-xs font-bold uppercase tracking-wide text-neutral-600">{label}</div>
    </>
  );
  return (
    <BrutalCard>
      {onClick ? (
        <button onClick={onClick} className="w-full text-left p-5 cursor-pointer">
          {content}
        </button>
      ) : (
        <div className="p-5">{content}</div>
      )}
    </BrutalCard>
  );
}

interface DashboardViewProps {
  designations: Designation[];
  departments: Department[];
  totalUsersCount?: number;
  onNavigate: (v: string) => void;
}

export function DashboardView({ designations, departments, totalUsersCount = 500, onNavigate }: DashboardViewProps) {
  const totalHeadcount = departments.reduce((sum, d) => sum + d.headcount, 0);
  return (
    <div>
      <h2 className="text-2xl font-bold uppercase mb-1">Dashboard</h2>
      <p className="text-sm text-neutral-600 mb-6 font-mono">Overview of organizational structure</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard label="Designations" value={designations.length} onClick={() => onNavigate("designations")} />
        <StatCard label="Departments" value={departments.length} onClick={() => onNavigate("departments")} />
        <StatCard label="Users" value={totalUsersCount} onClick={() => onNavigate("users")} />
        <StatCard label="Total Headcount" value={totalHeadcount} accent />
      </div>

      <BrutalCard className="max-w-2xl">
        <div className="p-5">
          <h3 className="font-bold uppercase text-sm mb-3 border-b-2 border-black pb-2">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <BrutalButton variant="accent" onClick={() => onNavigate("users")}>
              View Users Directory
            </BrutalButton>
            <BrutalButton onClick={() => onNavigate("designations")}>
              + New Designation
            </BrutalButton>
            <BrutalButton onClick={() => onNavigate("departments")}>+ New Department</BrutalButton>
          </div>
        </div>
      </BrutalCard>
    </div>
  );
}

interface UsersViewProps {
  initialData?: InitialUsersData;
}

export function UsersView({ initialData }: UsersViewProps) {
  const [users, setUsers] = useState<RandomUser[]>(initialData?.users || []);
  const [page, setPage] = useState(initialData?.paginationInfo.page || 1);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState<string | null>(null);
  const [paginationInfo, setPaginationInfo] = useState(
    initialData?.paginationInfo || {
      page: 1,
      totalPages: 1,
      totalItems: 0,
      nextPage: false,
      previousPage: false,
    }
  );

  const fetchUsers = async (p = page) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`https://api.freeapi.app/api/v1/public/randomusers?page=${p}&limit=${limit}`);
      if (!res.ok) throw new Error("Failed to fetch users");
      const json = await res.json();
      if (json.success && json.data) {
        setUsers(json.data.data || []);
        setPaginationInfo({
          page: json.data.page,
          totalPages: json.data.totalPages,
          totalItems: json.data.totalItems,
          nextPage: json.data.nextPage,
          previousPage: json.data.previousPage,
        });
      } else {
        throw new Error(json.message || "Failed to load data");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only refetch if page changes or initialData was not provided
    if (!initialData || page !== initialData.paginationInfo.page) {
      fetchUsers(page);
    }
  }, [page]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold uppercase mb-1">Users Directory</h2>
          <p className="text-sm text-neutral-600 font-mono">
            {loading ? "Loading users..." : `${paginationInfo.totalItems} users available (Page ${page} of ${paginationInfo.totalPages})`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <BrutalButton onClick={() => fetchUsers(page)}>
            <RefreshCw size={14} className={`inline mr-1 ${loading ? "animate-spin" : ""}`} /> Refresh
          </BrutalButton>
        </div>
      </div>

      {error ? (
        <BrutalCard className="p-6 text-center">
          <p className="mb-4 text-red-600 font-mono font-bold">Error loading users: {error}</p>
          <BrutalButton variant="accent" onClick={() => fetchUsers(page)}>
            Try Again
          </BrutalButton>
        </BrutalCard>
      ) : (
        <BrutalCard>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-black bg-black text-white">
                  <th className="text-left font-bold uppercase text-xs tracking-wide px-4 py-3">User</th>
                  <th className="text-left font-bold uppercase text-xs tracking-wide px-4 py-3">Contact</th>
                  <th className="text-left font-bold uppercase text-xs tracking-wide px-4 py-3">Location</th>
                  <th className="text-left font-bold uppercase text-xs tracking-wide px-4 py-3">Gender / Age</th>
                  <th className="text-right font-bold uppercase text-xs tracking-wide px-4 py-3">Nationality</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b-2 border-black">
                      <td colSpan={5} className="px-4 py-4 text-center font-mono text-neutral-500 animate-pulse">
                        Fetching user records...
                      </td>
                    </tr>
                  ))
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center font-mono text-neutral-500">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user, i) => (
                    <tr key={user.id || user.login?.uuid || i} className={`border-b-2 border-black ${i % 2 ? "bg-neutral-50" : "bg-white"}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {user.picture?.thumbnail ? (
                            <img
                              src={user.picture.thumbnail}
                              alt={`${user.name?.first || "User"} ${user.name?.last || ""}`}
                              className="w-9 h-9 border-2 border-black object-cover shrink-0"
                            />
                          ) : (
                            <div className="w-9 h-9 border-2 border-black bg-neutral-200 flex items-center justify-center font-bold shrink-0">
                              {user.name?.first?.[0] || "U"}
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-black">
                              {user.name?.title} {user.name?.first} {user.name?.last}
                            </div>
                            <div className="text-xs font-mono text-neutral-500">@{user.login?.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs">
                        <div className="font-medium text-black">{user.email}</div>
                        <div className="text-neutral-500">{user.phone}</div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-neutral-700">
                        <div>{user.location?.city}, {user.location?.country}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 font-mono text-xs">
                          <span className="capitalize font-bold text-black">{user.gender}</span>
                          <span className="text-neutral-400">•</span>
                          <span className="text-neutral-700">{user.dob?.age} yrs</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <BrutalBadge tone="accent">{user.nat}</BrutalBadge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between p-4 border-t-2 border-black flex-wrap gap-3">
            <div className="text-xs font-mono text-neutral-600">
              Page {paginationInfo.page} of {paginationInfo.totalPages} ({paginationInfo.totalItems} total users)
            </div>
            <div className="flex items-center gap-2">
              <BrutalButton
                disabled={!paginationInfo.previousPage || loading}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft size={14} className="inline mr-1" /> Previous
              </BrutalButton>
              <BrutalButton
                disabled={!paginationInfo.nextPage || loading}
                variant="accent"
                onClick={() => setPage((p) => p + 1)}
              >
                Next <ChevronRight size={14} className="inline ml-1" />
              </BrutalButton>
            </div>
          </div>
        </BrutalCard>
      )}
    </div>
  );
}

interface DesignationsViewProps {
  designations: Designation[];
  setDesignations: React.Dispatch<React.SetStateAction<Designation[]>>;
  departments: Department[];
}

export function DesignationsView({ designations, setDesignations, departments }: DesignationsViewProps) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("L1");
  const [department, setDepartment] = useState(departments[0]?.name || "");

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setDesignations([...designations, { id: Date.now(), title: title.trim(), level, department }]);
    setTitle("");
    setShowForm(false);
  }

  function handleDelete(id: number) {
    setDesignations(designations.filter((d) => d.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold uppercase mb-1">Designations</h2>
          <p className="text-sm text-neutral-600 font-mono">{designations.length} roles defined</p>
        </div>
        <BrutalButton variant="accent" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Add Designation"}
        </BrutalButton>
      </div>

      {showForm && (
        <BrutalCard className="mb-6 max-w-xl">
          <form onSubmit={handleAdd} className="p-5 space-y-4">
            <BrutalInput
              label="Title"
              placeholder="e.g. Software Engineer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            <div className="grid grid-cols-2 gap-4">
              <BrutalSelect
                label="Level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                options={["L1", "L2", "L3", "L4"]}
              />
              <BrutalSelect
                label="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                options={departments.map((d) => d.name)}
              />
            </div>
            <BrutalButton type="submit" variant="accent">
              Save Designation
            </BrutalButton>
          </form>
        </BrutalCard>
      )}

      <BrutalCard>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-black bg-black text-white">
                <th className="text-left font-bold uppercase text-xs tracking-wide px-4 py-3">Title</th>
                <th className="text-left font-bold uppercase text-xs tracking-wide px-4 py-3">Level</th>
                <th className="text-left font-bold uppercase text-xs tracking-wide px-4 py-3">Department</th>
                <th className="text-right font-bold uppercase text-xs tracking-wide px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {designations.map((d, i) => (
                <tr key={d.id} className={`border-b-2 border-black ${i % 2 ? "bg-neutral-50" : "bg-white"}`}>
                  <td className="px-4 py-3 font-bold">{d.title}</td>
                  <td className="px-4 py-3">
                    <BrutalBadge>{d.level}</BrutalBadge>
                  </td>
                  <td className="px-4 py-3 font-mono text-neutral-700">{d.department}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(d.id)}
                      aria-label="Delete designation"
                      className="border-2 border-black p-1.5 cursor-pointer hover:bg-red-600 hover:text-white hover:border-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
              {designations.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center font-mono text-neutral-500">
                    No designations yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </BrutalCard>
    </div>
  );
}

interface DepartmentsViewProps {
  departments: Department[];
  setDepartments: React.Dispatch<React.SetStateAction<Department[]>>;
}

export function DepartmentsView({ departments, setDepartments }: DepartmentsViewProps) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !code.trim()) return;
    setDepartments([...departments, { id: Date.now(), name: name.trim(), code: code.trim().toUpperCase(), headcount: 0 }]);
    setName("");
    setCode("");
    setShowForm(false);
  }

  function handleDelete(id: number) {
    setDepartments(departments.filter((d) => d.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold uppercase mb-1">Departments</h2>
          <p className="text-sm text-neutral-600 font-mono">{departments.length} departments</p>
        </div>
        <BrutalButton variant="accent" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Add Department"}
        </BrutalButton>
      </div>

      {showForm && (
        <BrutalCard className="mb-6 max-w-xl">
          <form onSubmit={handleAdd} className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <BrutalInput label="Name" placeholder="e.g. Marketing" value={name} onChange={(e) => setName(e.target.value)} autoFocus />
              <BrutalInput label="Code" placeholder="e.g. MKT" value={code} onChange={(e) => setCode(e.target.value)} maxLength={5} />
            </div>
            <BrutalButton type="submit" variant="accent">
              Save Department
            </BrutalButton>
          </form>
        </BrutalCard>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {departments.map((d) => (
          <BrutalCard key={d.id}>
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <BrutalBadge tone="accent">{d.code}</BrutalBadge>
                <button
                  onClick={() => handleDelete(d.id)}
                  aria-label="Delete department"
                  className="border-2 border-black p-1 cursor-pointer hover:bg-red-600 hover:text-white hover:border-red-600"
                >
                  <Trash2 size={13} />
                </button>
              </div>
              <h3 className="font-bold uppercase mb-1">{d.name}</h3>
              <p className="text-xs font-mono text-neutral-600">{d.headcount} employees</p>
            </div>
          </BrutalCard>
        ))}
      </div>
    </div>
  );
}

export default function AdminDashboardClient({
  defaultView = "dashboard",
  initialUsersData,
  initialProfileData,
}: {
  defaultView?: string;
  initialUsersData?: InitialUsersData;
  initialProfileData?: UserProfile;
}) {
  const [view, setView] = useState(defaultView);
  const [designations, setDesignations] = useState<Designation[]>(initialDesignations);
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [showGrid, setShowGrid] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<{ username?: string; role?: string } | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("admin_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to parse stored user", err);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setUser(null);
  }

  function navigate(v: string) {
    setView(v);
    setSidebarOpen(false);
  }

  return (
    <div className="min-h-screen bg-white text-black relative">
      {showGrid && (
        <div
          className="pointer-events-none fixed inset-0 z-50 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      )}

      <header className="sticky top-0 z-40 bg-black text-white border-b-2 border-red-600">
        <div className="flex items-center justify-between px-4 py-3 md:px-6 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <button className="md:hidden cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Toggle menu">
              <Menu size={22} />
            </button>
            <div className="w-3 h-3 bg-red-600" />
            <h1 className="font-bold uppercase tracking-widest text-base md:text-lg">Admin // Control Panel</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`hidden sm:flex items-center gap-1.5 border-2 border-white px-3 py-1.5 text-xs font-bold uppercase cursor-pointer ${
                showGrid ? "bg-white text-black" : "text-white hover:bg-white hover:text-black"
              }`}
            >
              <Grid3x3 size={14} /> Grid
            </button>
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-red-600 text-white px-2 py-1 font-bold border border-white">
                  @{user.username} ({user.role || "ADMIN"})
                </span>
                <button
                  onClick={handleLogout}
                  className="border-2 border-white px-2.5 py-1 text-xs font-bold uppercase cursor-pointer hover:bg-white hover:text-black"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <a
                  href="/login"
                  className="border-2 border-white px-2.5 py-1 text-xs font-bold uppercase cursor-pointer hover:bg-white hover:text-black"
                >
                  Sign In
                </a>
                <a
                  href="/register"
                  className="bg-red-600 border-2 border-red-600 text-white px-2.5 py-1 text-xs font-bold uppercase cursor-pointer hover:bg-white hover:text-black hover:border-white"
                >
                  Register
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className={`${sidebarOpen ? "block" : "hidden"} md:block w-full md:w-56 border-r-2 border-black bg-white md:min-h-screen`}>
          <NavItem icon={LayoutGrid} label="Dashboard" active={view === "dashboard"} onClick={() => navigate("dashboard")} />
          <NavItem icon={UserCircle} label="Profile" active={view === "profile"} onClick={() => navigate("profile")} />
          <NavItem icon={UserCheck} label="Users" active={view === "users"} onClick={() => navigate("users")} />
          <NavItem icon={Users} label="Designations" active={view === "designations"} onClick={() => navigate("designations")} />
          <NavItem icon={Building2} label="Departments" active={view === "departments"} onClick={() => navigate("departments")} />
        </aside>

        <main className="flex-1 p-4 md:p-8 min-w-0">
          {view === "dashboard" && (
            <DashboardView
              designations={designations}
              departments={departments}
              totalUsersCount={initialUsersData?.paginationInfo?.totalItems || 500}
              onNavigate={setView}
            />
          )}
          {view === "profile" && <ProfileView initialData={initialProfileData} />}
          {view === "users" && <UsersView initialData={initialUsersData} />}
          {view === "designations" && (
            <DesignationsView designations={designations} setDesignations={setDesignations} departments={departments} />
          )}
          {view === "departments" && <DepartmentsView departments={departments} setDepartments={setDepartments} />}
        </main>
      </div>
    </div>
  );
}
