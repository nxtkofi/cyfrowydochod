package pl.server.server.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
public class Order {
    @Id
    @UuidGenerator
    private String idOrder;
    private LocalDateTime orderDate;
    private int count;
    private double amount;

    @ManyToMany
    @JoinTable(
            name = "order_book",
            joinColumns = @JoinColumn(name = "order_id"),
            inverseJoinColumns = @JoinColumn(name = "book_id")
    )
    private List<Book> books;
}
