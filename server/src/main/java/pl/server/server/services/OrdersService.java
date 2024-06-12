package pl.server.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.server.server.models.*;
import pl.server.server.repositories.BookRepository;
import pl.server.server.repositories.OrdersRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrdersService {

    @Autowired
    private OrdersRepository orderRepository;

    @Autowired
    private BookRepository bookRepository;

    public Order createOrderFromCart(List<String> bookIds, User user) {

        List<Book> books = bookRepository.findAllById(bookIds);

        double totalAmount = books.stream().mapToDouble(Book::getPrice).sum();


        Order order = Order.builder()
                .orderDate(LocalDateTime.now())
                .amount(totalAmount)
                .user(user)
                .build();

        List<OrderItem> orderItems = books.stream()
                .map(book -> {
                    OrderItem orderItem = new OrderItem();
                    orderItem.setBook(book);
                    orderItem.setCount(1);  // Zakładając jedną sztukę każdej książki
                    orderItem.setOrder(order);
                    return orderItem;
                })
                .collect(Collectors.toList());

        // Powiąż pozycje zamówienia z zamówieniem
        order.setOrderItems(orderItems);

        // Zapisz zamówienie w repozytorium
        return orderRepository.save(order);
    }
}
