package pl.server.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.server.server.DTOs.BookRequest;
import pl.server.server.helpers.ResourceNotFoundException;
import pl.server.server.models.Book;
import pl.server.server.repositories.BookRepository;
import pl.server.server.services.BookService;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    BookService bookService;

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable String id) {
        Book book = bookService.getBookById(id);
        return ResponseEntity.ok(book);
    }

    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return ResponseEntity.ok(books);
    }

    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody BookRequest request) {
        try {
            Book newBook = bookService.createBook(request);
            return ResponseEntity.ok(newBook);
        } catch (ResourceNotFoundException notFoundException) {
            return ResponseEntity.notFound().build();
        } catch (RuntimeException exception) {
            System.err.println(exception);
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable String id, @RequestBody Book updatedBook) {
       return ResponseEntity.ok(bookService.updateBook(id,updatedBook));
    }

    @PostMapping("/books/{bookId}/iconElements/{iconElementId}")
    public ResponseEntity<?> addIconElementToBook(@PathVariable String bookId, @PathVariable String iconElementId) {
        return ResponseEntity.ok(bookService.addIconElementToBook(bookId, iconElementId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable String id) {
        bookService.deleteBook(id);
        return ResponseEntity.ok().build();
    }
}
