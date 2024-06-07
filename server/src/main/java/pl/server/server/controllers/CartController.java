import org.springframework.beans.factory.annotation.Autowired;
import pl.server.server.helpers.BookException;
import pl.server.server.models.User;

import java.util.ArrayList;
import java.util.List;

    @Autowired
    UserController userController;
    User user;
    @Getter
    List<String> contents;
    public void init(String userId) throws BookException {
        if (userId == null) {
            throw new BookException("Null person not allowed.");
        } else {
        }

        contents = new ArrayList<>();
    }

    public void addBook(String title) {
        contents.add(title);
    }

    public void removeBook(String title) throws BookException {
        boolean result = contents.remove(title);
        if (!result) {
            throw new BookException("\"" + title + " not in cart.");
        }
    }

    public void remove() {
        contents = null;
    }
}
