import GenericService from "./GenericService";

class DownloadService extends GenericService {
  constructor() {
    super();
  }
  //   addBook = (data) => this.post("/api/books", data);
  downloadBook = (data) =>
    new Promise(async (resolve, reject) => {
      try {
        const res = await this.post("/api/download/book", data);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });

  getBooks = (data) =>
    new Promise(async (resolve, reject) => {
      try {
        const res = await this.post("/api/download/gallerybooks", data);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
}

let downloadService = new DownloadService();
export default downloadService;
