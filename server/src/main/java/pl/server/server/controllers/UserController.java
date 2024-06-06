package pl.server.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.server.server.helpers.ResourceNotFoundException;
import pl.server.server.models.User;
import pl.server.server.repositories.UserRepository;

@RestController
@RequestMapping("/api/users")
public class UserController {
//Crud - create read update delete

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{id}")
    public User getUserById(@PathVariable String id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{username}")
    public List<User> findByUsername(@PathVariable String username) {  //Optional
        List<User> users = userRepository.findByUsername(username);
        if (users == null || users.isEmpty()) {
            throw new ResourceNotFoundException("User not found with username: " + username);
        }
        return users;
    }
    @GetMapping("/{email}")
    public List<User> findByEmail(@PathVariable String email) {  //Can two users have the same email address?
        List<User> users = userRepository.findByEmail(email);
        if (users == null || users.isEmpty()) {
            throw new ResourceNotFoundException("User not found with email: " + email);
        }
        return users;
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PutMapping("{id}")
    public User updateUser(@PathVariable String id, @RequestBody User updatedUser) {
        User userToUpdate = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        userToUpdate.setEmail(updatedUser.getEmail());
        userToUpdate.setUsername(updatedUser.getUsername());
        userToUpdate.setPassword(updatedUser.getPassword());
        return userRepository.save(userToUpdate);
    }

    @DeleteMapping("{id}")
    public void deleteUser(@PathVariable String  id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        userRepository.delete(user);
    }

}
