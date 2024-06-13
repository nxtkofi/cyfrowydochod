package pl.server.server.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Table(name = "ticket")
@Getter
@Setter
@Builder
@EqualsAndHashCode
public class Ticket {
    @Id
    @UuidGenerator
    private String id;
    private String text;
}
