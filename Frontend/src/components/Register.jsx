import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { registerUser, loginUser, sendSignupOtp } from "../services/api";
import { useAuth } from "../context/AuthContext.jsx";
import AuthShell from "../components/AuthShell.jsx";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, login } = useAuth();
  const redirectTo = location.state?.from?.pathname || "/";

  const [form, setForm] = useState({ name: "", email: "", password: "", otp: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  async function handleSendOtp() {
    setMessage("");
    setError("");

    const email = form.email.trim().toLowerCase();
    if (!email) return setError("Enter your email first.");
    if (!isValidEmail(email)) return setError("Enter a valid email address.");

    setLoading(true);
    try {
      await sendSignupOtp({ email });
      setOtpSent(true);
      setMessage("OTP sent to your email.");
    } catch (err) {
      const status = err?.response?.status;
      let msg = err?.response?.data?.message || err?.message || "Failed to send OTP.";
      if (status === 409) msg = "This email is already registered. Try logging in.";
      if (status === 429) msg = "Too many requests. Please wait a minute.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (loading) return;
    setMessage("");
    setError("");

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const { password, otp } = form;

    if (!name || !email || !password || !otp.trim()) {
      return setError("Please fill in all fields.");
    }
    if (password.length < 8 || password.length > 72) {
      return setError("Password must be between 8 and 72 characters.");
    }

    setLoading(true);
    try {
      await registerUser({ name, email, password, otp: otp.trim() });

      const result = await loginUser({ email, password });
      if (!result?.token || !result?.user) {
        throw new Error("Account created, but automatic login failed. Please log in.");
      }

      login(result.token, result.user);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const status = err?.response?.status;
      let msg = err?.response?.data?.message || err?.message || "Registration failed. Please try again.";
      if (status === 409) msg = "This email is already registered.";
      if (status === 400) msg = "OTP invalid or expired. Please resend.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  if (isLoggedIn) {
    return (
      <AuthShell
        title="You're already logged in"
        subtitle="Pick up where you left off."
        footer={<Link to="/" className="font-medium text-blue-600 hover:underline">Back to home</Link>}
      >
        <button
          type="button"
          onClick={() => navigate(redirectTo, { replace: true })}
          className="w-full rounded-lg bg-black px-4 py-2.5 font-medium text-white transition hover:bg-gray-800"
        >
          Continue
        </button>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Sign up to ExportYard to send your enquiry."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-blue-600 hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        {/* Full name */}
        <div>
          <label htmlFor="reg-name" className="mb-1.5 block text-sm font-medium text-gray-700">
            Full name
          </label>
          <input
            id="reg-name"
            type="text"
            value={form.name}
            onChange={set("name")}
            maxLength={100}
            autoComplete="name"
            placeholder="Your name"
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200 disabled:bg-gray-50 disabled:text-gray-500"
          />
        </div>

        {/* Email + Send OTP */}
        <div>
          <label htmlFor="reg-email" className="mb-1.5 block text-sm font-medium text-gray-700">
            Email
          </label>
          <div className="flex gap-2">
            <input
              id="reg-email"
              type="email"
              value={form.email}
              onChange={set("email")}
              readOnly={otpSent}
              autoComplete="email"
              placeholder="you@company.com"
              disabled={loading}
              className={`w-full flex-1 rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200 disabled:bg-gray-50 disabled:text-gray-500 ${
                otpSent ? "bg-gray-50 text-gray-500" : ""
              }`}
            />
            {!otpSent ? (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading}
                className="shrink-0 rounded-lg bg-black px-3.5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading}
                className="shrink-0 rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm font-medium text-gray-800 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Resend OTP
              </button>
            )}
          </div>
          {otpSent && (
            <button
              type="button"
              onClick={() => setOtpSent(false)}
              className="mt-1.5 text-sm font-medium text-blue-600 hover:underline"
            >
              Change email
            </button>
          )}
        </div>

        {otpSent && (
          <>
            {/* OTP */}
            <div>
              <label htmlFor="reg-otp" className="mb-1.5 block text-sm font-medium text-gray-700">
                OTP
              </label>
              <input
                id="reg-otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={form.otp}
                onChange={(e) =>
                  setForm({ ...form, otp: e.target.value.replace(/\D/g, "") })
                }
                autoComplete="one-time-code"
                placeholder="123456"
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-center font-mono text-sm tracking-[0.4em] outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="reg-password" className="mb-1.5 block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={set("password")}
                  minLength={8}
                  maxLength={72}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  disabled={loading}
                  className="w-full rounded-lg border border-gray-300 px-3.5 py-2.5 pr-12 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200 disabled:bg-gray-50 disabled:text-gray-500"
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
          </>
        )}

        {/* Info (green/blue) */}
        {message && !error && (
          <div
            role="status"
            className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
          >
            {message}
          </div>
        )}

        {/* Error (red) */}
        {error && (
          <div
            role="alert"
            aria-live="assertive"
            className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            <span aria-hidden="true" className="mt-0.5 text-base leading-none">⚠</span>
            <span>{error}</span>
          </div>
        )}

        {otpSent && (
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black px-4 py-2.5 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        )}
      </form>
    </AuthShell>
  );
}

/* ---------- inline icons ---------- */
function EyeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}