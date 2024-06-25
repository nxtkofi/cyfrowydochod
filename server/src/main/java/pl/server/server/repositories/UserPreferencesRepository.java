package pl.server.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import pl.server.server.models.UserPreferences;

public interface UserPreferencesRepository extends JpaRepository<UserPreferences, String> {
    UserPreferences findByUserId(String userId);
}
