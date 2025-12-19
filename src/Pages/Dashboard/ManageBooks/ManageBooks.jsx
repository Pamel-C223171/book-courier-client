import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useState } from 'react';

const ManageBooks = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const { data: books = [], refetch } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const res = await axiosSecure.get('/books');
      return res.data;
    }
  });

  const handleTogglePublish = async (book) => {
    try {
      setLoading(true);
      const newStatus = book.bookStatus === 'Published' ? 'Unpublished' : 'Published';
      await axiosSecure.patch(`/books/${book._id}`, { bookStatus: newStatus });
      refetch();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this book and all its orders?');
      if (!confirm) return;

      setLoading(true);
      // 1. Delete book
      await axiosSecure.delete(`/books/${bookId}`);
      // 2. Delete all orders related to this book
      await axiosSecure.delete(`/orders/book/${bookId}`);
      refetch();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Books: {books.length}</h2>

      {loading && <p className="text-sm text-gray-500 mb-2">Processing...</p>}

      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Author</th>
              <th>Librarian</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book, i) => (
              <tr key={book._id} className="hover:bg-gray-50">
                <td>{i + 1}</td>
                <td>{book.bookName}</td>
                <td>{book.authorName}</td>
                <td>{book.librarianName || book.librarianEmail}</td>

                <td>
                  <span
                    className={`text-white px-2 py-1 rounded ${
                      book.bookStatus === 'Published' ? 'bg-green-600' : 'bg-red-500'
                    }`}
                  >
                    {book.bookStatus}
                  </span>
                </td>

                <td className="space-x-2">
                  {/* Publish / Unpublish */}
                  <button
                    onClick={() => handleTogglePublish(book)}
                    className={`px-2 py-1 rounded text-white text-xs ${
                      book.bookStatus === 'Published' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    {book.bookStatus === 'Published' ? 'Unpublish' : 'Publish'}
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDeleteBook(book._id)}
                    className="px-2 py-1 rounded bg-red-500 text-white text-xs hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooks;
