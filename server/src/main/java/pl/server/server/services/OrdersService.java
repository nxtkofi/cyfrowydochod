package pl.server.server.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import pl.server.server.models.Book;
import pl.server.server.models.Order;
import pl.server.server.models.OrderItem;
import pl.server.server.models.User;
import pl.server.server.repositories.BookRepository;
import pl.server.server.repositories.OrderItemRepository;
import pl.server.server.repositories.OrdersRepository;

@Service
public class OrdersService {

    @Autowired
    private OrdersRepository orderRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;
    @Transactional
    public Order createOrderFromCart(List<String> bookIds, User user) {
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
        order.setOrderItem(orderItems);

        return orderRepository.save(order);
    }
}
