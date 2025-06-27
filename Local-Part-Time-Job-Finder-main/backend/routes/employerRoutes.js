// routes/employerRoutes.js
import express from "express";
import { authenticateEmployer } from "../middleware/auth.js";
import * as employerController from "../controllers/employerController.js";

const router = express.Router();

// Employer profile routes
router.get('/profile', authenticateEmployer, employerController.getProfile);
router.put('/profile', authenticateEmployer, employerController.updateProfile);

// Job posting routes
router.post('/jobs', authenticateEmployer, employerController.postJob);
router.get('/jobs', authenticateEmployer, employerController.getPostedJobs);
router.get('/jobs/:id', authenticateEmployer, employerController.getJobDetails);
router.put('/jobs/:id', authenticateEmployer, employerController.updateJob);
router.delete('/jobs/:id', authenticateEmployer, employerController.deleteJob);

export default router;