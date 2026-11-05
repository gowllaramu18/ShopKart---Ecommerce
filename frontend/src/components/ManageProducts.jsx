import { useEffect, useState } from "react";
import API from "../api";
import "./ManageProducts.css";

function ManageProducts() {

    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [loading, setLoading] = useState(true);


    // ==============================
    // FETCH PRODUCTS
    // ==============================

    useEffect(() => {
        fetchProducts();
    }, []);


    const fetchProducts = async () => {

        try {

            const response = await API.get("/products");

            const validProducts = response.data.filter(
                (product) =>
                    product.name &&
                    product.price > 0
            );

            setProducts(validProducts);

        } catch (error) {

            console.error(
                "Error fetching products:",
                error
            );

        } finally {

            setLoading(false);
        }
    };


    // ==============================
    // EDIT PRODUCT
    // ==============================

    const handleEdit = (product) => {

        console.log("Editing product:", product);

        setEditingProduct({
            productId: product.productId,
            name: product.name || "",
            category: product.category || "",
            description: product.description || "",
            price: product.price || "",
            quantity: product.quantity || "",
            imageUrl: product.imageUrl || ""
        });

    };


    // ==============================
    // HANDLE INPUT CHANGE
    // ==============================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setEditingProduct((previous) => ({
            ...previous,
            [name]: value
        }));

    };


    // ==============================
    // UPDATE PRODUCT
    // ==============================

    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            await API.put(
                `/products/${editingProduct.productId}`,
                {
                    name: editingProduct.name,
                    category: editingProduct.category,
                    description: editingProduct.description,
                    price: Number(
                        editingProduct.price
                    ),
                    quantity: Number(
                        editingProduct.quantity
                    ),
                    imageUrl: editingProduct.imageUrl
                }
            );

            alert(
                "Product updated successfully! ✅"
            );

            setEditingProduct(null);

            fetchProducts();

        } catch (error) {

            console.error(
                "Update product error:",
                error
            );

            alert(
                "Failed to update product ❌"
            );
        }
    };


    // ==============================
    // DELETE PRODUCT
    // ==============================

    const handleDelete = async (productId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }


        try {

            await API.delete(
                `/products/${productId}`
            );

            alert(
                "Product deleted successfully! 🗑️"
            );

            fetchProducts();

        } catch (error) {

            console.error(
                "Delete product error:",
                error
            );

            alert(
                "Failed to delete product ❌"
            );
        }
    };


    // ==============================
    // LOADING
    // ==============================

    if (loading) {

        return (
            <div className="manage-products-page">

                <h2>
                    Loading products...
                </h2>

            </div>
        );
    }


    // ==============================
    // UI
    // ==============================

    return (

        <div className="manage-products-page">

            <div className="manage-products-container">

                <h1>
                    Manage Products
                </h1>

                <p>
                    Add, edit and delete ShopKart products
                </p>


                {/* =========================
                    PRODUCT LIST
                ========================= */}

                <div className="manage-products-list">

                    {products.map((product) => (

                        <div
                            className="manage-product-card"
                            key={product.productId}
                        >

                            <img
                                src={product.imageUrl}
                                alt={product.name}
                            />


                            <div className="manage-product-info">

                                <h3>
                                    {product.name}
                                </h3>

                                <p>
                                    {product.category}
                                </p>

                                <strong>
                                    ₹{product.price}
                                </strong>

                            </div>


                            {/* ACTION BUTTONS */}

                            <div className="product-actions">

                                <button
                                    type="button"
                                    className="edit-button"
                                    onClick={() =>
                                        handleEdit(product)
                                    }
                                >
                                    Edit ✏️
                                </button>


                                <button
                                    type="button"
                                    className="delete-button"
                                    onClick={() =>
                                        handleDelete(
                                            product.productId
                                        )
                                    }
                                >
                                    Delete 🗑️
                                </button>

                            </div>

                        </div>

                    ))}

                </div>


                {/* =========================
                    EDIT FORM
                ========================= */}

                {editingProduct && (

                    <div className="edit-section">

                        <h2>
                            Edit Product ✏️
                        </h2>


                        <form
                            onSubmit={handleUpdate}
                        >

                            <label>
                                Product Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={
                                    editingProduct.name
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />


                            <label>
                                Category
                            </label>

                            <input
                                type="text"
                                name="category"
                                value={
                                    editingProduct.category
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />


                            <label>
                                Description
                            </label>

                            <textarea
                                name="description"
                                value={
                                    editingProduct.description
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />


                            <label>
                                Price
                            </label>

                            <input
                                type="number"
                                name="price"
                                value={
                                    editingProduct.price
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />


                            <label>
                                Quantity
                            </label>

                            <input
                                type="number"
                                name="quantity"
                                value={
                                    editingProduct.quantity
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />


                            <label>
                                Image URL
                            </label>

                            <input
                                type="text"
                                name="imageUrl"
                                value={
                                    editingProduct.imageUrl
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />


                            {/* FORM BUTTONS */}

                            <div className="edit-buttons">

                                <button
                                    type="submit"
                                    className="update-button"
                                >
                                    Update Product ✅
                                </button>


                                <button
                                    type="button"
                                    className="cancel-button"
                                    onClick={() =>
                                        setEditingProduct(
                                            null
                                        )
                                    }
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </div>

                )}

            </div>

        </div>
    );
}

export default ManageProducts;