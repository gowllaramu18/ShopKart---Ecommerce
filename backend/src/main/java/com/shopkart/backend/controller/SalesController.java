
package com.shopkart.backend.controller;

import com.shopkart.backend.entity.Order;
import com.shopkart.backend.repository.OrderRepository;

import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/sales")
@CrossOrigin(origins = "http://localhost:5173")
public class SalesController {

    private final OrderRepository orderRepository;

    public SalesController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // GET SALES SUMMARY
    @GetMapping("/summary")
    public Map<String, Object> getSalesSummary() {

        // Fetch all orders from the database
        List<Order> allOrders = orderRepository.findAll();

        // Exclude CANCELLED orders from sales calculations
        // Keep NULL statuses included to match the SQL query
        List<Order> validOrders = allOrders.stream()
                .filter(order ->
                        order.getStatus() == null ||
                        !order.getStatus().equalsIgnoreCase("CANCELLED"))
                .collect(Collectors.toList());

        // Calculate total sales
        double totalSales = validOrders.stream()
                .mapToDouble(order ->
                        order.getTotalPrice() != null
                                ? order.getTotalPrice()
                                : 0.0)
                .sum();

        // Count orders by status
        Map<String, Long> statusSummary = allOrders.stream()
                .collect(Collectors.groupingBy(
                        order -> order.getStatus() != null
                                ? order.getStatus().toUpperCase()
                                : "UNKNOWN",
                        LinkedHashMap::new,
                        Collectors.counting()
                ));

        // Prepare sales summary response
        Map<String, Object> summary = new LinkedHashMap<>();

        summary.put("totalSales", totalSales);
        summary.put("totalOrders", allOrders.size());
        summary.put("salesOrders", validOrders.size());
        summary.put("statusSummary", statusSummary);

        // Get the five most recent orders
        List<Map<String, Object>> recentOrders = allOrders.stream()
                .sorted((a, b) -> {
                    if (a.getOrderDate() == null) {
                        return b.getOrderDate() == null ? 0 : 1;
                    }

                    if (b.getOrderDate() == null) {
                        return -1;
                    }

                    return b.getOrderDate()
                            .compareTo(a.getOrderDate());
                })
                .limit(5)
                .map(order -> {
                    Map<String, Object> item =
                            new LinkedHashMap<>();

                    item.put("orderId", order.getOrderId());
                    item.put("userId", order.getUserId());
                    item.put("totalPrice", order.getTotalPrice());
                    item.put("status", order.getStatus());
                    item.put("orderDate", order.getOrderDate());

                    return item;
                })
                .collect(Collectors.toList());

        summary.put("recentOrders", recentOrders);

        return summary;
    }
}
