package com.shopkart.backend.controller;

import com.shopkart.backend.entity.Cart;
import com.shopkart.backend.service.CartService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    // ==============================
    // ADD TO CART
    // ==============================
    @PostMapping
    public ResponseEntity<Cart> addToCart(
            @RequestBody Cart cart) {

        return ResponseEntity.ok(
                cartService.addToCart(cart)
        );
    }

    // ==============================
    // GET USER CART
    // ==============================
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Cart>> getUserCart(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                cartService.getUserCart(userId)
        );
    }

    // ==============================
    // GET CART BY ID
    // ==============================
    @GetMapping("/{cartId}")
    public ResponseEntity<Cart> getCartById(
            @PathVariable Long cartId) {

        Optional<Cart> cart =
                cartService.getCartById(cartId);

        return cart
                .map(ResponseEntity::ok)
                .orElse(
                        ResponseEntity.notFound().build()
                );
    }

    // ==============================
    // UPDATE CART
    // ==============================
    @PutMapping("/{cartId}")
    public ResponseEntity<Cart> updateCart(
            @PathVariable Long cartId,
            @RequestBody Cart cart) {

        return ResponseEntity.ok(
                cartService.updateCart(
                        cartId,
                        cart
                )
        );
    }

    // ==============================
    // DELETE CART ITEM
    // ==============================
    @DeleteMapping("/{cartId}")
    public ResponseEntity<String> removeFromCart(
            @PathVariable Long cartId) {

        cartService.removeFromCart(cartId);

        return ResponseEntity.ok(
                "Item removed from cart successfully"
        );
    }

    // ==============================
    // CLEAR USER CART
    // ==============================
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<String> clearCart(
            @PathVariable Long userId) {

        cartService.clearCart(userId);

        return ResponseEntity.ok(
                "Cart cleared successfully"
        );
    }
}