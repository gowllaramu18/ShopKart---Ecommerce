package com.shopkart.backend.controller;

import com.shopkart.backend.entity.Order;
import com.shopkart.backend.service.OrderService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // CREATE ORDER
    @PostMapping
    public ResponseEntity<Order> createOrder(
            @RequestBody Order order) {

        return ResponseEntity.ok(
                orderService.createOrder(order)
        );
    }

    // PLACE ORDER FROM CART
    @PostMapping("/place/{userId}")
    public ResponseEntity<List<Order>> placeOrder(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                orderService.placeOrder(userId)
        );
    }

    // GET ALL ORDERS
    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {

        return ResponseEntity.ok(
                orderService.getAllOrders()
        );
    }

    // GET ORDERS BY USER
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUser(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                orderService.getOrdersByUser(userId)
        );
    }

    // GET ORDER BY ID
    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(
            @PathVariable Long orderId) {

        Optional<Order> order =
                orderService.getOrderById(orderId);

        return order
                .map(ResponseEntity::ok)
                .orElseGet(
                        () -> ResponseEntity.notFound().build()
                );
    }

    // UPDATE ORDER
    @PutMapping("/{orderId}")
    public ResponseEntity<Order> updateOrder(
            @PathVariable Long orderId,
            @RequestBody Order order) {

        return ResponseEntity.ok(
                orderService.updateOrder(
                        orderId,
                        order
                )
        );
    }

    // DELETE ORDER
    @DeleteMapping("/{orderId}")
    public ResponseEntity<String> deleteOrder(
            @PathVariable Long orderId) {

        orderService.deleteOrder(orderId);

        return ResponseEntity.ok(
                "Order deleted successfully"
        );
    }
}