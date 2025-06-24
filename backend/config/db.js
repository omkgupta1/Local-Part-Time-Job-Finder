import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "Aayush@2003", // your MySQL password
  database: "job_finder",
});

export default pool;
