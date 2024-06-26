package pl.server.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import jakarta.servlet.http.HttpServletRequest;
import pl.server.server.config.JwtAuthenticationFilter;
import pl.server.server.helpers.ResourceNotFoundException;
import pl.server.server.models.User;
import pl.server.server.repositories.UserRepository;

import java.nio.file.AccessDeniedException;
import java.util.List;

@Service
public class UserService {

    @Autowired
    AuthService authService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JwtAuthenticationFilter jwtAuth;

    public User getUserById(String userId) {
        try {
            return userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        } catch (ResourceNotFoundException notFoundException) {
            throw notFoundException;
        }catch (Exception ex) {
            System.err.println(ex);
            throw new RuntimeException(ex);
        }
    }

    public List<User> getAllUsers() {
        try {
            return userRepository.findAll();
        }catch (Exception ex) {
            System.err.println(ex);
            throw new RuntimeException(ex);
        }
    }

    public List<User> getUsersByUsername(String username) {
        try {
            return userRepository.findByUsername(username);
        }catch (Exception ex) {
            System.err.println(ex);
            throw new RuntimeException(ex);
        }
    }

    public User getUserByEmail(String email) {
        try {
            return userRepository.findByEmail(email)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        } catch (ResourceNotFoundException notFoundException) {
            throw notFoundException;
        }catch (Exception ex) {
            System.err.println(ex);
            throw new RuntimeException(ex);
        }
    }

    public User registerUser(User user) {
        String encodedSaltedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedSaltedPassword);
        return userRepository.save(user);
    }

    public ResponseEntity<String> updateUser(@PathVariable String id, @RequestBody User updatedUser,
            HttpServletRequest request) {
        Boolean passwordsMatch = authService.verifyUserPassword(updatedUser.getPassword(),id);
        if (passwordsMatch.equals(false)) {
            System.out.println("Passwords don't match:" + updatedUser.getPassword());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Wrong password!");
        }
        String token = jwtAuth.extractTokenFromHeader(request);
        if (token == null || !jwtAuth.getUserIdFromToken(token).equals(id)) {
            System.out.println(
                    "token:" + token + "\n jwtAuthTokenId:" + jwtAuth.getUserIdFromToken(token) + "\nYourId:" + id);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
        if (userRepository.findByEmail(updatedUser.getEmail()) != null) {
            System.out.println("User found in db:" + userRepository.findByEmail(updatedUser.getEmail()));
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bad request");
        }
        System.out.println("User found in db:" + userRepository.findByEmail(updatedUser.getEmail()));
        System.out.println("Email of updatedUser" + updatedUser.getEmail());
        User userToUpdate = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
        userToUpdate.setEmail(updatedUser.getEmail());
        userToUpdate.setUsername(updatedUser.getUsername());
        userToUpdate.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        userRepository.save(userToUpdate);
        return ResponseEntity.status(HttpStatus.OK).body("User updated!");
    }

    public void deleteUser(String userId, String password) {
        try {
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));

            if (!user.getPassword().equals(password)) {
                throw new AccessDeniedException("Wrong password");
            }

            userRepository.delete(user);
        } catch (ResourceNotFoundException notFoundException) {
            throw notFoundException;
        }catch (Exception ex) {
            System.err.println(ex);
            throw new RuntimeException(ex);
        }
    }
}
