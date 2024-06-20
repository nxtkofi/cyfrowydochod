package pl.server.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Table(name = "iconElements")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class IconElements {
    @Id
    @UuidGenerator
    @JsonIgnore
    private String id;
    @Column(nullable = false)
    private String iconProps;
    @Column(nullable = false)
    private String text;

    @ManyToOne
    @JsonIgnore
    @ToString.Exclude
    private Book book;

    public IconElements(String iconProps, String text) {
        this.iconProps = iconProps;
        this.text = text;
    }
}
