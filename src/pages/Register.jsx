import { useState } from "react";
import { validateEmail } from "../utils/validEmail.js";
import FallingIcons from "../components/FallingIcons.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { registerUser } from "../api/services/authService.js";

const PasswordErrorMessage = () => (
    <p className="mt-1 text-sm text-red-500">
        Password should have at least 8 characters
    </p>
);

const ConfirmPasswordErrorMessage = () => (
    <p className="mt-1 text-sm text-red-500">Passwords do not match</p>
);

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState({ value: "", isTouched: false });
    const [confirmPassword, setConfirmPassword] = useState({ value: "", isTouched: false, hasText: false });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const getIsFormValid = () =>
        name &&
        validateEmail(email) &&
        password.value.length >= 8 &&
        confirmPassword.value === password.value;

    const clearForm = () => {
        setName("");
        setEmail("");
        setPassword({ value: "", isTouched: false });
        setConfirmPassword({ value: "", isTouched: false, hasText: false });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await registerUser({
                name,
                email,
                password: password.value,
            });
            login(res.data.user, {
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
            });
            clearForm();
            navigate("/", { replace: true });
        } catch (err) {
            setError(
                err.response?.data?.message || "Registration failed. Please try again."
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
                <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

                {error && (
                    <div className="mb-4 text-sm text-red-500 bg-red-50 border border-red-200 rounded px-3 py-2">
                        {error}
                    </div>
                )}

                <div className="mb-5">
                    <label className="block text-sm font-medium mb-1">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                    />
                </div>


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

                <div className="mb-5">
                    <label className="block text-sm font-medium mb-1">
                        Password <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        value={password.value}
                        onChange={(e) => setPassword({ ...password, value: e.target.value })}
                        onBlur={() => setPassword({ ...password, isTouched: true })}
                        placeholder="Password"
                    />
                    {password.isTouched && password.value.length < 8 && <PasswordErrorMessage />}
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">
                        Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        value={confirmPassword.value}
                        onChange={(e) =>
                            setConfirmPassword({ ...confirmPassword, value: e.target.value, hasText: true })
                        }
                        onBlur={() =>
                            setConfirmPassword({ ...confirmPassword, isTouched: true })
                        }
                        placeholder="Confirm password"
                    />
                    {confirmPassword.hasText && confirmPassword.value !== password.value && (
                        <ConfirmPasswordErrorMessage />
                    )}
                </div>

                <button
                    type="submit"
                    disabled={!getIsFormValid() || loading}
                    className={`w-full py-2 rounded-md font-semibold text-sm transition-all
                        ${getIsFormValid() && !loading
                            ? "bg-black text-white hover:bg-gray-800 hover:cursor-pointer hover:scale-[1.05]"
                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                        }`}
                >
                    {loading ? "Creating account..." : "CREATE ACCOUNT"}
                </button>

                <div className="mt-5 text-sm text-gray-600 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="hover:underline font-medium">
                        Login
                    </Link>
                </div>
            </form>
        </div>
    );
}

export default Register;