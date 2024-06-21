package pl.server.server.models;

import java.util.Date;

import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Message {
    
    @Id
    @UuidGenerator
    private String id;
    
    @ManyToOne
    @JoinColumn(name = "ticket_id")
    private Ticket ticket;
    
    private String sender;
    private String message;
    
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    public Message() {
        this.createdAt = new Date();
    }

}