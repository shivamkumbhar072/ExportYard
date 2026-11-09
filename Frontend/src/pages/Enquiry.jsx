import { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Send } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useNotification } from "../context/useNotification.js";
import countryCallingCodes from "../data/countryCallingCodes.js";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(
  /\/+$/,
  ""
);

const initialForm = {
  enquiryType: "Buyer",
  name: "",
  companyName: "",
  email: "",
  whatsappCountry: "India",
  whatsappCountryCode: "+91",
  whatsappNumber: "",
  productName: "",
  originCountry: "",
  destinationCountry: "",
  requestedQuantity: "",
  destinationPort: "",
  targetTimeline: "",
  requirements: "",
  whatsappConsent: false,
};

const labelClass =
  "flex flex-col gap-2 text-sm font-medium text-[#252b27]";
const inputClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#252b27] outline-none transition placeholder:text-slate-400 focus:border-[#C47A45] focus:ring-4 focus:ring-[#C47A45]/15";

function updateMeta(selector, attribute, value) {
  let element = document.head.querySelector(selector);
  const created = !element;

  if (!element) {
    element = document.createElement("meta");
    if (attribute === "name") {
      element.name = selector.match(/name="([^"]+)"/)?.[1] || "";
    } else {
      element.setAttribute(attribute, selector.match(/property="([^"]+)"/)?.[1] || "");
    }
    document.head.appendChild(element);
  }

  const previous = element.content;
  element.content = value;
  return () => {
    if (created) element.remove();
    else element.content = previous;
  };
}

export default function Enquiry() {
  const location = useLocation();
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const notify = useNotification();
  const [form, setForm] = useState(() => {
    const draft = location.state?.draft;
    const savedDraft = draft && typeof draft === "object" ? draft : {};
    return {
      ...initialForm,
      ...savedDraft,
      whatsappCountry:
        savedDraft.whatsappCountry ||
        countryCallingCodes.find(
          ([, callingCode]) =>
            callingCode === savedDraft.whatsappCountryCode
        )?.[0] ||
        "India",
      name: savedDraft.name || user?.name || "",
      email: savedDraft.email || user?.email || "",
    };
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedAs, setSubmittedAs] = useState("Buyer");
  const formRef = useRef(null);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Trade Enquiry | Buyers & Suppliers | ExportYard";

    const cleanups = [
      updateMeta(
        'meta[name="description"]',
        "name",
        "Send ExportYard a buyer or supplier enquiry. Share your product, quantity, origin, destination and trade requirements with our team."
      ),
      updateMeta(
        'meta[property="og:title"]',
        "property",
        "Trade Enquiry for Buyers and Suppliers | ExportYard"
      ),
      updateMeta(
        'meta[property="og:description"]',
        "property",
        "Tell ExportYard what you want to source or supply and share your trade requirements."
      ),
    ];
    let canonical = document.head.querySelector('link[rel="canonical"]');
    const createdCanonical = !canonical;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    const previousCanonical = canonical.href;
    canonical.href = "https://exportyard.com/enquiry";

    return () => {
      document.title = previousTitle;
      cleanups.forEach((cleanup) => cleanup());
      if (createdCanonical) canonical.remove();
      else canonical.href = previousCanonical;
    };
  }, []);

  function handleChange(event) {
    const { name, value, checked, type } = event.target;
    if (name === "whatsappCountry") {
      const country = countryCallingCodes.find(([label]) => label === value);
      setForm((current) => ({
        ...current,
        whatsappCountry: value,
        whatsappCountryCode: country?.[1] || current.whatsappCountryCode,
      }));
      setFieldErrors((current) => ({
        ...current,
        whatsappCountry: "",
        whatsappCountryCode: "",
      }));
      return;
    }

    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
    setFieldErrors((current) => ({ ...current, [name]: "" }));
    setError("");
  }

  function validateForm() {
    const errors = {};
    const email = form.email.trim();
    const phone = form.whatsappNumber.replace(/[\s()-]/g, "");
    const callingCode = countryCallingCodes.find(
      ([country]) => country === form.whatsappCountry
    )?.[1];

    if (form.name.trim().length < 2) {
      errors.name = "Enter your name (at least 2 characters).";
    } else if (form.name.trim().length > 100) {
      errors.name = "Name cannot exceed 100 characters.";
    }
    if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Enter a valid business email address.";
    }
    if (!callingCode || callingCode !== form.whatsappCountryCode) {
      errors.whatsappCountry = "Choose a valid country calling code.";
    }
    if (!/^[0-9]{5,20}$/.test(phone)) {
      errors.whatsappNumber = "Enter a phone number with 5 to 20 digits.";
    }
    if (!form.productName.trim()) {
      errors.productName = "Enter the product or product category.";
    } else if (form.productName.trim().length > 150) {
      errors.productName = "Product name cannot exceed 150 characters.";
    }

    const maxLengths = {
      companyName: 150,
      originCountry: 100,
      destinationCountry: 100,
      requestedQuantity: 100,
      targetTimeline: 100,
      destinationPort: 150,
      requirements: 3000,
    };
    for (const [field, maxLength] of Object.entries(maxLengths)) {
      if (form[field].length > maxLength) {
        errors[field] = `This field cannot exceed ${maxLength} characters.`;
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors);
  }

  function inputClassFor(field) {
    return `${inputClass} ${
      fieldErrors[field]
        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
        : ""
    }`;
  }

  function fieldError(field) {
    return fieldErrors[field] ? (
      <span className="text-sm font-normal text-red-600" role="alert">
        {fieldErrors[field]}
      </span>
    ) : null;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const invalidFields = validateForm();
    if (invalidFields.length > 0) {
      formRef.current
        ?.querySelector(`[name="${invalidFields[0]}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (!token) {
      navigate("/login", {
        state: {
          from: {
            pathname: location.pathname,
            state: { draft: form },
          },
          message: "Please log in to send your enquiry.",
        },
      });
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (response.status === 401) {
        navigate("/login", {
          state: {
            from: {
              pathname: location.pathname,
              state: { draft: form },
            },
            message: "Please log in again to send your enquiry.",
          },
        });
        return;
      }

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          "The server returned an invalid response. Please check the backend API URL."
        );
      }

      if (!response.ok || data.success === false) {
        throw new Error(data.message || "Unable to submit your enquiry.");
      }

      setSubmittedAs(form.enquiryType);
      setSubmitted(true);
      setForm(initialForm);
      setFieldErrors({});
      notify("Your enquiry was sent successfully.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (submitError) {
      setError(
        submitError.message ||
          "We could not send your enquiry. Please try again or email our team."
      );
    } finally {
      setLoading(false);
    }
  }

  const isBuyer = form.enquiryType === "Buyer";

  return (
    <main className="min-h-screen bg-[#F7F5EF] text-[#252b27]">
      <header className="bg-[#183F35] px-4 pb-14 pt-28 text-white sm:px-6 sm:pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition hover:text-[#e5ae83]"
            >
              <ArrowRight className="rotate-180" size={16} />
              Back to ExportYard
            </Link>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e5ae83]">
              ExportYard · India trade connections
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Let’s start a <span className="text-[#e5ae83]">trade conversation.</span>
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">
              Whether you are looking to source products or supply them, tell us
              what you need. Our team will review your details and get back to you.
            </p>
          </div>
        </div>
      </header>

      <div className="px-4 pb-20 pt-10 sm:px-6">
        <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[minmax(0,1fr)_19rem]">
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_-40px_rgba(10,22,40,.35)] sm:p-8">
            {submitted ? (
              <div className="py-10 text-center" role="status" aria-live="polite">
                <CheckCircle2 className="mx-auto text-[#854a31]" size={52} />
                <h2 className="mt-5 text-2xl font-bold text-[#183F35]">
                  Thanks — we’ve received your enquiry.
                </h2>
                <p className="mx-auto mt-3 max-w-lg leading-7 text-slate-600">
                  Our team will review your {submittedAs === "Buyer" ? "sourcing" : "supplier"}{" "}
                  requirements and contact you using the details provided.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-7 rounded-md bg-[#183F35] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#102b24]"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-8"
              >
                <fieldset>
                  <legend className="text-lg font-bold text-[#183F35]">
                    How can we help?
                  </legend>
                  <p className="mt-1 text-sm text-slate-500">
                    Choose the option that best describes your enquiry.
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {[
                      ["Buyer", "I want to source products"],
                      ["Supplier", "I have products to supply"],
                    ].map(([value, description]) => (
                      <label
                        key={value}
                        className={`flex cursor-pointer gap-3 rounded-2xl border p-4 transition ${
                          form.enquiryType === value
                            ? "border-[#C47A45] bg-[#C47A45]/5 ring-2 ring-[#C47A45]/15"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="enquiryType"
                          value={value}
                          checked={form.enquiryType === value}
                          onChange={handleChange}
                          className="mt-1 accent-[#C47A45]"
                        />
                        <span>
                          <span className="block font-semibold text-[#183F35]">
                            {value}
                          </span>
                          <span className="mt-1 block text-sm text-slate-500">
                            {description}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="border-t border-slate-100 pt-7">
                  <h2 className="text-lg font-bold text-[#183F35]">
                    Your contact details
                  </h2>
                  <div className="mt-4 grid gap-5 sm:grid-cols-2">
                    <label className={labelClass}>
                      Full name *
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        autoComplete="name"
                        placeholder="Your full name"
                        required
                        minLength={2}
                        maxLength={100}
                        aria-invalid={Boolean(fieldErrors.name)}
                        aria-describedby={fieldErrors.name ? "enquiry-name-error" : undefined}
                        className={inputClassFor("name")}
                      />
                      {fieldErrors.name && (
                        <span id="enquiry-name-error">{fieldError("name")}</span>
                      )}
                    </label>
                    <label className={labelClass}>
                      Company
                      <input
                        name="companyName"
                        value={form.companyName}
                        onChange={handleChange}
                        autoComplete="organization"
                        placeholder="Company or organisation"
                        maxLength={150}
                        aria-invalid={Boolean(fieldErrors.companyName)}
                        className={inputClassFor("companyName")}
                      />
                      {fieldError("companyName")}
                    </label>
                    <label className={labelClass}>
                      Business email *
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                        placeholder="you@company.com"
                        required
                        maxLength={254}
                        aria-invalid={Boolean(fieldErrors.email)}
                        aria-describedby={fieldErrors.email ? "enquiry-email-error" : undefined}
                        className={inputClassFor("email")}
                      />
                      {fieldErrors.email && (
                        <span id="enquiry-email-error">{fieldError("email")}</span>
                      )}
                    </label>
                    <div className={labelClass}>
                      <label htmlFor="whatsappNumber">Phone / WhatsApp *</label>
                      <div className="grid grid-cols-[minmax(0,11rem)_1fr] gap-2">
                        <select
                          aria-label="Country calling code"
                          name="whatsappCountry"
                          value={form.whatsappCountry}
                          onChange={handleChange}
                          required
                          aria-invalid={Boolean(fieldErrors.whatsappCountry)}
                          aria-describedby={
                            fieldErrors.whatsappCountry
                              ? "enquiry-country-error"
                              : undefined
                          }
                          className={inputClassFor("whatsappCountry")}
                        >
                          {countryCallingCodes.map(([country, callingCode]) => (
                            <option
                              key={`${country}-${callingCode}`}
                              value={country}
                            >
                              {country} ({callingCode})
                            </option>
                          ))}
                        </select>
                        <input
                          id="whatsappNumber"
                          type="tel"
                          name="whatsappNumber"
                          value={form.whatsappNumber}
                          onChange={handleChange}
                          autoComplete="tel-national"
                          placeholder="Phone number"
                          required
                          maxLength={20}
                          aria-invalid={Boolean(fieldErrors.whatsappNumber)}
                          aria-describedby={
                            fieldErrors.whatsappNumber ? "enquiry-phone-error" : undefined
                          }
                          className={inputClassFor("whatsappNumber")}
                        />
                      </div>
                      {fieldErrors.whatsappCountry && (
                        <span id="enquiry-country-error">
                          {fieldError("whatsappCountry")}
                        </span>
                      )}
                      {fieldErrors.whatsappNumber && (
                        <span id="enquiry-phone-error">
                          {fieldError("whatsappNumber")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-7">
                  <h2 className="text-lg font-bold text-[#183F35]">
                    {isBuyer ? "What are you looking to source?" : "What can you supply?"}
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Share as much detail as you have. You can leave unknown
                    shipping details blank.
                  </p>
                  <div className="mt-4 grid gap-5 sm:grid-cols-2">
                    <label className={`${labelClass} sm:col-span-2`}>
                      Product or product category *
                      <input
                        name="productName"
                        value={form.productName}
                        onChange={handleChange}
                        placeholder="For example, the product or category you need"
                        required
                        maxLength={150}
                        aria-invalid={Boolean(fieldErrors.productName)}
                        aria-describedby={
                          fieldErrors.productName ? "enquiry-product-error" : undefined
                        }
                        className={inputClassFor("productName")}
                      />
                      {fieldErrors.productName && (
                        <span id="enquiry-product-error">
                          {fieldError("productName")}
                        </span>
                      )}
                    </label>
                    <label className={labelClass}>
                      {isBuyer ? "Sourcing country" : "Supply origin"}
                      <input
                        name="originCountry"
                        value={form.originCountry}
                        onChange={handleChange}
                        placeholder="Country"
                        maxLength={100}
                        aria-invalid={Boolean(fieldErrors.originCountry)}
                        className={inputClassFor("originCountry")}
                      />
                      {fieldError("originCountry")}
                    </label>
                    <label className={labelClass}>
                      {isBuyer ? "Delivery country" : "Markets you can serve"}
                      <input
                        name="destinationCountry"
                        value={form.destinationCountry}
                        onChange={handleChange}
                        placeholder="Country or market"
                        maxLength={100}
                        aria-invalid={Boolean(fieldErrors.destinationCountry)}
                        className={inputClassFor("destinationCountry")}
                      />
                      {fieldError("destinationCountry")}
                    </label>
                    <label className={labelClass}>
                      Quantity and unit
                      <input
                        name="requestedQuantity"
                        value={form.requestedQuantity}
                        onChange={handleChange}
                        placeholder="For example, 2 containers or 500 units"
                        maxLength={100}
                        aria-invalid={Boolean(fieldErrors.requestedQuantity)}
                        className={inputClassFor("requestedQuantity")}
                      />
                      {fieldError("requestedQuantity")}
                    </label>
                    <label className={labelClass}>
                      Target timeline
                      <input
                        name="targetTimeline"
                        value={form.targetTimeline}
                        onChange={handleChange}
                        placeholder="When do you need this?"
                        maxLength={100}
                        aria-invalid={Boolean(fieldErrors.targetTimeline)}
                        className={inputClassFor("targetTimeline")}
                      />
                      {fieldError("targetTimeline")}
                    </label>
                    <label className={`${labelClass} sm:col-span-2`}>
                      Port or delivery details
                      <input
                        name="destinationPort"
                        value={form.destinationPort}
                        onChange={handleChange}
                        placeholder="Port, city or preferred shipping terms"
                        maxLength={150}
                        aria-invalid={Boolean(fieldErrors.destinationPort)}
                        className={inputClassFor("destinationPort")}
                      />
                      {fieldError("destinationPort")}
                    </label>
                    <label className={`${labelClass} sm:col-span-2`}>
                      Requirements and message
                      <textarea
                        name="requirements"
                        value={form.requirements}
                        onChange={handleChange}
                        placeholder="Specifications, packaging, certifications, target price, documents, or anything else we should know..."
                        rows={5}
                        maxLength={3000}
                        aria-invalid={Boolean(fieldErrors.requirements)}
                        className={`${inputClassFor("requirements")} resize-y`}
                      />
                      {fieldError("requirements")}
                      <span className="text-right text-xs font-normal text-slate-400">
                        {form.requirements.length}/3000
                      </span>
                    </label>
                  </div>
                </div>

                <label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
                  <input
                    type="checkbox"
                    name="whatsappConsent"
                    checked={form.whatsappConsent}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 accent-[#C47A45]"
                  />
                  <span>
                    I agree to be contacted on WhatsApp about this enquiry.
                  </span>
                </label>

                {error && (
                  <p
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    role="alert"
                  >
                    {error}
                  </p>
                )}

                <div className="flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs leading-5 text-slate-500">
                    {token
                      ? "Your account will be linked to this enquiry. Your details are used only to respond."
                      : "Log in is required to send this enquiry. Your form will be saved while you sign in."}
                  </p>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-[#183F35] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#102b24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C47A45] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Send size={16} />
                    {loading
                      ? "Sending..."
                      : token
                        ? "Send enquiry"
                        : "Log in to send"}
                  </button>
                </div>
              </form>
            )}
          </section>

          <aside className="space-y-4 lg:sticky lg:top-28">
            <div className="rounded-lg bg-[#183F35] p-6 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e5ae83]">
                One enquiry, one team
              </p>
              <h2 className="mt-3 text-xl font-bold">
                Sourcing or supplying, start here.
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/70">
                Share your product, trade direction and requirements. We’ll
                review the details and follow up with the next steps.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <h2 className="font-bold text-[#183F35]">A useful enquiry includes</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <li>Product name or category</li>
                <li>Approximate quantity and timeline</li>
                <li>Origin, destination or target market</li>
                <li>Specifications and certifications</li>
              </ul>
              <Link
                to="/privacy-policy"
                className="mt-5 inline-block text-sm font-semibold text-[#854a31] underline-offset-4 hover:underline"
              >
                Read our privacy policy
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
