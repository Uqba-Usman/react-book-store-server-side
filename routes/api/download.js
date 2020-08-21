var express = require("express");
var router = express.Router();
const {
  downloadPromise,
} = require("./googleDriveAuthentication/downloadPromise");

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

router.get("/", async (req, res) => {
  // console.log(req.data);

  console.log("DOWNLOAD");
  const fId = "1wf5DQi8LnBLPgbpKdW4bmmgmjRSH1o1Y";
  downloadPromise("m.jpg", fId)
    .then(async (resu) => {
      console.log("DOWNLOAD RSULT, ", resu);
      const filePath =
        __dirname + "/googleDriveAuthentication/upload/" + "m.jpg";
      console.log("FILEPATH", filePath);
      const result = await res.download(filePath);

      console.log("RESULT", result);
    })
    .catch((error) => {
      console.log("EROR", error);
    });
});

module.exports = router;
