import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "@/components/ui/wrapper";
import ProfileHeader from "@/components/ui/Profile/ProfileHeader";
import useApi from "@/hooks/useApi";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

function ManageBooksPage() {
  const { sendReq, apiLoading } = useApi();
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getBooks = async () => {
      const { response } = await sendReq("/api/books", "GET");
      if (response) {
        setBooks((await response).data);
      }
    };
    getBooks();
  }, []);

  const handleEdit = (bookId: string) => {
    navigate(`/profile/adminpanel/edit-book/${bookId}`);
  };

  const handleDelete = async (bookId: string) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      const { response } = await sendReq(
        `/api/books/${bookId}`,
        "DELETE",
        null,
        {
          title: "Book deleted",
          description: "Book deleted successfully!",
        },
      );

      if (response) {
        setBooks(books.filter((book) => book.id !== bookId));
      }
    }
  };

  return (
    <Wrapper>
      <ProfileHeader
        topText="Manage Books"
        bottomText="Edit or delete your ebooks"
      />

      <div className="flex justify-end mb-4">
        <Button onClick={() => navigate("/profile/addbook")}>
          Add New Book
        </Button>
      </div>

      <div className="grid gap-4">
        {books.map((book) => (
          <div
            key={book.id}
            className="flex items-center justify-between p-4 bg-white rounded-md shadow"
          >
            <div className="flex items-center space-x-4">
              <img
                src={book.imagePath}
                alt={book.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{book.title}</h3>
                <p className="text-sm text-gray-500">By {book.author}</p>
                <p className="text-sm">${book.price}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEdit(book.id)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(book.id)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        ))}

        {books.length === 0 && !apiLoading && (
          <div className="text-center p-8 bg-gray-50 rounded-md">
            <p className="text-gray-500">
              No books found. Add a new book to get started.
            </p>
          </div>
        )}

        {apiLoading && (
          <div className="text-center p-8">
            <p>Loading...</p>
          </div>
        )}
      </div>
    </Wrapper>
  );
}

export default ManageBooksPage;
