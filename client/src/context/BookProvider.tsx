import axios from "@/helpers/axios";
import { BookType } from "@/types";
import {
  PropsWithChildren,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

type BookContextType = {
  books: BookType[] | undefined;
  setBooks: React.Dispatch<SetStateAction<BookType[] | undefined>>;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
};

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider = ({ children }: PropsWithChildren) => {
  const [books, setBooks] = useState<BookType[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBooks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const booksRes = (await axios.get("/api/books")).data;
      setBooks(booksRes);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError(err instanceof Error ? err : new Error("Failed to fetch books"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider
      value={{
        books,
        setBooks,
        isLoading,
        error,
        refetch: fetchBooks,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
export default BookContext;

