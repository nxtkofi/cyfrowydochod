import axios from "@/helpers/axios";
import useApi from "@/hooks/useApi";
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
};

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider = ({ children }: PropsWithChildren) => {
  const [books, setBooks] = useState<BookType[] | undefined>(undefined);
  const { sendReq } = useApi();
  
  useEffect(() => {
    const getBooks = async () => {
      try {
        const booksRes = (await axios.get("/api/books")).data;
        setBooks(booksRes);
      } catch (err) {
        console.log(err);
      }
    };
    getBooks();
  }, []);

  return (
    <BookContext.Provider value={{ books, setBooks }}>
      {children}
    </BookContext.Provider>
  );
};
export default BookContext;