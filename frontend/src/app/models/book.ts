import { BookStatus } from './book-status';


export interface Book {
  id: string;
  name: string;
  author: string;
  genre: string;
  year: number;
  added: string;
  checkOutCount: number;
  status: BookStatus;
  dueDate: string;
  comment: string;
}
