import React from "react";
import { Link } from "react-router-dom";
import bookService from "../../services/BookService";
import userService from "../../services/UserService";
import Favourites from "./favourites";

const AdminUsers = (props) => {
  const [users, setUsers] = React.useState([]);
  const [favourites, setfavourites] = React.useState();
  // const getData = async () => {
  //   try {
  //     const result = await bookService.getBooks();
  //     setBooks(result);
  //   } catch (error) {
  //     console.log("BOOKS GETTING ERROR", error);
  //   }
  // };
  React.useEffect(() => {
    userService
      .getUsers()
      .then((res) => {
        console.log(res);
        setUsers(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUserFavourites = (email) => {
    console.log("handleUserFavourites", email);
    let data = {
      email: email,
    };
    userService
      .getUserFavourties(email)
      .then((res) => {
        console.log("FR", res);
        setfavourites(<Favourites favourites={res} />);
      })
      .catch((err) => console.log(err));
  };

  return (
    <section id="page-content" className="no-sidebar">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <table
              id="datatable"
              className="table table-bordered table-hover"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>User Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>
                      {" "}
                      <Link
                        onClick={() => {
                          handleUserFavourites(user.email);
                        }}
                      >
                        {user.fName} {user.lName}{" "}
                      </Link>
                    </td>

                    <td>{user.email}</td>
                  </tr>
                ))}
              </tbody>

              <tfoot>
                <tr>
                  <th>User Name</th>
                  <th>User Email</th>
                </tr>
              </tfoot>
            </table>
          </div>

          {favourites}
        </div>
      </div>
    </section>
  );
};

export default AdminUsers;
