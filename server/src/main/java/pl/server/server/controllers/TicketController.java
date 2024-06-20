package pl.server.server.controllers;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.server.server.models.Ticket;
import pl.server.server.services.TicketService;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    @Autowired
    TicketService ticketService;

    @GetMapping
    public List<Ticket> getAllTicket(){
        return ticketService.findAllTicket();
    }

    public List<Ticket> findByDate(LocalDateTime localDateTime) {
        return ticketService.findTicketByDate(localDateTime);
    }
    @PostMapping
    public ResponseEntity createTicket(@RequestBody Ticket ticket){        
        return ticketService.createTicket(ticket);
    }
}
