var express = require("express");
var router = express.Router();
const {
  downloadPromise,
} = require("./googleDriveAuthentication/downloadPromise");
const newConn = require("../../connection/db");

// router.get("/", async (req, res) => {
//   console.log("DOWNLOAD");
//   const fId = "1wf5DQi8LnBLPgbpKdW4bmmgmjRSH1o1Y";
//   downloadPromise("m.jpg", fId)
//     .then(async (resu) => {
//       console.log("DOWNLOAD RSULT, ", resu);
//       const filePath =
//         __dirname + "/googleDriveAuthentication/upload/" + "m.jpg";
//       console.log("FILEPATH", filePath);
//       const result = await res.download(filePath);

//       console.log("RESULT", result);
//     })
//     .catch((error) => {
//       console.log("EROR", error);
//     });
// });

router.post("/gallerybooks", (req, res) => {
  console.log("RB, ", req.body);
  let sql = `SELECT * FROM book, bookdata WHERE book.isbn in (SELECT book_isbn FROM usergallery WHERE user_email = '${req.body.email}') and bookdata.bookData_isbn in (SELECT book_isbn FROM usergallery WHERE user_email = '${req.body.email}')`;
  let database = newConn();
  try {
    database.query(sql, (err, result) => {
      if (err) console.log("ERRO", err);
      console.log("RESULT", result);
      res.send(result);
    });
  } catch (error) {
    console.log("DB ERROR");
  }
});

router.post("/book", async (req, res) => {
  console.log(req.body);

  let sql = "SELECT * FROM bookdata WHERE bookData_isbn = ?";
  let database = newConn();
  try {
    database.query(sql, req.body.isbn, (err, result) => {
      if (err) console.log("ERRO", err);
      console.log("RESULT", result);
      console.log("DOWNLOAD");
      const fN = result[0].fileName;
      console.log("FN, ", fN);
      // const fId = "1wf5DQi8LnBLPgbpKdW4bmmgmjRSH1o1Y";
      downloadPromise(result[0].fileName, result[0].fileID)
        .then(async (resu) => {
          console.log("DOWNLOAD RSULT, ", resu);
          console.log("FN2, ", fN);
          const filePath =
            __dirname + "/googleDriveAuthentication/upload/" + fN;
          console.log("FILEPATH", filePath);
          const result = await res.download(filePath);

          console.log("RESULT", resu);
        })
        .catch((error) => {
          console.log("EROR", error);
        });
    });
  } catch (error) {
    console.log("DB ERROR", error);
  }
});

module.exports = router;
