var mysql = require("mysql");
// var connection = mysql.createConnection({
//   host: "us-cdbr-east-02.cleardb.com",
//   user: "b96e10c55848d3",
//   password: "a4ce1d56",
//   database: "heroku_4d2072f812ae958",
// });

// function handleDisconnect(connection) {
//   connection.on("error", function (err) {
//     if (!err.fatal) {
//       return;
//     }

//     if (err.code !== "PROTOCOL_CONNECTION_LOST") {
//       throw err;
//     }

//     console.log("Re-connecting lost connection: " + err.stack);

//     connection = mysql.createConnection({
//       host: "us-cdbr-east-02.cleardb.com",
//       user: "b96e10c55848d3",
//       password: "a4ce1d56",
//       database: "heroku_4d2072f812ae958",
//     });
//     handleDisconnect(connection);
//     connection.connect(function (err) {
//       if (err) {
//         console.log("Again Connection Error", err);
//       }
//       console.log("Connected to Mysql...");
//     });
//   });
// }
// handleDisconnect(connection);

// connection.connect(function (err) {
//   if (err) {
//     console.log(err);
//   }
//   console.log("Connected to Mysql...");
// });

// var conn = mysql.createConnection({
//   host: "us-cdbr-east-02.cleardb.com",
//   user: "b96e10c55848d3",
//   password: "a4ce1d56",
//   database: "heroku_4d2072f812ae958",
//   debug: true,
// });

// //Para reconectar
// var reconnect = function (err) {
//   //    console.log(err);
//   //    if (err.fatal && !err.fatal) {
//   //        return;
//   //    }
//   console.log(err.code, "Trying to connect in 5 secs" + new Date());
//   setTimeout(function () {
//     conn = mysql.createConnection({
//       host: "us-cdbr-east-02.cleardb.com",
//       user: "b96e10c55848d3",
//       password: "a4ce1d56",
//       database: "heroku_4d2072f812ae958",
//       debug: true,
//     });
//     conn.on("error", reconnect);
//     conn.connect();
//   }, 5000);
// };

// conn.on("error", reconnect);

function newConn() {
  var connection = mysql.createConnection({
    host: "us-cdbr-east-02.cleardb.com",
    user: "b96e10c55848d3",
    password: "a4ce1d56",
    database: "heroku_4d2072f812ae958",
    // host: "localhost",
    // user: "root",
    // password: "",
    // database: "project_book_store",
    debug: true,
  });

  connection.on("error", function (err) {
    console.log(err.code); // 'ER_BAD_DB_ERROR'
  });

  connection.on("close", function (err) {
    if (err) {
      console.log("SQL Connection Closed");

      // We did not expect this connection to terminate
      // connection = mysql.createConnection(connection.config);
    } else {
      // We expected this to happen, end() was called.
      console.log("Manually called .end()");
    }
  });
  return connection;
}

module.exports = newConn;
