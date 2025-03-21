package pl.server.server.models;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class CoverGenerationRequest {
    public String title;
    public String description;
    public List<String> styles = new ArrayList<>();
    public ColorPrompt color;

}
