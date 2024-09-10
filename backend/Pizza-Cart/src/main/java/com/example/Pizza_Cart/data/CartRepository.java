package com.example.Pizza_Cart.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    List<Cart> findByUid(int uid);
    Optional<Cart> findByUidAndMid(int uid, int mid);
}
