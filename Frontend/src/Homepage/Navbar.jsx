import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNotification } from "../context/useNotification.js";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(() => window.scrollY > 12);
  const { user, isLoggedIn, logout } = useAuth();
  const notify = useNotification();
  const navigate = useNavigate();
  const firstName = user?.name?.trim().split(/\s+/)[0] || "there";

  useEffect(() => {
    function updateScrollState() {
      setHasScrolled(window.scrollY > 12);
    }

    window.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  function confirmLogout() {
    logout();
    setConfirmOpen(false);
    setMenuOpen(false);
    notify("You’re logged out.");
    navigate("/", { replace: true });
  }

  function accountActions({ mobile = false } = {}) {
    return (
      <div className={`flex min-w-0 items-center gap-3 ${mobile ? "flex-wrap" : ""}`}>
        {isLoggedIn ? (
          <>
            <span className="max-w-[35vw] truncate text-sm text-white/85 sm:max-w-48">
              Hello, {firstName}
            </span>
            <button
              className="shrink-0 rounded border border-white/30 px-3 py-2 text-sm font-medium text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e5ae83]"
              onClick={() => setConfirmOpen(true)}
              type="button"
            >
              Log out
            </button>
          </>
        ) : (
          <Link
            className="rounded px-2 py-2 text-sm font-medium text-white hover:text-[#e5ae83] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e5ae83]"
            to="/login"
            onClick={() => setMenuOpen(false)}
          >
            Log in
          </Link>
        )}
      </div>
    );
  }

  const pageLinks = (
    <>
      <NavLink
        to="/about"
        onClick={() => setMenuOpen(false)}
        className={({ isActive }) =>
          `py-1 text-sm font-medium ${
            isActive ? "text-[#e5ae83]" : "text-white/85 hover:text-white"
          }`
        }
      >
        About
      </NavLink>
      {user?.role === "admin" && (
        <NavLink
          to="/admin"
          end
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            `py-1 text-sm font-medium ${
              isActive ? "text-[#e5ae83]" : "text-white/85 hover:text-white"
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
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b text-white transition-colors duration-200 ${
          hasScrolled || menuOpen
            ? "border-white/10 bg-[#183F35]"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex min-h-16 max-w-[88rem] items-center justify-between gap-4 px-4 sm:min-h-[72px] sm:px-6 lg:px-8">
          <Link
            to="/"
            className="shrink-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e5ae83]"
            aria-label="ExportYard home"
            onClick={() => setMenuOpen(false)}
          >
            <img className="h-8 w-auto sm:h-10" src="/Images/logo.png" alt="ExportYard" />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <nav className="flex items-center gap-6" aria-label="Main navigation">
              {pageLinks}
            </nav>
            {accountActions()}
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded border border-white/25 text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e5ae83] md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>

        {menuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-white/15 px-5 py-4 md:hidden"
          >
            <nav className="flex flex-col items-start gap-4" aria-label="Mobile navigation">
              {pageLinks}
            </nav>
            <div className="mt-4 border-t border-white/15 pt-4">
              {accountActions({ mobile: true })}
            </div>
          </div>
        )}
      </header>

      {confirmOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#102b24]/70 p-4"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setConfirmOpen(false);
          }}
        >
          <section
            className="w-full max-w-sm rounded-lg bg-white p-6 text-[#252b27] shadow-xl"
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
                className="rounded bg-[#183F35] px-4 py-2 text-sm font-semibold text-white hover:bg-[#102b24]"
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
