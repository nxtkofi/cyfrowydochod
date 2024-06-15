package pl.server.server.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Table(name = "OrderItem")
@Getter
@Setter
@EqualsAndHashCode
@Builder
public class OrderItem {
    @Id
    @UuidGenerator
    private String id;
    private int count;

    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;
}
