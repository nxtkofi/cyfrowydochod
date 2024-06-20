package pl.server.server.models;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.*;
import lombok.*;

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
    private double amount;

    @OneToMany(mappedBy = "order")
    @JsonIgnore
    private List<OrderItem> orderItem;

    @ManyToOne
    @ToString.Exclude
    @JsonIgnore
    private User user;

}
