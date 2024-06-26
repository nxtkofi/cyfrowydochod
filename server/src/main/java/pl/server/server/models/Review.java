package pl.server.server.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Table(name = "reviews")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class Reviews {

    @Id
    @UuidGenerator
    private String id;
    @Column(nullable = false)
    private String username;
    @Column(nullable = false)
    private Long purchaseDate;
    @Column(nullable = false)
    private String avatarType;
    @Column(nullable = false,columnDefinition = "TEXT")
    private String text;

    public Reviews(String username, Long purchaseDate, String avatarType, String text) {
        this.username = username;
        this.purchaseDate = purchaseDate;
        this.avatarType = avatarType;
        this.text = text;
    }

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;
}
