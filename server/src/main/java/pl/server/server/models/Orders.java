package pl.server.server.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import javax.xml.crypto.Data;
import java.util.Date;
import java.util.List;
import java.util.Set;
@Entity
@Table(name = "orders")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode

public class Orders {
    @Id
    @UuidGenerator
    private String idOrder;
    private Date orderDate;
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
