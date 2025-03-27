package pl.server.server.models;

import lombok.Data;

@Data
public class CoverGenerationRequest {
    public String title;
    public String description;
    public String styles;
    public ColorPrompt color;

}
