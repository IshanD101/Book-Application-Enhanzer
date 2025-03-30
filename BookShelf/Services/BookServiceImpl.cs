using BookShelf.Model;
using System.Collections.Generic;
using System.Linq;

namespace BookShelf.Services
{
    public class BookServiceImpl : BookService
    {
        //In-memory list of books
        private List<Book> _books = new List<Book>();

        //The next ID to be assigned to a new book
        private int _nextId = 1;

        public BookServiceImpl()
        {
            //Added sample books to the list
            _books.Add(new Book
            {
                Id = _nextId++,
                Title = "The Great Gatsby",
                Author = "F. Scott Fitzgerald",
                ISBN = "9780743273565",
                PublicationDate = "1925-04-10" 
            });
            _books.Add(new Book
            {
                Id = _nextId++,
                Title = "To Kill a Mockingbird",
                Author = "Harper Lee",
                ISBN = "9780061120084",
                PublicationDate = "1960-07-11"
            });
        }

        //Adds a new book to the list and returns the added book
        public Book AddBook(Book book)
        {
            book.Id = _nextId++;
            _books.Add(book);
            return book;
        }

        //Deletes a book by its ID and returns a boolean indicating success or failure
        public bool DeleteBook(int id)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);
            if (book == null) return false;

            return _books.Remove(book);
        }

        //Retrieves all books in the collection
        public List<Book> GetAllBooks()
        {
            return _books;
        }

        //Retrieves a specific book by its ID
        public Book GetBookById(int id)
        {
            return _books.FirstOrDefault(b => b.Id == id);
        }

        //Updates an existing book's details by its ID
        public Book UpdateBook(int id, Book updatedBook)
        {
            var book = _books.FirstOrDefault(b => b.Id == id);
            if (book == null) return null;

            book.Title = updatedBook.Title;
            book.Author = updatedBook.Author;
            book.ISBN = updatedBook.ISBN;
            book.PublicationDate = updatedBook.PublicationDate;

            return book;
        }
    }
}
