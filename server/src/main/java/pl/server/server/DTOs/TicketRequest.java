package pl.server.server.DTOs;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TicketRequest {
    public String email;
    public String subject;
    public String orderId;
    public String message;
}
