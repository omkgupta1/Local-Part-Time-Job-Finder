import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import employerRoutes from "./routes/employerRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/employer", employerRoutes);

app.get("/", (req, res) => {
  res.send("Job Finder API Running");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export const getProfile = async (req, res) => {
  try {
    const employerId = req.user.id;
    const [rows] = await db.query(
      'SELECT full_name, email, phone, company_name, industry, branch_location, full_address FROM employers WHERE id = ?',
      [employerId]
    );
    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: 'Employer not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
