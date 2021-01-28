const mysql = require("mysql2");
/**
 *  If you wish to use custom parameters for the db, please store them inside .env file
 *  in root.
 *  DB_HOST for the target host.
 *  DB_PORT for the target port to listen.
 *  DB_USER for the username.
 *  DB_PASS for the user's password.
 *  DB_NAME for the target database.
 */
const connection = mysql.createConnection({
  host: process.env.DB_HOST || `localhost`,
  port: process.env.DB_PORT || `3306`,
  user: process.env.DB_USER || `root`,
  password: process.env.DB_PASS || ``,
  database: process.env.DB_NAME
});
connection.connect(error => {
  if (error) {
        console.error(`Oops, something happened during db connect.`)
        throw error
  }
  console.log("Connected to DB.")
})
module.exports = connection