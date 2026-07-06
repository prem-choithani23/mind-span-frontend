import { useState } from "react";
import { validateEmail } from "../utils/validEmail.js";
import { Link, useNavigate } from "react-router-dom";
import FallingIcons from "../components/FallingIcons.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { loginUser, verifyOtp, forgotPassword } from "../api/services/authService.js";

function Login() {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Forgot password state
    const [showForgot, setShowForgot] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");
    const [forgotSent, setForgotSent] = useState(false);
    const [forgotLoading, setForgotLoading] = useState(false);
    const [forgotError, setForgotError] = useState(null);

    const navigate = useNavigate();
    const { login } = useAuth();

    const isStep1Valid = () => validateEmail(email) && password.length >= 8;
    const isStep2Valid = () => otp.length === 6;

    const handleCredentials = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await loginUser({ email, password });
            if (res.data.status === true) {
                setStep(2);
            } else {
                setError("No account found with these credentials.");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleOtp = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await verifyOtp({ email, otp });
            login(res.data.user, {
                accessToken: res.data.accessToken,
                refreshToken: res.data.refreshToken,
            });
            navigate("/", { replace: true });
        } catch (err) {
            setError(err.response?.data?.message || "Invalid OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setForgotError(null);
        setForgotLoading(true);
        try {
            await forgotPassword(forgotEmail);
            setForgotSent(true);
        } catch (err) {
            setForgotError(err.response?.data?.message || "Something went wrong. Try again.");
        } finally {
            setForgotLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <FallingIcons />

            {/* FORGOT PASSWORD MODAL */}
            {showForgot && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-8">
                        {forgotSent ? (
                            <>
                                <h3 className="text-xl font-bold mb-2">Check your email</h3>
                                <p className="text-sm text-gray-500 mb-6">
                                    We sent a reset link to <strong>{forgotEmail}</strong>. Follow the link to reset your password.
                                </p>
                                <button
                                    onClick={() => { setShowForgot(false); setForgotSent(false); setForgotEmail(""); }}
                                    className="w-full py-2 rounded-md bg-black text-white text-sm font-semibold hover:bg-gray-800 transition"
                                >
                                    Done
                                </button>
                            </>
                        ) : (
                            <>
                                <h3 className="text-xl font-bold mb-2">Forgot password</h3>
                                <p className="text-sm text-gray-500 mb-6">
                                    Enter your email and we'll send you a reset link.
                                </p>

                                {forgotError && (
                                    <div className="mb-4 text-sm text-red-500 bg-red-50 border border-red-200 rounded px-3 py-2">
                                        {forgotError}
                                    </div>
                                )}

                                <form onSubmit={handleForgotPassword}>
                                    <input
                                        className="w-full rounded-md border px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-black"
                                        value={forgotEmail}
                                        onChange={(e) => setForgotEmail(e.target.value)}
                                        placeholder="Email address"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!validateEmail(forgotEmail) || forgotLoading}
                                        className={`w-full py-2 rounded-md font-semibold text-sm transition-all mb-3
                                            ${validateEmail(forgotEmail) && !forgotLoading
                                            ? "bg-black text-white hover:bg-gray-800"
                                            : "bg-gray-300 text-gray-600 cursor-not-allowed"
                                        }`}
                                    >
                                        {forgotLoading ? "Sending..." : "Send reset link"}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setShowForgot(false); setForgotError(null); }}
                                        className="w-full text-sm text-gray-500 hover:underline"
                                    >
                                        Cancel
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* LOGIN FORM */}
            <form
                onSubmit={step === 1 ? handleCredentials : handleOtp}
                className="relative z-20 w-full max-w-md border rounded-md p-8 shadow-sm bg-white"
            >
                <h2 className="text-2xl font-bold mb-2">
                    {step === 1 ? "Login" : "Enter OTP"}
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                    {step === 1
                        ? "Enter your credentials to continue."
                        : `We sent a 6-digit code to ${email}`}
                </p>

                {error && (
                    <div className="mb-4 text-sm text-red-500 bg-red-50 border border-red-200 rounded px-3 py-2">
                        {error}
                    </div>
                )}

                {step === 1 && (
                    <>
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
                    </>
                )}

                {step === 2 && (
                    <div className="mb-6">
                        <label className="block text-sm font-medium mb-1">
                            OTP Code <span className="text-red-500">*</span>
                        </label>
                        <input
                            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black tracking-[0.5em] text-center text-lg font-mono"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 6))}
                            placeholder="000000"
                            maxLength={6}
                        />
                        <button
                            type="button"
                            onClick={() => { setStep(1); setOtp(""); setError(null); }}
                            className="mt-2 text-sm text-gray-500 hover:underline"
                        >
                            ← Back to login
                        </button>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={(step === 1 ? !isStep1Valid() : !isStep2Valid()) || loading}
                    className={`w-full py-2 rounded-md font-semibold text-sm transition-all
                        ${(step === 1 ? isStep1Valid() : isStep2Valid()) && !loading
                        ? "bg-black text-white hover:bg-gray-800 hover:cursor-pointer hover:scale-[1.05]"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                >
                    {loading ? "Please wait..." : step === 1 ? "CONTINUE" : "VERIFY OTP"}
                </button>

                <div className="mt-5 flex justify-between text-sm text-gray-600">
                    <button
                        type="button"
                        className="hover:underline"
                        onClick={() => setShowForgot(true)}
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
