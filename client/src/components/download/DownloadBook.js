import React from "react";
import Cookies from "universal-cookie";
import userService from "../../services/UserService";
import downloadService from "../../services/DownloadService";
import fileDownload from "js-file-download";

const cookies = new Cookies();

const DownloadBook = () => {
  const [data, setData] = React.useState(
    cookies.get("cart") ? cookies.get("cart") : []
  );

  const handleDownload = (b) => {
    console.log(b.isbn);

    downloadService
      .downloadBook()
      .then((res) => {
        console.log("Book Download", res);
        fileDownload(res, "good.jpg");
      })
      .catch((err) => console.log(err));
  };
  return (
    <section>
      <div className="container">
        {data.length === 0 ? (
          <p>No Book Availabe</p>
        ) : (
          data.map((b, index) => (
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
