
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "./Register.css";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await API.post("/users/register", formData);

            alert(response.data.message || "Registration successful!");
            navigate("/login");
        } catch (error) {
            console.error("Registration error:", error);

            alert(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div className="register-page">
            <div className="register-card">

                <div className="register-header">
                    <div className="register-icon">🛒</div>
                    <h1>Create Account</h1>
                    <p>Join ShopKart today</p>
                </div>

                <form className="register-form" onSubmit={handleRegister}>

                    <label>Full Name</label>
                    <input
                        className="register-input"
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label>Email Address</label>
                    <input
                        className="register-input"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label>Password</label>
                    <input
                        className="register-input"
                        type="password"
                        name="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <label>Phone Number</label>
                    <input
                        className="register-input"
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    <button className="register-button" type="submit">
                        Create Account
                    </button>

                </form>

                <p className="register-login">
                    Already have an account?{" "}
                    <Link to="/login">Login</Link>
                </p>

            </div>
        </div>
    );
}

export default Register;
