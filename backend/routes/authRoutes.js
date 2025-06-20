import { Router } from "express";
import { signup, login } from "../controllers/authController.js";
const router = Router();

router.post("/signup", signup);
router.post("/login", login);

// Example route
router.get("/test", (req, res) => {
  res.json({ message: "Auth route working!" });
});

export default router;
