package pl.server.server.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.server.server.helpers.ResourceNotFoundException;
import pl.server.server.models.Book;
import pl.server.server.models.IconElements;
import pl.server.server.repositories.BookRepository;
import pl.server.server.repositories.IconElementsRepository;

@Service
public class IconElementsService {

    @Autowired
    private IconElementsRepository iconElementsRepository;
    @Autowired
    private BookRepository bookRepository;

    public void createIconElement(String bookId,IconElements iconElements) {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new ResourceNotFoundException(""));

        IconElements newiconElements = new IconElements(iconElements.getIconProps(), iconElements.getText());
        newiconElements.setBook(book);
        iconElementsRepository.save(newiconElements);

        book.getIconElements().add(newiconElements);
    }
}

