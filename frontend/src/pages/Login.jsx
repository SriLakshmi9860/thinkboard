import { useState } from "react";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(
            "http://localhost:5001/api/auth/login",
            {
                email,
                password,
            }
        );

        localStorage.setItem("token", response.data.token);

        console.log("Login successful!");

    } catch (error) {
        console.error("Login error:", error);
    }
};

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-300 px-4">
            <div className="w-full max-w-md">
                <div className="bg-base-100 rounded-xl p-8 shadow-lg">

                    <h1 className="text-3xl font-bold text-center mb-2">
                        Welcome Back
                    </h1>

                    <p className="text-center text-base-content/60 mb-6">
                        Login to your ThinkBoard account
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div>
                            <label className="block mb-1 font-medium">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">
                                Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input input-bordered w-full"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                        >
                            Login
                        </button>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default Login;