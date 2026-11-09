import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { registerUser, loginUser, sendSignupOtp } from "../services/api";
import { useAuth } from "../context/AuthContext.jsx";
import { useNotification } from "../context/useNotification.js";
import AuthShell from "../components/AuthShell.jsx";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, login } = useAuth();
  const notify = useNotification();
  const redirectTo = location.state?.from?.pathname || "/";
  const redirectState = location.state?.from?.state;

  const [form, setForm] = useState({ name: "", email: "", password: "", otp: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const set = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }));
    setFieldErrors((current) => ({ ...current, [key]: "" }));
    setError("");
  };
  const setOtp = (event) => {
    setForm((current) => ({
      ...current,
      otp: event.target.value.replace(/\D/g, "").slice(0, 6),
    }));
    setFieldErrors((current) => ({ ...current, otp: "" }));
    setError("");
  };

  const fieldClass = (key) =>
    `w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 disabled:bg-gray-50 disabled:text-gray-500 ${
      fieldErrors[key]
        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
        : "border-gray-300 focus:border-gray-900 focus:ring-gray-200"
    }`;

  const fieldError = (key) =>
    fieldErrors[key] ? (
      <p id={`reg-${key}-error`} role="alert" className="mt-1.5 text-sm text-red-600">
        {fieldErrors[key]}
      </p>
    ) : null;

  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  function validateEmail() {
    const email = form.email.trim();
    const emailError = !email
      ? "Email is required."
      : email.length > 254 || !isValidEmail(email)
        ? "Enter a valid email address."
        : "";
    setFieldErrors((current) => ({ ...current, email: emailError }));
    return !emailError;
  }

  async function handleSendOtp() {
    setMessage("");
    setError("");

    const email = form.email.trim().toLowerCase();
    if (!validateEmail()) return;

    setLoading(true);
    try {
      await sendSignupOtp({ email });
      setOtpSent(true);
      setMessage("OTP sent to your email.");
      notify("Verification code sent. Check your email.");
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

    const errors = {};
    if (name.length < 2) errors.name = "Name must be at least 2 characters.";
    if (name.length > 100) errors.name = "Name cannot exceed 100 characters.";
    if (!email) errors.email = "Email is required.";
    else if (email.length > 254 || !isValidEmail(email)) {
      errors.email = "Enter a valid email address.";
    }
    if (otp.trim().length !== 6) errors.otp = "Enter the 6-digit verification code.";
    if (password.length < 8 || password.length > 72) {
      errors.password = "Password must be between 8 and 72 characters.";
    }
    setFieldErrors(errors);
    if (Object.keys(errors).length) return;

    setLoading(true);
    try {
      await registerUser({ name, email, password, otp: otp.trim() });

      const result = await loginUser({ email, password });
      if (!result?.token || !result?.user) {
        throw new Error("Account created, but automatic login failed. Please log in.");
      }

      login(result.token, result.user);
      notify("Your ExportYard account is ready.");
      navigate(redirectTo, { replace: true, state: redirectState });
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
          onClick={() =>
            navigate(redirectTo, { replace: true, state: redirectState })
          }
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
            required
            minLength={2}
            maxLength={100}
            autoComplete="name"
            placeholder="Your name"
            disabled={loading}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "reg-name-error" : undefined}
            className={fieldClass("name")}
          />
          {fieldError("name")}
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
              required
              maxLength={254}
              autoComplete="email"
              placeholder="you@company.com"
              disabled={loading}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "reg-email-error" : undefined}
              className={`flex-1 ${fieldClass("email")} ${
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
          {fieldError("email")}
          {otpSent && (
            <button
              type="button"
              onClick={() => {
                setOtpSent(false);
                setForm((current) => ({ ...current, otp: "" }));
                setFieldErrors({});
                setMessage("");
              }}
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
                minLength={6}
                required
                value={form.otp}
                onChange={setOtp}
                autoComplete="one-time-code"
                placeholder="123456"
                disabled={loading}
                aria-invalid={Boolean(fieldErrors.otp)}
                aria-describedby={fieldErrors.otp ? "reg-otp-error" : undefined}
                className={`${fieldClass("otp")} text-center font-mono tracking-[0.4em]`}
              />
              {fieldError("otp")}
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
                  required
                  minLength={8}
                  maxLength={72}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  disabled={loading}
                  aria-invalid={Boolean(fieldErrors.password)}
                  aria-describedby={fieldErrors.password ? "reg-password-error" : undefined}
                  className={`${fieldClass("password")} pr-12`}
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
              {fieldError("password")}
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