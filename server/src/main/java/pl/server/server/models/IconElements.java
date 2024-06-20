package pl.server.server.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Table(name = "iconElements")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
public class IconElements {
    @Id
    @UuidGenerator
    private String id;
    private String iconProps;
    private String text;

    @ManyToOne
    private Book book;
}
