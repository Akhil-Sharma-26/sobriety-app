import dotenv from "dotenv";
import mysql from "mysql2";
dotenv.config({
  path: "../.env",
});
// console.log(process.env.DB_USER)
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to the MySQL server.");
});
export default connection;
//module.exports = connection;
