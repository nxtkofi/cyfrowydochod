package pl.server.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.server.server.models.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, String> {
}
