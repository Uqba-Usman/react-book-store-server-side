import GenericService from "./GenericService";
import jwtDecode from "jwt-decode";
class UserService extends GenericService {
  constructor() {
    super();
  }

  getUsers = () => this.get("/api/users");

  getUserFavourties = (email) =>
    new Promise((resolve, reject) => {
      this.post("/api/users/favourites", { email })
        .then((res) => {
          console.log();
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

  login = (email, password) =>
    new Promise((resolve, reject) => {
      this.post("/api/users/login", { email, password })
        .then((token) => {
          localStorage.setItem("token", token);
          console.log("TOKEN", token);
          resolve(token);
        })
        .catch((err) => {
          reject(err);
        });
    });
  register = (fName, lName, email, password) =>
    this.post("/api/users/register", { password, email, lName, fName });
  logout = () => {
    localStorage.removeItem("token");
  };
  isLoggedIn = () => {
    return localStorage.getItem("token") ? true : false;
  };
  getLoggedInUser = () => {
    try {
      const jwt = localStorage.getItem("token");
      return jwtDecode(jwt);
    } catch (ex) {
      return null;
    }
  };
  isAdmin = () => {
    if (this.isLoggedIn()) {
      if (this.getLoggedInUser().role === "admin") return true;
      else return false;
    } else return false;
  };
}

let userService = new UserService();
export default userService;
