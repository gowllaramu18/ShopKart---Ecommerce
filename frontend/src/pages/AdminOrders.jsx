
import { useEffect, useState } from "react";
import API from "../api";

function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await API.get("/orders");
                setOrders(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                console.error("Failed to fetch orders:", err);
                setError("Orders load avvaledu. Backend server check cheyyi.");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <div style={{ padding: "30px" }}>Loading orders...</div>;
    }

    if (error) {
        return <div style={{ padding: "30px", color: "red" }}>{error}</div>;
    }

    return (
        <div style={{ padding: "30px" }}>
            <h1>Customer Orders</h1>
            <p>Total Orders: {orders.length}</p>

            {orders.length === 0 ? (
                <p>Inka customer orders levu broh.</p>
            ) : (
                <div style={{ overflowX: "auto" }}>
                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            marginTop: "20px"
                        }}
                    >
                        <thead>
                            <tr>
                                {["Order ID", "User ID", "Product", "Quantity", "Total", "Status"].map(
                                    (heading) => (
                                        <th
                                            key={heading}
                                            style={{
                                                textAlign: "left",
                                                padding: "12px",
                                                borderBottom: "2px solid #ddd",
                                                background: "#f1f5f9"
                                            }}
                                        >
                                            {heading}
                                        </th>
                                    )
                                )}
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order.orderId ?? index}>
                                    <td style={cellStyle}>{order.orderId ?? "—"}</td>
                                    <td style={cellStyle}>{order.userId ?? order.user?.userId ?? "—"}</td>
                                    <td style={cellStyle}>
                                        {order.productName ??
                                            order.product?.name ??
                                            order.product?.productName ??
                                            "—"}
                                    </td>
                                    <td style={cellStyle}>{order.quantity ?? "—"}</td>
                                    <td style={cellStyle}>
                                        {order.totalPrice != null
                                            ? `₹${order.totalPrice}`
                                            : order.price != null
                                                ? `₹${order.price}`
                                                : "—"}
                                    </td>
                                    <td style={cellStyle}>{order.status ?? "—"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

const cellStyle = {
    padding: "12px",
    borderBottom: "1px solid #ddd"
};

export default AdminOrders;