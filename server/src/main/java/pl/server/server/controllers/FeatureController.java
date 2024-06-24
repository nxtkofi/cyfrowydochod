package pl.server.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.server.server.models.BookFeatures;
import pl.server.server.models.Feature;
import pl.server.server.services.FeatureService;

import java.util.List;

@RequestMapping("/api/bookFeatures")
@RestController
public class FeatureController {
    @Autowired
    FeatureService featureService;

    @GetMapping("/all")
    public ResponseEntity<List<Feature>> getAllFeatures() {
        return ResponseEntity.ok(featureService.getAllFeatures());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Feature> getById(@PathVariable String featureId) {
       return ResponseEntity.ok(featureService.getById(featureId));
    }

    @PostMapping
    public ResponseEntity<Feature> createFeature(@RequestBody Feature newFeature) {
        return ResponseEntity.ok(featureService.createFeature(newFeature));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Feature> updateFeature(@PathVariable String featureId, @RequestBody Feature newFeature) {
        return ResponseEntity.ok(featureService.updateFeature(featureId,newFeature));
    }

    @PostMapping("/{id}")
    public ResponseEntity<BookFeatures> createFeatureAndAddToBook(@PathVariable String bookId, @RequestBody Feature newFeature) {
        return ResponseEntity.ok(featureService.createFeatureAndAddToBook(bookId,newFeature));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteFeature(@PathVariable String featureId) {
        featureService.deleteFeature(featureId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/bookFeatures")
    public ResponseEntity removeFeatureFromBook(@PathVariable String bookId, @PathVariable String description) {
        featureService.removeFeatureFromBook(bookId, description);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/bookFeatures/{id}")
    public ResponseEntity removeFeatureFromBookById(@PathVariable String bookId, @PathVariable String featureId) {
        featureService.removeFeatureFromBookById(bookId, featureId);
        return ResponseEntity.ok().build();
    }



}
