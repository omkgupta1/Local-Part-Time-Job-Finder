DROP DATABASE IF EXISTS job_finder;
CREATE DATABASE job_finder;
USE job_finder;

-- USERS TABLE
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('seeker', 'employer', 'admin') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- EMPLOYERS TABLE (updated)
CREATE TABLE employers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  company_name VARCHAR(100) NOT NULL,
  industry VARCHAR(100) NOT NULL,
  branch_location VARCHAR(100) NOT NULL,
  full_address TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SEEKERS TABLE
CREATE TABLE Seekers (
    seeker_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    education VARCHAR(255),
    skills TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- JOB CATEGORIES TABLE
CREATE TABLE Job_Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) UNIQUE
);

-- JOBS TABLE (updated)
CREATE TABLE jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employer_id INT NOT NULL,
  title VARCHAR(100) NOT NULL,
  category VARCHAR(100) NOT NULL,
  employment_type ENUM('Full-time', 'Part-time', 'Internship', 'Contract') NOT NULL,
  openings INT NOT NULL,
  salary VARCHAR(50) NOT NULL,
  application_deadline DATE NOT NULL,
  start_date DATE NOT NULL,
  description TEXT NOT NULL,
  company_name VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  contact_person VARCHAR(100) NOT NULL,
  contact_phone VARCHAR(20) NOT NULL,
  contact_address TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (employer_id) REFERENCES employers(id) ON DELETE CASCADE
);

-- APPLICATIONS TABLE
CREATE TABLE Applications (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT,
    user_id INT,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('applied', 'accepted', 'rejected') DEFAULT 'applied',
    FOREIGN KEY (job_id) REFERENCES jobs(id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- SAVED JOBS TABLE
CREATE TABLE Saved_Jobs (
    user_id INT,
    job_id INT,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, job_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (job_id) REFERENCES jobs(id)
);

-- USERS
INSERT INTO Users (full_name, email, password, phone, role) VALUES
('Nitin Kumar', 'nitin@example.com', 'hashedpassword123', NULL, 'seeker'),
('Riya Sharma', 'riya@example.com', 'securepass456', NULL, 'seeker'),
('Ravi Corp', 'ravi@corp.com', 'hashed_pwd3', '8888888881', 'employer'),
('TechSoft Pvt Ltd', 'hr@techsoft.com', 'hashed_pwd4', '8888888882', 'employer'),
('Admin1', 'admin@example.com', 'admin_pass', NULL, 'admin');

-- SEEKERS
INSERT INTO Seekers (user_id, education, skills) VALUES
(1, 'B.Tech CSE, Final Year', 'HTML, CSS, JavaScript'),
(2, 'BCA, Third Year', 'Python, Excel, SQL');

-- EMPLOYERS
INSERT INTO employers (full_name, email, phone, password, company_name, industry, branch_location, full_address) VALUES
('Ravi Verma', 'ravi@corp.com', '8888888881', 'hashed_pwd3', 'Ravi Deliveries', 'Logistics', 'Delhi', 'A-44, Industrial Area, Delhi'),
('Neha Tiwari', 'hr@techsoft.com', '8888888882', 'hashed_pwd4', 'TechSoft', 'Education', 'Online', 'Tech Park, Sector 21');

-- CATEGORIES
INSERT INTO Job_Categories (category_name) VALUES
('Delivery'), ('Tutoring'), ('Data Entry');

-- JOBS
INSERT INTO jobs (employer_id, title, category, employment_type, openings, salary, application_deadline, start_date, description, company_name, location, contact_person, contact_phone, contact_address) VALUES
(3, 'Evening Delivery Job', 'Delivery', 'Part-time', 3, '3000', '2025-07-10', '2025-06-26', 'Deliver groceries in local area.', 'Ravi Deliveries', 'Delhi', 'Ravi Verma', '8888888881', 'Delhi Center Warehouse'),
(4, 'Math Tutor Needed', 'Tutoring', 'Contract', 1, '5000', '2025-07-05', '2025-06-25', 'Help student with high school math.', 'TechSoft', 'Online', 'Neha Tiwari', '8888888882', 'Online');

-- APPLICATIONS
INSERT INTO Applications (job_id, user_id, status) VALUES
(1, 1, 'applied'),
(2, 1, 'accepted');

-- SAVED JOBS
INSERT INTO Saved_Jobs (user_id, job_id) VALUES
(1, 2);
