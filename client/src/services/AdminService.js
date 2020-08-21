import GenericService from "./GenericService";
import jwtDecode from "jwt-decode";
class AdminService extends GenericService {
  constructor() {
    super();
  }
  login = (email, password) =>
    new Promise((resolve, reject) => {
      this.post("/api/admin/login", { email, password })
        .then((token) => {
          localStorage.setItem("token", token);
          console.log("TOKEN", token);
          resolve(token);
        })
        .catch((err) => {
          reject(err);
        });
    });
}
let adminService = new AdminService();
export default adminService;
