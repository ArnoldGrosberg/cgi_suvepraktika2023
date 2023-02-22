package com.cgi.library.model;

public enum BookStatus {

    AVAILABLE("AVAILABLE"), //book is available to be borrowed
    BORROWED("BORROWED"), //book has been checked out
    RETURNED("RETURNED"), //book has been returned but is not yet available to be checked out again
    DAMAGED("DAMAGED"), //book has been damaged and is waiting to be repaired
    PROCESSING("PROCESSING"); //book is in the process of being registered in the system / repaired

    private String value;

    private BookStatus(String value){
        this.value = value;
    }
}
