-- USERS TABLE (common base for all roles)
CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role ENUM('seeker', 'employer', 'admin') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SEEKERS TABLE (replaces Students)
CREATE TABLE Seekers (
    seeker_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    education VARCHAR(255),
    skills TEXT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- EMPLOYERS TABLE (enhanced version)
CREATE TABLE Employers (
    employer_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    company_name VARCHAR(100),
    industry VARCHAR(100),
    verified_status BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- JOB CATEGORIES (unchanged)
CREATE TABLE Job_Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) UNIQUE
);

-- JOBS TABLE (updated foreign key)
CREATE TABLE Jobs (
    job_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,  -- Now references Users table
    title VARCHAR(100),
    description TEXT,
    location VARCHAR(100),
    stipend FLOAT,
    category_id INT,
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deadline DATE,
    status ENUM('open', 'closed') DEFAULT 'open',
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (category_id) REFERENCES Job_Categories(category_id)
);

-- APPLICATIONS TABLE (updated references)
CREATE TABLE Applications (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT,
    user_id INT,  -- Now references Users table
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('applied', 'accepted', 'rejected') DEFAULT 'applied',
    FOREIGN KEY (job_id) REFERENCES Jobs(job_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- SAVED JOBS TABLE (updated references)
CREATE TABLE Saved_Jobs (
    user_id INT,
    job_id INT,
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, job_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (job_id) REFERENCES Jobs(job_id)
);

-- ADMINS TABLE (now part of Users table)
-- Note: Admin-specific fields can be added in a separate table if needed

-- Insert initial data (migrated from your original schema)
INSERT INTO Users (full_name, email, password, phone, role) VALUES
-- Seekers (formerly Students)
('Nitin Kumar', 'nitin@example.com', 'hashedpassword123', NULL, 'seeker'),
('Riya Sharma', 'riya@example.com', 'securepass456', NULL, 'seeker'),
-- Employers
('Ravi Corp', 'ravi@corp.com', 'hashed_pwd3', '8888888881', 'employer'),
('TechSoft Pvt Ltd', 'hr@techsoft.com', 'hashed_pwd4', '8888888882', 'employer'),
-- Admin
('Admin1', 'admin@example.com', 'admin_pass', NULL, 'admin');

INSERT INTO Seekers (user_id, education, skills) VALUES
(1, 'B.Tech CSE, Final Year', 'HTML, CSS, JavaScript'),
(2, 'BCA, Third Year', 'Python, Excel, SQL');

INSERT INTO Employers (user_id, company_name, industry, verified_status) VALUES
(3, 'Ravi Deliveries', NULL, TRUE),
(4, 'TechSoft', NULL, FALSE);

INSERT INTO Job_Categories (category_name) VALUES
('Delivery'), ('Tutoring'), ('Data Entry');

INSERT INTO Jobs (user_id, title, description, location, stipend, category_id, deadline, status) VALUES
(3, 'Evening Delivery Job', 'Deliver groceries in local area.', 'Delhi', 3000, 1, '2025-07-10', 'open'),
(4, 'Math Tutor Needed', 'Help student with high school math.', 'Online', 5000, 2, '2025-07-05', 'open');

INSERT INTO Applications (job_id, user_id, status) VALUES
(1, 1, 'applied'),
(2, 1, 'accepted');

INSERT INTO Saved_Jobs (user_id, job_id) VALUES
(1, 2);

SHOW TABLES;

USE job_finder;
