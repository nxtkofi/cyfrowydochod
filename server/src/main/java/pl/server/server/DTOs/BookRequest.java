package pl.server.server.DTOs;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import pl.server.server.models.Book;
import pl.server.server.models.IconElements;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class BookRequest {
   private Book newBook;
   List<String> bookFeaturesList;
   List<IconElements> bookIconElementsList;
}
