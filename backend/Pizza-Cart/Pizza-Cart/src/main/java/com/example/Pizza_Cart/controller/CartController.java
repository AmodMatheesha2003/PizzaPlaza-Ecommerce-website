package com.example.Pizza_Cart.controller;

import com.example.Pizza_Cart.data.Cart;
import com.example.Pizza_Cart.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<Cart> addcart(
            @RequestParam("uid") int uid,
            @RequestParam("mid") int mid,
            @RequestParam("quantity") int quantity) {

        Cart cart = new Cart();
        cart.setUid(uid);
        cart.setMid(mid);
        cart.setQuantity(quantity);

        Cart addCart = cartService.saveCart(cart);
        return ResponseEntity.ok(addCart);
    }

    @GetMapping("/{uid}")
    public ResponseEntity<List<int[]>> getCartsByUser(@PathVariable("uid") int uid) {
        List<Cart> carts = cartService.getCartsByUser(uid);
        List<int[]> response = carts.stream()
                .map(cart -> new int[]{cart.getMid(),cart.getQuantity(), cart.getId(),cart.getUid()})
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

//    @RequestMapping(path = "/cart",method = RequestMethod.GET)
    @GetMapping("/all")
    public List<Cart> getAllCart(){
        return cartService.getAllCart();
    }

    @DeleteMapping(path="/{cartId}")
    public ResponseEntity<String> deleteCart(@PathVariable("cartId") int id) {
        return cartService.deleteCart(id);
    }

    @PutMapping("/user/{uid}/item/{mid}")
    public ResponseEntity<Cart> updateCart(@PathVariable("uid") int uid, @PathVariable("mid") int mid, @RequestBody Cart newCartData) {
        try {
            Cart updatedCart = cartService.updateCart(uid, mid, newCartData);
            return ResponseEntity.ok(updatedCart);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/user/{uid}/item/{mid}")
    public ResponseEntity<Void> deleteCartItem(@PathVariable("uid") int uid, @PathVariable("mid") int mid) {
        try {
            cartService.deleteCartItem(uid, mid);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
