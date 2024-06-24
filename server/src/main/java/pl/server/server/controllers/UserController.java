package pl.server.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import pl.server.server.helpers.ResourceNotFoundException;
import pl.server.server.models.User;
import pl.server.server.repositories.UserRepository;
import pl.server.server.services.UserService;

@RestController
@RequestMapping("/api/users")
@Component(value = "userController")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    UserService userService;

    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/username/{username}")
    public List<User> findByUsername(@PathVariable String username) { // Optional
        List<User> users = userRepository.findByUsername(username);
        if (users == null || users.isEmpty()) {
            throw new ResourceNotFoundException("User not found with username: " + username);
        }
        return users;
    }

    @GetMapping("/email/{email}")
    public User findByEmail(@PathVariable String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new ResourceNotFoundException("User not found with email: " + email);
        }
        return user;
    }

    @PutMapping("/id/{id}")
    public ResponseEntity<String> updateUser(@PathVariable String id, @RequestBody User updatedUser,
            HttpServletRequest request) {
                System.out.println("Updating user");

        return userService.updateUser(id, updatedUser, request);
    }

    @DeleteMapping("/id/{id}")
    public void deleteUser(@PathVariable String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        userRepository.delete(user);
    }

}
