package pl.server.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.server.server.models.Ticket;
import pl.server.server.repositories.TicketRepository;
import pl.server.server.services.TicketService;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {
    @Autowired
    TicketService ticketService;

    @Autowired
    private TicketRepository ticketRepository;

    @GetMapping
    public List<Ticket> getAllTicket(){
        return ticketService.findAllTicket();
    }

    @GetMapping("/tickets/{id}")
    public ResponseEntity getTicketWithMessages(@PathVariable String id) {
        Ticket ticket = ticketRepository.findById(id).orElse(null);
        if (ticket == null) {
            return ResponseEntity.notFound().build();
        }
        
        return ResponseEntity.ok(ticket);
    }

    @PostMapping
    public ResponseEntity createTicket(@RequestBody Ticket ticket){        
        return ticketService.createTicket(ticket);
    }
}
