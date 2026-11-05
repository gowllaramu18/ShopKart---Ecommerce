
package com.shopkart.backend.repository;

import com.shopkart.backend.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserId(Long userId);

    // Get orders by status
    List<Order> findByStatusIgnoreCase(String status);

    // Get orders that are not cancelled
    List<Order> findByStatusNotIgnoreCase(String status);
}
