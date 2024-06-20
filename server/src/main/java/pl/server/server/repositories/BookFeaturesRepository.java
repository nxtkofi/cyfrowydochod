package pl.server.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.server.server.models.BookFeatures;

public interface BookFeaturesRepository extends JpaRepository<BookFeatures,String> {
}
