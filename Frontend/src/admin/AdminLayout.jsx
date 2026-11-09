import { NavLink, Outlet, Navigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users as UsersIcon,
  MessageSquare,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const navigation = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Users",
    path: "/admin/users",
    icon: UsersIcon,
  },
    {
    label: "Enquiries",
    path: "/admin/enquiries",
    icon: MessageSquare,
  },
];

export default function AdminLayout() {
  const { user, isLoggedIn, authLoading } = useAuth();

  if (authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f6f7] px-4 text-sm text-slate-600">
        Verifying admin access…
      </main>
    );
  }

  if (!isLoggedIn || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f6f7] text-[#172536]">
      <section className="border-b border-white/10 bg-[#071c30] px-4 pb-5 pt-24 text-white sm:px-6 sm:pb-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#e8b85d]">
            ExportYard administration
          </p>
          <h1 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
            Admin workspace
          </h1>
          <p className="mt-1 text-sm text-white/65">
            Manage accounts and trade enquiries.
          </p>

          <nav
            aria-label="Admin"
            className="-mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0"
          >
            {navigation.map(({ label, path, icon: Icon, end }) => (
              <NavLink
                key={path}
                to={path}
                end={end}
                className={({ isActive }) =>
                  `inline-flex min-h-10 shrink-0 items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8b85d] sm:px-4 ${
                    isActive
                      ? "bg-[#e8b85d] text-[#071c30]"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon size={17} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </section>

      <main className="w-full flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}