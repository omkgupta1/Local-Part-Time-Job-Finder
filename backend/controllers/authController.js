// import pool from "../config/db.js";
// import { hashPassword, comparePassword } from "../utils/hash.js";

// // REGISTER CONTROLLER
// export const register = async (req, res) => {
//   const {
//     full_name,
//     email,
//     password,
//     role,
//     phone = null,

//     // Seeker-specific
//     education = null,
//     skills = null,

//     // Employer-specific
//     companyName = null,
//     industry = null,
//     contactPerson = null,
//     contactPhone = null,
//     branchLocation = null,
//     fullAddress = null
//   } = req.body;

//   if (!full_name || !email || !password || !role) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   try {
//     // Check if email is already registered
//     const [existingUser] = await pool.execute(
//       "SELECT * FROM Users WHERE email = ?",
//       [email]
//     );

//     if (existingUser.length > 0) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     const hashedPwd = await hashPassword(password);

//     // Insert into Users table
//     const [result] = await pool.execute(
//       "INSERT INTO Users (full_name, email, password, role, phone) VALUES (?, ?, ?, ?, ?)",
//       [full_name, email, hashedPwd, role, phone]
//     );

//     const userId = result.insertId;

//     if (role === "seeker") {
//       await pool.execute(
//         "INSERT INTO Seekers (user_id, education, skills) VALUES (?, ?, ?)",
//         [userId, education, skills]
//       );
//     } else if (role === "employer") {
//       // Validate required employer fields
//       if (!companyName || !contactPerson || !contactPhone) {
//         return res.status(400).json({ message: "Missing employer contact details" });
//       }

//       await pool.execute(
//         `INSERT INTO Employers (
//           user_id, company_name, industry,
//           contact_person, contact_phone,
//           branch_location, full_address
//         ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
//         [
//           userId,
//           companyName,
//           industry,
//           contactPerson,
//           contactPhone,
//           branchLocation,
//           fullAddress
//         ]
//       );
//     }

//     res.status(201).json({
//       message: "Registration successful",
//       user: {
//         id: userId,
//         name: full_name,
//         email,
//         role
//       }
//     });

//   } catch (err) {
//     console.error("Registration error:", err);
//     res.status(500).json({ message: "Registration failed", error: err.message || err });
//   }
// };

// // LOGIN CONTROLLER
// export const login = async (req, res) => {
//   const { email, password, role } = req.body;

//   if (!email || !password || !role) {
//     return res.status(400).json({ message: "Missing credentials" });
//   }

//   try {
//     // Get user with matching role
//     const [users] = await pool.execute(
//       "SELECT * FROM Users WHERE email = ? AND role = ?",
//       [email, role]
//     );

//     if (users.length === 0) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const user = users[0];

//     // Compare hashed passwords
//     const isMatch = await comparePassword(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // Fetch role-specific info
//     let roleData = {};
//     if (role === "seeker") {
//       const [seeker] = await pool.execute(
//         "SELECT education, skills FROM Seekers WHERE user_id = ?",
//         [user.user_id]
//       );
//       roleData = seeker[0] || {};
//     } else if (role === "employer") {
//       const [employer] = await pool.execute(
//         `SELECT company_name, industry, contact_person, contact_phone, branch_location, full_address, verified_status
//          FROM Employers WHERE user_id = ?`,
//         [user.user_id]
//       );
//       roleData = employer[0] || {};
//     }

//     // Generate dummy token
//     const token = `mock-token-${user.user_id}-${Date.now()}`;

//     res.status(200).json({
//       message: "Login successful",
//       token,
//       user: {
//         id: user.user_id,
//         name: user.full_name,
//         email: user.email,
//         role: user.role,
//         ...roleData
//       }
//     });

//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ message: "Login failed", error: err.message });
//   }
// };
import pool from "../config/db.js";
import { hashPassword, comparePassword } from "../utils/hash.js";

// =======================
// REGISTER CONTROLLER
// =======================
export const register = async (req, res) => {
  const {
    full_name,
    email,
    password,
    role,
    phone = null,

    // Seeker fields
    education = null,
    skills = null,

    // Employer fields
    companyName = null,
    industry = null,
    contactPerson = null,
    contactPhone = null,
    branchLocation = null,
    fullAddress = null
  } = req.body;

  if (!full_name || !email || !password || !role) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Check if email already exists
    const [existing] = await pool.execute(
      "SELECT user_id FROM Users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPwd = await hashPassword(password);

    // Insert into Users table
    const [result] = await pool.execute(
      `INSERT INTO Users (full_name, email, password, role, phone)
       VALUES (?, ?, ?, ?, ?)`,
      [full_name, email, hashedPwd, role, phone]
    );

    const userId = result.insertId;

    if (role === "seeker") {
      await pool.execute(
        "INSERT INTO Seekers (user_id, education, skills) VALUES (?, ?, ?)",
        [userId, education, skills]
      );
    } else if (role === "employer") {
      // Validate employer-specific required fields
      if (!companyName || !contactPerson || !contactPhone) {
        return res.status(400).json({
          message: "Missing required employer contact details",
        });
      }

      await pool.execute(
        `INSERT INTO Employers (
          user_id, company_name, industry,
          contact_person, contact_phone,
          branch_location, full_address
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          userId,
          companyName,
          industry,
          contactPerson,
          contactPhone,
          branchLocation,
          fullAddress
        ]
      );
    }

    return res.status(201).json({
      message: "Registration successful",
      user: {
        id: userId,
        name: full_name,
        email,
        role,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    return res.status(500).json({
      message: "Registration failed",
      error: err.message || err,
    });
  }
};

// ===================
// LOGIN CONTROLLER
// ===================
export const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const [users] = await pool.execute(
      "SELECT * FROM Users WHERE email = ? AND role = ?",
      [email, role]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = users[0];
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    let roleData = {};
    if (role === "seeker") {
      const [seeker] = await pool.execute(
        "SELECT education, skills FROM Seekers WHERE user_id = ?",
        [user.user_id]
      );
      roleData = seeker[0] || {};
    } else if (role === "employer") {
      const [employer] = await pool.execute(
        `SELECT company_name, industry, contact_person, contact_phone,
                branch_location, full_address
         FROM Employers WHERE user_id = ?`,
        [user.user_id]
      );
      roleData = employer[0] || {};
    }

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
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
