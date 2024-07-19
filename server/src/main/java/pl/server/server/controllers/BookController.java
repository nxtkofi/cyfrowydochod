package pl.server.server.controllers;

import java.util.List;

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
import pl.server.server.services.BookService;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    BookService bookService;

    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable String id) {
        try {
            Book book = bookService.getBookById(id);
            return ResponseEntity.ok(book);
        } catch (ResourceNotFoundException notFoundException) {
            return ResponseEntity.notFound().build();
        } catch (RuntimeException exception) {
            System.err.println(exception);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        try {
            List<Book> books = bookService.getAllBooks();
            return ResponseEntity.ok(books);
        } catch (RuntimeException exception) {
            System.err.println(exception);
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody BookRequest request) {
        System.out.println(request.getNewBook().isHeroBook());
        try {
            Book newBook = bookService.createBook(request);
            return ResponseEntity.ok(newBook);
        } catch (RuntimeException exception) {
            System.err.println(exception);
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable String id, @RequestBody Book updatedBook) { //To update
        try {
            Book book = bookService.updateBook(id,updatedBook);
            return ResponseEntity.ok(book);
        } catch (ResourceNotFoundException notFoundException) {
            return ResponseEntity.notFound().build();
        } catch (RuntimeException exception) {
            System.err.println(exception);
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable String id) {
        try {
            bookService.deleteBook(id);
            return ResponseEntity.ok().build();
        } catch (ResourceNotFoundException notFoundException) {
            return ResponseEntity.notFound().build();
        } catch (RuntimeException exception) {
            System.err.println(exception);
            return ResponseEntity.badRequest().build();
        }
    }
}
