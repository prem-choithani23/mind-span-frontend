import { useState } from "react";
import { validateEmail } from "../utils/validEmail.js";
import FallingIcons from "../components/FallingIcons.jsx";
import {Link , useNavigate} from "react-router-dom";
import {login} from "../utils/auth.js";
const PasswordErrorMessage = () => {
    return (
        <p className="mt-1 text-sm text-red-500">
            Password should have at least 8 characters
        </p>
    );
};

const ConfirmPasswordErrorMessage = () => {
    return (
        <p className="mt-1 text-sm text-red-500">
            Passwords do not match
        </p>
    );
};

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState({
        value: "",
        isTouched: false,
    });
    const [confirmPassword, setConfirmPassword] = useState({value:"" ,isTouched:false , hasText : false});

    const [role, setRole] = useState("role");
    const navigate = useNavigate();


    const getIsFormValid = () => {
        return (
            firstName &&
            validateEmail(email) &&
            password.value.length >= 8 &&
                confirmPassword.value === password.value 
        );
    };

    const clearForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword({ value: "", isTouched: false });
        setRole("role");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        login(); // mark user as authenticated
        navigate("/", { replace: true });
        clearForm();
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
                <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

                {/* First Name */}
                <div className="mb-5">
                    <label className="block text-sm font-medium mb-1">
                        First name <span className="text-red-500">*</span>
                    </label>
                    <input
                        className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First name"
                    />
                </div>

                {/* Last Name */}
                <div className="mb-5">
                    <label className="block text-sm font-medium mb-1">Last name</label>
                    <input
                        className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last name"
                    />
                </div>

                {/* Email */}
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

                {/* Password */}
                <div className="mb-5">
                    <label className="block text-sm font-medium mb-1">
                        Password <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        value={password.value}
                        onChange={(e) =>
                            setPassword({ ...password, value: e.target.value })
                        }
                        onBlur={() =>
                            setPassword({ ...password, isTouched: true })
                        }
                        placeholder="Password"
                    />
                    {password.isTouched && password.value.length < 8 && (
                        <PasswordErrorMessage />
                    )}
                </div>


                {/* Confirm Password Password */}
                <div className="mb-5">
                    <label className="block text-sm font-medium mb-1">
                        Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        value={confirmPassword.value}
                        onChange={(e) =>
                            setConfirmPassword({ ...confirmPassword, value: e.target.value  , hasText: true})
                        }
                        onBlur={() =>
                            setConfirmPassword({ ...confirmPassword, isTouched: true })
                        }
                        placeholder="Password"
                    />
                    {confirmPassword.hasText && confirmPassword.value !== password.value && (
                        <ConfirmPasswordErrorMessage />
                    )}
                </div>


                {/* Button */}
                <button
                    type="submit"
                    disabled={!getIsFormValid()}
                    className={`
                        w-full py-2 rounded-md font-semibold text-sm
                        transition-all
                        ${
                            getIsFormValid()
                                ? "bg-black text-white hover:bg-gray-800 hover:cursor-pointer hover:scale-[1.05]"
                                : "bg-gray-300 text-gray-600 cursor-not-allowed"
                        }
                    `}
                >
                    CREATE ACCOUNT
                </button>
            </form>
        </div>
    );
}

export default Register;
