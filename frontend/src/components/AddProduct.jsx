import { useState } from "react";
import API from "../api";
import "./AddProduct.css";

function AddProduct() {

    const [product, setProduct] = useState({
        name: "",
        category: "",
        description: "",
        price: "",
        quantity: "",
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
                ...product,
                price: Number(product.price),
                quantity: Number(product.quantity)
            });

            alert("Product added successfully! 🎉");


            setProduct({
                name: "",
                category: "",
                description: "",
                price: "",
                quantity: "",
                imageUrl: ""
            });


        } catch (error) {

            console.error(
                "Add product error:",
                error
            );

            alert("Failed to add product ❌");

        }
    };


    return (

        <div className="add-product-page">

            <div className="add-product-container">

                <h1>
                    Add New Product
                </h1>

                <p>
                    Add a new product to ShopKart
                </p>


                <form
                    className="add-product-form"
                    onSubmit={handleSubmit}
                >


                    <label>
                        Product Name
                    </label>

                    <input
                        name="name"
                        type="text"
                        placeholder="Enter product name"
                        value={product.name}
                        onChange={handleChange}
                        required
                    />


                    <label>
                        Category
                    </label>

                    <input
                        name="category"
                        type="text"
                        placeholder="Example: Mobiles"
                        value={product.category}
                        onChange={handleChange}
                        required
                    />


                    <label>
                        Description
                    </label>

                    <textarea
                        name="description"
                        placeholder="Enter product description"
                        value={product.description}
                        onChange={handleChange}
                        required
                    />


                    <label>
                        Price
                    </label>

                    <input
                        name="price"
                        type="number"
                        placeholder="Enter price"
                        value={product.price}
                        onChange={handleChange}
                        min="1"
                        required
                    />


                    <label>
                        Quantity
                    </label>

                    <input
                        name="quantity"
                        type="number"
                        placeholder="Enter quantity"
                        value={product.quantity}
                        onChange={handleChange}
                        min="1"
                        required
                    />


                    <label>
                        Image URL
                    </label>

                    <input
                        name="imageUrl"
                        type="text"
                        placeholder="Paste product image URL"
                        value={product.imageUrl}
                        onChange={handleChange}
                        required
                    />


                    <button
                        type="submit"
                        className="add-product-button"
                    >
                        Add Product ➕
                    </button>

                </form>

            </div>

        </div>

    );
}

export default AddProduct;