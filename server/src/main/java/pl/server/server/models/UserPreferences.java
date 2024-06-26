package pl.server.server.models;

import org.hibernate.annotations.UuidGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Entity
@Table(name="user_preferences")
@Setter
public class UserPreferences {
    @JsonIgnore
    @Id
    @UuidGenerator
    private String id;

    private String avatar;
    private boolean getNewsLetter;
    private boolean getPriceDrops;
    private boolean getTrendingEbooks;
    private boolean darkMode;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
}