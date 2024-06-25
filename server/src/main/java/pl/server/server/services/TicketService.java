package pl.server.server.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;
import pl.server.server.DTOs.Status;
import pl.server.server.DTOs.TicketRequest;
import pl.server.server.config.JwtAuthenticationFilter;
import pl.server.server.helpers.ResourceNotFoundException;
import pl.server.server.models.Message;
import pl.server.server.models.Ticket;
import pl.server.server.models.User;
import pl.server.server.repositories.TicketRepository;
import pl.server.server.repositories.UserRepository;

@Service
public class TicketService {

    @Autowired
    JwtAuthenticationFilter jwtAuth;
    @Autowired
    TicketRepository ticketRepository;

    @Autowired
    UserRepository userRepository;

    public ResponseEntity<?> createTicket(TicketRequest TicketRequest, HttpServletRequest request) {
        try {
            Ticket ticket = new Ticket();
            ticket.setDate(System.currentTimeMillis());
            ticket.setStatus(Status.WAITING_FOR_SUPP_RES);
            ticket.setSubject(TicketRequest.getSubject());
            ticket.setOrderId(TicketRequest.getOrderId());
            User user = userRepository.findByEmail(TicketRequest.getEmail());
            if (user == null) {
                return ResponseEntity.notFound().build();
            }
            ticket.setUser(user);

            if (ticket.getMessages() == null) {
                ticket.setMessages(new ArrayList<>());
            }
            String token = jwtAuth.extractTokenFromHeader(request);
            String role = jwtAuth.getRoleFromToken(token);
            String sender = role.equals("commonUser") ? "User" : role.equals("admin") ? "Admin" : "Unknown";

            Message message = new Message();
            message.setSender(sender);
            message.setMessage(TicketRequest.getMessage());
            System.out.println(message.getMessage());
            System.out.println(ticket.getMessages());

            message.setTicket(ticket);

            ticket.getMessages().add(message);

            ticketRepository.save(ticket);

            user.getTickets().add(ticket);
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

    public ResponseEntity<List<Ticket>> getTicketsOfUser(String userId) {
        List<Ticket> tickets = ticketRepository.findByUserId(userId);
        if (tickets.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(tickets);
    }

    public ResponseEntity<?> updateTicket(String ticketId, String newMessage, HttpServletRequest request) {
        Ticket ticket = ticketRepository.findById(ticketId).orElseThrow(() -> new ResourceNotFoundException(""));
        String token = jwtAuth.extractTokenFromHeader(request);
        String role = jwtAuth.getRoleFromToken(token);
        List<Message> messages = ticket.getMessages();
        if (messages != null && !messages.isEmpty()) {
            Message lastMessage = messages.get(messages.size() - 1);
            String senderOfLastMessage = lastMessage.getSender();
            if (role.equals(senderOfLastMessage)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("You can't submit message twice in a row!");
            }
        }
        String sender = role.equals("commonUser") ? "User" : role.equals("admin") ? "Admin" : "Unknown";

        Message msg = new Message();
        msg.setSender(sender);
        msg.setMessage(newMessage);
        System.out.println(newMessage);
        System.out.println(ticket.getMessages());
        msg.setTicket(ticket);
        ticket.getMessages().add(msg);
        ticketRepository.save(ticket);

        return ResponseEntity.ok(ticket);
    }

    public void deleteTicket(Ticket ticketToDelete) {
        ticketRepository.delete(ticketToDelete);
    }
}
