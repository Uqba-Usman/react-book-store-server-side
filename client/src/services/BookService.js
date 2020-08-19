import GenericService from "./GenericService";

class BookService extends GenericService {
  constructor() {
    super();
  }
  addBook = (data) => this.post("/api/books", data);
  deleteBook = (_id) => this.delete("/api/books/" + _id);
  updateBook = (_id, data) => this.put("/api/books" + _id, data);
  getBooks = () => this.get("/api/books");
  getSingleBook = (_id) => this.get("/api/books/" + _id);
}

let bookService = new BookService();
export default bookService;

// getBooks = () => {
//   new Promise(async (resolve, reject) => {
//     try {
//       const res = await this.get("/api/books");
//       resolve(res);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };
