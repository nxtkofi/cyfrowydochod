package pl.server.server.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.server.server.models.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket,String> {
    List<Ticket> findByDate(long localDateTime);
    List<Ticket> findByUserId(String userId);
}
