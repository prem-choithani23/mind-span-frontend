import { useCallback, useEffect, useState } from "react";
import roleUpgradeRequestService from "../api/services/roleUpgradeRequestService"; // adjust path
import { useAuth } from "../context/AuthContext.jsx"; // adjust path

/**
 * Resolves the current user's author-upgrade situation into one of:
 *   "loading"      -> still checking
 *   "ineligible"    -> user is already AUTHOR/ADMIN (or not logged in), hide the widget
 *   "none"          -> never requested, show the form
 *   "pending"       -> awaiting admin review
 *   "approved"      -> approved (edge case — see note in chat), role will refresh on next login
 *   "rejected"      -> previous request was rejected, allow re-request
 *
 * Also exposes `submit(message)` and `refetch()` so components can react
 * immediately after a successful submission without a full page reload.
 */
export function useAuthorUpgradeStatus() {
    const { user } = useAuth();
    const [state, setState] = useState("loading");
    const [latestRequest, setLatestRequest] = useState(null);
    const [error, setError] = useState("");

    const refetch = useCallback(async () => {
        if (!user) {
            setState("ineligible");
            return;
        }
        if (user.role !== "SUBSCRIBER") {
            setState("ineligible");
            return;
        }

        setState("loading");
        try {
            const res = await roleUpgradeRequestService.getMyRequest();
            const request = res.data;
            setLatestRequest(request);

            if (request.status === "PENDING") setState("pending");
            else if (request.status === "APPROVED") setState("approved");
            else if (request.status === "REJECTED") setState("rejected");
            else setState("none");
        } catch (err) {
            if (err.response?.status === 404) {
                setLatestRequest(null);
                setState("none");
            } else {
                // Unexpected error — fail safe to "none" so the user isn't stuck,
                // but surface the error so it's not silently swallowed.
                setError(err.response?.data?.message || "Couldn't check your request status.");
                setState("none");
            }
        }
    }, [user]);

    useEffect(() => {
        refetch();
    }, [refetch]);

    const submit = useCallback(
        async (message) => {
            setError("");
            try {
                await roleUpgradeRequestService.create(message?.trim() || "");
                await refetch();
                return { ok: true };
            } catch (err) {
                const msg = err.response?.data?.message || "Something went wrong. Please try again.";
                setError(msg);
                return { ok: false, message: msg };
            }
        },
        [refetch]
    );

    return { state, latestRequest, error, submit, refetch };
}