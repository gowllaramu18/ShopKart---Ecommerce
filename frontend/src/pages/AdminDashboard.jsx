
import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
   
    const navigate = useNavigate();

    const dashboardCards = [
        {
            title: "Products",
            description: "Manage your products",
            icon: "📦",
            action: () => navigate("/manage-products"),
            clickable: true
        },
        {
            title: "Users",
            description: "Manage registered users",
            icon: "👥",
           action: () => navigate("/admin/users"),
            clickable: true
        },
        {
            title: "Orders",
            description: "View customer orders",
            icon: "🛒",
            action: () => navigate("/admin/orders"),
            clickable: true
        },
        {
            title: "Sales",
            description: "Monitor sales",
            icon: "💰",
          action: () => navigate("/admin/sales"),
            clickable: true
        }
    ];

    return (
        <div className="admin-dashboard">

            {/* Header */}
            <div className="admin-header">
                <div>
                    <h1>Admin Dashboard</h1>
                    <p>Welcome to ShopKart Admin Panel</p>
                </div>

                <div className="admin-badge">
                    👑 ADMIN
                </div>
            </div>

            {/* Dashboard Cards */}
            <div className="dashboard-cards">
                {dashboardCards.map((card) => (
                    <button
                        type="button"
                        className="dashboard-card"
                        key={card.title}
                        onClick={card.action}
                        style={{
                            textAlign: "left",
                            font: "inherit",
                            color: "inherit",
                            cursor: "pointer",
                            border: "none",
                            width: "100%"
                        }}
                    >
                        <div className="card-icon">
                            {card.icon}
                        </div>

                        <div>
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                        </div>
                    </button>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="quick-actions-section">
                <h2>Quick Actions</h2>

                <div className="quick-actions">

                    <Link
                        to="/admin/add-product"
                        className="quick-action"
                    >
                        <span>➕</span>
                        <div>
                            <h3>Add Product</h3>
                            <p>Add a new product</p>
                        </div>
                    </Link>

                    <Link
                        to="/manage-products"
                        className="quick-action"
                    >
                        <span>📦</span>
                        <div>
                            <h3>Manage Products</h3>
                            <p>Edit or delete products</p>
                        </div>
                    </Link>

                    <Link
                        to="/products"
                        className="quick-action"
                    >
                        <span>🛍️</span>
                        <div>
                            <h3>View Products</h3>
                            <p>View all products</p>
                        </div>
                    </Link>

                </div>
            </div>

        </div>
    );
}

export default AdminDashboard;