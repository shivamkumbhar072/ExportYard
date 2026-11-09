import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useNotification } from "../context/useNotification.js";

export default function Navbar() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const notify = useNotification();
  const navigate = useNavigate();

  function confirmLogout() {
    logout();
    setConfirmOpen(false);
    notify("You’re logged out.");
    navigate("/", { replace: true });
  }

  const accountActions = (
    <div className="flex min-w-0 items-center justify-end gap-3 sm:gap-4">
      {isLoggedIn ? (
        <>
          <span className="max-w-[35vw] truncate text-sm text-white/85 sm:max-w-48">
            Hello, {user?.name || "there"}
          </span>
          <button
            className="shrink-0 rounded border border-white/30 px-3 py-2 text-sm font-medium text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8b85d]"
            onClick={() => setConfirmOpen(true)}
            type="button"
          >
            Log out
          </button>
        </>
      ) : (
        <Link
          className="rounded px-2 py-2 text-sm font-medium text-white hover:text-[#e8b85d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8b85d]"
          to="/login"
        >
          Log in
        </Link>
      )}
    </div>
  );

  const pageLinks = (
    <>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `py-1 text-sm font-medium ${
            isActive ? "text-[#e8b85d]" : "text-white/85 hover:text-white"
          }`
        }
      >
        About
      </NavLink>
      {user?.role === "admin" && (
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `py-1 text-sm font-medium ${
              isActive ? "text-[#e8b85d]" : "text-white/85 hover:text-white"
            }`
          }
        >
          Admin panel
        </NavLink>
      )}
    </>
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#071c30] text-white">
        <div className="mx-auto flex max-w-[88rem] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:min-h-[72px] sm:flex-nowrap sm:px-6 sm:py-0 lg:px-8">
          <Link
            to="/"
            className="shrink-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e8b85d]"
            aria-label="ExportYard home"
          >
            <img className="h-8 w-auto sm:h-10" src="/Images/logo.png" alt="ExportYard" />
          </Link>

          <div className="order-2 ml-auto flex min-w-0 items-center sm:order-3 sm:ml-0">
            {accountActions}
          </div>

          <nav
            className="order-3 flex w-full items-center gap-6 border-t border-white/15 pt-2 sm:order-2 sm:ml-auto sm:w-auto sm:border-0 sm:pt-0"
            aria-label="Main navigation"
          >
            {pageLinks}
          </nav>
        </div>
      </header>

      {confirmOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#071c30]/70 p-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setConfirmOpen(false);
          }}
        >
          <section
            className="w-full max-w-sm rounded-lg bg-white p-6 text-[#172536] shadow-xl"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="logout-title"
            aria-describedby="logout-description"
          >
            <h2 id="logout-title" className="text-xl font-bold">Log out?</h2>
            <p id="logout-description" className="mt-2 text-sm leading-6 text-[#4b5563]">
              You can log back in at any time.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="rounded border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmLogout}
                className="rounded bg-[#071c30] px-4 py-2 text-sm font-semibold text-white hover:bg-[#102b43]"
              >
                Log out
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
