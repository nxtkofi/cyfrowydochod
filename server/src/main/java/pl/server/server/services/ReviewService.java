package pl.server.server.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import pl.server.server.DTOs.ReviewRequest;
import pl.server.server.helpers.ResourceNotFoundException;
import pl.server.server.models.Book;
import pl.server.server.models.Review;
import pl.server.server.models.User;
import pl.server.server.repositories.BookRepository;
import pl.server.server.repositories.ReviewRepository;
import pl.server.server.repositories.UserRepository;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    ReviewRepository reviewRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    BookRepository bookRepository;

    public List<Review> getAllReviews() {
        try {
            return reviewRepository.findAll();
        } catch (Exception ex) {
            System.err.println(ex);
            throw new RuntimeException(ex);
        }
    }

    public Review getReviewById(String id) {
        try {
            return reviewRepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Review not found"));
        } catch (ResourceNotFoundException notFoundException) {
            throw notFoundException;
        } catch (Exception ex) {
            System.err.println(ex);
            throw new RuntimeException(ex);
        }
    }

    @Transactional
    public Review createReview(String userid, ReviewRequest request) {
        try {
            Book book = bookRepository.findById(request.getBookId())
                    .orElseThrow(() -> new ResourceNotFoundException("Book not found"));
            User user = userRepository.findById(userid)
                    .orElseThrow(() -> new ResourceNotFoundException("User not found"));

            request.getReview().setUser(user);
            book.getReviews().add(request.getReview());
            reviewRepository.save(request.getReview());
            bookRepository.save(book);
            return request.getReview();
        } catch (ResourceNotFoundException notFoundException) {
            throw notFoundException;
        } catch (Exception ex) {
            System.err.println(ex);
            throw new RuntimeException(ex);
        }
    }

    public Review updateReview(String reviewId, Review newReview) {
        try {
            Review reviewToUpdate = reviewRepository.findById(reviewId)
                    .orElseThrow(() -> new ResourceNotFoundException("Review not found"));

            BeanUtils.copyProperties(newReview,reviewToUpdate, "id");
            return reviewRepository.save(reviewToUpdate);
        } catch (ResourceNotFoundException notFoundException) {
            throw notFoundException;
        } catch (Exception ex) {
            throw new RuntimeException("Failed to create review", ex);
        }
    }

    public void deleteReview(String reviewId) {
        try {
            Review reviewToDelete = reviewRepository
                    .findById(reviewId)
                    .orElseThrow(() -> new ResourceNotFoundException("Review not found"));

            reviewRepository.delete(reviewToDelete);
        } catch (ResourceNotFoundException notFoundException) {
            throw notFoundException;
        } catch (Exception ex) {
            System.err.println(ex);
            throw new RuntimeException(ex);
        }
    }
}
