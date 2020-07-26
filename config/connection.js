// Set up MySQL connection.
var mysql = require("mysql");


if (process.env.JAWSDB_URL) {
  var connection = mysql.createConnection(process.env.JAWSDB_URL)
}
else {
// for local testing
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "messageboardDB"
});
}

// for Heroku
// var connection = mysql.createConnection(process.env.JAWSDB_URL);

// Make connection.
connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
});

// Export connection for our ORM to use.
module.exports = connection;
