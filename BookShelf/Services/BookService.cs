using BookShelf.Model;
using System.Collections.Generic;

namespace BookShelf.Services
{

    // Interface for BookService operations
    public interface BookService
    {
        //Retrieves a list of all books in the collection
        List<Book> GetAllBooks();

        //Retrieves a specific book by its unique identifier (i
        Book GetBookById(int id);

        //Adds a new book to the collection and returns the added book
        Book AddBook(Book book);

        // Updates an existing book based on its id and returns the updated book
        Book UpdateBook(int id, Book book);

        // Deletes a book from the collection based on its id
        bool DeleteBook(int id);
    }
}
