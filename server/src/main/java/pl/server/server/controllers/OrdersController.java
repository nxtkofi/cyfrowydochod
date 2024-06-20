package pl.server.server.controllers;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.server.server.helpers.ResourceNotFoundException;
import pl.server.server.models.Order;
import pl.server.server.repositories.OrdersRepository;

@RestController
@RequestMapping("/api/orders")
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


    @PutMapping("{id}")
    public Order updateOrder(@PathVariable String id, @RequestBody Order updatedOrder) {
        Order orderToUpdate = ordersRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
        orderToUpdate.setOrderDate(updatedOrder.getOrderDate());
        orderToUpdate.setAmount(updatedOrder.getAmount());
        return ordersRepository.save(updatedOrder);
    }

    @DeleteMapping("{id}")
    public void deleteOrder(@PathVariable String id) {
        Order order = ordersRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + id));
        ordersRepository.delete(order);
    }
}
