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
    // Employer fields (support both camelCase and snake_case)
    company_name = null,
    companyName = null,
    industry = null,
    branch_location = null,
    branchLocation = null,
    full_address = null,
    fullAddress = null
  } = req.body;

  // Map camelCase to snake_case if needed
  const final_company_name = company_name || companyName || null;
  const final_branch_location = branch_location || branchLocation || null;
  const final_full_address = full_address || fullAddress || null;

  if (!full_name || !email || !password || !role) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Check if email already exists in employers table
    if (role === "employer") {
      const [existing] = await pool.execute(
        "SELECT id FROM employers WHERE email = ?",
        [email]
      );
      if (existing.length > 0) {
        return res.status(400).json({ message: "Email already registered" });
      }
      const hashedPwd = await hashPassword(password);
      // Insert into employers table
      const [result] = await pool.execute(
        `INSERT INTO employers (full_name, email, phone, password, company_name, industry, branch_location, full_address)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [full_name, email, phone, hashedPwd, final_company_name, industry, final_branch_location, final_full_address]
      );
      const employerId = result.insertId;
      return res.status(201).json({
        message: "Registration successful",
        employer: {
          id: employerId,
          full_name,
          email,
          role
        }
      });
    }
    // Seeker registration logic (unchanged)
    // Check if email already exists
    const [existingUser] = await pool.execute(
      "SELECT * FROM Users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPwd = await hashPassword(password);

    // Insert into Users table
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
      // Validate employer-specific required fields
      if (!final_company_name || !final_full_address) {
        return res.status(400).json({
          message: "Missing required employer contact details",
        });
      }

      await pool.execute(
        `INSERT INTO Employers (
          user_id, company_name, industry,
          branch_location, full_address
        ) VALUES (?, ?, ?, ?, ?)`,
        [
          userId,
          final_company_name,
          industry,
          final_branch_location,
          final_full_address
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

  if (!email || !password || !role) {
    return res.status(400).json({ message: "Missing credentials" });
  }

  try {
    if (role === "employer") {
      // Employer login logic for new schema
      const [employers] = await pool.execute(
        "SELECT id, full_name, email, phone, password, company_name, industry, branch_location, full_address FROM employers WHERE email = ?",
        [email]
      );
      if (employers.length === 0) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const employer = employers[0];
      const isMatch = await comparePassword(password, employer.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      // Generate dummy token (replace with real JWT in production)
      const token = `mock-token-${employer.id}-${Date.now()}`;
      res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id: employer.id,
          name: employer.full_name,
          email: employer.email,
          role: "employer",
          phone: employer.phone,
          company_name: employer.company_name,
          industry: employer.industry,
          branch_location: employer.branch_location,
          full_address: employer.full_address
        }
      });
      return;
    }
    // ... existing seeker/admin login logic ...
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};
