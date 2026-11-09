import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AlertCircle,
  ArrowRight,
  MessageSquare,
  RefreshCw,
  UserPlus,
  Users,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const STATUS_STYLES = {
  new: "bg-amber-50 text-amber-800 ring-amber-700/15",
  contacted: "bg-sky-50 text-sky-800 ring-sky-700/15",
  quoted: "bg-violet-50 text-violet-800 ring-violet-700/15",
  negotiating: "bg-orange-50 text-orange-800 ring-orange-700/15",
  converted: "bg-emerald-50 text-emerald-800 ring-emerald-700/15",
  closed: "bg-slate-100 text-slate-700 ring-slate-600/15",
};

function formatDate(date) {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function StatCard({ label, value, note, icon: Icon }) {
  return (
    <article className="min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-600">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight text-[#183F35] sm:text-4xl">
            {value}
          </p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#F7F5EF] text-[#854a31]">
          <Icon size={19} aria-hidden="true" />
        </span>
      </div>
      <p className="mt-3 text-xs leading-5 text-slate-500">{note}</p>
    </article>
  );
}

export default function AdminDashboard() {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(() => {
    return fetch(`${API_URL}/api/admin/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (response) => {
        const result = await response.json();

        if (!response.ok || result.success === false) {
          throw new Error(result.message || "Unable to load dashboard.");
        }

        if (!result.data) {
          throw new Error("The server returned incomplete dashboard data.");
        }

        setData(result.data);
        setError("");
      })
      .catch((requestError) => {
        setError(
          requestError.message ||
            "Unable to connect to the dashboard service."
        );
      })
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  function refreshDashboard() {
    setLoading(true);
    void loadDashboard();
  }

  const stats = [
    {
      label: "Total users",
      value: data?.totalUsers ?? "—",
      note: "Registered accounts",
      icon: Users,
    },
    {
      label: "New users",
      value: data?.recentUsersCount ?? "—",
      note: "Joined in the last 7 days",
      icon: UserPlus,
    },
    {
      label: "Total enquiries",
      value: data?.totalEnquiries ?? "—",
      note: "Buyer and supplier enquiries",
      icon: MessageSquare,
    },
    {
      label: "New enquiries",
      value: data?.newEnquiriesCount ?? "—",
      note: "Waiting for a first response",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-7 sm:space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[#854a31]">Overview</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight text-[#183F35] sm:text-3xl">
            Dashboard
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
            A quick view of your accounts and the latest trade enquiries.
          </p>
        </div>
        <button
          type="button"
          onClick={refreshDashboard}
          disabled={loading}
          className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-[#252b27] transition hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C47A45] disabled:cursor-wait disabled:opacity-60 sm:self-auto"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
            aria-hidden="true"
          />
          Refresh
        </button>
      </header>

      {error && (
        <div
          className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          role="alert"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="font-semibold">Dashboard data couldn’t be loaded</p>
            <p className="mt-1 break-words">{error}</p>
            <button
              type="button"
              onClick={refreshDashboard}
              className="mt-2 font-semibold underline underline-offset-2"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      <section aria-label="Platform statistics">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              {...stat}
              value={loading ? "…" : stat.value}
            />
          ))}
        </div>
      </section>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(18rem,0.85fr)]">
        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-4 sm:px-5">
            <div>
              <h3 className="font-semibold text-[#183F35]">Recent enquiries</h3>
              <p className="mt-1 text-sm text-slate-500">
                The latest buyer and supplier requests.
              </p>
            </div>
            <Link
              to="/admin/enquiries"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[#854a31] hover:text-[#183F35] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C47A45]"
            >
              All enquiries <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>

          {loading && !data ? (
            <p className="px-4 py-8 text-sm text-slate-500 sm:px-5">
              Loading enquiries…
            </p>
          ) : !data?.recentEnquiries?.length ? (
            <p className="px-4 py-8 text-sm text-slate-500 sm:px-5">
              {error ? "Enquiries are unavailable right now." : "No enquiries yet."}
            </p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {data.recentEnquiries.map((enquiry) => {
                const status = enquiry.status || "New";

                return (
                  <li
                    key={enquiry._id}
                    className="flex min-w-0 flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5"
                  >
                    <div className="flex min-w-0 items-start gap-3">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600">
                        <MessageSquare size={16} aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-[#252b27]">
                          {enquiry.productName || "Product enquiry"}
                        </p>
                        <p className="mt-1 truncate text-sm text-slate-500">
                          {enquiry.name} <span aria-hidden="true">·</span>{" "}
                          {enquiry.enquiryType || "Buyer"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-3 pl-12 sm:shrink-0 sm:pl-0">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                          STATUS_STYLES[status.toLowerCase()] ||
                          STATUS_STYLES.closed
                        }`}
                      >
                        {status}
                      </span>
                      <time
                        className="text-xs text-slate-500"
                        dateTime={enquiry.createdAt || undefined}
                      >
                        {formatDate(enquiry.createdAt)}
                      </time>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-4 sm:px-5">
            <div>
              <h3 className="font-semibold text-[#183F35]">New accounts</h3>
              <p className="mt-1 text-sm text-slate-500">
                The latest registered users.
              </p>
            </div>
            <Link
              to="/admin/users"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-[#854a31] hover:text-[#183F35] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C47A45]"
            >
              All users <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>

          {loading && !data ? (
            <p className="px-4 py-8 text-sm text-slate-500 sm:px-5">
              Loading users…
            </p>
          ) : !data?.recentUsers?.length ? (
            <p className="px-4 py-8 text-sm text-slate-500 sm:px-5">
              {error ? "Accounts are unavailable right now." : "No accounts yet."}
            </p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {data.recentUsers.map((user) => (
                <li
                  key={user._id}
                  className="flex min-w-0 items-center gap-3 px-4 py-3.5 sm:px-5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F7F5EF] text-sm font-semibold text-[#854a31]">
                    {(user.name || "?").charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#252b27]">
                      {user.name || "Unnamed account"}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {user.email}
                    </p>
                  </div>
                  <time
                    className="shrink-0 text-xs text-slate-500"
                    dateTime={user.createdAt || undefined}
                  >
                    {formatDate(user.createdAt)}
                  </time>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
