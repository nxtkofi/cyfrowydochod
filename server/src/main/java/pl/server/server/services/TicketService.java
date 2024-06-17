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

    public List<Ticket> getTicketByDateBefore7Days(List<Ticket> tickets) {
        LocalDate today = LocalDate.now();
        LocalDate sevenDaysAgo = today.minusDays(7);

        List<Ticket> filteredTickets = new ArrayList<>();

        for (Ticket ticket : tickets) {
            LocalDate eventDate = ticket.getDate().toLocalDate();
            LocalDate sevenDaysAfterEventDate = eventDate.plusDays(7);


            if (today.isEqual(sevenDaysAfterEventDate)) {
                filteredTickets.add(ticket);
            }
        }

        return filteredTickets;
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


    public String updateKeywordsForRecentTickets() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime sevenDaysAgo = now.minusDays(7);

        List<Ticket> tickets = ticketRepository.findAll();
        List<Ticket> filteredTickets = tickets.stream()
                .filter(ticket -> ticket.getDate().isAfter(sevenDaysAgo) && ticket.getDate().isBefore(now))
                .toList();

        Map<String, Integer> wordCount = new HashMap<>();
        for (Ticket ticket : filteredTickets) {
            String[] words = ticket.getText().split("\\s+");
            for (String word : words) {
                word = word.toLowerCase(); // Normalize to lower case
                wordCount.put(word, wordCount.getOrDefault(word, 0) + 1);
            }
        }

        String mostFrequentKeyword = wordCount.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(null);

        // Update keyword for each filtered ticket
        for (Ticket ticket : filteredTickets) {
            ticket.setKeyWord(mostFrequentKeyword);
            ticketRepository.save(ticket);
        }

        return mostFrequentKeyword;
    }
}
