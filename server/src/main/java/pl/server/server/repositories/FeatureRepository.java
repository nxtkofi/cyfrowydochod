package pl.server.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.server.server.models.Feature;
import java.util.List;
@Repository
public interface FeatureRepository extends JpaRepository<Feature,String> {
    List<Feature> findByDescription(String description);
}