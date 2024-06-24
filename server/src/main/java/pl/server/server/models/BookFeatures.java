package pl.server.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Table(name = "bookFeatures")
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class BookFeatures {
    @Id
    @UuidGenerator
    @JsonIgnore
    private String id;

    @ManyToOne
    @JsonIgnore
    @ToString.Exclude
    Book book;

    @ManyToOne
    @ToString.Include
    Feature feature;
}
