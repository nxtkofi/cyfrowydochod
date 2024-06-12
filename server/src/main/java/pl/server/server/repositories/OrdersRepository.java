package pl.server.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.server.server.models.Order;

import java.time.LocalDateTime;
import java.util.List;

public interface OrdersRepository extends JpaRepository<Order,String> {
    List<Order> findByOrderDate(LocalDateTime orderDate);
}
