package pl.server.server.models;

import java.time.LocalDateTime;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private String email;
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
