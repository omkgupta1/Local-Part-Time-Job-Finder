import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "WJNI@TIN", // your MySQL password
  database: "job_finder",
});

export default pool;
