const fs = require("fs");
const { google } = require("googleapis");
const path = require("path");
const authorize = require("./authorize");

const downloadPromise = (fileName, fileID) =>
  new Promise((resolve, reject) => {
    try {
      fs.readFile("credentials.json", (err, content) => {
        if (err) return console.log("Error loading client secret file:", err);
        // Authorize a client with credentials, then call the Google Drive API.
        authorize(JSON.parse(content), downloadFile); //------
      });

      function downloadFile(auth) {
        const drive = google.drive({ version: "v3", auth });
        var fileId = fileID;
        var dest = fs.createWriteStream(
          path.join(__dirname, "upload/", fileName)
        );
        drive.files.get(
          {
            fileId: fileId,
            alt: "media",
          },
          { responseType: "stream" },
          function (err, res) {
            res.data
              .on("end", function (err, result) {
                console.log("Data: ", res.data.end);
                console.log("Done", result);
                console.log("RES", res.status);
                resolve();
              })
              .on("error", function (err) {
                console.log("Error during download", err);
              })
              .pipe(dest);
          }
        );
      }
    } catch (error) {
      reject(error);
    }
  });

module.exports.downloadPromise = downloadPromise;
