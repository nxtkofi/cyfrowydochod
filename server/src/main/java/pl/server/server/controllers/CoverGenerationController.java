package pl.server.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pl.server.server.models.CoverGenerationRequest;
import pl.server.server.services.CoverGenerationService;

@RestController
@RequestMapping("/api/generate")
public class CoverGenerationController {

    @Autowired
    private CoverGenerationService coverGenerationService;

    @PostMapping("/ebook-cover")
    public ResponseEntity<String> generateEbookCover(@RequestBody CoverGenerationRequest request) {
        return coverGenerationService.generateImageURL(request);
    }
    
}
