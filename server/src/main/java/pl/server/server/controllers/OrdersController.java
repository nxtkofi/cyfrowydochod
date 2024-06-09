package pl.server.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.server.server.helpers.ResourceNotFoundException;
import pl.server.server.models.Order;
import pl.server.server.repositories.OrdersRepository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/Orders")
public class OrdersController {

    @Autowired
    private OrdersRepository ordersRepository;

    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable String id) {
        return ordersRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
    }

    @GetMapping
    public List<Order> getAllOrders() {
        return ordersRepository.findAll();
    }

    @GetMapping("/{orderDate}")
    public List<Order> findByDate(@PathVariable LocalDateTime orderDate) {
        List<Order> orders = ordersRepository.findByOrderDate(orderDate);
        if (orders == null || orders.isEmpty()) {
            throw new ResourceNotFoundException("Order not found with title: " + orderDate);
        }
        return orders;
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        return ordersRepository.save(order);
    }

    @PutMapping("{id}")
    public Order updateOrder(@PathVariable String id, @RequestBody Order updatedOrder) {
        Order orderToUpdate = ordersRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
        orderToUpdate.setOrderDate(updatedOrder.getOrderDate());
        orderToUpdate.setCount(updatedOrder.getCount());
        orderToUpdate.setAmount(updatedOrder.getAmount());
        return ordersRepository.save(updatedOrder);
    }

    @DeleteMapping("{id}")
    public void deleteOrder(@PathVariable String id) {
        Order order = ordersRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
        ordersRepository.delete(order);
    }
}
