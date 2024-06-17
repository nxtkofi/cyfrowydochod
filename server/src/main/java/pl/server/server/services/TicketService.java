package pl.server.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pl.server.server.helpers.ResourceNotFoundException;
import pl.server.server.models.*;
import pl.server.server.repositories.TicketRepository;
import pl.server.server.repositories.UserRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
public class TicketService {

    @Autowired
    TicketRepository ticketRepository;
    @Autowired
    UserRepository userRepository;

    public void createTicket(Ticket ticket, String userId) {

       User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException(""));

         ticket.setUser(user);
         ticketRepository.save(ticket);

         user.getTickets().add(ticket);
         userRepository.save(user);
    }

    public Ticket getTicketById(String id) {
        return ticketRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(""));
    }

    public List<Ticket> findAllTicket() {
        return ticketRepository.findAll();
    }


    public List<Ticket> findTicketByDate(LocalDateTime localDateTime) {
        return ticketRepository.findByDate(localDateTime);
    }

    public Ticket updateTicket(String id, Ticket UpdateTicket) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(""));
        ticket.setText(UpdateTicket.getText());
        ticket.setDate(LocalDateTime.now());
        ticket.setKeyWord(UpdateTicket.getKeyWord());
        return ticketRepository.save(ticket);
    }

    public void deleteTicket( Ticket ticketToDelete){
        ticketRepository.delete(ticketToDelete);
    }
    }