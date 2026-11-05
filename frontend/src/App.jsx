import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Navbar from "./components/Navbar";

import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";

import ManageProducts from "./components/ManageProducts";

import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

import OrderHistory from "./components/OrderHistory";

import Login from "./components/Login";
import Register from "./components/Register";

import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./pages/AdminRoute";
import AddProduct from "./pages/AddProduct";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";
import AdminSales from "./pages/AdminSales";


function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                {/* ================= HOME ================= */}

                <Route
                    path="/"
                    element={<Home />}
                />


                {/* ================= PRODUCTS ================= */}

                <Route
                    path="/products"
                    element={<ProductList />}
                />

                <Route
                     path="/admin/orders"
                      element={
                      <AdminRoute>
                       <AdminOrders />
                       </AdminRoute>
                      }
                    />
                    <Route
    path="/admin/users"
    element={
                         <AdminRoute>
                          <AdminUsers />
                          </AdminRoute>
                          }
                       />

                <Route
                    path="/product/:productId"
                    element={<ProductDetails />}
                />


                {/* ================= AUTH ================= */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* ================= CART ================= */}

                <Route
                    path="/cart"
                    element={<Cart />}
                />

                <Route
                    path="/checkout"
                    element={<Checkout />}
                />

                <Route
                    path="/orders"
                    element={<OrderHistory />}
                />


                {/* ================= ADMIN ================= */}
                   
                   <Route
                        path="/admin"
                          element={
                        <AdminRoute>
                                <AdminDashboard />
                        </AdminRoute>
                          }
                    />

                {/* ================= ADD PRODUCT ================= */}

                <Route
                    path="/admin/add-product"
                    element={
                        <AdminRoute>
                            <AddProduct />
                        </AdminRoute>
                    }
                />


                {/* ================= OLD ADD PRODUCT ROUTE ================= */}

                <Route
                    path="/add-product"
                    element={
                        <AdminRoute>
                            <AddProduct />
                        </AdminRoute>
                    }
                />


                {/* ================= MANAGE PRODUCTS ================= */}

                <Route
                    path="/manage-products"
                    element={
                        <AdminRoute>
                            <ManageProducts />
                        </AdminRoute>
                    }
                />
                
                <Route
                      path="/admin/sales"
                       element={
                    <AdminRoute>
                         <AdminSales />
                    </AdminRoute>
                               }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;