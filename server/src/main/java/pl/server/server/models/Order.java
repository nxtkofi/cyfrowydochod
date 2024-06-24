package pl.server.server.models;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

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

    @Override
    public boolean equals(Object object) {
        if (this == object) return true;
        if (!(object instanceof Order order)) return false;
        return Objects.equals(idOrder, order.idOrder);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(idOrder);
    }
}
