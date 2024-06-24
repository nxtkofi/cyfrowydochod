package pl.server.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.server.server.models.Book;
@Repository
public interface BookRepository extends JpaRepository<Book,String> {
    Book findByTitle(String title);
}
