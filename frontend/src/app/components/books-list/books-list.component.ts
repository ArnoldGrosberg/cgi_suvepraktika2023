import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { Page } from '../../models/page';
import { Book } from '../../models/book';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  displayedColumns: string[] = ['favoriteBtn', 'id', 'title', 'author', 'genre', 'year', 'added', 'checkOutCount', 'status', 'dueDate', 'comment'];
  book: Book = {
      id: '',
      title: '',
      author: '',
      genre: '',
      year: 0,
      added: '',
      checkOutCount: 0,
      status: 'PROCESSING',
      dueDate: '',
      comment: ''
    };
  showForm: boolean = false;
  showFavoriteBooks: boolean = false;
  books$!: Observable<Page<Book>>;
  dataSource!: MatTableDataSource<Book>;
  searchText: string = '';
  FormSearchText: string = '';
  selectedStatus: string = '';
  filteredBooks: Book[] = [];
  totalItems = 0; // total number of items
  pageSize = 10; // number of items per page
  pageSizeOptions: number[] = [5, 10, 25, 100]; // available page size options
  currentPage = 0; // current page index
  favoriteBooks: Book[] = [];
  favoriteBooksDataSource!: MatTableDataSource<Book>;

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.bookService.getBooks({pageIndex: this.currentPage, pageSize: this.pageSize}).subscribe((page: Page<Book>) => {
      this.dataSource = new MatTableDataSource(Array.from(page.content));
    });;
  }

  constructor(
    private bookService: BookService,
  ) {
  }

  ngOnInit(): void {
    // TODO this observable should emit books taking into consideration pagination, sorting and filtering options.
    this.bookService.getBooks({pageIndex: this.currentPage, pageSize: this.pageSize}).subscribe((page: Page<Book>) => {
    this.totalItems = page.totalElements;
      this.dataSource = new MatTableDataSource(Array.from(page.content));
    });;
    // get favorite books from local storage
    this.favoriteBooks = JSON.parse(
      localStorage.getItem("favoriteBooks") || "[]"
    );
    this.favoriteBooksDataSource = new MatTableDataSource(
      this.favoriteBooks
    );
  }

  searchBooks() {
    // get all books and then filter by the provided values
    this.bookService.getBooks({}).subscribe((books) => {
      // declare filteredBooks as an array of books to be filtered
      let filteredBooks = books.content;
      // if id is provided, apply id filter to all books
      if (this.book.id) {
        // filter books by id
        filteredBooks = filteredBooks.filter((book) => book.id == this.book.id);
      }
      // if title is provided, apply title filter to all books
      if (this.book.title) {
        // filter books by title
        filteredBooks = filteredBooks.filter(
          (book) => book.title === this.book.title
        );
      }
      // if author is provided, apply author filter to all books
      if (this.book.author) {
        // filter books by author
        filteredBooks = filteredBooks.filter(
          (book) => book.author === this.book.author
        );
      }
      // if genre is provided, apply genre filter to all books
      if (this.book.genre) {
        // filter books by genre
        filteredBooks = filteredBooks.filter(
          (book) => book.genre === this.book.genre
        );
      }
      // if year is provided, apply year filter to all books
      if (this.book.year) {
        // filter books by year
        filteredBooks = filteredBooks.filter(
          (book) => book.year === this.book.year
        );
      }
      // if added is provided, apply added filter to all books
      if (this.book.added) {
        // filter books by added
        filteredBooks = filteredBooks.filter(
          (book) => book.added === this.book.added
        );
      }
      // if checkOutCount is provided, apply checkOutCount filter to all books
      if (this.book.checkOutCount) {
        // filter books by checkOutCount
        filteredBooks = filteredBooks.filter(
          (book) => book.checkOutCount === this.book.checkOutCount
        );
      }
      // if status is provided, apply status filter to all books
      if (this.book.status !== "PROCESSING") {
        // filter books by status
        filteredBooks = filteredBooks.filter(
          (book) => book.status === this.book.status
        );
      }
      // if dueDate is provided, apply dueDate filter to all books
      if (this.book.dueDate) {
        // filter books by dueDate
        filteredBooks = filteredBooks.filter(
          (book) => book.dueDate === this.book.dueDate
        );
      }
      // if comment is provided, apply comment filter to all books
      if (this.book.comment) {
        // filter books by comment
        filteredBooks = filteredBooks.filter(
          (book) => book.comment === this.book.comment
        );
      }
      // apply search filter to filtered books
      if (filteredBooks?.length) {
        this.dataSource.data = filteredBooks;
        this.dataSource.filter = this.FormSearchText.trim().toLowerCase();
      } else if (filteredBooks.length === 0) {
        alert("Did not find any books with the provided criteria");
      } else {
        // apply search filter to non-filtered books
        this.dataSource.data = books.content;
        this.dataSource.filter = this.FormSearchText.trim().toLowerCase();
      }
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

  addFavoriteBook(book: Book) {
    // find if book is already in favorite books
    let bookExists = this.favoriteBooks.find((b) => b.id === book.id);
    // if book is already in favorite books, alert user
    if (bookExists) {
      alert("Book is already in your favorite books");
      return;
    }

    // add book to favorite books
    this.favoriteBooks.push(book);
    // save favorite books to local storage
    localStorage.setItem("favoriteBooks", JSON.stringify(this.favoriteBooks));
    // get favorite books from local storage
    this.favoriteBooks = JSON.parse(
      localStorage.getItem("favoriteBooks") || "[]"
    );
    this.favoriteBooksDataSource = new MatTableDataSource(
      this.favoriteBooks
    );
  }

  removeFavoriteBook(book: Book) {
    // remove book from favorite books
    this.favoriteBooks = this.favoriteBooks.filter((b) => b.id !== book.id);
    // save favorite books to local storage
    localStorage.setItem("favoriteBooks", JSON.stringify(this.favoriteBooks));
    // get favorite books from local storage
    this.favoriteBooks = JSON.parse(
      localStorage.getItem("favoriteBooks") || "[]"
    );
    this.favoriteBooksDataSource = new MatTableDataSource(
      this.favoriteBooks
    );
  }

  isBookOverdue(book: Book) {
    if (!book.dueDate) {
      return false;
    }
    // get current date
    let currentDate = new Date();
    // get due date
    let dueDate = new Date(book.dueDate);
    // if due date is before current date, book is overdue
    if (dueDate < currentDate) {
      return true;
    }
    return false;
  }
}
