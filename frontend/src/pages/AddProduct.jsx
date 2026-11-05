import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function AddProduct() {
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        imageUrl: ""
    });

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post("/products", {
                name: product.name,
                description: product.description,
                price: Number(product.price),
                quantity: Number(product.quantity),
                category: product.category,
                imageUrl: product.imageUrl
            });

            alert("Product added successfully! 🎉");

            navigate("/admin");
        } catch (error) {
            console.error("Add product error:", error);
            alert("Failed to add product");
        }
    };

    return (
        <div style={{ padding: "30px" }}>
            <h2>Add New Product</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={product.description}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={product.quantity}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={product.category}
                    onChange={handleChange}
                    required
                />

                <br /><br />

                <input
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={product.imageUrl}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Add Product
                </button>

            </form>
        </div>
    );
}

export default AddProduct;