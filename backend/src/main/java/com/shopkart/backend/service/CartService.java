package com.shopkart.backend.service;

import com.shopkart.backend.entity.Cart;
import com.shopkart.backend.repository.CartRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;

    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    // ==============================
    // ADD TO CART
    // ==============================
    public Cart addToCart(Cart cart) {

        Optional<Cart> existingCart =
                cartRepository.findByUserIdAndProductId(
                        cart.getUserId(),
                        cart.getProductId()
                );

        if (existingCart.isPresent()) {

            Cart existing = existingCart.get();

            existing.setQuantity(
                    existing.getQuantity() + cart.getQuantity()
            );

            return cartRepository.save(existing);
        }

        return cartRepository.save(cart);
    }

    // ==============================
    // GET USER CART
    // ==============================
    public List<Cart> getUserCart(Long userId) {

        return cartRepository.findByUserId(userId);
    }

    // ==============================
    // GET CART BY ID
    // ==============================
    public Optional<Cart> getCartById(Long cartId) {

        return cartRepository.findById(cartId);
    }

    // ==============================
    // UPDATE CART
    // ==============================
    @Transactional
    public Cart updateCart(Long cartId, Cart cartDetails) {

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Cart item not found: " + cartId
                        )
                );

        if (cartDetails == null ||
                cartDetails.getQuantity() == null ||
                cartDetails.getQuantity() <= 0) {

            throw new RuntimeException(
                    "Quantity must be greater than 0"
            );
        }

        cart.setQuantity(cartDetails.getQuantity());

        return cartRepository.save(cart);
    }

    // ==============================
    // DELETE CART ITEM
    // ==============================
    @Transactional
    public void removeFromCart(Long cartId) {

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Cart item not found: " + cartId
                        )
                );

        cartRepository.delete(cart);
        cartRepository.flush();
    }

    // ==============================
    // CLEAR CART
    // ==============================
    @Transactional
    public void clearCart(Long userId) {

        List<Cart> cartItems =
                cartRepository.findByUserId(userId);

        cartRepository.deleteAll(cartItems);
        cartRepository.flush();
    }
}