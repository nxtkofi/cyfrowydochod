import BookContext from "@/context/BookProvider";
import { useContext } from "react";

function useBooksContext() {
  const context = useContext(BookContext);
  if(!context){
    throw new Error("No context found for books!")
  }
  return context;
}

export default useBooksContext;
