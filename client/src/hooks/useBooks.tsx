import BookContext from "@/context/BookProvider";
import { useContext } from "react";

function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBooks must be used within BookProvider");
  }
  return context;
}

export default useBooks;
