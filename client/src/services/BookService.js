import GenericService from "./GenericService";

class BookService extends GenericService {
  constructor() {
    super();
  }
  addBook = (data) => this.post("books", data);
  deleteBook = (_id) => this.delete("books/" + _id);
  updateBook = (_id, data) => this.put("books/" + _id, data);
  getBooks = () => this.get("books");
  getSingleBook = (_id) => this.get("books/" + _id);
}

let bookService = new BookService();
export default bookService;
