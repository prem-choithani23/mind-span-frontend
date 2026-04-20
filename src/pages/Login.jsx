import { useState } from "react";
import { validateEmail } from "../utils/validEmail.js";
import {Link , useNavigate} from "react-router-dom";
import FallingIcons from "../components/FallingIcons.jsx";
import {login} from "../utils/auth.js";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate  = useNavigate();

    const isFormValid = () => {
        return validateEmail(email) && password.length >= 8;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login();
        navigate("/", { replace: true }); // 🚀 go home
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">


            {/* Background */}
            <FallingIcons />

            {/* Register form */}
            <form
                onSubmit={handleSubmit}
                className="relative z-20 w-full max-w-md border rounded-md p-8 shadow-sm bg-white"
            >
                <h2 className="text-2xl font-bold mb-6">Login</h2>

                {/* Email */}
                <div className="mb-5">
                    <label className="block text-sm font-medium mb-1">
                        Email address <span className="text-red-500">*</span>
                    </label>
                    <input
                        className="w-full rounded-md border px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-black"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email address"
                    />
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">
                        Password <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        className="w-full rounded-md border px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-black"
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

                {/* Button */}

                    <button
                        type="submit"
                        disabled={!isFormValid()}
                        className={`
                            w-full py-2 rounded-md font-semibold text-sm transition-all
                            ${
                                isFormValid()
                                    ? "bg-black text-white hover:bg-gray-800 hover:cursor-pointer hover:scale-[1.05] " 
                                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                            }
                            
                            
                            
                          `}
                    >
                        LOGIN
                    </button>


                {/* Extra links */}
                <div className="mt-5 flex justify-between text-sm text-gray-600">
                    <button
                        type="button"
                        className="hover:underline"
                        onClick={() => alert("Forgot password flow")}
                    >
                        Forgot password?
                    </button>

                    <Link to={"/register"}>
                        <button
                            type="button"
                            className="hover:underline"
                        >
                            Create account
                        </button>

                    </Link>


                </div>
            </form>
        </div>
    );
}

export default Login;
