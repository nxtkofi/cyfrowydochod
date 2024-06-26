package pl.server.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import pl.server.server.helpers.ResourceNotFoundException;
import pl.server.server.models.User;
import pl.server.server.models.UserPreferences;
import pl.server.server.repositories.UserPreferencesRepository;
import pl.server.server.repositories.UserRepository;

@Service
public class UserPreferencesService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    UserPreferencesRepository userPreferencesRepository;
    public ResponseEntity<UserPreferences> getPreferencesByUserId(String userId){
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        UserPreferences userPrefs = user.getUserPreferences();
        return ResponseEntity.ok(userPrefs);
    }
    public ResponseEntity<?> updateUserPreferences(String userId, UserPreferences newUserPreferences){
        try {
            User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        UserPreferences oldPreferences = user.getUserPreferences();
            oldPreferences.setAvatar(newUserPreferences.getAvatar());
            oldPreferences.setGetNewsLetter(newUserPreferences.isGetNewsLetter());
            oldPreferences.setGetPriceDrops(newUserPreferences.isGetPriceDrops());
            oldPreferences.setGetTrendingEbooks(newUserPreferences.isGetTrendingEbooks());
            oldPreferences.setDarkMode(newUserPreferences.isDarkMode());
    
            userPreferencesRepository.save(oldPreferences);
    
            return ResponseEntity.ok(oldPreferences);
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid request");
        }
    }
}
