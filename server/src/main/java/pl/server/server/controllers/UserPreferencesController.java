package pl.server.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.server.server.models.UserPreferences;
import pl.server.server.services.UserPreferencesService;

@RestController
@RequestMapping("/api/userpreferences")
@Component(value = "userPreferencesController")
public class UserPreferencesController {
    @Autowired
    UserPreferencesService userPreferencesService;
    
    @GetMapping("/{userId}/preferences")
    public ResponseEntity<UserPreferences> getPreferencesByUserId(@PathVariable String userId) {
        return userPreferencesService.getPreferencesByUserId(userId);
    }

    @PutMapping("/{userId}/preferences")
    public ResponseEntity<?> updatePreferencesByUserId(@PathVariable String userId, @RequestBody UserPreferences newUserPreferences) {
        return userPreferencesService.updateUserPreferences(userId, newUserPreferences);
    }
}
