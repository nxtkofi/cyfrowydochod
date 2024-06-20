package pl.server.server.models;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.util.List;

@Entity
@Table(name = "books")
@Getter
@Setter
@AllArgsConstructor
@ToString
@EqualsAndHashCode
@Builder
public class Book {

    @Id
    @UuidGenerator
    private String id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String topic;
    @Column(nullable = false)
    private String author;
    @Column(nullable = false)
    private int price;
    @Column(nullable = false)
    private int count;
    @Column(nullable = false)
    private String shortDescription;
    @Column(nullable = false)
    private String subTitle;
    @Column(nullable = false)
    private String firstText;
    @Column(nullable = false)
    private String secondText;
    @Column(nullable = false)
    private String bookFeatures;
    @Column(nullable = false)
    private String gradient;
    @Column(nullable = false)
    private String imagePath;
    private String emojiGradientUrl;
    private boolean checksTableTextBlack;

    public Book(String title, String topic, String author, int price, int count, String shortDescription, String subTitle,
                String firstText, String secondText, String bookFeatures, String gradient, String imagePath, @Nullable String emojiGradientUrl,
                boolean checksTableTextBlack) {
        this.title = title;
        this.topic = topic;
        this.author = author;
        this.price = price;
        this.count = count;
        this.shortDescription = shortDescription;
        this.subTitle = subTitle;
        this.firstText = firstText;
        this.secondText = secondText;
        this.bookFeatures = bookFeatures;
        this.gradient = gradient;
        this.imagePath = imagePath;
        this.emojiGradientUrl = emojiGradientUrl;
        this.checksTableTextBlack = checksTableTextBlack;
    }




    @OneToMany(mappedBy = "book",fetch = FetchType.EAGER)
    private List<OrderItem> orderItems;

    @OneToMany(mappedBy = "book")
    @Nullable
    private List<IconElements> iconElements;

}
