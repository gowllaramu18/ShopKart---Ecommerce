
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "./Login.css";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post("/users/login", {
                email: email,
                password: password
            });

            const user = response.data;

            // Ensure the backend returned a JWT token
            if (!user.token) {
                alert("Login succeeded, but the JWT token is missing.");
                return;
            }

            console.log("LOGIN USER:", {
                ...user,
                token: "[hidden]"
            });

            // Clear previous login data
            localStorage.removeItem("loggedInUser");
            localStorage.removeItem("userId");
            localStorage.removeItem("isLogin");
            localStorage.removeItem("token");

            // Save the JWT token separately
            localStorage.setItem("token", user.token);

            // Save user information
            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(user)
            );
            localStorage.setItem("userId", String(user.userId));
            localStorage.setItem("isLogin", "true");

            alert("Login successful! 🎉");

            const role = String(user.role || "")
                .trim()
                .toUpperCase();

            if (role === "ADMIN") {
                navigate("/admin");
            } else {
                navigate("/products");
            }

        } catch (error) {
            console.error("Login error:", error);

            if (error.response) {
                if (typeof error.response.data === "string") {
                    alert(error.response.data);
                } else {
                    alert(
                        error.response.data?.message ||
                        "Invalid email or password"
                    );
                }
            } else {
                alert("Unable to connect to backend");
            }
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">

                <div className="login-header">
                    <div className="login-icon">🛒</div>
                    <h1>Welcome Back</h1>
                    <p>Login to your ShopKart account</p>
                </div>

                <form
                    className="login-form"
                    onSubmit={handleLogin}
                >
                    <label>Email</label>
                    <input
                        className="login-input"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <label>Password</label>
                    <input
                        className="login-input"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        className="login-button"
                        type="submit"
                    >
                        Login
                    </button>
                </form>

                <p className="login-register">
                    Don't have an account?{" "}
                    <Link to="/register">Register</Link>
                </p>

            </div>
        </div>
    );
}

export default Login;
