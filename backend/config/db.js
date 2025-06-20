import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "WJNI@TIN", // your MySQL password
  database: "job_finder",
});

export default pool;
