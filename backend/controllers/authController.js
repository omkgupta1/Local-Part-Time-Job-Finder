import pool from "../config/db.js";
import { hashPassword, comparePassword } from "../utils/hash.js";

export const register = async (req, res) => {
  const {
    full_name,
    email,
    password,
    role,
    phone = null,
    education = null,
    skills = null,
    companyName = null,
    industry = null
  } = req.body;

  if (!full_name || !email || !password || !role) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Check if user already exists
    const [existingUser] = await pool.execute(
      "SELECT * FROM Users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPwd = await hashPassword(password);

    // Insert into Users
    const [result] = await pool.execute(
      "INSERT INTO Users (full_name, email, password, role, phone) VALUES (?, ?, ?, ?, ?)",
      [full_name, email, hashedPwd, role, phone]
    );

    const userId = result.insertId;

    if (role === "seeker") {
      await pool.execute(
        "INSERT INTO Seekers (user_id, education, skills) VALUES (?, ?, ?)",
        [userId, education, skills]
      );
    } else if (role === "employer") {
      await pool.execute(
        "INSERT INTO Employers (user_id, company_name, industry) VALUES (?, ?, ?)",
        [userId, companyName, industry]
      );
    }

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: userId,
        name: full_name,
        email,
        role
      }
    });

  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Registration failed", error: err.message || err });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Check user exists and has the correct role
    const [users] = await pool.execute(
      "SELECT * FROM Users WHERE email = ? AND role = ?",
      [email, role]
    );
    
    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = users[0];
    
    // Verify password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Get role-specific data if needed
    let roleData = {};
    if (role === "seeker") {
      const [seeker] = await pool.execute(
        "SELECT * FROM Seekers WHERE user_id = ?",
        [user.user_id]
      );
      roleData = seeker[0];
    } else if (role === "employer") {
      const [employer] = await pool.execute(
        "SELECT * FROM Employers WHERE user_id = ?",
        [user.user_id]
      );
      roleData = employer[0];
    }

    // In a real app, generate a proper JWT token here
    const token = `mock-token-${user.user_id}-${Date.now()}`;

    res.status(200).json({ 
      message: "Login successful",
      token,
      user: {
        id: user.user_id,
        name: user.full_name,
        email: user.email,
        role: user.role,
        ...roleData
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};