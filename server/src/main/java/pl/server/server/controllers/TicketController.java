package pl.server.server.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.HttpServletRequest;
import pl.server.server.DTOs.TicketRequest;
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
    @GetMapping("/findByUser/{userId}")
    public ResponseEntity<List<Ticket>> getTicketsOfUser(@PathVariable String userId) {
        return ticketService.getTicketsOfUser(userId);
    }
    @GetMapping("/{id}")
    public ResponseEntity getTicketWithMessages(@PathVariable String id) {
        Ticket ticket = ticketRepository.findById(id).orElse(null);
        if (ticket == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(ticket);
    }

    @PutMapping("/{ticketId}")
    public ResponseEntity updateTicket(@PathVariable String ticketId, @RequestBody String message, HttpServletRequest request) {
        System.out.println("ALLELUJA"+message);
        return ticketService.updateTicket(ticketId, message,request);
    }

    @PostMapping
    public ResponseEntity createTicket(@RequestBody TicketRequest TicketRequest, HttpServletRequest request){        
        return ticketService.createTicket(TicketRequest,request);
    }
}
