package pl.server.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.server.server.DTOs.ReviewRequest;
import pl.server.server.helpers.ResourceNotFoundException;
import pl.server.server.models.Review;
import pl.server.server.services.ReviewService;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @GetMapping
    public ResponseEntity<List<Review>> getAllReviews() {
        try {
            List<Review> allReviews = reviewService.getAllReviews();
            return ResponseEntity.ok(allReviews);
        } catch (RuntimeException exception) {
            System.err.println(exception);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable String id) {
        try {
            Review review = reviewService.getReviewById(id);
            return ResponseEntity.ok(review);
        } catch (ResourceNotFoundException notFoundException) {
            throw notFoundException;
        } catch (Exception ex) {
            System.err.println(ex);
            throw new RuntimeException(ex);
        }
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<Review> createReview(@PathVariable String userId, @RequestBody ReviewRequest request) {
        try {
            Review newReview = reviewService.createReview(userId, request);
            return ResponseEntity.ok(newReview);
        } catch (ResourceNotFoundException notFoundException) {
            return ResponseEntity.notFound().build();
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<Review> updateReview(String reviewId, Review newReview) {
        try {
            Review review = reviewService.updateReview(reviewId, newReview);
            return ResponseEntity.ok(review);
        } catch (ResourceNotFoundException notFoundException) {
            return ResponseEntity.notFound().build();
        } catch (RuntimeException exception) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<?> deleteReview(String reviewId) {
        try {
            reviewService.deleteReview(reviewId);
            return  ResponseEntity.ok().build();
        } catch (ResourceNotFoundException notFoundException) {
            throw notFoundException;
        } catch (Exception ex) {
            System.err.println(ex);
            throw new RuntimeException(ex);
        }
    }

}
