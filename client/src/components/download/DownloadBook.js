import React from "react";
import Cookies from "universal-cookie";
import userService from "../../services/UserService";
import downloadService from "../../services/DownloadService";
import fileDownload from "js-file-download";

const cookies = new Cookies();

const DownloadBook = () => {
  const [books, setBooks] = React.useState([]);

  React.useEffect(() => {
    console.log(userService.getLoggedInUser().email);
    let data = {
      email: userService.getLoggedInUser().email,
    };
    downloadService
      .getBooks(data)
      .then((res) => {
        console.log("RSPONSE", res);
        setBooks(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDownload = (b) => {
    console.log(b.isbn);

    let data = {
      isbn: b.isbn,
    };

    downloadService
      .downloadBook(data)
      .then((res) => {
        console.log("Book Download", res);
        fileDownload(res, "good.jpg");
      })
      .catch((err) => console.log(err));
  };
  return (
    <section>
      <div className="container">
        {books.length === 0 ? (
          <p>No Book Availabe</p>
        ) : (
          books.map((b, index) => (
            <ul key={index}>
              {/* <button className="btn" onClick={() => handleDownload(b)}>
                {b.title}
              </button> */}
              <li>
                <a onClick={() => handleDownload(b)} href="#">
                  {b.title}
                </a>
              </li>
            </ul>
          ))
        )}
      </div>
    </section>
  );
};

export default DownloadBook;
