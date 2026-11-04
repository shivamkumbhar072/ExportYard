import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { forgotPassword } from "../services/api";
import AuthShell from "../components/AuthShell.jsx";

const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false); // hide form after send

  const errorRef = useRef(null);

  // Clear errors when user edits
  useEffect(() => {
    if (error) setError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  // Scroll error into view
  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [error]);

  async function handleSubmit(event) {
    event.preventDefault();
    if (loading) return;

    setError("");
    setMessage("");

    if (!email.trim()) return setError("Please enter your email.");
    if (!isValidEmail(email)) return setError("Enter a valid email address.");

    setLoading(true);
    try {
      const result = await forgotPassword({ email: email.trim().toLowerCase() });
      setMessage(result.message || "If that email is registered, a reset link has been sent.");
      setSent(true); // ← hides the form and the send-link button
    } catch (err) {
      const status = err?.response?.status;
      let msg = err?.response?.data?.message || err?.message || "Something went wrong.";
      if (status === 429) msg = "Too many attempts. Please try again later.";
      if (status >= 500) msg = "Server error. Please try again shortly.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  // After successful send: hide the form entirely
  if (sent) {
    return (
      <AuthShell
        title="Check your email"
        subtitle="We've sent a password reset link to your inbox."
        footer={<Link to="/login" className="text-blue-600 hover:underline font-medium">Back to log in</Link>}
      >
        <div
          role="status"
          className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
        >
          {message || "If that email is registered, a reset link has been sent."}
        </div>

        <p className="mb-4 text-sm text-gray-600">
          Didn't get it? Check your spam folder, or wait a few minutes before trying again.
        </p>

        <button
          type="button"
          onClick={() => {
            setSent(false);
            setMessage("");
            setEmail("");
          }}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-800 transition hover:bg-gray-50"
        >
          Use a different email
        </button>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Forgot password?"
      subtitle="Enter your email and we'll send you a reset link."
      footer={<Link to="/login" className="text-blue-600 hover:underline font-medium">Back to log in</Link>}
    >
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <label
            htmlFor="fp-email"
            className={`mb-1.5 block text-sm font-medium ${
              error ? "text-red-600" : "text-gray-700"
            }`}
          >
            Email
          </label>
          <input
            id="fp-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="you@company.com"
            disabled={loading}
            aria-invalid={!!error}
            aria-describedby={error ? "fp-email-error" : undefined}
            className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition disabled:bg-gray-50 disabled:text-gray-500 ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
            }`}
          />
        </div>

        {/* Server / validation error — red */}
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

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-black px-4 py-2.5 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Sending..." : "Send reset link"}
        </button>
      </form>
    </AuthShell>
  );
}