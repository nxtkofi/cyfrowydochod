package pl.server.server.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.util.List;

@Entity
@Table(name = "books")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
public class Book {

    @Id
    @UuidGenerator
    private String id;
    private String title;
    private String topic;
    private String author;
    private int price;

    @ManyToMany(mappedBy = "books")
    private List<Order> order_books;


    public Book(String title, String topic, String author, int price) {
        this.title = title;
        this.topic = topic;
        this.author = author;
        this.price = price;
    }
}
