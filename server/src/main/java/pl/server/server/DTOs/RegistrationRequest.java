package pl.server.server.DTOs;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistrationRequest {
    @Email(message = "Email should be valid")
    @NotEmpty(message = "Email is mandatory")
    private String email;
    
    @NotEmpty(message = "Username is mandatory")
    @Size(min = 3, max = 20, message = "Username must be between 3 and 20 characters")
    private String username;
    
    @NotEmpty(message = "Password is mandatory")
    @Size(min = 4, max = 30, message = "Password must be between 4 and 30 characters")
    private String password;
}