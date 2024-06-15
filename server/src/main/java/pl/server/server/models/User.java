package pl.server.server.models;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name="users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Builder
public class User implements UserDetails {
    @Id
    @UuidGenerator
    private String id;
    private String username;
    private String email;
    private String password;

    @Column(name="refresh_token",columnDefinition="TEXT")
    private String refreshToken;
    private String role;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Order> orders;

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY)
    private BillingAddress billingAddress;

    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY)
    private List<Ticket> tickets;

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        }

    @JsonIgnore
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(role));

    }
}
