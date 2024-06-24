package pl.server.server.models;

import java.util.List;

import org.hibernate.annotations.UuidGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
    private String email;
    private String status;
    private long date;
    private String keyWord;
    private String orderId;
    private Boolean isUser;

    @OneToMany(mappedBy = "ticket", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference // Używane na właścicielu (Ticket), kontroluje serializację
    private List<Message> messages;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    public Ticket(String subject, String status, String keyWord) {
        this.subject = subject;
        this.status = status;
        this.date = System.currentTimeMillis();
        this.keyWord = keyWord;
        this.isUser = true;
    }
}