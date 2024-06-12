package pl.server.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.server.server.models.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem,String> {
}
