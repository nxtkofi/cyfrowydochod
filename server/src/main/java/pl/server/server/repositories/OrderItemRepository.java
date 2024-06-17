package pl.server.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.server.server.models.OrderItem;
@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem,String> {
}
