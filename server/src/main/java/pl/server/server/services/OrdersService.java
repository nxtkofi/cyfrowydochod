package pl.server.server.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import pl.server.server.helpers.ResourceNotFoundException;
import pl.server.server.models.Book;
import pl.server.server.models.Order;
import pl.server.server.models.OrderItem;
import pl.server.server.models.User;
import pl.server.server.repositories.BookRepository;
import pl.server.server.repositories.OrderItemRepository;
import pl.server.server.repositories.OrdersRepository;
import pl.server.server.repositories.UserRepository;

@Service
public class OrdersService {

    @Autowired
    private OrdersRepository orderRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Order> getAllOrders() {
        try {
           return orderRepository.findAll();
        }catch (Exception ex) {
            System.err.println(ex);
            throw new RuntimeException(ex);
        }
    }

    public Order getOrderById(String orderId) {
        try {
            return orderRepository.findById(orderId)
                    .orElseThrow(() -> new ResourceNotFoundException("Order not found"));

        } catch (ResourceNotFoundException notFoundException) {
            throw notFoundException;
        }catch (Exception ex) {
            System.err.println(ex);
            throw new RuntimeException(ex);
        }
    }

    @Transactional
    public Order createOrderFromCart(List<String> bookIds, String userId) {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
            List<Book> books = bookRepository.findAllById(bookIds);

            double totalAmount = books.stream().mapToDouble(Book::getPrice).sum();

            Order order = Order.builder()
                    .orderDate(LocalDateTime.now())
                    .amount(totalAmount)
                    .user(user)
                    .build();

            List<OrderItem> orderItems = books.stream()
                    .map(book -> OrderItem.builder()
                            .book(book)
                            .order(order)
                            .build())
                    .collect(Collectors.toList());

            orderItems.forEach(orderItem -> orderItemRepository.save(orderItem));
            order.setOrderItems(orderItems);

            return orderRepository.save(order);
        } catch (ResourceNotFoundException notFoundException) {
            throw notFoundException;
        }catch (Exception ex) {
            System.err.println(ex);
            throw new RuntimeException(ex);
        }
    }
    @Transactional
    public void deleteOrder(String orderId) {
        try {
            Order orderToDelete = orderRepository.findById(orderId)
                    .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
            User user = orderToDelete.getUser();
            user.getOrders().remove(orderToDelete);
            orderRepository.delete(orderToDelete);
        } catch (ResourceNotFoundException notFoundException) {
            throw notFoundException;
        }catch (Exception ex) {
            System.err.println(ex);
            throw new RuntimeException(ex);
        }
    }

}
