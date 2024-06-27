package pl.server.server.DTOs;

import lombok.*;
import pl.server.server.models.Book;
import pl.server.server.models.BookFeatures;
import pl.server.server.models.IconElements;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class BookRequest {
   private Book newBook;
   List<BookFeatures> bookFeaturesList;
   List<IconElements> bookIconElementsList;
}
