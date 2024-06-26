package pl.server.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.server.server.DTOs.OrderRequest;
import pl.server.server.helpers.ResourceNotFoundException;
import pl.server.server.models.Order;
import pl.server.server.services.OrdersService;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    OrdersService ordersService;

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        try {
            List<Order> AllOrders = ordersService.getAllOrders();
            return ResponseEntity.ok(AllOrders);
        } catch (RuntimeException exception) {
            System.err.println(exception);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<Order> getOrderById(@PathVariable String orderId) {
        try {
            Order order = ordersService.getOrderById(orderId);
            return ResponseEntity.ok(order);
        } catch (ResourceNotFoundException notFoundException) {
            return ResponseEntity.notFound().build();
        } catch (RuntimeException exception) {
            System.err.println(exception);
            return ResponseEntity.badRequest().build();
        }
    }

        @PostMapping("/user/{userId}")
    public ResponseEntity<Order> createOrderFromCart(@RequestBody OrderRequest request, @PathVariable String userId) {
            try {
                return  ResponseEntity.ok(ordersService.createOrderFromCart(request.getBooksId(),userId));
            } catch (ResourceNotFoundException notFoundException) {
                return ResponseEntity.notFound().build();
            } catch (RuntimeException exception) {
                System.err.println(exception);
                return ResponseEntity.badRequest().build();
            }
        }

    @DeleteMapping("{orderId}")
    public ResponseEntity<Order> deleteOrder(@PathVariable String orderId) {
        try {
            ordersService.deleteOrder(orderId);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException notFoundException) {
            return ResponseEntity.notFound().build();
        } catch (RuntimeException exception) {
            System.err.println(exception);
            return ResponseEntity.badRequest().build();
        }
    }
}
