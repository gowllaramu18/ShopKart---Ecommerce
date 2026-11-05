import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";

function ProductDetails() {

    const { productId } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProduct();
    }, [productId]);

    const loadProduct = async () => {

        try {

            const response = await API.get(
                `/products/${productId}`
            );

            setProduct(response.data);

        } catch (error) {

            console.error(
                "Error loading product:",
                error
            );

        } finally {

            setLoading(false);
        }
    };


    // ADD TO CART
    const addToCart = async () => {

        try {

            const userId = Number(
                localStorage.getItem("userId")
            );

            if (!userId) {

                alert("Please login first.");

                navigate("/login");

                return;
            }

            const cartData = {
                userId: userId,
                productId: product.productId,
                quantity: 1
            };

            if (product.quantity <= 0) {
                alert("Product is out of stock ❌");
                return;
            }


            await API.post(
                "/cart",
                cartData
            );

            alert(
                `${product.name} added to cart! 🛒`
            );

        } catch (error) {

            console.error(
                "Add to cart error:",
                error
            );

            alert(
                "Failed to add product to cart."
            );
        }
    };


    // BUY NOW
    const buyNow = async () => {

        try {

            const userId = Number(
                localStorage.getItem("userId")
            );

            if (!userId) {

                alert("Please login first.");

                navigate("/login");

                return;
            }

            const cartData = {
                userId: userId,
                productId: product.productId,
                quantity: 1
            };

            await API.post(
                "/cart",
                cartData
            );

            navigate("/checkout");

        } catch (error) {

            console.error(
                "Buy Now error:",
                error
            );

            alert(
                "Unable to continue. Please try again."
            );
        }
    };


    // LOADING
    if (loading) {

        return (
            <div
                style={{
                    textAlign: "center",
                    padding: "80px"
                }}
            >
                <h2>
                    Loading product...
                </h2>
            </div>
        );
    }


    // PRODUCT NOT FOUND
    if (!product) {

        return (
            <div
                style={{
                    textAlign: "center",
                    padding: "80px"
                }}
            >

                <h2>
                    Product not found
                </h2>

                <button
                    onClick={() =>
                        navigate("/products")
                    }
                >
                    Back to Products
                </button>

            </div>
        );
    }


    return (

        <div
            style={{
                minHeight: "80vh",
                padding: "60px 7%",
                backgroundColor: "#f8fafc"
            }}
        >

            <div
                style={{
                    maxWidth: "1100px",
                    margin: "0 auto",
                    backgroundColor: "white",
                    borderRadius: "20px",
                    padding: "40px",
                    display: "grid",
                    gridTemplateColumns:
                        "1fr 1fr",
                    gap: "50px",
                    boxShadow:
                        "0 10px 30px rgba(15,23,42,0.08)"
                }}
            >

                {/* PRODUCT IMAGE */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >

                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        style={{
                            width: "100%",
                            maxWidth: "450px",
                            height: "400px",
                            objectFit: "contain",
                            borderRadius: "15px"
                        }}
                    />

                </div>


                {/* PRODUCT INFORMATION */}

                <div>

                    <p
                        style={{
                            color: "#2563eb",
                            fontWeight: "600",
                            fontSize: "15px",
                            marginBottom: "10px"
                        }}
                    >
                        {product.category}
                    </p>


                    <h1
                        style={{
                            fontSize: "40px",
                            color: "#0f172a",
                            marginBottom: "20px"
                        }}
                    >
                        {product.name}
                    </h1>


                    <p
                        style={{
                            color: "#64748b",
                            fontSize: "17px",
                            lineHeight: "1.7",
                            marginBottom: "25px"
                        }}
                    >
                        {product.description}
                    </p>


                    <h2
                        style={{
                            color: "#16a34a",
                            fontSize: "32px",
                            marginBottom: "15px"
                        }}
                    >
                        ₹
                        {Number(
                            product.price
                        ).toLocaleString("en-IN")}
                    </h2>


                    <p
                        style={{
                            color: "#475569",
                            marginBottom: "30px"
                        }}
                    >
                        Available Quantity:{" "}
                        <strong>
                            {product.quantity}
                        </strong>
                    </p>


                    {/* ADD TO CART BUTTON */}

                    <button
                        onClick={addToCart}
                        style={{
                            width: "100%",
                            padding: "15px",
                            border: "none",
                            borderRadius: "10px",
                            background:
                                "linear-gradient(135deg, #1e3a8a, #2563eb)",
                            color: "white",
                            fontSize: "18px",
                            fontWeight: "600",
                            cursor: "pointer"
                        }}
                    >
                        Add to Cart 🛒
                    </button>


                    {/* BUY NOW BUTTON */}

                    <button
                        onClick={buyNow}
                        style={{
                            width: "100%",
                            padding: "15px",
                            marginTop: "15px",
                            border: "none",
                            borderRadius: "10px",
                            background:
                                "linear-gradient(135deg, #15803d, #22c55e)",
                            color: "white",
                            fontSize: "18px",
                            fontWeight: "600",
                            cursor: "pointer"
                        }}
                    >
                        Buy Now ⚡
                    </button>


                    {/* BACK TO PRODUCTS */}

                    <button
                        onClick={() =>
                            navigate("/products")
                        }
                        style={{
                            width: "100%",
                            padding: "15px",
                            marginTop: "15px",
                            border: "1px solid #cbd5e1",
                            borderRadius: "10px",
                            backgroundColor: "white",
                            color: "#334155",
                            fontSize: "17px",
                            fontWeight: "600",
                            cursor: "pointer"
                        }}
                    >
                        ← Back to Products
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ProductDetails;