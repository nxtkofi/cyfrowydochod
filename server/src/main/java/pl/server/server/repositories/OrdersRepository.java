package pl.server.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.server.server.models.Order;

@Repository
public interface OrdersRepository extends JpaRepository<Order,String> {
}
