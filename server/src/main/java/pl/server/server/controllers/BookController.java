package pl.server.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.server.server.helpers.ResourceNotFoundException;
import pl.server.server.models.Book;
import pl.server.server.repositories.BookRepository;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    @GetMapping("/{id}")
    public Book getBookById(@PathVariable String id) {
        return bookRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @GetMapping("/{title}")
    public List<Book> findByTitle(@PathVariable String title) {
        List<Book> books = bookRepository.findByTitle(title);
        if (books == null || books.isEmpty()) {
            throw new ResourceNotFoundException("Book not found with title: " + title);
        }
        return books;
    }

    @PostMapping
    public Book createBook(@RequestBody Book book) {
        return bookRepository.save(book);
    }

    @PutMapping("{id}")
    public Book updateBook(@PathVariable String id, @RequestBody Book updatedBook) {
        Book bookToUpdate = bookRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
        bookToUpdate.setTitle(updatedBook.getTitle());
        bookToUpdate.setTopic(updatedBook.getTopic());
        bookToUpdate.setAuthor(updatedBook.getAuthor());
        return bookRepository.save(updatedBook);
    }

    @DeleteMapping("{id}")
    public void deleteUser(@PathVariable String id) {
        Book book = bookRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
        bookRepository.delete(book);
    }
}
