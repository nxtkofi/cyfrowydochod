package pl.server.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Entity
@Table(name = "features")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class Feature {
    @Id
    @UuidGenerator
    @JsonIgnore
    private String id;
    @Column(nullable = false)
    @ToString.Include
    private String description;

    @OneToMany(mappedBy = "feature",fetch = FetchType.EAGER)
    @ToString.Exclude
    @JsonIgnore
    List<BookFeatures> bookFeatures;

    public Feature(String description) {
        this.description = description;
    }

}
