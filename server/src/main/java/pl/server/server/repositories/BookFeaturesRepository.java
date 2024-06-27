package pl.server.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.server.server.models.BookFeatures;

@Repository
public interface BookFeaturesRepository extends JpaRepository<BookFeatures,String> {
}
