package pl.server.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.server.server.models.Ticket;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket,String> {
    List<Ticket> findByKeyWord(String KeyWord);
    List<Ticket> findByDate(LocalDateTime localDateTime);
}
