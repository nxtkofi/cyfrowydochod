package pl.server.server.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.server.server.helpers.ResourceNotFoundException;
import pl.server.server.models.Book;
import pl.server.server.models.BookFeatures;
import pl.server.server.models.Feature;
import pl.server.server.repositories.BookFeaturesRepository;
import pl.server.server.repositories.BookRepository;
import pl.server.server.repositories.FeatureRepository;

import java.util.List;

@Service
public class FeatureService {
    @Autowired
    private FeatureRepository featureRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookFeaturesRepository bookFeaturesRepository;

    public List<Feature> getAllFeatures() {
        return featureRepository.findAll();
    }

    public Feature getById(String featureId) {
        try {
            return featureRepository.findById(featureId)
                    .orElseThrow(() -> new ResourceNotFoundException("Feature not found"));
        } catch (ResourceNotFoundException ex) {
            System.err.println(ex);
            ResponseEntity.notFound().build();
            return null;
        }catch (Exception ex2) {
            System.err.println(ex2);
            ResponseEntity.badRequest().build();
            return null;
        }
    }

    public Feature createFeature(Feature feature) {
        try {
            return featureRepository.save(feature);
        } catch (ResourceNotFoundException ex) {
            System.err.println(ex);
            ResponseEntity.notFound().build();
            return null;
        }catch (Exception ex2) {
            System.err.println(ex2);
            ResponseEntity.badRequest().build();
            return null;
        }
    }

    public Feature updateFeature(String featureId, Feature newFeature) {
        try {
            Feature featureToUpdate = featureRepository.findById(featureId)
                    .orElseThrow(() -> new ResourceNotFoundException("Feature not found"));

            BeanUtils.copyProperties(newFeature, featureToUpdate, "id");
            return featureRepository.save(featureToUpdate);
        } catch (ResourceNotFoundException ex) {
            System.err.println(ex);
            ResponseEntity.notFound().build();
            return null;
        } catch (Exception ex2) {
            System.err.println(ex2);
            ResponseEntity.badRequest().build();
            return null;
        }
    }

    @Transactional
    public BookFeatures createFeatureAndAddToBook(String bookId,Feature feature) {
        try {
            Book book = bookRepository.findById(bookId).orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + bookId));

            Feature newFeature = new Feature(feature.getDescription());
            featureRepository.save(newFeature);

            BookFeatures newBookFeatures = new BookFeatures();
            newBookFeatures.setBook(book);
            newBookFeatures.setFeature(newFeature);
            book.getBookFeatures().add(newBookFeatures);
            return bookFeaturesRepository.save(newBookFeatures);
        } catch (ResourceNotFoundException ex) {
            System.err.println(ex);
            ResponseEntity.notFound().build();
            return null;
        } catch (Exception ex2) {
            System.err.println(ex2);
            ResponseEntity.badRequest().build();
            return null;
        }
    }

    @Transactional
    public void removeFeatureFromBook(String bookId, String description) {
        try {
            Book book = bookRepository.findById(bookId)
                    .orElseThrow(() -> new ResourceNotFoundException("Book not found"));
            Feature feature = featureRepository.findByDescription(description).getFirst();

            BookFeatures bookFeatures = bookFeaturesRepository.findByBookIdAndFeatureId(book.getId(), feature.getId());

            book.getBookFeatures().remove(bookFeatures);
            feature.getBookFeatures().remove(bookFeatures);
            bookFeaturesRepository.delete(bookFeatures);
        } catch (ResourceNotFoundException ex) {
            System.err.println(ex);
            ResponseEntity.notFound().build();
        }catch (Exception ex2) {
            System.err.println(ex2);
            ResponseEntity.badRequest().build();
        }
    }

    public void deleteFeature(String featureId) {
        try {
            Feature featureToDelete = featureRepository.findById(featureId)
                    .orElseThrow(() -> new ResourceNotFoundException("Feature not found"));

            featureRepository.delete(featureToDelete);
        } catch (ResourceNotFoundException ex) {
            System.err.println(ex);
            ResponseEntity.notFound().build();
        } catch (Exception ex2) {
            System.err.println(ex2);
            ResponseEntity.badRequest().build();
        }
    }

    @Transactional
    public void removeFeatureFromBookById(String bookId, String featureId) {
        try {
            Book book = bookRepository.findById(bookId)
                    .orElseThrow(() -> new ResourceNotFoundException("Book not found"));

            Feature feature = featureRepository.findById(featureId)
                    .orElseThrow(() -> new ResourceNotFoundException("Feature not found"));

            BookFeatures bookFeatures = bookFeaturesRepository.findByBookIdAndFeatureId(bookId, featureId);
            if (bookFeatures != null) {
                book.getBookFeatures().remove(bookFeatures);
                feature.getBookFeatures().remove(bookFeatures);
                book.getBookFeatures().remove(bookFeaturesRepository.findByBookIdAndFeatureId(bookId, featureId));
            } else {
                throw new ResourceNotFoundException("Feature not found");
            }
        } catch (ResourceNotFoundException ex) {
            System.err.println(ex);
            ResponseEntity.notFound().build();
        }catch (Exception ex2) {
            System.err.println(ex2);
            ResponseEntity.badRequest().build();
        }
    }
}
