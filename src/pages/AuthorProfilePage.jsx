import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"; // adjust path
import Profile from "./Profile.jsx"; // adjust path — your existing full profile page
import ReadOnlyAuthorProfile from "./ReadOnlyAuthorProfile.jsx"; // adjust path

/**
 * Route: /author/:id
 *
 * If :id matches the logged-in user -> render the full editable Profile page
 * (posts, drafts, settings, everything you already built).
 *
 * Otherwise -> render a read-only public view: author metadata + their
 * published posts, paginated. No settings, no drafts, no delete/edit controls.
 */
export default function AuthorProfilePage() {
    const { id } = useParams();
    const { user, isLoading } = useAuth();

    // Auth state not resolved yet (rehydration from localStorage still in flight)
    // — avoid a flash of the read-only view for someone viewing their own profile.
    if (isLoading) {
        return null; // or a loading skeleton
    }

    const isOwnProfile = user && String(user.id) === String(id);

    if (isOwnProfile) {
        return <Profile />;
    }

    return <ReadOnlyAuthorProfile authorId={id} />;
}