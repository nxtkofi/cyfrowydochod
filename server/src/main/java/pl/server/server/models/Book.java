package pl.server.server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.UuidGenerator;

import java.util.Set;

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
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String topic;
    @Column(nullable = false)
    private String author;
    @Column(nullable = false)
    private int price;
    @Column(nullable = false)
    private String shortDescription;
    @Column(nullable = false)
    private String subTitle;
    @Column(nullable = false)
    private String firstText;
    @Column(nullable = false)
    private String secondText;
    @Column(nullable = false)
    private String gradient;
    @Column(nullable = false)
    private String imagePath;
    private String emojiGradientUrl;
    private boolean checksTableTextBlack;

    public Book(String title, String topic, String author, int price, String shortDescription, String subTitle, String firstText, String secondText, String gradient, String imagePath, String emojiGradientUrl, boolean checksTableTextBlack) {
        this.title = title;
        this.topic = topic;
        this.author = author;
        this.price = price;
        this.shortDescription = shortDescription;
        this.subTitle = subTitle;
        this.firstText = firstText;
        this.secondText = secondText;
        this.gradient = gradient;
        this.imagePath = imagePath;
        this.emojiGradientUrl = emojiGradientUrl;
        this.checksTableTextBlack = checksTableTextBlack;
    }
    @JsonIgnore
    @OneToMany(mappedBy = "book",fetch = FetchType.LAZY) //require tests
    private Set<OrderItem> orderItems;

    @OneToMany(mappedBy = "book",fetch = FetchType.LAZY) //require tests
    private Set<IconElements> iconElements;

    @OneToMany(mappedBy = "book",fetch = FetchType.LAZY) //require tests
    private Set<BookFeatures> bookFeatures;

    @OneToMany(fetch = FetchType.LAZY) //require tests
    private Set<Reviews> reviews;
}
