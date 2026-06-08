import { useState } from "react";
import { validateEmail } from "../utils/validEmail.js";
import { Link, useNavigate } from "react-router-dom";
import FallingIcons from "../components/FallingIcons.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { loginUser } from "../api/services/authService.js";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const isFormValid = () => validateEmail(email) && password.length >= 8;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await loginUser({ email, password });
            login(res.data.user, {
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
            });
            navigate("/", { replace: true });
        } catch (err) {
            setError(
                err.response?.data?.message || "Invalid credentials. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <FallingIcons />
            <form
                onSubmit={handleSubmit}
                className="relative z-20 w-full max-w-md border rounded-md p-8 shadow-sm bg-white"
            >
                <h2 className="text-2xl font-bold mb-6">Login</h2>

                {error && (
                    <div className="mb-4 text-sm text-red-500 bg-red-50 border border-red-200 rounded px-3 py-2">
                        {error}
                    </div>
                )}

                <div className="mb-5">
                    <label className="block text-sm font-medium mb-1">
                        Email address <span className="text-red-500">*</span>
                    </label>
                    <input
                        className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">
                        Password <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    {password && password.length < 8 && (
                        <p className="mt-1 text-sm text-red-500">
                            Password should have at least 8 characters
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={!isFormValid() || loading}
                    className={`w-full py-2 rounded-md font-semibold text-sm transition-all
                        ${isFormValid() && !loading
                            ? "bg-black text-white hover:bg-gray-800 hover:cursor-pointer hover:scale-[1.05]"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                        }`}
                >
                    {loading ? "Logging in..." : "LOGIN"}
                </button>

                <div className="mt-5 flex justify-between text-sm text-gray-600">
                    <button
                        type="button"
                        className="hover:underline"
                        onClick={() => alert("Forgot password flow")}
                    >
                        Forgot password?
                    </button>
                    <Link to="/register">
                        <button type="button" className="hover:underline">
                            Create account
                        </button>
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Login;