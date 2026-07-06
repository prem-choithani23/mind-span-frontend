import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((type, message, ttl = 3200) => {
        const id = Date.now() + Math.random().toString(36).slice(2, 9);
        const t = { id, type, message };
        setToasts((s) => [t, ...s]);
        if (ttl > 0) setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), ttl);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((s) => s.filter((t) => t.id !== id));
    }, []);

    const value = useMemo(() => ({ showToast }), [showToast]);

    return (
        <ToastContext.Provider value={value}>
            {children}
            <div className="fixed right-5 top-20 z-[2000] flex flex-col gap-3">
                {toasts.map((toast) => (
                    <div key={toast.id} className={`min-w-[240px] rounded-xl border px-4 py-3 shadow-lg ${toast.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"}`}>
                        <div className="flex items-start justify-between gap-4">
                            <p className="text-sm font-semibold">{toast.message}</p>
                            <button onClick={() => removeToast(toast.id)} className="text-lg leading-none opacity-70 hover:opacity-100">x</button>
                        </div>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error("useToast must be used within ToastProvider");
    return ctx.showToast;
};

export default ToastProvider;
