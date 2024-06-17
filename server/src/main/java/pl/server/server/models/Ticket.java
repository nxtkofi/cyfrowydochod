package pl.server.server.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDateTime;

@Entity
@Table(name = "ticket")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
public class Ticket {
    @Id
    @UuidGenerator
    private String id;
    private String subject;
    @Column(columnDefinition="TEXT")
    private String text;
    private String status;
    private LocalDateTime date;
    private String keyWord;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Ticket(String subject, String text, String status, String keyWord) {
        this.subject = subject;
        this.text = text;
        this.status = status;
        date = LocalDateTime.now();
        this.keyWord = keyWord;
    }
}
