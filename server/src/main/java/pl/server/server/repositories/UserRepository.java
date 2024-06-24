package pl.server.server.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.server.server.models.User;

@Repository
public interface UserRepository extends JpaRepository<User,String> {
    List<User> findByUsername(String username);
    User findByEmail(String email);
    
}
