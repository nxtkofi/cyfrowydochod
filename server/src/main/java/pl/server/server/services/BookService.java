package pl.server.server.services;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.server.server.helpers.BookException;
import pl.server.server.helpers.ResourceNotFoundException;
import pl.server.server.models.Book;
import pl.server.server.repositories.BookRepository;

import java.util.List;

@Service
public class BookService {

    @Autowired
    BookRepository bookRepository;

    public List<Book> getAllBooks() {
        try {
            return bookRepository.findAll();
        } catch (Exception ex) {
            System.err.println(ex);
            return null;
        }
    }

    public Book getBookById(String id) {
        try {
            return bookRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
        }catch (Exception ex) {
            System.err.println(ex);
            return null;
        }
    }

    public Book getBookByTitle(String title) {
        try {
            Book book = bookRepository.findByTitle(title);
            if (book == null) {
                throw new ResourceNotFoundException("Book not found with title: " + title);
            }
            return book;
        }
        catch (Exception ex) {
            System.err.println(ex);
            return null;
        }
    }

    public Book createBook(Book newBook) {
        try {
            return bookRepository.save(newBook);
        }catch (Exception ex) {
            System.err.println(ex);
            return null;
        }
    }

    public Book updateBook(String bookId, Book updatedBook) {
        try {
            Book bookToUpdate = bookRepository.findById(bookId).orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + bookId));
            BeanUtils.copyProperties(updatedBook, bookToUpdate, "id");

            return bookRepository.save(bookToUpdate);
        }catch (Exception ex) {
            System.err.println(ex);
            return null;
        }
    }

    public void deleteBook(String bookId) throws BookException {
        try {
            Book book = bookRepository.findById(bookId).orElseThrow(() -> new ResourceNotFoundException("Book not found"));
            bookRepository.delete(book);
        }catch (Exception ex) {
            System.err.println(ex);
        }
    }
}
