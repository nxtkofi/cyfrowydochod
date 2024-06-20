package pl.server.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.server.server.models.Feature;
@Repository
public interface FeatureRepository extends JpaRepository<Feature,String> {
}
