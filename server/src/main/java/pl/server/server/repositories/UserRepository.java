package pl.server.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.server.server.models.User;

public interface UserRepository extends JpaRepository<User,Long> {
    
}
