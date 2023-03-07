import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';
import { Book } from '../../models/book';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'author', 'genre', 'year', 'added', 'checkOutCount', 'status', 'dueDate', 'comment'];
  books$!: Observable<Page<Book>>;
  dataSource!: MatTableDataSource<Book>;
  searchText: string = '';
  selectedStatus: string = '';
  filteredBooks: Book[] = [];

  constructor(
    private bookService: BookService,
  ) {
  }

  ngOnInit(): void {
    // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.
    this.bookService.getBooks({}).subscribe((page: Page<Book>) => {
      this.dataSource = new MatTableDataSource(Array.from(page.content));
    });
  }

  applyStatusFilter() {
    // get all books and filter by the selected status
    this.bookService.getBooks({}).subscribe((books) => {
      // if All is selected, apply search filter to all books
      if (this.selectedStatus === "All") {
        this.dataSource.data = books.content;
        this.dataSource.filter = this.searchText.trim().toLowerCase();
      } else {
        // filter books by status
        let filteredBooks = books.content.filter(
          (book) => book.status === this.selectedStatus
        );
        // apply search filter to status filtered books
        this.dataSource.data = filteredBooks;
        this.dataSource.filter = this.searchText.trim().toLowerCase();
      }
    });
  }

  applyFilter() {
    // apply status filter if selected
    if (this.selectedStatus && this.selectedStatus !== "All") {
      this.applyStatusFilter();
    } else {
      // apply search filter
      const filterValue = this.searchText.trim().toLowerCase();
      this.dataSource.filter = filterValue;
    }
  }
}
