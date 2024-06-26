package pl.server.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Table(name = "bookFeatures")
@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
public class BookFeatures {
    @Id
    @UuidGenerator
    @JsonIgnore
    private String id;
    @Column(nullable = false)
    @ToString.Include
    private String description;
    @ManyToOne
    @JoinColumn(name = "book_id")
    @JsonIgnore
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    Book book;

    public BookFeatures(String description) {
        this.description = description;
    }
}
