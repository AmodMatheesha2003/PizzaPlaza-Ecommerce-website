package com.example.Pizza_Order.controller;

import com.example.Pizza_Order.data.Order;
import com.example.Pizza_Order.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/add")
    public ResponseEntity<Order> addOrder(
            @RequestParam("uid") int uid,
            @RequestParam("mid") int mid,
            @RequestParam("quantity") int quantity,
            @RequestParam("total") int total,
            @RequestParam("address") String address,
            @RequestParam("ostatus") String ostatus,
            @RequestParam("order_details") String order_details){


        Order order = new Order();
        order.setUid(uid);
        order.setMid(mid);
        order.setQuantity(quantity);
        order.setTotal(BigDecimal.valueOf(total));
        order.setAddress(address);
        order.setOrder_details(order_details);
        order.setOstatus(ostatus);
        order.setOrder_date(LocalDate.now());
        order.setOrder_time(LocalTime.now());

        Order addedOrder = orderService.saveOrder(order);
        return ResponseEntity.ok(addedOrder);
    }

    @GetMapping("/user/{uid}")
    public ResponseEntity<List<Order>> getOrdersByUid(@PathVariable int uid) {
            List<Order> orders = orderService.getOrdersByUid(uid);
            return ResponseEntity.ok(orders);
    }

    @GetMapping(path="/users")
    public List<Order> getAllOrderUser(){
        return orderService.getAllOrderUser();
    }

    @PutMapping("/update/{oid}")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable("oid") int oid,
            @RequestParam("ostatus") String ostatus) {

        Order order = orderService.getOrderById(oid);

        if (order != null) {
            order.setOstatus(ostatus);
            Order updatedOrder = orderService.saveOrder(order);
            return ResponseEntity.ok(updatedOrder);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/progress")
    public ResponseEntity<List<Order>> getNotDeliveredOrders() {
        List<Order> orders = orderService.getOrdersNotDelivered();
        return ResponseEntity.ok(orders);
    }

}
