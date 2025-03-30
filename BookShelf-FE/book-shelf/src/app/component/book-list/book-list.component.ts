import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';
import { BookFormComponent } from '../book-form/book-form.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, BookFormComponent, ButtonModule],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  //Array to hold the list of books
  books: Book[] = [];
  //All flags
  loading = true;
  showForm = false;
  editMode = false;
  selectedBook: Book | null = null;

  //Constructor to inject the BookService
  constructor(private bookService: BookService) { }

  //OnInit lifecycle hook to load the books on component initialization
  ngOnInit(): void {
    this.loadBooks();
  }

  //method to load books from the BookService
  loadBooks(): void {
    this.loading = true;
    this.bookService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching books', error);
        this.loading = false;
      }
    });
  }

  //opens the form to add a new book
  openAddBookForm(): void {
    this.editMode = false;
    this.selectedBook = null;
    this.showForm = true;
  }

//opens the form to edit an existing book
  editBook(book: Book): void {
    this.editMode = true;
    this.selectedBook = { ...book };
    this.showForm = true;
  }

  //Saves the book
  saveBook(book: Book): void {
    if (this.editMode && book.id) {
      // Update existing book
      this.bookService.updateBook(book).subscribe({
        next: () => {
          this.closeForm();
          this.loadBooks();  //Reload books after updating
        },
        error: (error) => console.error('Error updating book', error),
      });
    } else {
      //if not in edit mode, add a new book
      this.bookService.addBook(book).subscribe({
        next: () => {
          this.closeForm();
          this.loadBooks();  //Reload books after adding
        },
        error: (error) => console.error('Error adding book', error),
      });
    }
  }



  //Deletes a book by its ID after confirming the action
  deleteBook(id: number | undefined): void {
    if (id === undefined) {
      console.error('Error: Book ID is undefined');
      return;
    }
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => this.loadBooks(),
        error: (error) => console.error('Error deleting book', error),
      });
    }
  }


  closeForm(): void {
    this.showForm = false;
    this.selectedBook = null;
  }
}
