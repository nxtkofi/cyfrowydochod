package pl.server.server.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.hibernate.annotations.UuidGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
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
    @EqualsAndHashCode.Include
    private String id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String author;
    @Column(nullable = false)
    private int price;
    @Column(nullable = false)
    private String shortDescription;
    @Column(length=1500)
    private String longDescription;
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
    @Column(name="is_hero_book", nullable=false)
    @JsonProperty("isHeroBook")
    private boolean isHeroBook;
    @Column(name="checks_table_text_black",nullable=false)
    @JsonProperty("checksTableTextBlack")
    private boolean checksTableTextBlack;

    public Book(String title, String author, int price, String shortDescription, String subTitle, String firstText, String secondText, String gradient, String imagePath, boolean checksTableTextBlack, boolean isHeroBook) {
        this.title = title;
        this.author = author;
        this.price = price;
        this.shortDescription = shortDescription;
        this.subTitle = subTitle;
        this.firstText = firstText;
        this.secondText = secondText;
        this.gradient = gradient;
        this.imagePath = imagePath;        
        this.checksTableTextBlack = checksTableTextBlack;
        this.isHeroBook = isHeroBook;
        this.iconElements = new ArrayList<>();
        this.bookFeatures = new ArrayList<>();
    }
    @JsonIgnore
    @OneToMany(mappedBy = "book",fetch = FetchType.LAZY,cascade = CascadeType.ALL) //require tests
    private Set<OrderItem> orderItems;

    @OneToMany(mappedBy = "book",fetch = FetchType.LAZY,cascade = CascadeType.ALL) //require tests
    private List<IconElements> iconElements ;

    private List<String> bookFeatures;

    @OneToMany(fetch = FetchType.LAZY) //require tests
    private Set<Review> reviews;


}
