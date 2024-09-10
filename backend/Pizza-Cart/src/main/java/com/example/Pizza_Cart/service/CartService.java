package com.example.Pizza_Cart.service;

import com.example.Pizza_Cart.data.Cart;
import com.example.Pizza_Cart.data.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    @Autowired
    private CartRepository cartRepository;

    public Cart saveCart(Cart Cart){
        return cartRepository.save(Cart);
    }

    public List<Cart> getCartsByUser(int uid){
        return cartRepository.findByUid(uid);
    }

    public List<Cart> getAllCart(){
        return cartRepository.findAll();
    }

    public String deleteCart(int id){
        cartRepository.deleteById(id);
        return "Cart remove succussfully";
    }

    public Cart updateCart(int uid, int mid, Cart newCartData) {
        Optional<Cart> existingCart = cartRepository.findByUidAndMid(uid, mid);
        if (existingCart.isPresent()) {
            Cart cart = existingCart.get();
            cart.setQuantity(newCartData.getQuantity());
            return cartRepository.save(cart);
        } else {
            throw new RuntimeException("not found");
        }
    }

    public void deleteCartItem(int uid, int mid) {
        Optional<Cart> existingCart = cartRepository.findByUidAndMid(uid, mid);
        if (existingCart.isPresent()) {
            cartRepository.delete(existingCart.get());
        } else {
            throw new RuntimeException("Cart item not found");
        }
    }

}
