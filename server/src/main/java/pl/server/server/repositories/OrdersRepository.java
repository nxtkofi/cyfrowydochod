package pl.server.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.server.server.models.Orders;

import java.util.Date;

public interface OrdersRepository extends JpaRepository<Orders,String> {
    Orders findByDate(Date date);
}
