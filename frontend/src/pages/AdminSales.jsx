
import { useEffect, useState } from "react";
import API from "../api";

function AdminSales() {
    const [sales, setSales] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await API.get("/admin/sales/summary");
                setSales(response.data);
            } catch (err) {
                console.error("Sales API error:", err);
                setError(
                    "Unable to load sales. Check that the backend is running."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchSales();
    }, []);

    const money = (amount) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2
        }).format(amount ?? 0);

    if (loading) {
        return <div style={styles.page}>Loading sales summary...</div>;
    }

    if (error) {
        return <div style={{ ...styles.page, color: "red" }}>{error}</div>;
    }

    return (
        <div style={styles.page}>
            <h1>Sales Dashboard</h1>
            <p style={styles.subtitle}>
                ShopKart sales and order summary
            </p>

            <div style={styles.cards}>
                <div style={styles.card}>
                    <span style={styles.icon}>💰</span>
                    <h3>Total Sales</h3>
                    <h2>{money(sales.totalSales)}</h2>
                    <p>Excluding cancelled orders</p>
                </div>

                <div style={styles.card}>
                    <span style={styles.icon}>🛒</span>
                    <h3>Total Orders</h3>
                    <h2>{sales.totalOrders}</h2>
                    <p>All order statuses</p>
                </div>

                <div style={styles.card}>
                    <span style={styles.icon}>✅</span>
                    <h3>Sales Orders</h3>
                    <h2>{sales.salesOrders}</h2>
                    <p>Orders included in sales total</p>
                </div>
            </div>

            <section style={styles.section}>
                <h2>Order Status Summary</h2>

                {Object.keys(sales.statusSummary || {}).length === 0 ? (
                    <p>No orders available yet.</p>
                ) : (
                    <div style={styles.statusList}>
                        {Object.entries(sales.statusSummary).map(
                            ([status, count]) => (
                                <div key={status} style={styles.statusRow}>
                                    <span>{status}</span>
                                    <strong>{count}</strong>
                                </div>
                            )
                        )}
                    </div>
                )}
            </section>

            <section style={styles.section}>
                <h2>Recent Orders</h2>

                {!sales.recentOrders?.length ? (
                    <p>No orders available yet.</p>
                ) : (
                    <div style={{ overflowX: "auto" }}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Order ID</th>
                                    <th style={styles.th}>User ID</th>
                                    <th style={styles.th}>Amount</th>
                                    <th style={styles.th}>Status</th>
                                    <th style={styles.th}>Order Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sales.recentOrders.map((order) => (
                                    <tr key={order.orderId}>
                                        <td style={styles.td}>
                                            #{order.orderId}
                                        </td>
                                        <td style={styles.td}>
                                            {order.userId}
                                        </td>
                                        <td style={styles.td}>
                                            {money(order.totalPrice)}
                                        </td>
                                        <td style={styles.td}>
                                            {order.status}
                                        </td>
                                        <td style={styles.td}>
                                            {order.orderDate
                                                ? new Date(
                                                      order.orderDate
                                                  ).toLocaleString("en-IN")
                                                : "—"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
}

const styles = {
    page: {
        padding: "30px",
        background: "#f8fafc",
        minHeight: "100vh",
        color: "#172033"
    },
    subtitle: {
        color: "#64748b",
        marginBottom: "25px"
    },
    cards: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px"
    },
    card: {
        background: "#ffffff",
        padding: "24px",
        borderRadius: "14px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.06)"
    },
    icon: {
        fontSize: "30px"
    },
    section: {
        marginTop: "30px",
        background: "#ffffff",
        padding: "24px",
        borderRadius: "14px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.04)"
    },
    statusList: {
        display: "grid",
        gap: "10px",
        maxWidth: "400px"
    },
    statusRow: {
        display: "flex",
        justifyContent: "space-between",
        padding: "12px",
        background: "#f1f5f9",
        borderRadius: "8px"
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "15px",
        textAlign: "left"
    },
    th: {
        padding: "12px",
        background: "#e2e8f0",
        borderBottom: "1px solid #cbd5e1",
        whiteSpace: "nowrap"
    },
    td: {
        padding: "12px",
        borderBottom: "1px solid #e2e8f0",
        whiteSpace: "nowrap"
    }
};

export default AdminSales;
