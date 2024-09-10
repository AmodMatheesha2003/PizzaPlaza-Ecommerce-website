package com.example.Pizza_Order.data;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUid(int uid);

    List<Order> findByOstatusNot(String ostatus);
}
