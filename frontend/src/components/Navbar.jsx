import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    const navigate = useNavigate();

    let loggedInUser = null;

    try {
        loggedInUser = JSON.parse(
            localStorage.getItem("loggedInUser") || "null"
        );
    } catch {
        loggedInUser = null;
    }

    const isLoggedIn = Boolean(loggedInUser);

    const isAdmin =
        String(loggedInUser?.role || "")
            .trim()
            .toUpperCase() === "ADMIN";

    function handleLogout() {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("userId");
        localStorage.removeItem("isLogin");

        navigate("/login");
        window.location.reload();
    }

    return (
        <nav style={{
            background: "linear-gradient(135deg, #0f172a, #2563eb)",
            padding: "16px 30px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "15px"
        }}>
            <Link to="/" style={{
                color: "white",
                fontSize: "28px",
                fontWeight: "bold",
                textDecoration: "none"
            }}>
                🛒 Shop<span style={{ color: "#60a5fa" }}>Kart</span>
            </Link>

            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                flexWrap: "wrap"
            }}>
                <Link to="/" style={linkStyle}>Home</Link>
                <Link to="/products" style={linkStyle}>Products</Link>

                {isLoggedIn && !isAdmin && (
                    <>
                        <Link to="/cart" style={linkStyle}>🛒 Cart</Link>
                        <Link to="/orders" style={linkStyle}>My Orders</Link>
                    </>
                )}

                {isAdmin && (
                    <Link to="/admin" style={linkStyle}>
                        👑 Admin Dashboard
                    </Link>
                )}

                {!isLoggedIn ? (
                    <>
                        <Link to="/login" style={linkStyle}>Login</Link>
                        <Link to="/register" style={linkStyle}>Register</Link>
                    </>
                ) : (
                    <button onClick={handleLogout} style={{
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        padding: "9px 16px",
                        cursor: "pointer"
                    }}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}

const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "500"
};

export default Navbar;