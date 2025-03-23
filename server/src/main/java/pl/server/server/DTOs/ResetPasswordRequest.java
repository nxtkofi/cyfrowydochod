package pl.server.server.DTOs;

import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public classResetPasswordRequest {
    @Email
    private String email;
}
