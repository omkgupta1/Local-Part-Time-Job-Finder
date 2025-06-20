const pool = require("../config/db");
const { hashPassword, comparePassword } = require("../utils/hash");

exports.signup = async (req, res) => {
  const { name, email, password, phone, role } = req.body;

  try {
    const hashedPwd = await hashPassword(password);
    let sql;

    if (role === "student") {
      sql = "INSERT INTO Students (name, email, password, phone) VALUES (?, ?, ?, ?)";
    } else if (role === "employer") {
      sql = "INSERT INTO Employers (name, email, password, phone, organization_name) VALUES (?, ?, ?, ?, ?)";
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    await pool.execute(sql, role === "student"
      ? [name, email, hashedPwd, phone]
      : [name, email, hashedPwd, phone, ""]);

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ message: "Signup error", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let sql, user;
    if (role === "student") {
      sql = "SELECT * FROM Students WHERE email = ?";
    } else if (role === "employer") {
      sql = "SELECT * FROM Employers WHERE email = ?";
    } else if (role === "admin") {
      sql = "SELECT * FROM Admin WHERE email = ?";
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    const [rows] = await pool.execute(sql, [email]);
    user = rows[0];

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({ message: "Login successful", token: `mock-token-${role}-${user.email}` });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};
