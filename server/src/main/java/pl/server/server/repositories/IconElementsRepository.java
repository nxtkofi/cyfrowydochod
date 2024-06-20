package pl.server.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.server.server.models.IconElements;
@Repository
public interface IconElementsRepository extends JpaRepository<IconElements,String> {
}
