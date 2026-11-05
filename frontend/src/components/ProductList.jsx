
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "./ProductList.css";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    const navigate = useNavigate();

    // Categories
    const categories = [
        "All",
        "Laptops",
        "Mobiles",
        "Audio",
        "Gaming",
        "Accessories",
        "Fashion",
        "Kids Fashion",
        "Footwear",
        "Home",
        "Cameras",
        "Electronics"
    ];

    // Fetch products from backend
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);

            const response = await API.get("/products");

            console.log("API PRODUCTS:", response.data);

            const validProducts = response.data.filter(
                (product) =>
                    product.name?.trim() &&
                    Number(product.price) > 0
            );

            console.log("VALID PRODUCTS:", validProducts);

            setProducts(validProducts);
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    // Add product to cart
    const addToCart = async (product) => {
        try {
            const userId = Number(localStorage.getItem("userId"));

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

            await API.post("/cart", cartData);

            alert(`${product.name} added to cart 🛒`);
        } catch (error) {
            console.error("Add to cart error:", error);
            alert("Failed to add product. Please try again.");
        }
    };

    // Search and category filtering
    const filteredProducts = products.filter((product) => {
        const matchesCategory =
            selectedCategory === "All" ||
            product.category?.trim().toLowerCase() ===
                selectedCategory.trim().toLowerCase();

        const search = searchTerm.trim().toLowerCase();

        const matchesSearch =
            !search ||
            product.name?.toLowerCase().includes(search) ||
            product.description?.toLowerCase().includes(search) ||
            product.category?.toLowerCase().includes(search);

        return matchesCategory && matchesSearch;
    });

    // Loading
    if (loading) {
        return (
            <div className="products-page">
                <h2>Loading products...</h2>
            </div>
        );
    }

    // Page
    return (
        <div className="products-page">

            {/* Header */}
            <div className="products-header">
                <h1>ShopKart Products</h1>
                <p>Explore our latest products</p>

                {/* Search */}
                <input
                    type="text"
                    placeholder="🔍 Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: "100%",
                        maxWidth: "500px",
                        padding: "14px 18px",
                        marginTop: "20px",
                        border: "1px solid #cbd5e1",
                        borderRadius: "10px",
                        fontSize: "16px",
                        outline: "none"
                    }}
                />
            </div>

            {/* Category Buttons */}
            <div
                style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                    marginBottom: "35px"
                }}
            >
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        style={{
                            padding: "10px 18px",
                            borderRadius: "20px",
                            border: "none",
                            cursor: "pointer",
                            background:
                                selectedCategory === category
                                    ? "#2563eb"
                                    : "#e2e8f0",
                            color:
                                selectedCategory === category
                                    ? "white"
                                    : "#0f172a",
                            fontWeight: "600"
                        }}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            <div className="products-grid">

                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div
                            className="product-card"
                            key={product.productId}
                            onClick={() =>
                                navigate(`/product/${product.productId}`)
                            }
                            style={{ cursor: "pointer" }}
                        >

                            {/* Product Image */}
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="product-image"
                            />

                            {/* Product Information */}
                            <div className="product-info">

                                <span className="product-category">
                                    {product.category}
                                </span>

                                <h2>{product.name}</h2>

                                <p className="product-description">
                                    {product.description}
                                </p>

                                <div className="product-bottom">

                                    <span className="product-price">
                                        ₹{product.price}
                                    </span>

                                    <button
                                        className="add-cart-button"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            addToCart(product);
                                        }}
                                    >
                                        Add to Cart 🛒
                                    </button>

                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>
                        No products found.
                    </p>
                )}

            </div>
        </div>
    );
}

export default ProductList;
