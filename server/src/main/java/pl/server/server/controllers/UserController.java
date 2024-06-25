package pl.server.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
