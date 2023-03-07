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
  applyFilter() {
      const filterValue = this.searchText.trim().toLowerCase();
      this.dataSource.filter = filterValue;
    }
}
