package pl.server.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.server.server.models.Book;
import pl.server.server.models.User;

import java.util.List;
@Repository
public interface BookRepository extends JpaRepository<Book,String> {
    List<Book> findByTitle(String title);
}
