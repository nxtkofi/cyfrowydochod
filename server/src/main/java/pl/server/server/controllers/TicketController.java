package pl.server.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.server.server.models.Ticket;
import pl.server.server.repositories.TicketRepository;
import pl.server.server.services.TicketService;


import java.time.LocalDateTime;
import java.util.List;

@RestController
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
    public void createTicket(@RequestBody Ticket ticket, @RequestParam String userId){
        ticketService.createTicket(ticket,userId);
    }




}
