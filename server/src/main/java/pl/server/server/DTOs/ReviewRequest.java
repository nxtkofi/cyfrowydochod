package pl.server.server.DTOs;

import lombok.Getter;
import lombok.Setter;
import pl.server.server.models.Review;
@Getter
@Setter
public class ReviewRequest {
    private Review review;
    private String bookId;
}
