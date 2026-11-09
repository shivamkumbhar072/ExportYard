import { useCallback, useEffect, useRef, useState } from "react";
import {
  Search,
  RefreshCw,
  MessageCircle,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  Trash2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNotification } from "../context/useNotification.js";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const STATUSES = [
  "New",
  "Contacted",
  "Quoted",
  "Negotiating",
  "Converted",
  "Closed",
];

const STATUS_STYLES = {
  new: "bg-[#C47A45]/15 text-[#653b2b] border-[#C47A45]/40",
  contacted: "bg-sky-100 text-sky-800 border-sky-200",
  quoted: "bg-amber-100 text-amber-800 border-amber-200",
  negotiating: "bg-orange-100 text-orange-800 border-orange-200",
  converted: "bg-emerald-100 text-emerald-800 border-emerald-200",
  closed: "bg-slate-200 text-slate-700 border-slate-300",
};

const pillButton =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold tracking-[0.08em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40";

const peachButton = `${pillButton} bg-[#C47A45] text-[#1a211d] hover:-translate-y-px hover:bg-[#d99b6b] focus-visible:outline-[#183F35] disabled:hover:translate-y-0`;

const outlineButton = `${pillButton} border border-[#183F35]/25 text-[#183F35] hover:border-[#183F35] hover:bg-[#183F35]/5 focus-visible:outline-[#C47A45] disabled:hover:bg-transparent`;

const iconButton =
  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#183F35]/20 text-[#183F35] transition hover:border-[#183F35] hover:bg-[#183F35]/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C47A45]";

function formatDate(date, withTime = false) {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "—";

  return parsed.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  });
}

function getWhatsAppUrl(enquiry) {
  const countryCode = String(enquiry.whatsappCountryCode || "").replace(/\D/g, "");
  const number = String(enquiry.whatsappNumber || "").replace(/\D/g, "");
  const fullNumber = `${countryCode}${number}`;

  if (!fullNumber) return null;

  const message = `Hello ${enquiry.name}, thank you for your ${String(enquiry.enquiryType || "trade").toLowerCase()} enquiry to ExportYard about ${enquiry.productName || "your trade requirements"}. We would be happy to discuss the next steps.`;

  return `https://wa.me/${fullNumber}?text=${encodeURIComponent(message)}`;
}

export default function AdminEnquiries() {
  const { token } = useAuth();
  const notify = useNotification();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    limit: 10,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [updatingId, setUpdatingId] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deletingId, setDeletingId] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const deleteCancelRef = useRef(null);

  const loadEnquiries = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "10",
      });

      if (search.trim()) params.set("search", search.trim());
      if (statusFilter) params.set("status", statusFilter);

      const response = await fetch(
        `${API_URL}/api/enquiries?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to load enquiries");
      }

      setItems(data.enquiries || []);
      setPagination(
        data.pagination || {
          total: 0,
          totalPages: 0,
          limit: 10,
        }
      );
    } catch (err) {
      setError(err.message || "Unable to connect to the backend.");
    } finally {
      setLoading(false);
    }
  }, [token, page, search, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(loadEnquiries, 300);
    return () => clearTimeout(timer);
  }, [loadEnquiries]);

  // detail dialog: Escape closes it and page scroll is locked
  useEffect(() => {
    if (!selected) return;

    const onKey = (e) => {
      if (e.key === "Escape") setSelected(null);
    };

    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selected]);

  useEffect(() => {
    if (!deleteTarget) return;

    const onKey = (event) => {
      if (event.key === "Escape" && !deletingId) setDeleteTarget(null);
    };

    window.addEventListener("keydown", onKey);
    deleteCancelRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [deleteTarget, deletingId]);

  async function updateStatus(enquiryId, status) {
    setUpdatingId(enquiryId);
    setError("");

    try {
      const response = await fetch(
        `${API_URL}/api/enquiries/${enquiryId}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update status");
      }

      setItems((current) =>
        current.map((item) =>
          item._id === enquiryId ? data.enquiry : item
        )
      );

      setSelected((current) =>
        current?._id === enquiryId ? data.enquiry : current
      );
      notify("Enquiry status updated.");
    } catch (err) {
      setError(err.message || "Unable to update enquiry.");
    } finally {
      setUpdatingId("");
    }
  }

  async function deleteEnquiry() {
    if (!deleteTarget || deletingId) return;

    const enquiryId = deleteTarget._id;
    setDeletingId(enquiryId);
    setDeleteError("");

    try {
      const response = await fetch(`${API_URL}/api/enquiries/${enquiryId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete enquiry.");
      }

      setItems((current) => current.filter((item) => item._id !== enquiryId));
      setPagination((current) => ({
        ...current,
        total: Math.max(0, current.total - 1),
        totalPages: Math.ceil(Math.max(0, current.total - 1) / current.limit),
      }));
      setSelected((current) => (current?._id === enquiryId ? null : current));
      setDeleteTarget(null);
      if (items.length === 1 && page > 1) {
        setPage((current) => current - 1);
      }
      notify("Enquiry deleted successfully.");
    } catch (err) {
      setDeleteError(err.message || "Unable to delete enquiry.");
    } finally {
      setDeletingId("");
    }
  }

  function openWhatsApp(enquiry) {
    const url = getWhatsAppUrl(enquiry);

    if (!url) {
      setError("This enquiry has no valid WhatsApp number.");
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  }

  const totalPages = pagination.totalPages || 0;

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#854a31]">
            Sales workspace
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-[#183F35]">
            Trade enquiries
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Review and manage sourcing enquiries from buyers and offers from suppliers.
          </p>
        </div>

        <button
          type="button"
          onClick={loadEnquiries}
          disabled={loading}
          className={`${peachButton} self-start sm:self-auto`}
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          REFRESH
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder="Search contact, company, product or country..."
            aria-label="Search enquiries"
            className="w-full rounded-full border border-[#183F35]/20 bg-white py-2.5 pl-11 pr-4 text-sm text-[#252b27] outline-none transition placeholder:text-slate-400 focus:border-[#C47A45] focus:ring-2 focus:ring-[#C47A45]/25"
          />
        </label>

        <select
          value={statusFilter}
          onChange={(event) => {
            setStatusFilter(event.target.value);
            setPage(1);
          }}
          aria-label="Filter by status"
          className="rounded-full border border-[#183F35]/20 bg-white px-5 py-2.5 text-sm text-[#252b27] outline-none transition focus:border-[#C47A45] focus:ring-2 focus:ring-[#C47A45]/25 sm:w-48"
        >
          <option value="">All statuses</option>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
        >
          <AlertCircle size={19} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Table panel */}
      <section className="overflow-hidden rounded-2xl border border-[#183F35]/10 bg-white shadow-sm">
        <div className="border-b border-[#C47A45]/20 px-6 py-5">
          <h2 className="font-semibold text-[#183F35]">All enquiries</h2>
          <p className="mt-1 text-sm text-slate-600">
            {loading ? "Loading enquiries..." : `${pagination.total} enquiries found`}
          </p>
        </div>

        {loading ? (
          <div className="px-6 py-14 text-center text-sm text-slate-500">
            Loading enquiries...
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center gap-1 px-6 py-14 text-center">
            <MessageCircle size={28} className="mb-2 text-[#C47A45]/70" />
            <strong className="font-medium text-[#183F35]">
              No matching enquiries
            </strong>
            <span className="text-sm text-slate-500">
              Try another search or status filter.
            </span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#183F35] text-xs uppercase tracking-wide text-white/80">
                <tr>
                  <th className="px-6 py-4 font-semibold">Submitted by</th>
                  <th className="px-6 py-4 font-semibold">Contact</th>
                  <th className="px-6 py-4 font-semibold">Type</th>
                  <th className="px-6 py-4 font-semibold">Product / requirement</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Received</th>
                  <th className="px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {items.map((item) => (
                  <tr
                    key={item._id}
                    className="transition hover:bg-[#C47A45]/5"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      <strong className="block font-medium text-[#183F35]">
                        {item.submittedBy?.name || "No linked account"}
                      </strong>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        {item.submittedBy?.email ||
                          "Legacy enquiry or account unavailable"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <strong className="block font-medium text-[#183F35]">
                        {item.name}
                      </strong>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        {item.companyName || item.email}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                      {item.enquiryType || "Buyer"}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      <strong className="block font-medium text-[#183F35]">
                        {item.productName || item.bottleSize || "Product enquiry"}
                      </strong>
                      <span className="mt-0.5 block text-xs text-slate-500">
                        {item.requestedQuantity ||
                          (item.quantity
                            ? `${Number(item.quantity).toLocaleString()} ${item.quantityUnit || ""}`.trim()
                            : "Quantity not specified")}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <select
                        value={item.status}
                        disabled={updatingId === item._id}
                        onChange={(event) =>
                          updateStatus(item._id, event.target.value)
                        }
                        aria-label={`Update status for ${item.name}`}
                        className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold outline-none transition focus-visible:ring-2 focus-visible:ring-[#C47A45]/40 disabled:cursor-wait disabled:opacity-60 ${
                          STATUS_STYLES[item.status?.toLowerCase()] ||
                          STATUS_STYLES.closed
                        }`}
                      >
                        {STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="whitespace-nowrap px-6 py-4 text-slate-500">
                      {formatDate(item.createdAt)}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className={iconButton}
                          onClick={() => setSelected(item)}
                          aria-label={`View enquiry from ${item.name}`}
                          title="View details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          type="button"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-emerald-300 text-emerald-700 transition hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500"
                          onClick={() => openWhatsApp(item)}
                          aria-label={`Contact ${item.name} on WhatsApp`}
                          title="WhatsApp buyer"
                        >
                          <MessageCircle size={16} />
                        </button>
                        <button
                          type="button"
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-red-200 text-red-700 transition hover:bg-red-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                          onClick={() => {
                            setDeleteError("");
                            setDeleteTarget(item);
                          }}
                          aria-label={`Delete enquiry from ${item.name}`}
                          title="Delete enquiry"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex flex-col gap-3 border-t border-[#C47A45]/20 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-sm text-slate-600">
            Page {page} of {Math.max(1, totalPages)}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className={outlineButton}
              disabled={page <= 1 || loading}
              onClick={() => setPage((current) => current - 1)}
            >
              <ChevronLeft size={15} />
              PREVIOUS
            </button>
            <button
              type="button"
              className={outlineButton}
              disabled={loading || page >= totalPages}
              onClick={() => setPage((current) => current + 1)}
            >
              NEXT
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* Detail dialog */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#102b24]/70 p-4 backdrop-blur-sm"
          onMouseDown={() => setSelected(null)}
        >
          <section
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#C47A45]/25 bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-detail-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="flex items-start justify-between gap-4 bg-[#183F35] px-6 py-5 text-white">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#e5ae83]">
                  Enquiry details
                </p>
                <h2 id="enquiry-detail-title" className="text-xl font-bold">
                  {selected.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close details"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-white/70 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e5ae83]"
              >
                <X size={18} />
              </button>
            </header>

            <div className="space-y-6 p-6">
              <dl className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
                {[
                  [
                    "Submitted by (account)",
                    selected.submittedBy
                      ? `${selected.submittedBy.name} (${selected.submittedBy.email})`
                      : "No linked account",
                  ],
                  ["Email", selected.email],
                  ["Enquiry type", selected.enquiryType || "Buyer"],
                  ["Company", selected.companyName || "Not provided"],
                  [
                    "WhatsApp",
                    `${selected.whatsappCountryCode || ""} ${selected.whatsappNumber || ""}`.trim() ||
                      "Not provided",
                  ],
                  ["Product", selected.productName || selected.bottleSize || "Not provided"],
                  ["Origin / supply", selected.originCountry || "Not provided"],
                  ["Destination / market", selected.destinationCountry || "Not provided"],
                  [
                    "Quantity",
                    selected.requestedQuantity ||
                      (selected.quantity
                        ? `${Number(selected.quantity).toLocaleString()} ${selected.quantityUnit || ""}`.trim()
                        : "Not provided"),
                  ],
                  ["Target timeline", selected.targetTimeline || "Not provided"],
                  ["Port / delivery", selected.destinationPort || "Not provided"],
                  ["Received", formatDate(selected.createdAt, true)],
                  ["Status", selected.status],
                ].map(([label, value]) => (
                  <div key={label} className="min-w-0">
                    <dt className="text-xs font-medium text-slate-500">
                      {label}
                    </dt>
                    <dd className="mt-1 break-words text-sm font-semibold text-[#183F35]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="rounded-xl border border-[#183F35]/10 bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-500">
                  Requirements and message
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700">
                  {selected.requirements ||
                    selected.additionalRequirements ||
                    "No additional requirements provided."}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  className={`${outlineButton} border-red-200 text-red-700 hover:bg-red-50`}
                  onClick={() => {
                    setDeleteError("");
                    setDeleteTarget(selected);
                  }}
                >
                  <Trash2 size={15} />
                  DELETE ENQUIRY
                </button>
                <button
                  type="button"
                  className={outlineButton}
                  onClick={() => setSelected(null)}
                >
                  CLOSE
                </button>
                <button
                  type="button"
                  className={peachButton}
                  onClick={() => openWhatsApp(selected)}
                >
                  <MessageCircle size={16} />
                  CONTACT ON WHATSAPP
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {deleteTarget && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[#102b24]/70 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !deletingId) {
              setDeleteTarget(null);
            }
          }}
        >
          <section
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-enquiry-title"
            aria-describedby="delete-enquiry-description"
          >
            <h2 id="delete-enquiry-title" className="text-xl font-bold text-[#183F35]">
              Delete this enquiry?
            </h2>
            <p id="delete-enquiry-description" className="mt-3 text-sm leading-6 text-slate-600">
              This permanently deletes the enquiry from {deleteTarget.name}. This action cannot be undone.
            </p>
            {deleteError && (
              <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {deleteError}
              </p>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                ref={deleteCancelRef}
                className={outlineButton}
                disabled={Boolean(deletingId)}
                onClick={() => setDeleteTarget(null)}
              >
                CANCEL
              </button>
              <button
                type="button"
                className={`${pillButton} bg-red-700 text-white hover:bg-red-800`}
                disabled={Boolean(deletingId)}
                onClick={deleteEnquiry}
              >
                <Trash2 size={15} />
                {deletingId === deleteTarget._id ? "DELETING..." : "DELETE"}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}