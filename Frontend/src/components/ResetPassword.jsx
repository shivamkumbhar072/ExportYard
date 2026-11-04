import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { resetPassword } from "../services/api";
import AuthShell from "../components/AuthShell.jsx";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const errorRef = useRef(null);

  // Clear errors on edit
  useEffect(() => {
    if (error) setError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, confirm]);

  // Scroll error into view
  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [error]);

  function validate() {
    if (!password) return "Password is required.";
    if (password.length < 8 || password.length > 72)
      return "Password must be between 8 and 72 characters.";
    if (password !== confirm) return "Passwords do not match.";
    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (loading) return;

    const validationError = validate();
    if (validationError) return setError(validationError);

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await resetPassword(token, { password });
      setSuccess(result.message || "Password updated successfully. Redirecting…");
      setTimeout(() => navigate("/login", { replace: true }), 1500);
    } catch (err) {
      const status = err?.response?.status;
      let msg =
        err?.response?.data?.message ||
        err?.message ||
        "Could not reset password. Please try again.";
      if (status === 400) msg = msg || "Invalid or expired reset link.";
      if (status === 429) msg = "Too many attempts. Please try again later.";
      if (status >= 500) msg = "Server error. Please try again shortly.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      title="Set a new password"
      subtitle="Choose a new password for your account."
      footer={
        <Link to="/login" className="font-medium text-blue-600 hover:underline">
          Back to log in
        </Link>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        {/* New password */}
        <div>
          <label
            htmlFor="rp-password"
            className={`mb-1.5 block text-sm font-medium ${
              error ? "text-red-600" : "text-gray-700"
            }`}
          >
            New password
          </label>
          <div className="relative">
            <input
              id="rp-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="Enter new password"
              disabled={loading}
              aria-invalid={!!error}
              aria-describedby={error ? "rp-error" : undefined}
              className={`w-full rounded-lg border px-3.5 py-2.5 pr-12 text-sm outline-none transition disabled:bg-gray-50 disabled:text-gray-500 ${
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-pressed={showPassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-900"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        {/* Confirm password */}
        <div>
          <label
            htmlFor="rp-confirm"
            className={`mb-1.5 block text-sm font-medium ${
              error ? "text-red-600" : "text-gray-700"
            }`}
          >
            Confirm password
          </label>
          <div className="relative">
            <input
              id="rp-confirm"
              type={showConfirm ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              autoComplete="new-password"
              placeholder="Re-enter new password"
              disabled={loading}
              aria-invalid={!!error}
              aria-describedby={error ? "rp-error" : undefined}
              className={`w-full rounded-lg border px-3.5 py-2.5 pr-12 text-sm outline-none transition disabled:bg-gray-50 disabled:text-gray-500 ${
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((s) => !s)}
              aria-pressed={showConfirm}
              aria-label={showConfirm ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-900"
            >
              {showConfirm ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </div>

        {/* Error banner — red */}
        {error && (
          <div
            ref={errorRef}
            role="alert"
            aria-live="assertive"
            className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            <span aria-hidden="true" className="mt-0.5 text-base leading-none">
              ⚠
            </span>
            <span>{error}</span>
          </div>
        )}

        {/* Success banner — green */}
        {success && (
          <div
            role="status"
            className="flex items-start gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
          >
            <span aria-hidden="true" className="mt-0.5 text-base leading-none">
              ✓
            </span>
            <span>{success}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !!success}
          className="w-full rounded-lg bg-black px-4 py-2.5 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Updating..." : success ? "Redirecting…" : "Update password"}
        </button>
      </form>
    </AuthShell>
  );
}

/* ---------- Inline SVG icons (no extra deps) ---------- */
function EyeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}