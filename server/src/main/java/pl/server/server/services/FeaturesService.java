package pl.server.server.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.server.server.helpers.ResourceNotFoundException;
import pl.server.server.models.Book;
import pl.server.server.models.BookFeatures;
import pl.server.server.models.Feature;
import pl.server.server.repositories.BookFeaturesRepository;
import pl.server.server.repositories.BookRepository;
import pl.server.server.repositories.FeatureRepository;

@Service
public class FeaturesService {
    @Autowired
    private FeatureRepository featureRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookFeaturesRepository bookFeaturesRepository;

    @Transactional
    public void createFeature(String bookId,Feature feature) {
        Book book = bookRepository.findById(bookId).orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + bookId));

        Feature newFeature = new Feature(feature.getDescription());
        featureRepository.save(newFeature);

        BookFeatures newBookFeatures = new BookFeatures();
        newBookFeatures.setBook(book);
        newBookFeatures.setFeature(newFeature);
        bookFeaturesRepository.save(newBookFeatures);

        book.getBookFeatures().add(newBookFeatures);

    }




}
