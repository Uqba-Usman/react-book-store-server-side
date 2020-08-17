const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
const authorize = require("./authorize");

var n = [];
var file_name, file_ext, file_Id;

const uploadFilePromise = (files, to_uploadDir) =>
  new Promise((resolve, reject) => {
    try {
      //  function uploadDrive(files, to_uploadDir) {
      console.log("to_uploadDir", to_uploadDir);

      if (!Array.isArray(files.file)) {
        oldpath = files.file.path;
        console.log("OLD PATH: ", oldpath);
        newpath = to_uploadDir + files.file.name;
        console.log("NEW PATH: ", newpath);
        file_name = files.file.name;
        file_ext = files.file.type;
        fs.rename(oldpath, newpath, function (err) {
          if (err) console.log(err);
          console.log("One file uploaded");
          return;
        });
      }

      fs.readFile("credentials.json", (err, content) => {
        if (err) return console.log("Error loading client secret file:", err);
        const authData = authorize(JSON.parse(content), uploadFile);
      });

      const targetFolderId = "10JgUOVRWseKWV5dG-_6CFxRTbrOfSc_5";
      function uploadFile(auth) {
        const drive = google.drive({ version: "v3", auth });
        if (n.length == 0) {
          console.log("FILE NAME", file_name);
          var fileMetadata = {
            name: Date.now() + file_name,
            parents: [targetFolderId],
          };
          var media = {
            mimeType: file_ext,
            body: fs.createReadStream(
              path.join(__dirname, "upload/", file_name)
            ),
          };
          drive.files.create(
            {
              resource: fileMetadata,
              media: media,
              fields: "id",
            },
            function (err, file) {
              if (err) {
                console.error(err);
              } else {
                console.log(`file Id:${file.data.id}`);
                // file_Id = file.data.id;
                fileData = {
                  fileId: file.data.id,
                  fileName: file_name,
                  fileMimeType: file_ext,
                };
                resolve(fileData);
              }
            }
          );
        }
      }
    } catch (err) {
      reject(err);
    }
  });

module.exports.uploadFilePromise = uploadFilePromise;
