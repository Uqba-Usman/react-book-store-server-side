import GenericService from "./GenericService";

class FavouritesService extends GenericService {
  constructor() {
    super();
  }
  addFavourites = (data) => this.post("/api/favourites", data);
}

let favouritesService = new FavouritesService();
export default favouritesService;
