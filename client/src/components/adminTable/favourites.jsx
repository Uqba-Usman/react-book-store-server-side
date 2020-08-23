import React from "react";

const Favourites = ({ favourites }) => {
  return (
    <div className="col-lg-6">
      {console.log("FAVOURITES", Favourites)}
      {Favourites.length === 0 ? (
        <div></div>
      ) : (
        <>
          <h3>User Favourites</h3>
          <table
            id="datatable"
            className="table table-bordered table-hover"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>Author</th>
                <th>Category</th>
                <th>Publisher</th>
              </tr>
            </thead>
            <tbody>
              {favourites.map((f, index) => (
                <tr key={index}>
                  <td>{f.author}</td>
                  <td>{f.category}</td>
                  <td>{f.publisher}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Favourites;
