import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "./Cart.css";

function Cart() {

    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const userId = Number(
        localStorage.getItem("userId")
    );

    console.log("Cart User ID:",userId);

    useEffect(() => {
        if (userId) {
            loadCart();
        } else {
            setLoading(false);
        }
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

            setCartItems(itemsWithProducts);

        } catch (error) {

            console.error(
                "Error loading cart:",
                error
            );

        } finally {

            setLoading(false);

        }
    };

    const updateQuantity = async (
        cartId,
        quantity
    ) => {

        if (quantity < 1) {
            return;
        }

        try {

            await API.put(
                `/cart/${cartId}`,
                {
                    quantity: quantity
                }
            );

            setCartItems((items) =>
                items.map((item) =>
                    item.cartId === cartId
                        ? {
                            ...item,
                            quantity: quantity
                        }
                        : item
                )
            );

        } catch (error) {

            console.error(
                "Error updating cart:",
                error
            );

            alert(
                "Failed to update quantity."
            );
        }
    };

    const removeItem = async (cartId) => {

        try {

            await API.delete(
                `/cart/${cartId}`
            );

            setCartItems((items) =>
                items.filter(
                    (item) =>
                        item.cartId !== cartId
                )
            );

        } catch (error) {

            console.error(
                "Error removing item:",
                error
            );

            alert(
                "Failed to remove item."
            );
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

    const total = subtotal;

    if (loading) {

        return (
            <div className="cart-loading">

                <div className="cart-loading-icon">
                    🛒
                </div>

                <h2>
                    Loading your cart...
                </h2>

                <p>
                    Please wait a moment.
                </p>

            </div>
        );
    }

    if (!userId) {

        return (
            <div className="empty-cart-page">

                <div className="empty-cart-card">

                    <div className="empty-cart-icon">
                        🔐
                    </div>

                    <h1>
                        Please Login
                    </h1>

                    <p>
                        Login to view your cart.
                    </p>

                    <Link
                        to="/login"
                        className="shop-now-button"
                    >
                        Login →
                    </Link>

                </div>

            </div>
        );
    }

    if (cartItems.length === 0) {

        return (
            <div className="empty-cart-page">

                <div className="empty-cart-card">

                    <div className="empty-cart-icon">
                        🛒
                    </div>

                    <h1>
                        Your Cart is Empty
                    </h1>

                    <p>
                        Looks like you haven't added
                        anything to your cart yet.
                    </p>

                    <Link
                        to="/products"
                        className="shop-now-button"
                    >
                        Start Shopping →
                    </Link>

                </div>

            </div>
        );
    }

    return (
        <div className="cart-page">

            <div className="cart-header">

                <p>
                    SHOPKART
                </p>

                <h1>
                    Shopping Cart 🛒
                </h1>

                <span>
                    Review your items before placing your order.
                </span>

            </div>

            <div className="cart-container">

                <div className="cart-items-section">

                    <div className="cart-items-header">

                        <h2>
                            Your Items
                        </h2>

                        <span>
                            {cartItems.length} item
                            {cartItems.length > 1
                                ? "s"
                                : ""}
                        </span>

                    </div>

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
                                className="cart-item-card"
                                key={item.cartId}
                            >

                                <div className="cart-product-image">

                                    {product.imageUrl ? (

                                        <img
                                            src={
                                                product.imageUrl
                                            }
                                            alt={
                                                product.name
                                            }
                                        />

                                    ) : (

                                        <div className="no-image">
                                            📦
                                        </div>

                                    )}

                                </div>

                                <div className="cart-product-details">

                                    <span className="cart-category">
                                        {product.category}
                                    </span>

                                    <h3>
                                        {product.name}
                                    </h3>

                                    <p>
                                        {product.description}
                                    </p>

                                    <div className="cart-price">
                                        ₹
                                        {Number(
                                            product.price
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </div>

                                </div>

                                <div className="cart-quantity-section">

                                    <span>
                                        Quantity
                                    </span>

                                    <div className="quantity-control">

                                        <button
                                            onClick={() =>
                                                updateQuantity(
                                                    item.cartId,
                                                    item.quantity - 1
                                                )
                                            }
                                            disabled={
                                                item.quantity <= 1
                                            }
                                        >
                                            −
                                        </button>

                                        <strong>
                                            {item.quantity}
                                        </strong>
                                        <button
                                           onClick={() => {
                                            if (item.quantity >= product.quantity) {
                                           alert("You cannot add more than available stock ❌");
                                           return;
                                       }

                                     updateQuantity(
                                      item.cartId,
                                      item.quantity + 1
                                     );
                                    }}
                                disabled={item.quantity >= product.quantity}
                                 >
                                   +
                                </button>
                                       

                                    </div>

                                </div>

                                <div className="cart-item-total">

                                    <span>
                                        Total
                                    </span>

                                    <strong>
                                        ₹
                                        {itemTotal.toLocaleString(
                                            "en-IN"
                                        )}
                                    </strong>

                                </div>

                                <button
                                    className="remove-cart-button"
                                    onClick={() =>
                                        removeItem(
                                            item.cartId
                                        )
                                    }
                                >
                                    🗑️
                                </button>

                            </div>
                        );
                    })}

                    <Link
                        to="/products"
                        className="continue-shopping"
                    >
                        ← Continue Shopping
                    </Link>

                </div>

                <div className="cart-summary">

                    <h2>
                        Order Summary
                    </h2>

                    <div className="summary-row">

                        <span>
                            Items
                        </span>

                        <strong>
                            {cartItems.length}
                        </strong>

                    </div>

                    <div className="summary-row">

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

                    <div className="summary-row">

                        <span>
                            Delivery
                        </span>

                        <strong className="free-delivery">
                            FREE
                        </strong>

                    </div>

                    <div className="summary-divider"></div>

                    <div className="summary-total">

                        <span>
                            Total
                        </span>

                        <strong>
                            ₹
                            {total.toLocaleString(
                                "en-IN"
                            )}
                        </strong>

                    </div>

                    <button
                        className="checkout-button"
                        onClick={() =>
                            navigate("/checkout")
                        }
                    >
                        Proceed to Checkout →
                    </button>

                    <div className="secure-payment">
                        🔒 Secure Checkout
                    </div>

                    <p className="secure-payment-text">
                        Your shopping information is
                        protected and secure.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Cart;