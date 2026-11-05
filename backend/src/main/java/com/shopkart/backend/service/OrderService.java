package com.shopkart.backend.service;

import com.shopkart.backend.entity.Cart;
import com.shopkart.backend.entity.Order;
import com.shopkart.backend.entity.Product;
import com.shopkart.backend.repository.CartRepository;
import com.shopkart.backend.repository.OrderRepository;
import com.shopkart.backend.repository.ProductRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    public OrderService(
            OrderRepository orderRepository,
            CartRepository cartRepository,
            ProductRepository productRepository) {

        this.orderRepository = orderRepository;
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }

    // CREATE SINGLE ORDER
    public Order createOrder(Order order) {

        return orderRepository.save(order);
    }

    // PLACE ORDER FROM CART
        @Transactional
        public List<Order> placeOrder(Long userId) {

        List<Cart> cartItems =
                cartRepository.findByUserId(userId);

        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        List<Order> orders = new ArrayList<>();

        for (Cart cart : cartItems) {

            Product product = productRepository
                    .findById(cart.getProductId())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Product not found: "
                                            + cart.getProductId()
                            )
                    );

                 //STOCK CHECK
                 if(product.getQuantity() < cart.getQuantity()) {
                    throw new RuntimeException(
                        "Insufficient stock for product: " +product.getName()
                    );
                 }
                 //DECREASE STOCK
                 product.setQuantity(
                    product.getQuantity() - cart.getQuantity()
                 );

                 productRepository.save(product);

            Order order = new Order();

            order.setUserId(userId);
            order.setProductId(cart.getProductId());
            order.setQuantity(cart.getQuantity());

            double totalPrice =
                    product.getPrice() * cart.getQuantity();

            order.setTotalPrice(totalPrice);

            order.setStatus("PLACED");

            Order savedOrder =
                    orderRepository.save(order);

            orders.add(savedOrder);
        }

        // Clear cart after successful order
        cartRepository.deleteAll(cartItems);

        return orders;
    }

    // GET ALL ORDERS
    public List<Order> getAllOrders() {

        return orderRepository.findAll();
    }

    // GET ORDERS BY USER
    public List<Order> getOrdersByUser(Long userId) {

        return orderRepository.findByUserId(userId);
    }

    // GET ORDER BY ID
    public Optional<Order> getOrderById(Long orderId) {

        return orderRepository.findById(orderId);
    }

    // UPDATE ORDER
    public Order updateOrder(
            Long orderId,
            Order orderDetails) {

        Order order = orderRepository
                .findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found")
                );

        order.setUserId(orderDetails.getUserId());
        order.setProductId(orderDetails.getProductId());
        order.setQuantity(orderDetails.getQuantity());
        order.setTotalPrice(orderDetails.getTotalPrice());
        order.setStatus(orderDetails.getStatus());

        if ("CANCELLED".equals(orderDetails.getStatus())
        && !"CANCELLED".equals(order.getStatus())) {

    Product product = productRepository.findById(order.getProductId())
            .orElseThrow(() -> new RuntimeException("Product not found"));

    product.setQuantity(
            product.getQuantity() + order.getQuantity()
    );

    productRepository.save(product);
    }

        return orderRepository.save(order);
    }

    // DELETE ORDER
    public void deleteOrder(Long orderId) {

        Order order = orderRepository
                .findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found")
                );

        orderRepository.delete(order);
    }
}