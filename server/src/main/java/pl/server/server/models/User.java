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
import lombok.*;

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
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String password;

    @Column(name="refresh_token",columnDefinition="TEXT") // is require?
    private String refreshToken;
    @Column(nullable = false)
    private String role;

    @OneToMany(mappedBy = "user", fetch = FetchType.EAGER)
    private List<Order> orders;

    @OneToOne(mappedBy = "user", fetch = FetchType.EAGER)
    private BillingAddress billingAddress;

    @OneToMany(mappedBy = "user",fetch = FetchType.EAGER)
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
