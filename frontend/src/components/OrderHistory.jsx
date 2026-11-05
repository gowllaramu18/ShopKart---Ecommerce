import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";

function OrderHistory() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState({});

    const userId = Number(
        localStorage.getItem("userId")
    );

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {

        try {

            const response =
                await API.get(`/orders/user/${userId}`);

            setOrders(response.data);

            // Load product details for every order
            const productDetails = {};

            for (const order of response.data) {

                try {

                    const productResponse =
                        await API.get(
                            `/products/${order.productId}`
                        );

                    productDetails[order.productId] =
                        productResponse.data;

                } catch (error) {

                    console.error(
                        `Error loading product ${order.productId}:`,
                        error
                    );
                }
            }

            setProducts(productDetails);

            setLoading(false);

        } catch (error) {

            console.error(
                "Error loading orders:",
                error
            );

            setLoading(false);
        }
    };


    if (loading) {

        return (
            <div
                style={{
                    minHeight: "70vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <h2>Loading your orders...</h2>
            </div>
        );
    }


    return (
        <div
            style={{
                minHeight: "80vh",
                padding: "45px 7%",
                backgroundColor: "#f8fafc"
            }}
        >

            {/* HEADER */}

            <div
                style={{
                    marginBottom: "35px"
                }}
            >

                <p
                    style={{
                        color: "#2563eb",
                        fontWeight: "600",
                        letterSpacing: "1px",
                        marginBottom: "8px"
                    }}
                >
                    SHOPKART
                </p>

                <h1
                    style={{
                        fontSize: "38px",
                        color: "#0f172a"
                    }}
                >
                    My Orders 📦
                </h1>

            </div>


            {/* NO ORDERS */}

            {orders.length === 0 ? (

                <div
                    style={{
                        backgroundColor: "white",
                        padding: "70px 30px",
                        textAlign: "center",
                        borderRadius: "18px",
                        boxShadow:
                            "0 8px 25px rgba(15,23,42,0.08)"
                    }}
                >

                    <div
                        style={{
                            fontSize: "70px",
                            marginBottom: "20px"
                        }}
                    >
                        📦
                    </div>

                    <h2
                        style={{
                            marginBottom: "12px"
                        }}
                    >
                        No orders yet
                    </h2>

                    <p
                        style={{
                            color: "#64748b",
                            marginBottom: "25px"
                        }}
                    >
                        Your placed orders will appear here.
                    </p>

                    <Link
                        to="/products"
                        style={{
                            display: "inline-block",
                            background:
                                "linear-gradient(135deg, #1e3a8a, #2563eb)",
                            color: "white",
                            padding: "13px 25px",
                            borderRadius: "9px",
                            textDecoration: "none",
                            fontWeight: "600"
                        }}
                    >
                        Start Shopping
                    </Link>

                </div>

            ) : (

                /* ORDERS */

                <div>

                    {orders.map((order) => {

                        const product =
                            products[order.productId];

                        return (

                            <div
                                key={order.orderId}
                                style={{
                                    backgroundColor: "white",
                                    borderRadius: "16px",
                                    padding: "25px",
                                    marginBottom: "20px",
                                    boxShadow:
                                        "0 6px 20px rgba(15,23,42,0.08)"
                                }}
                            >

                                {/* ORDER TOP */}

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginBottom: "20px"
                                    }}
                                >

                                    <div>

                                        <p
                                            style={{
                                                color: "#64748b",
                                                fontSize: "14px",
                                                marginBottom: "5px"
                                            }}
                                        >
                                            Order ID
                                        </p>

                                        <h3>
                                            #{order.orderId}
                                        </h3>

                                    </div>


                                    {/* ORDER STATUS */}

                                    <span
                                        style={{
                                            backgroundColor:
                                                order.status === "DELIVERED"
                                                    ? "#dcfce7"
                                                    : order.status === "SHIPPED"
                                                        ? "#dbeafe"
                                                        : order.status === "CANCELLED"
                                                            ? "#fee2e2"
                                                            : "#fef3c7",

                                            color:
                                                order.status === "DELIVERED"
                                                    ? "#15803d"
                                                    : order.status === "SHIPPED"
                                                        ? "#1d4ed8"
                                                        : order.status === "CANCELLED"
                                                            ? "#b91c1c"
                                                            : "#b45309",

                                            padding: "7px 14px",
                                            borderRadius: "20px",
                                            fontSize: "13px",
                                            fontWeight: "600"
                                        }}
                                    >
                                        {order.status || "PLACED"}
                                    </span>

                                </div>


                                {/* PRODUCT DETAILS */}

                                <div
                                    style={{
                                        display: "grid",
                                        gridTemplateColumns:
                                            "repeat(3, 1fr)",
                                        gap: "20px",
                                        borderTop:
                                            "1px solid #e2e8f0",
                                        paddingTop: "20px"
                                    }}
                                >

                                    {/* PRODUCT */}

                                    <div>

                                        <p
                                            style={{
                                                color: "#64748b",
                                                fontSize: "13px",
                                                marginBottom: "5px"
                                            }}
                                        >
                                            Product
                                        </p>

                                        <strong>
                                            {product
                                                ? product.name
                                                : `Product #${order.productId}`}
                                        </strong>

                                    </div>


                                    {/* QUANTITY */}

                                    <div>

                                        <p
                                            style={{
                                                color: "#64748b",
                                                fontSize: "13px",
                                                marginBottom: "5px"
                                            }}
                                        >
                                            Quantity
                                        </p>

                                        <strong>
                                            {order.quantity}
                                        </strong>

                                    </div>


                                    {/* TOTAL */}

                                    <div>

                                        <p
                                            style={{
                                                color: "#64748b",
                                                fontSize: "13px",
                                                marginBottom: "5px"
                                            }}
                                        >
                                            Total Amount
                                        </p>

                                        <strong
                                            style={{
                                                color: "#16a34a",
                                                fontSize: "20px"
                                            }}
                                        >
                                            ₹
                                            {Number(
                                                order.totalPrice || 0
                                            ).toLocaleString("en-IN")}
                                        </strong>

                                    </div>

                                </div>


                                {/* PRODUCT IMAGE */}

                                {product?.imageUrl && (

                                    <div
                                        style={{
                                            marginTop: "20px",
                                            borderTop:
                                                "1px solid #e2e8f0",
                                            paddingTop: "20px"
                                        }}
                                    >

                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            style={{
                                                width: "90px",
                                                height: "90px",
                                                objectFit: "cover",
                                                borderRadius: "10px",
                                                border:
                                                    "1px solid #e2e8f0"
                                            }}
                                        />

                                    </div>

                                )}

                            </div>

                        );

                    })}

                </div>

            )}

        </div>
    );
}

export default OrderHistory;