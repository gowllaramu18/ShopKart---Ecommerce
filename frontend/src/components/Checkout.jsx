import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Checkout() {

    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [placingOrder, setPlacingOrder] = useState(false);

    const userId = Number(
        localStorage.getItem("userId")
    );

    useEffect(() => {

        if (!userId) {
            setLoading(false);
            return;
        }

        loadCart();

    }, [userId]);


    const loadCart = async () => {

        try {

            const response = await API.get(
                `/cart/user/${userId}`
            );

            const cartData = response.data;

            const itemsWithProducts =
                await Promise.all(

                    cartData.map(async (item) => {

                        try {

                            const productResponse =
                                await API.get(
                                    `/products/${item.productId}`
                                );

                            return {
                                ...item,
                                product:
                                    productResponse.data
                            };

                        } catch (error) {

                            console.error(
                                "Error loading product:",
                                error
                            );

                            return {
                                ...item,
                                product: null
                            };
                        }
                    })
                );

            setCartItems(
                itemsWithProducts
            );

        } catch (error) {

            console.error(
                "Error loading cart:",
                error
            );

        } finally {

            setLoading(false);
        }
    };


    const subtotal = cartItems.reduce(
        (total, item) => {

            if (!item.product) {
                return total;
            }

            return (
                total +
                Number(item.product.price) *
                Number(item.quantity)
            );

        },
        0
    );


    const placeOrder = async () => {

        if (!userId) {

            alert(
                "Please login first."
            );

            navigate("/login");

            return;
        }


        if (cartItems.length === 0) {

            alert(
                "Your cart is empty."
            );

            navigate("/cart");

            return;
        }


        try {

            setPlacingOrder(true);

            /*
             * IMPORTANT:
             * Use the actual logged-in user's ID.
             *
             * Example:
             * User 3 -> /api/orders/place/3
             */

            const response =
                await API.post(
                    `/orders/place/${userId}`
                );


            console.log(
                "Order placed:",
                response.data
            );


            alert(
                "Order placed successfully! 🎉"
            );


            // Cart is cleared by backend
            setCartItems([]);


            // Go to order history
            navigate("/orders");


        } catch (error) {

            console.error(
                "Error placing order:",
                error
            );


            if (
                error.response &&
                error.response.data
            ) {

                console.error(
                    "Backend error:",
                    error.response.data
                );
            }


            alert(
                "Failed to place order. Please try again."
            );

        } finally {

            setPlacingOrder(false);
        }
    };


    if (loading) {

        return (
            <div
                style={{
                    textAlign: "center",
                    padding: "80px"
                }}
            >
                <h2>
                    Loading checkout...
                </h2>
            </div>
        );
    }


    if (!userId) {

        return (
            <div
                style={{
                    textAlign: "center",
                    padding: "80px"
                }}
            >

                <h1>
                    Please Login
                </h1>

                <p>
                    You need to login before checkout.
                </p>

                <button
                    onClick={() =>
                        navigate("/login")
                    }
                >
                    Login
                </button>

            </div>
        );
    }


    if (cartItems.length === 0) {

        return (
            <div
                style={{
                    textAlign: "center",
                    padding: "80px"
                }}
            >

                <h1>
                    Your Cart is Empty 🛒
                </h1>

                <p>
                    Add some products before checkout.
                </p>

                <button
                    onClick={() =>
                        navigate("/products")
                    }
                >
                    Continue Shopping
                </button>

            </div>
        );
    }


    return (

        <div
            style={{
                maxWidth: "1000px",
                margin: "40px auto",
                padding: "20px"
            }}
        >

            <h1>
                Checkout
            </h1>


            <h2>
                Order Summary
            </h2>


            {cartItems.map((item) => {

                const product =
                    item.product;

                if (!product) {
                    return null;
                }

                const itemTotal =
                    Number(product.price) *
                    Number(item.quantity);


                return (

                    <div
                        key={item.cartId}
                        style={{
                            display: "flex",
                            justifyContent:
                                "space-between",
                            alignItems: "center",
                            padding: "20px",
                            marginBottom: "15px",
                            border:
                                "1px solid #ddd",
                            borderRadius: "10px"
                        }}
                    >

                        <div>

                            <h3>
                                {product.name}
                            </h3>

                            <p>
                                {product.category}
                            </p>

                            <p>
                                ₹
                                {Number(
                                    product.price
                                ).toLocaleString(
                                    "en-IN"
                                )}
                                {" × "}
                                {item.quantity}
                            </p>

                        </div>


                        <strong>
                            ₹
                            {itemTotal.toLocaleString(
                                "en-IN"
                            )}
                        </strong>

                    </div>
                );
            })}


            <div
                style={{
                    marginTop: "30px",
                    padding: "25px",
                    border:
                        "1px solid #ddd",
                    borderRadius: "10px"
                }}
            >

                <div
                    style={{
                        display: "flex",
                        justifyContent:
                            "space-between"
                    }}
                >

                    <span>
                        Subtotal
                    </span>

                    <strong>
                        ₹
                        {subtotal.toLocaleString(
                            "en-IN"
                        )}
                    </strong>

                </div>


                <div
                    style={{
                        display: "flex",
                        justifyContent:
                            "space-between",
                        marginTop: "15px"
                    }}
                >

                    <span>
                        Delivery
                    </span>

                    <strong>
                        FREE
                    </strong>

                </div>


                <hr />


                <div
                    style={{
                        display: "flex",
                        justifyContent:
                            "space-between",
                        fontSize: "22px",
                        marginTop: "15px"
                    }}
                >

                    <strong>
                        Total
                    </strong>

                    <strong>
                        ₹
                        {subtotal.toLocaleString(
                            "en-IN"
                        )}
                    </strong>

                </div>


                <button
                    onClick={placeOrder}
                    disabled={placingOrder}
                    style={{
                        width: "100%",
                        marginTop: "25px",
                        padding: "15px",
                        fontSize: "18px",
                        cursor:
                            placingOrder
                                ? "not-allowed"
                                : "pointer"
                    }}
                >

                    {placingOrder
                        ? "Placing Order..."
                        : "Place Order"}

                </button>

            </div>

        </div>
    );
}

export default Checkout;