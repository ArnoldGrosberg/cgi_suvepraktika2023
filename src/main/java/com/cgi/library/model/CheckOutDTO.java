package com.cgi.library.model;

import java.time.LocalDate;
import java.util.UUID;

public class CheckOutDTO {

    private UUID id;

    private String borrowerFirstName;

    private String borrowerLastName;

    private BookDTO borrowedBook;

    private LocalDate checkedOutDate;

    private LocalDate dueDate;

    private LocalDate returnedDate;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getBorrowerFirstName() {
        return borrowerFirstName;
    }

    public void setBorrowerFirstName(String borrowerFirstName) {
        this.borrowerFirstName = borrowerFirstName;
    }

    public String getBorrowerLastName() {
        return borrowerLastName;
    }

    public void setBorrowerLastName(String borrowerLastName) {
        this.borrowerLastName = borrowerLastName;
    }

    public BookDTO getBorrowedBook() {
        return borrowedBook;
    }

    public void setBorrowedBook(BookDTO borrowedBook) {
        this.borrowedBook = borrowedBook;
    }

    public LocalDate getCheckedOutDate() {
        return checkedOutDate;
    }

    public void setCheckedOutDate(LocalDate checkedOutDate) {
        this.checkedOutDate = checkedOutDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDate getReturnedDate() {
        return returnedDate;
    }

    public void setReturnedDate(LocalDate returnedDate) {
        this.returnedDate = returnedDate;
    }
}
