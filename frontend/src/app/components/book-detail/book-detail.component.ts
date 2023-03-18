import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book$!: Observable<Book>;
  dataSource!: MatTableDataSource<Book>;
  displayedColumns: string[] = ['id', 'title', 'author', 'genre', 'year', 'added', 'checkOutCount', 'status', 'dueDate', 'comment'];

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.book$ = this.route.params
      .pipe(map(params => params['id']))
      .pipe(switchMap(id => this.bookService.getBook(id)))
      .pipe(map(book => {
        this.dataSource = new MatTableDataSource([book]);
        return book;
      }));
  }

  checkoutBook(book: Book): void {
    if (confirm("Are you sure you want to check out this book?")) {
      book.status = "BORROWED";
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 30);
      const year = dueDate.getFullYear();
      const month = ("0" + (dueDate.getMonth() + 1)).slice(-2);
      const day = ("0" + dueDate.getDate()).slice(-2);
      book.dueDate = `${year}-${month}-${day}`;
      book.checkOutCount++;
      this.bookService.saveBook(book).subscribe(
        () => alert("Book checked out successfully!"),
        (error) => console.error(error)
      );
    }
  }

  returnBook(book: Book): void {
    book.status = "AVAILABLE";
    book.dueDate = "";
    book.checkOutCount--;
    this.bookService.saveBook(book).subscribe(
      () => alert("Book returned successfully!"),
      (error) => console.error(error)
    );
  }

  deleteBook(book: Book): void {
    if (confirm("Are you sure you want to delete this book?")) {
    if (book.status === 'BORROWED') {
      alert('Book is checked out and cannot be deleted.');
      return;
    } else {
      this.bookService.deleteBook(book.id).subscribe(
        () => this.onBookDeleted(),
        (error) => this.onDeleteError(error)
      );
      }
    }
  }

  private onBookDeleted(): void {
    this.router.navigate(['/books']).then(() =>
      alert('Book deleted successfully!')
    );
  }

  private onDeleteError(error: any): void {
    console.error(error);
    alert('An error occurred while deleting the book.');
  }
}
