import React, { useState, useEffect, useCallback, useRef } from "react";
import roleUpgradeRequestService from "../../api/services/roleUpgradeRequestService"; // adjust path to match your project structure

/**
 * ============================================================================
 *  Author Upgrade Requests — Admin Dashboard (MindSpan)
 * ============================================================================
 *  Drop this single file into your project. It uses your existing
 *  roleUpgradeRequestService (axios-based) for all API calls, so base URL,
 *  auth headers, and error shapes stay consistent with the rest of your app.
 *  No external icon/toast/animation libraries required — only Tailwind CSS.
 *
 *  ---- THINGS YOU WILL LIKELY WANT TO EDIT ----
 *  1. The import path above -> point it at wherever roleUpgradeRequestService
 *                          actually lives in your project.
 *  2. <AuthorUpgradeRequests /> -> import and render wherever your admin
 *                          routes live, e.g. <Route path="/admin" .../>
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// 2. Tiny inline icon set (no dependency on lucide-react etc.)
// ---------------------------------------------------------------------------
const Icon = {
  Refresh: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <path d="M21 3v6h-6" />
    </svg>
  ),
  Search: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  Calendar: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  Check: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  X: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  ),
  Spinner: (p) => (
    <svg viewBox="0 0 24 24" fill="none" className="animate-spin" {...p}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" strokeOpacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  Seal: (p) => (
    <svg viewBox="0 0 24 24" fill="none" {...p}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2.6 2.6" />
      <circle cx="12" cy="12" r="4" fill="currentColor" />
    </svg>
  ),
  Inbox: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z" />
    </svg>
  ),
  ChevronDown: (p) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  ),
};

// ---------------------------------------------------------------------------
// 3. Toast system (self-contained — no react-hot-toast / sonner needed)
// ---------------------------------------------------------------------------
function useToasts() {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const push = useCallback(
    (message, type = "info", detail) => {
      const id = ++idRef.current;
      setToasts((t) => [...t, { id, message, type, detail }]);
      setTimeout(() => dismiss(id), 4500);
      return id;
    },
    [dismiss]
  );

  return { toasts, push, dismiss };
}

function ToastStack({ toasts, dismiss }) {
  const styles = {
    success: "border-emerald-500/60 text-emerald-700 dark:text-emerald-400",
    error: "border-rose-500/60 text-rose-700 dark:text-rose-400",
    info: "border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300",
  };
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-[min(360px,90vw)]">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast-enter flex items-start gap-3 rounded-xl border-l-4 bg-white dark:bg-[#161a22]
            shadow-lg shadow-black/5 dark:shadow-black/30 px-4 py-3 ${styles[t.type] || styles.info}`}
        >
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{t.message}</p>
            {t.detail && (
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 break-words">{t.detail}</p>
            )}
          </div>
          <button
            onClick={() => dismiss(t.id)}
            className="shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            aria-label="Dismiss"
          >
            <Icon.X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(16px) scale(0.98); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        .toast-enter { animation: toastIn 0.25s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 4. Helpers
// ---------------------------------------------------------------------------
function initials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("") || "?";
}

// Deterministic gradient per user so avatars stay stable across re-renders
const GRADIENTS = [
  "from-amber-400 to-orange-500",
  "from-indigo-400 to-violet-500",
  "from-teal-400 to-emerald-500",
  "from-rose-400 to-pink-500",
  "from-sky-400 to-blue-500",
];
function gradientFor(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  return GRADIENTS[hash % GRADIENTS.length];
}

function formatDate(iso) {
  try {
    const d = new Date(iso);
    const date = d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const time = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
    return { date, time };
  } catch {
    return { date: "—", time: "" };
  }
}

// ---------------------------------------------------------------------------
// 5. Skeleton card (loading state)
// ---------------------------------------------------------------------------
function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#12151c] p-6 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-700 shrink-0" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-4 w-40 rounded bg-slate-200 dark:bg-slate-700" />
          <div className="h-3 w-56 rounded bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
      </div>
      <div className="mt-5 h-16 rounded-xl bg-slate-100 dark:bg-slate-800/60" />
      <div className="mt-5 flex justify-end gap-3">
        <div className="h-10 w-28 rounded-xl bg-slate-200 dark:bg-slate-700" />
        <div className="h-10 w-28 rounded-xl bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 6. Empty state
// ---------------------------------------------------------------------------
function EmptyState({ onRefresh }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-6 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
      <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center mb-5">
        <Icon.Check className="w-8 h-8 text-emerald-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">All caught up!</h3>
      <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400 max-w-sm">
        There are currently no pending author upgrade requests.
      </p>
      <button
        onClick={onRefresh}
        className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700
          px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200
          hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        <Icon.Refresh className="w-4 h-4" />
        Refresh
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 7. Request card
// ---------------------------------------------------------------------------
function RequestCard({ request, onApprove, onReject, isRemoving }) {
  const [busy, setBusy] = useState(null); // "approve" | "reject" | null
  const { date, time } = formatDate(request.requestedAt);
  const grad = gradientFor(request.email || request.username || String(request.id));

  const handle = async (action, fn) => {
    setBusy(action);
    await fn(request);
    // busy stays true until parent removes the card (fade-out handles the rest)
  };

  return (
    <div
      className={`group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#12151c]
        shadow-sm hover:shadow-lg hover:shadow-slate-200/60 dark:hover:shadow-black/30
        hover:-translate-y-0.5 transition-all duration-300 ease-out p-6 relative overflow-hidden
        ${isRemoving ? "card-exit" : "card-enter"}`}
    >
      {/* Status badge */}
      <div className="absolute top-5 right-6 flex items-center gap-1.5 rounded-full bg-amber-50 dark:bg-amber-400/10
        border border-amber-200 dark:border-amber-400/30 px-3 py-1">
        <Icon.Seal className="w-3 h-3 text-amber-500" />
        <span className="text-xs font-semibold tracking-wide text-amber-700 dark:text-amber-400">Pending</span>
      </div>

      <div className="flex items-start gap-4 pr-24">
        {/* Avatar */}
        {request.avatarUrl ? (
          <img
            src={request.avatarUrl}
            alt={request.username}
            className="w-14 h-14 rounded-full object-cover shrink-0 ring-2 ring-white dark:ring-slate-800"
          />
        ) : (
          <div
            className={`w-14 h-14 rounded-full shrink-0 bg-gradient-to-br ${grad}
              flex items-center justify-center text-white font-semibold text-lg ring-2 ring-white dark:ring-slate-800`}
          >
            {initials(request.username)}
          </div>
        )}

        {/* Name / email */}
        <div className="min-w-0 pt-0.5">
          <p className="font-semibold text-slate-900 dark:text-slate-100 truncate">{request.username}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 truncate">{request.email}</p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
            <Icon.Calendar className="w-3.5 h-3.5" />
            <span>Requested {date} · {time}</span>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="mt-5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/30 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-1.5">
          Message
        </p>
        {request.message ? (
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{request.message}</p>
        ) : (
          <p className="text-sm italic text-slate-400 dark:text-slate-500">No message provided.</p>
        )}
      </div>

      {/* Actions */}
      <div className="mt-5 flex flex-col sm:flex-row justify-end gap-3">
        <button
          onClick={() => handle("reject", onReject)}
          disabled={busy !== null}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold
            bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20
            active:scale-[0.97] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
        >
          {busy === "reject" ? (
            <>
              <Icon.Spinner className="w-4 h-4" /> Rejecting...
            </>
          ) : (
            <>
              <Icon.X className="w-4 h-4" /> Reject
            </>
          )}
        </button>
        <button
          onClick={() => handle("approve", onApprove)}
          disabled={busy !== null}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold
            bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-600/20
            active:scale-[0.97] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
        >
          {busy === "approve" ? (
            <>
              <Icon.Spinner className="w-4 h-4" /> Approving...
            </>
          ) : (
            <>
              <Icon.Check className="w-4 h-4" /> Approve
            </>
          )}
        </button>
      </div>

      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardOut {
          from { opacity: 1; transform: scale(1); max-height: 500px; margin-bottom: 1.25rem; }
          to   { opacity: 0; transform: scale(0.96); max-height: 0; margin-bottom: 0; padding-top:0; padding-bottom:0; }
        }
        .card-enter { animation: cardIn 0.35s ease-out; }
        .card-exit  { animation: cardOut 0.35s ease-in forwards; overflow: hidden; }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 8. Stat card
// ---------------------------------------------------------------------------
function StatCard({ label, value, sublabel }) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#12151c] px-6 py-5 min-w-[200px]">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-50 tabular-nums">{value}</p>
      <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{sublabel}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 9. Main component
// ---------------------------------------------------------------------------
export default function AdminDashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [removingIds, setRemovingIds] = useState(new Set());
  const { toasts, push, dismiss } = useToasts();

  const fetchRequests = useCallback(
    async ({ silent } = {}) => {
      silent ? setRefreshing(true) : setLoading(true);
      try {
        const res = await roleUpgradeRequestService.getPending();
        const data = res.data;
        const content = Array.isArray(data) ? data : data.content || [];
        setRequests(content.filter((r) => r.status === "PENDING"));
      } catch (err) {
        push("Couldn't load requests.", "error", err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [push]
  );

  useEffect(() => {
    fetchRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeCard = (id) => {
    setRemovingIds((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setRequests((prev) => prev.filter((r) => r.id !== id));
      setRemovingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 350); // matches the .card-exit animation duration
  };

  const handleApprove = async (request) => {
    try {
      await roleUpgradeRequestService.approve(request.id);
      push("Author request approved.", "success");
      removeCard(request.id);
    } catch (err) {
      push("Approval failed.", "error", err.response?.data?.message || err.message);
    }
  };

  const handleReject = async (request) => {
    try {
      await roleUpgradeRequestService.reject(request.id);
      push("Request rejected.", "success");
      removeCard(request.id);
    } catch (err) {
      push("Rejection failed.", "error", err.response?.data?.message || err.message);
    }
  };

  const visible = requests
    .filter((r) => {
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return r.username?.toLowerCase().includes(q) || r.email?.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      const da = new Date(a.requestedAt).getTime();
      const db = new Date(b.requestedAt).getTime();
      return sort === "newest" ? db - da : da - db;
    });

  return (
    <div className="min-h-screen bg-[#F8F8F6] dark:bg-[#0B0E14] transition-colors duration-300">
      <ToastStack toasts={toasts} dismiss={dismiss} />

      <div className="max-w-[960px] mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
              Author Upgrade Requests
            </h1>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
              Review and manage requests submitted by users who wish to become authors.
            </p>
          </div>
          <button
            onClick={() => fetchRequests({ silent: true })}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700
              bg-white dark:bg-[#12151c] px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200
              hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-[0.97] transition-all duration-150 shrink-0
              disabled:opacity-60"
          >
            <Icon.Refresh className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Stats */}
        <div className="mt-8 flex flex-wrap gap-4">
          <StatCard label="Pending Requests" value={requests.length} sublabel="Awaiting review" />
        </div>

        {/* Search + sort */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Icon.Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by username or email..."
              className="w-full rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#12151c]
                pl-11 pr-4 py-3 text-sm text-slate-800 dark:text-slate-100 placeholder:text-slate-400
                focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-all duration-200"
            />
          </div>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#12151c]
                pl-4 pr-10 py-3 text-sm text-slate-700 dark:text-slate-200 cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition-all duration-200"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <Icon.ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Cards */}
        <div className="mt-8 space-y-5">
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : visible.length === 0 ? (
            requests.length === 0 ? (
              <EmptyState onRefresh={() => fetchRequests({ silent: true })} />
            ) : (
              <div className="flex flex-col items-center py-16 text-center">
                <Icon.Inbox className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-3" />
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  No requests match "{search}".
                </p>
              </div>
            )
          ) : (
            visible.map((r) => (
              <RequestCard
                key={r.id}
                request={r}
                onApprove={handleApprove}
                onReject={handleReject}
                isRemoving={removingIds.has(r.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}