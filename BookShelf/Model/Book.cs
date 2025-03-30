using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookShelf.Model
{
    //Represents a Book entity in the system
    public class Book
    {
        //Unique identifier for the book
        public int Id { get; set; }
        public string Title { get; set; }

        public string Author { get; set; }

        public string ISBN { get; set; }
        public string PublicationDate { get; set; }

    }
}
