// controllers/employerController.js
import db from '../config/db.js';
import bcrypt from 'bcryptjs';

// Get employer profile
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

// Update employer profile
export const updateProfile = async (req, res) => {
  try {
    const employerId = req.user.id;
    const { full_name, phone, company_name, industry, branch_location, full_address } = req.body;
    await db.query(
      `UPDATE employers 
       SET full_name = ?, phone = ?, company_name = ?, industry = ?, branch_location = ?, full_address = ?
       WHERE id = ?`,
      [full_name, phone, company_name, industry, branch_location, full_address, employerId]
    );
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Post a new job
export const postJob = async (req, res) => {
  try {
    const employerId = req.user.id;
    const {
      title,
      category,
      employment_type,
      openings,
      salary,
      application_deadline,
      start_date,
      description,
      company_name,
      location,
      contact_person,
      contact_phone,
      contact_address
    } = req.body;

    // Insert job with new schema
    const [result] = await db.query(
      `INSERT INTO jobs 
       (employer_id, title, category, employment_type, openings, salary, 
        application_deadline, start_date, description, company_name, 
        location, contact_person, contact_phone, contact_address)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        employerId, // employer_id
        title,
        category,
        employment_type,
        openings,
        salary,
        application_deadline,
        start_date,
        description,
        company_name,
        location,
        contact_person,
        contact_phone,
        contact_address
      ]
    );
    res.status(201).json({ 
      message: 'Job posted successfully',
      jobId: result.insertId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all jobs posted by employer
export const getPostedJobs = async (req, res) => {
  try {
    const employerId = req.user.id;
    const [jobs] = await db.query(
      'SELECT job_id, title, category, employment_type, openings, salary, application_deadline FROM jobs WHERE user_id = ?',
      [employerId]
    );
    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get job details
export const getJobDetails = async (req, res) => {
  try {
    const jobId = req.params.id;
    const employerId = req.user.id;
    const [job] = await db.query(
      `SELECT * FROM jobs WHERE job_id = ? AND user_id = ?`,
      [jobId, employerId]
    );
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update job
export const updateJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const employerId = req.user.id;
    const {
      title,
      category,
      employment_type,
      openings,
      salary,
      application_deadline,
      start_date,
      description,
      company_name,
      location,
      contact_person,
      contact_phone,
      contact_address
    } = req.body;
    await db.query(
      `UPDATE jobs 
       SET title = ?, category = ?, employment_type = ?, openings = ?, salary = ?, 
           application_deadline = ?, start_date = ?, description = ?, company_name = ?,
           location = ?, contact_person = ?, contact_phone = ?, contact_address = ?
       WHERE job_id = ? AND user_id = ?`,
      [
        title,
        category,
        employment_type,
        openings,
        salary,
        application_deadline,
        start_date,
        description,
        company_name,
        location,
        contact_person,
        contact_phone,
        contact_address,
        jobId,
        employerId
      ]
    );
    res.json({ message: 'Job updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete job
export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const employerId = req.user.id;
    await db.query(
      'DELETE FROM jobs WHERE job_id = ? AND user_id = ?',
      [jobId, employerId]
    );
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};