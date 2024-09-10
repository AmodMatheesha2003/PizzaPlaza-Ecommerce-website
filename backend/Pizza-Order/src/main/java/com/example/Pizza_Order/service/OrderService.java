package com.example.Pizza_Order.service;

import com.example.Pizza_Order.data.OrderRepository;
import com.example.Pizza_Order.data.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderepository;

    public Order saveOrder(Order order){
        return orderepository.save(order);
    }

    public List<Order> getOrdersByUid(int uid) {
        return orderepository.findByUid(uid);
    }

    public List<Order> getAllOrderUser(){
        return orderepository.findAll();
    }

    public Order getOrderById(int oid) {
        Optional<Order> orderOptional = orderepository.findById(oid);
        return orderOptional.orElse(null);
    }

    public List<Order> getOrdersNotDelivered() {
        return orderepository.findByOstatusNot("Delivered");
    }
}
