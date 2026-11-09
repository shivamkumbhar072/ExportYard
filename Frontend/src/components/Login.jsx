import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

import { loginUser } from "../services/api";
import { useAuth } from "../context/AuthContext.jsx";
import { useNotification } from "../context/useNotification.js";
import AuthShell from "../components/AuthShell.jsx";
import useFitWidth from "../hooks/useFitWidth.js";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login, isLoggedIn } = useAuth();
  const notify = useNotification();

  const redirectTo = location.state?.from?.pathname || "/";
  const redirectState = location.state?.from?.state;
  const successMessage = location.state?.message || "";

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [googleRef, googleWidth] = useFitWidth(340);
  const errorRef = useRef(null);

  // SEO: set page title and meta description, with robots noindex for auth pages
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Log In | ExportYard";

    let description = document.querySelector('meta[name="description"]');
    let createdDescription = false;
    if (!description) {
      description = document.createElement("meta");
      description.setAttribute("name", "description");
      document.head.appendChild(description);
      createdDescription = true;
    }
    const previousDescription = description.getAttribute("content");
    description.setAttribute(
      "content",
      "Log in to your ExportYard account to manage export enquiries, orders and shipping documents."
    );

    // Auth pages should not be indexed by search engines
    let robots = document.querySelector('meta[name="robots"]');
    let createdRobots = false;
    if (!robots) {
      robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      document.head.appendChild(robots);
      createdRobots = true;
    }
    const previousRobots = robots.getAttribute("content");
    robots.setAttribute("content", "noindex, nofollow");

    return () => {
      document.title = previousTitle;
      if (createdDescription) {
        description.remove();
      } else if (previousDescription !== null) {
        description.setAttribute("content", previousDescription);
      }
      if (createdRobots) {
        robots.remove();
      } else if (previousRobots !== null) {
        robots.setAttribute("content", previousRobots);
      }
    };
  }, []);

  // Scroll error into view
  useEffect(() => {
    if ((message || Object.keys(fieldErrors).length) && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [message, fieldErrors]);

  function validate() {
    const errors = {};
    const email = form.email.trim();

    if (!email) errors.email = "Email is required.";
    else if (email.length > 254 || !isValidEmail(email)) {
      errors.email = "Enter a valid email address.";
    }

    if (!form.password) errors.password = "Password is required.";
    else if (form.password.length > 72) {
      errors.password = "Password cannot exceed 72 characters.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => ({ ...current, [name]: "" }));
    setMessage("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (loading) return;

    setMessage("");
    if (!validate()) return;

    setLoading(true);

    try {
      const result = await loginUser({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      if (!result?.token || !result?.user) {
        throw new Error("Invalid login response from server.");
      }

      login(result.token, result.user);
      notify("You’re logged in successfully.");
      navigate(redirectTo, { replace: true, state: redirectState });
    } catch (error) {
      const status = error?.response?.status;

      let msg =
        error?.response?.data?.message ||
        error?.message ||
        "Login failed. Please try again.";

      if (status === 401) msg = "Incorrect email or password.";
      if (status === 429) msg = "Too many attempts. Please try again later.";
      if (status >= 500) msg = "Server error. Please try again shortly.";

      setMessage(msg);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSuccess(response) {
    if (!response?.credential || loading) return;

    setMessage("");
    setFieldErrors({});
    setLoading(true);

    try {
      const result = await fetch(`${API_URL}/api/users/google-auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });

      const data = await result.json().catch(() => ({}));

      if (!result.ok) throw new Error(data.message || "Google login failed.");
      if (!data.token || !data.user)
        throw new Error("Invalid Google authentication response.");

      login(data.token, data.user);
      notify("You’re logged in successfully.");
      navigate(redirectTo, { replace: true, state: redirectState });
    } catch (error) {
      setMessage(error.message || "Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleError() {
    setMessage("Google sign-in failed. Please try again.");
  }

  if (isLoggedIn) {
    return (
      <AuthShell
        title="You're already logged in"
        subtitle="Pick up where you left off."
        footer={<Link to="/">Back to home</Link>}
      >
        <button
          type="button"
          className="w-full rounded-lg bg-black px-4 py-2.5 text-white font-medium hover:bg-gray-800 transition"
          onClick={() =>
            navigate(redirectTo, { replace: true, state: redirectState })
          }
        >
          Continue
        </button>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to your ExportYard account."
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Sign up
          </Link>
        </>
      }
    >
      {/* Success message */}
      {successMessage && !message && (
        <div
          role="status"
          className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700"
        >
          {successMessage}
        </div>
      )}

      {/* Google Login */}
      <div className="flex justify-center" ref={googleRef}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          text="continue_with"
          shape="rectangular"
          size="large"
          width={googleWidth}
        />
      </div>

      <div
        role="separator"
        className="my-5 flex items-center gap-3 text-xs uppercase tracking-wide text-gray-400"
      >
        <span className="h-px flex-1 bg-gray-200" />
        or
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        {/* Email */}
        <div>
          <label
            htmlFor="login-email"
            className={`mb-1.5 block text-sm font-medium ${
              fieldErrors.email ? "text-red-600" : "text-gray-700"
            }`}
          >
            Email
          </label>
          <input
            id="login-email"
            type="email"
            name="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            required
            maxLength={254}
            disabled={loading}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "login-email-error" : undefined}
            className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition disabled:bg-gray-50 disabled:text-gray-500 ${
              fieldErrors.email
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
            }`}
          />
          {fieldErrors.email && (
            <p
              id="login-email-error"
              role="alert"
              className="mt-1.5 text-sm font-medium text-red-600"
            >
              {fieldErrors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="login-password"
            className={`mb-1.5 block text-sm font-medium ${
              fieldErrors.password ? "text-red-600" : "text-gray-700"
            }`}
          >
            Password
          </label>
          <div className="relative">
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
              maxLength={72}
              disabled={loading}
              aria-invalid={!!fieldErrors.password}
              aria-describedby={
                fieldErrors.password ? "login-password-error" : undefined
              }
              className={`w-full rounded-lg border px-3.5 py-2.5 pr-16 text-sm outline-none transition disabled:bg-gray-50 disabled:text-gray-500 ${
                fieldErrors.password
                  ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                  : "border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-200"
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-pressed={showPassword}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 px-3 text-xs font-semibold text-gray-500 hover:text-gray-900"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {fieldErrors.password && (
            <p
              id="login-password-error"
              role="alert"
              className="mt-1.5 text-sm font-medium text-red-600"
            >
              {fieldErrors.password}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Server error banner */}
        {message && (
          <div
            ref={errorRef}
            role="alert"
            aria-live="assertive"
            className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
          >
            <span aria-hidden="true" className="mt-0.5 text-base leading-none">
              ⚠
            </span>
            <span>{message}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-black px-4 py-2.5 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </AuthShell>
  );
}