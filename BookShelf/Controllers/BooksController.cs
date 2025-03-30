using BookShelf.Model;
using BookShelf.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BookShelf.Controllers
{
    //Route attribute defines the base URL for the controller's actions
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        //Dependency injection of the BookService
        private readonly BookService _bookService;

        //Constructor to initialize the BookService
        public BooksController(BookService bookService)
        {
            _bookService = bookService;
        }

        //Retrieves all books from the service
        [HttpGet]
        public ActionResult<IEnumerable<Book>> GetBooks()
        {
            return Ok(_bookService.GetAllBooks());
        }

        //Retrieves a specific book by its ID
        [HttpGet("{id}")]
        public ActionResult<Book> GetBook(int id)
        {
            var book = _bookService.GetBookById(id);
            if (book == null)
                return NotFound();

            return Ok(book);
        }

        //Creates a new book from the request body
        [HttpPost]
        public ActionResult<Book> CreateBook([FromBody] Book book)
        {
            if (!ModelState.IsValid)
            {
                Console.WriteLine("Validation failed: " + string.Join(", ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage)));
                return BadRequest(ModelState);
            }

            //validations for date format
            if (!string.IsNullOrEmpty(book.PublicationDate))
            {
                if (!DateTime.TryParseExact(book.PublicationDate, "yyyy-MM-dd",
                    System.Globalization.CultureInfo.InvariantCulture,
                    System.Globalization.DateTimeStyles.None, out _))
                {
                    ModelState.AddModelError("PublicationDate", "Invalid date format. Use YYYY-MM-DD.");
                    return BadRequest(ModelState);
                }
            }

            var newBook = _bookService.AddBook(book);
            return CreatedAtAction(nameof(GetBook), new { id = newBook.Id }, newBook);
        }

        //Updates an existing book by its ID
        [HttpPut("{id}")]
        public IActionResult UpdateBook(int id, Book book)
        {
            //Validations for date format
            if (!string.IsNullOrEmpty(book.PublicationDate))
            {
                if (!DateTime.TryParseExact(book.PublicationDate, "yyyy-MM-dd",
                    System.Globalization.CultureInfo.InvariantCulture,
                    System.Globalization.DateTimeStyles.None, out _))
                {
                    ModelState.AddModelError("PublicationDate", "Invalid date format. Use YYYY-MM-DD.");
                    return BadRequest(ModelState);
                }
            }

            var updatedBook = _bookService.UpdateBook(id, book);
            if (updatedBook == null)
                return NotFound();
            return NoContent();
        }

        //Deletes a specific book by its ID
        [HttpDelete("{id}")]
        public IActionResult DeleteBook(int id)
        {
            var result = _bookService.DeleteBook(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}
