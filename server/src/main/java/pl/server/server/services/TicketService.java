package pl.server.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import pl.server.server.DTOs.Status;
import pl.server.server.helpers.ResourceNotFoundException;
import pl.server.server.models.Ticket;
import pl.server.server.models.User;
import pl.server.server.repositories.TicketRepository;
import pl.server.server.repositories.UserRepository;

@Service
public class TicketService {

    @Autowired
    TicketRepository ticketRepository;
    
    @Autowired
    UserRepository userRepository;
   

    public ResponseEntity createTicket(Ticket ticket) {
        try {
            ticket.setDate(System.currentTimeMillis()) ; 
            ticket.setStatus(Status.WAITING_FOR_SUPP_RES);  
                   
            User user = userRepository.findByEmail(ticket.getEmail());
            if(user == null){
                return ResponseEntity.notFound().build();
            }
            System.out.println(user);
            ticket.setUser(user);
            ticketRepository.save(ticket);
    
            user.getTickets().add(ticket);
            userRepository.save(user);
            return ResponseEntity.status(HttpStatus.CREATED).build();
            
        } catch (Exception e) {
            System.out.print(e);
            return ResponseEntity.badRequest().build();
        }
    }

    public Ticket getTicketById(String id) {
        return ticketRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(""));
    }

    public List<Ticket> findAllTicket() {
        return ticketRepository.findAll();
    }


    public Ticket updateTicket(String id, Ticket UpdateTicket) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(""));
        ticket.setMessages(UpdateTicket.getMessages());
        ticket.setKeyWord(UpdateTicket.getKeyWord());
        return ticketRepository.save(ticket);
    }

    public void deleteTicket(Ticket ticketToDelete) {
        ticketRepository.delete(ticketToDelete);
    }
}
