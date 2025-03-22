package pl.server.server.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import pl.server.server.models.CoverGenerationRequest;

@Service
public class CoverGenerationService {

    private static String apiKey;
    
    @Value("${cyfrowydochod.valid-api-key}")
    public void setApiKey(String key) {
        CoverGenerationService.apiKey = key;
    }
    
    private final String AI_SERVICE_URL = "http://localhost:8081/image/generate";
    private final RestTemplate restTemplate = new RestTemplate();

    public ResponseEntity<String> generateImageURL(CoverGenerationRequest request) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("X-API-KEY", apiKey);
            
            HttpEntity<CoverGenerationRequest> requestEntity = new HttpEntity<>(request, headers);
            
            ResponseEntity<String> response = restTemplate.exchange(
                AI_SERVICE_URL, 
                HttpMethod.POST, 
                requestEntity,
                String.class
            );
            
            return response;
        } catch (Exception ex) {
            System.err.println("Error while generating image: " + ex.getMessage());
            ex.printStackTrace();
            return ResponseEntity.status(500).body("Error while generating image: " + ex.getMessage());
        }
    }
}
