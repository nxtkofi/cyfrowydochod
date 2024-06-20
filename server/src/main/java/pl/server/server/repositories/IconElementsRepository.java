package pl.server.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.server.server.models.IconElements;

public interface IconElementsRepository extends JpaRepository<IconElements,String> {
}
