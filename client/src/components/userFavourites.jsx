import React from "react";
import Favourites from "./adminTable/favourites";
import userService from "../services/UserService";

const UserFavourites = () => {
  const [favourites, setFavourites] = React.useState([]);

  React.useEffect(() => {
    const email = userService.getLoggedInUser().email;
    userService
      .getUserFavourties(email)
      .then((res) => {
        console.log("FR", res);
        setFavourites(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <section id="page-content" className="no-sidebar">
      <div className="container">
        <Favourites favourites={favourites} />
      </div>
    </section>
  );
};

export default UserFavourites;
