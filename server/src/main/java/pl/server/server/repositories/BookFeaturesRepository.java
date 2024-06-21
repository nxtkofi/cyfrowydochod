package pl.server.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.server.server.models.BookFeatures;

import java.util.Optional;

@Repository
public interface BookFeaturesRepository extends JpaRepository<BookFeatures,String> {

    BookFeatures findByBookIdAndFeatureId(String bookId, String featureId);
}
