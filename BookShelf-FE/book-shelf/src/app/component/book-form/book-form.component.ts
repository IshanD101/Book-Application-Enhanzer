import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnChanges {
  //input property to receive a book object
  @Input() book: Book | null = null;

  //Output properties to emit events for saving or canceling the form
  @Output() onSave = new EventEmitter<Book>();
  @Output() onCancel = new EventEmitter<void>();

  //reactive form group for book form
  bookForm: FormGroup;
  editMode = false;//Flag to track if user in edit mode

  //Constructor initializes the form using FormBuilder
  constructor(private fb: FormBuilder) {
    this.bookForm = this.createForm();
  }

  //detects changes to the @Input() book property
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['book'] && this.book) {
      this.editMode = !!this.book.id;
      this.bookForm = this.createForm(); //recreate form on changes
      this.bookForm.patchValue(this.book); //patch values from the book
    } else {
      //reset the form if no book is provided (for adding new book)
      this.bookForm.reset();
      this.editMode = false;
    }
  }


  //Creates the reactive form based on whether it's in edit mode or not
  createForm(): FormGroup {
    //Conditionally include the id field for edit mode only
    const formGroup: any = {
      title: ['', Validators.required],
      author: ['', Validators.required],
      isbn: ['', Validators.required],
      publicationDate: ['', [
        Validators.required,
        Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)
      ]]
    };

    //Add the id field only if we're editing an existing book
    if (this.editMode) {
      formGroup.id = [this.book?.id || null];
    }

    return this.fb.group(formGroup);
  }


  //Handles form submission
  onSubmit(): void {
    if (this.bookForm.valid) {
      const bookData = this.bookForm.value;
      console.log('Submitting book:', bookData);
      this.onSave.emit(bookData);  // Emit book data, including id if it's in edit mode
    } else {
      this.markFormGroupTouched(this.bookForm);
    }
  }


  //Handles cancel action
  cancel(): void {
    this.onCancel.emit();
  }

  //Helper method to mark all form controls as touched
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
