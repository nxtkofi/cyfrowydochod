package pl.server.server.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pl.server.server.DTOs.BookRequest;
import pl.server.server.helpers.ResourceNotFoundException;
import pl.server.server.models.Book;
import pl.server.server.models.IconElements;
import pl.server.server.repositories.BookRepository;
import pl.server.server.repositories.IconElementsRepository;

@Service
public class BookService {

    @Autowired
    BookRepository bookRepository;

    @Autowired
    IconElementsRepository iconElementsRepository;

    public List<Book> getAllBooks() {
        try {
            return bookRepository.findAll();
        }catch (Exception ex) {
            System.err.println(ex);
            throw new RuntimeException(ex);
        }
    }

    public Book getBookById(String id) {
        try {
            return bookRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
        } catch (ResourceNotFoundException notFoundException) {
            throw notFoundException;
        }catch (Exception ex) {
            System.err.println(ex);
            throw new RuntimeException(ex);
        }
    }

    public Book createBook(BookRequest request) {
        try {
        Book newBook = request.getNewBook();
        System.out.println("Is a hero book: " +request.getNewBook().isHeroBook());
        newBook = bookRepository.save(newBook);

        List<IconElements> iconElementsList = new ArrayList<>();
        for (IconElements elementDTO : request.getBookIconElementsList()) {

            IconElements newIconElement = new IconElements();
            newIconElement.setIcon(elementDTO.getIcon());
            newIconElement.setText(elementDTO.getText());
            newIconElement.setBook(newBook);

            iconElementsList.add(newIconElement);
        }

        iconElementsRepository.saveAll(iconElementsList);

        newBook.setIconElements(iconElementsList);

        newBook = bookRepository.save(newBook);
        newBook.setBookFeatures(request.getBookFeaturesList());

        bookRepository.save(newBook);
        return newBook;
        }catch (Exception ex) {
            System.err.println(ex);
            throw new RuntimeException(ex);
        }
    }

    public Book updateBook(String bookId, Book updatedBook) {
        try {
            Book bookToUpdate = bookRepository.findById(bookId)
                    .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + bookId));
            BeanUtils.copyProperties(updatedBook, bookToUpdate, "id");

            return bookRepository.save(bookToUpdate);
        } catch (ResourceNotFoundException notFoundException) {
            throw notFoundException;
        } catch (Exception ex) {
            System.err.println(ex);
            throw new RuntimeException(ex);
        }
    }

    public void deleteBook(String bookId) {
        try {
            Book book = bookRepository.findById(bookId)
                    .orElseThrow(() -> new ResourceNotFoundException("Book not found"));
            bookRepository.delete(book);
        } catch (ResourceNotFoundException notFoundException) {
            throw notFoundException;
        } catch (Exception ex) {
            System.err.println(ex);
            throw new RuntimeException(ex);
        }
    }
}
